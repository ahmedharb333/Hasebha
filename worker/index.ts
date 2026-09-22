/**
 * Klar Remote MCP — Cloudflare Worker entry.
 *
 * A standalone service (separate from the static Klar/Hasebha website, which is
 * NOT migrated). Serves the MCP Streamable HTTP endpoint at `/mcp`, reusing the
 * platform-neutral handler and the shared server factory. The API key is a
 * Worker secret (`MCP_API_KEY`); it is never hard-coded or logged.
 */
import { handleMcpRequest } from '../src/mcp/http-handler.ts';

export interface Env {
  MCP_API_KEY?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== '/mcp') {
      return new Response('Not found', { status: 404 });
    }
    return handleMcpRequest(request, { apiKey: env.MCP_API_KEY });
  },
};
