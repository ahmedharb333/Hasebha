/**
 * Platform-neutral remote MCP HTTP handler.
 *
 * Speaks the MCP Streamable HTTP transport using Web Standard APIs
 * (Request/Response), so it runs on any Web-standard runtime (Cloudflare
 * Workers, Deno, Bun, Node 18+). Stateless, JSON responses (no SSE, no
 * sessions, no database). Reuses the shared createMcpServer() factory — the
 * same 36 tools and engines as stdio; no duplicated calculation logic.
 *
 * Flow:  auth (Bearer)  →  request guards  →  Streamable HTTP transport  →
 *        createMcpServer()  →  runTool()  →  existing calculator engines.
 */
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createMcpServer } from './create-server.ts';

/** MCP calculator payloads are tiny; cap the body well below anything legitimate. */
export const MAX_BODY_BYTES = 64 * 1024;

export interface HandleOptions {
  /** The private API key (from an environment secret). */
  apiKey?: string;
  /**
   * Optional public demo key (separate secret). When set, it is accepted in
   * addition to `apiKey`, so it can be published in docs/directories and
   * rotated or revoked independently of the private key.
   */
  demoKey?: string;
}

/** Constant-time-ish string compare (length leak only); no node:crypto needed. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

function jsonRpcError(status: number, code: number, message: string, extraHeaders?: Record<string, string>): Response {
  return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code, message }, id: null }), {
    status,
    headers: { 'content-type': 'application/json', ...extraHeaders },
  });
}

/**
 * Build a fresh stateless server + transport for a SINGLE request. The SDK's
 * stateless Streamable HTTP transport refuses reuse across requests ("Stateless
 * transport cannot be reused across requests"), so each HTTP request gets its
 * own instance. Stateless mode also does not require the initialize handshake,
 * so a self-contained tools/list or tools/call works on its own.
 */
async function freshTransport(): Promise<WebStandardStreamableHTTPServerTransport> {
  const server = createMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless
    enableJsonResponse: true,
  });
  await server.connect(transport);
  return transport;
}

export async function handleMcpRequest(request: Request, opts: HandleOptions): Promise<Response> {
  // --- Auth: fail closed. Require at least one configured key AND a matching
  // Bearer token. The private key and the optional public demo key are both
  // accepted.
  const expected = [opts.apiKey, opts.demoKey].filter((k): k is string => typeof k === 'string' && k.length > 0);
  if (expected.length === 0) {
    // Misconfiguration (no secret set). Never reveal it; fail closed.
    // eslint-disable-next-line no-console
    console.error('[klar-mcp] MCP_API_KEY is not set — rejecting all requests.');
    return jsonRpcError(401, -32001, 'Unauthorized', { 'www-authenticate': 'Bearer' });
  }
  const auth = request.headers.get('authorization') ?? '';
  const m = /^Bearer\s+(.+)$/i.exec(auth);
  const token = m?.[1] ?? '';
  const authorized = token.length > 0 && expected.some((k) => safeEqual(token, k));
  if (!authorized) {
    return jsonRpcError(401, -32001, 'Unauthorized', { 'www-authenticate': 'Bearer' });
  }

  // --- Guards for POST (the MCP request path). GET/DELETE pass through to the
  // transport (stateless mode handles them per spec).
  if (request.method === 'POST') {
    const declaredLen = Number(request.headers.get('content-length') ?? '0');
    if (Number.isFinite(declaredLen) && declaredLen > MAX_BODY_BYTES) {
      return jsonRpcError(413, -32600, 'Request too large');
    }
    // Read once, enforce the cap on the actual bytes, and parse JSON ourselves so
    // malformed input is a clean 400 before it reaches the transport. We never
    // log the body (may contain user financial inputs).
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return jsonRpcError(413, -32600, 'Request too large');
    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(text);
    } catch {
      return jsonRpcError(400, -32700, 'Parse error');
    }
    const transport = await freshTransport();
    // Pass the pre-parsed body so the transport does not re-read the consumed stream.
    return transport.handleRequest(request, { parsedBody });
  }

  const transport = await freshTransport();
  return transport.handleRequest(request);
}
