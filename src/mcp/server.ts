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
import { runTool } from './ai-contract.ts';

const server = new McpServer({ name: 'klar-calculators', version: '0.1.0' });

for (const tool of tools) {
  server.registerTool(
    tool.name,
    { title: tool.title, description: tool.description, inputSchema: tool.inputSchema },
    async (args) => {
      // runTool does MCP-layer preValidation + input transformation, then the
      // engine (single source of truth), then AI-contract enrichment.
      const aiResult = runTool(tool, args as Record<string, unknown>);
      return { content: [{ type: 'text', text: JSON.stringify(aiResult) }] };
    },
  );
}

const transport = new StdioServerTransport();
await server.connect(transport);
// stderr only — stdout is reserved for the MCP protocol.
console.error(`Klar MCP server running (stdio) — ${tools.length} tools`);
