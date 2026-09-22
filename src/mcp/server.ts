#!/usr/bin/env node
/**
 * Klar MCP server (stdio transport).
 *
 * Exposes selected Klar calculators as MCP tools over stdio for local clients
 * (Claude Desktop / Claude Code). Tool registration lives in the shared
 * createMcpServer() factory, reused by the remote HTTP transport.
 *
 * Run locally:  npm run mcp
 */
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer } from './create-server.ts';
import { tools } from './tools.ts';

const server = createMcpServer();
const transport = new StdioServerTransport();
await server.connect(transport);
// stderr only — stdout is reserved for the MCP protocol.
console.error(`Klar MCP server running (stdio) — ${tools.length} tools`);
