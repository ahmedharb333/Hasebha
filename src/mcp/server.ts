#!/usr/bin/env node
/**
 * Klar MCP server (stdio transport).
 *
 * Exposes selected Klar calculators as MCP tools. Every tool delegates to the
 * existing calculation engine through the adapter — no formulas live here.
 *
 * Run locally:  npm run mcp
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { tools } from './tools.ts';
import { runCalculator } from './adapter.ts';
import { toAIResult } from './ai-contract.ts';

const server = new McpServer({ name: 'klar-calculators', version: '0.1.0' });

for (const tool of tools) {
  server.registerTool(
    tool.name,
    { title: tool.title, description: tool.description, inputSchema: tool.inputSchema },
    async (args) => {
      const input = args as Record<string, unknown>;
      // Engine computes (single source of truth); the AI layer only adds
      // labels/units/assumptions/limitations around the untouched result.
      const response = runCalculator(tool.slug, input);
      const aiResult = toAIResult(tool, response, input);
      return { content: [{ type: 'text', text: JSON.stringify(aiResult) }] };
    },
  );
}

const transport = new StdioServerTransport();
await server.connect(transport);
// stderr only — stdout is reserved for the MCP protocol.
console.error(`Klar MCP server running (stdio) — ${tools.length} tools`);
