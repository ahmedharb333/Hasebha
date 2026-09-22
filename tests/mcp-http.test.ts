import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { handleMcpRequest, MAX_BODY_BYTES } from '../src/mcp/http-handler.ts';
import { createMcpServer } from '../src/mcp/create-server.ts';
import { runTool } from '../src/mcp/ai-contract.ts';
import { tools } from '../src/mcp/tools.ts';

const KEY = 'test-secret-key-123';
const ENDPOINT = 'https://mcp.worldly.pro/mcp';
const ACCEPT = 'application/json, text/event-stream';

function post(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: ACCEPT, authorization: `Bearer ${KEY}`, ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

/** Parse a JSON-RPC response body (enableJsonResponse mode returns JSON). */
async function rpc(body: unknown, headers?: Record<string, string>) {
  const res = await handleMcpRequest(post(body, headers), { apiKey: KEY });
  const text = await res.text();
  return { status: res.status, json: text ? JSON.parse(text) : null };
}

// Stateless: every request is independent (a fresh server+transport per call),
// so no shared initialize handshake is needed — each rpc() stands alone.

/* ---- Auth ---- */
test('http: missing Authorization -> 401', async () => {
  const res = await handleMcpRequest(
    new Request(ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json', accept: ACCEPT }, body: '{}' }),
    { apiKey: KEY },
  );
  assert.equal(res.status, 401);
});

test('http: wrong Bearer token -> 401', async () => {
  const res = await handleMcpRequest(post({ jsonrpc: '2.0', id: 9, method: 'tools/list' }, { authorization: 'Bearer nope' }), { apiKey: KEY });
  assert.equal(res.status, 401);
});

test('http: server with no configured key fails closed -> 401', async () => {
  const res = await handleMcpRequest(post({ jsonrpc: '2.0', id: 9, method: 'tools/list' }), { apiKey: undefined });
  assert.equal(res.status, 401);
});

/* ---- Discovery ---- */
test('http: authenticated tools/list returns all 36 tools', async () => {
  const { status, json } = await rpc({ jsonrpc: '2.0', id: 2, method: 'tools/list' });
  assert.equal(status, 200);
  assert.equal(json.result.tools.length, 36);
  assert.ok(json.result.tools.some((t: { name: string }) => t.name === 'klar_calculate_loan_payment'));
  // Zakat is not exposed.
  assert.ok(!json.result.tools.some((t: { name: string }) => t.name.includes('zakat')));
});

/* ---- tools/call: generic / health / jurisdiction, with parity vs runTool ---- */
async function callTool(name: string, args: Record<string, unknown>) {
  const { status, json } = await rpc({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name, arguments: args } });
  assert.equal(status, 200, `${name} status`);
  const payload = JSON.parse(json.result.content[0].text);
  return payload;
}

test('http: generic calculator (loan payment) matches runTool exactly', async () => {
  const args = { principal: 300000, annualRate: 6.25, term: 30, termUnit: 'years', currency: 'USD' };
  const http = await callTool('klar_calculate_loan_payment', args);
  const direct = runTool(tools.find((t) => t.name === 'klar_calculate_loan_payment')!, args);
  assert.deepEqual(http, JSON.parse(JSON.stringify(direct)));
  assert.equal(http.answers.find((a: { hero?: boolean }) => a.hero).key, 'monthlyPayment');
});

test('http: health calculator (bmi) returns health contract and matches runTool', async () => {
  const args = { weight: 80, weightUnit: 'kg', height: 175, heightUnit: 'cm' };
  const http = await callTool('klar_calculate_bmi', args);
  assert.equal(http.estimate, true);
  assert.equal(http.health.method, 'WHO BMI 18.5–24.9');
  const direct = runTool(tools.find((t) => t.name === 'klar_calculate_bmi')!, args);
  assert.deepEqual(http, JSON.parse(JSON.stringify(direct)));
});

test('http: jurisdiction calculator (income tax) derives currency and matches runTool', async () => {
  const args = { country: 'jo', annualIncome: 24000 };
  const http = await callTool('klar_calculate_income_tax', args);
  assert.equal(http.jurisdiction.country, 'jo');
  assert.equal(http.jurisdiction.currency, 'JOD');
  assert.equal(http.estimate, true);
  const direct = runTool(tools.find((t) => t.name === 'klar_calculate_income_tax')!, args);
  assert.deepEqual(http, JSON.parse(JSON.stringify(direct)));
});

/* ---- Guards ---- */
test('http: malformed JSON -> 400 parse error', async () => {
  const res = await handleMcpRequest(post('{ not json'), { apiKey: KEY });
  assert.equal(res.status, 400);
  const j = JSON.parse(await res.text());
  assert.equal(j.error.code, -32700);
});

test('http: oversized body -> 413', async () => {
  const big = 'x'.repeat(MAX_BODY_BYTES + 1);
  const body = JSON.stringify({ jsonrpc: '2.0', id: 5, method: 'tools/call', params: { name: 'klar_calculate_bmi', arguments: { note: big } } });
  const res = await handleMcpRequest(post(body), { apiKey: KEY });
  assert.equal(res.status, 413);
});

/* ---- Shared factory over an in-memory link (the transport-agnostic path stdio uses) ---- */
test('http: shared factory works over any transport (stdio-equivalent in-memory)', async () => {
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const server = createMcpServer();
  await server.connect(serverTransport);
  const client = new Client({ name: 'inmem', version: '0' });
  await client.connect(clientTransport);
  const list = await client.listTools();
  assert.equal(list.tools.length, 36);
  const res = await client.callTool({ name: 'klar_calculate_loan_payment', arguments: { principal: 300000, annualRate: 6.25, term: 30, termUnit: 'years', currency: 'USD' } });
  const payload = JSON.parse((res.content as Array<{ text: string }>)[0].text);
  const direct = runTool(tools.find((t) => t.name === 'klar_calculate_loan_payment')!, { principal: 300000, annualRate: 6.25, term: 30, termUnit: 'years', currency: 'USD' });
  assert.deepEqual(payload, JSON.parse(JSON.stringify(direct)));
  await client.close();
});
