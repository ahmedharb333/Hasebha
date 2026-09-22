/**
 * Shared MCP server factory.
 *
 * Builds an McpServer with all Klar calculator tools registered. Used by BOTH
 * transports — stdio (server.ts) and remote Streamable HTTP (http-handler.ts) —
 * so the 36 tool registrations live in exactly one place. Every tool delegates
 * to the existing engine through runTool(); no formulas live here.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { tools } from './tools.ts';
import { runTool } from './ai-contract.ts';

export function createMcpServer(): McpServer {
  const server = new McpServer({ name: 'klar-calculators', version: '0.1.0' });
  for (const tool of tools) {
    server.registerTool(
      tool.name,
      { title: tool.title, description: tool.description, inputSchema: tool.inputSchema },
      async (args) => {
        // runTool: MCP-layer normalize/preValidate + input transform, then the
        // engine (single source of truth), then AI-contract enrichment.
        const aiResult = runTool(tool, args as Record<string, unknown>);
        return { content: [{ type: 'text', text: JSON.stringify(aiResult) }] };
      },
    );
  }
  return server;
}
