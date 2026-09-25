# Klar MCP — directory submission queue

Ordered. Do the **official registry first** — Glama, PulseMCP, mcp.so and others ingest from it, so one publish seeds most of the ecosystem. Then claim/submit the crawler directories.

Reusable copy lives in [launch-posts.md](./launch-posts.md); the registry manifest is [`server.json`](../server.json) at repo root.

Legend: **[you]** = needs an interactive login/account you own · **[Claude]** = I can drive it (browser/DNS/PR).

---

## 0. Prereqs (once)

- `server.json` committed at repo root ✅ (done)
- Namespace: `pro.worldly/klar` — verified by a DNS TXT record on `worldly.pro` (you own the Cloudflare zone)
- Public demo key baked into the manifest: `klar-demo-ND8Qr5tHx2mv7bKf`

---

## 1. Official MCP Registry — do this first  [you + Claude]

`registry.modelcontextprotocol.io`. No human review; feeds the other directories.

**Steps:**
1. Install the publisher CLI (Go binary from the registry releases):
   - Download `mcp-publisher` for Windows from https://github.com/modelcontextprotocol/registry/releases and put it on PATH, **or** `go install github.com/modelcontextprotocol/registry/cmd/mcp-publisher@latest`.
2. Validate the manifest:
   ```bash
   mcp-publisher validate      # run in the repo root
   ```
3. Authenticate the `pro.worldly` namespace via DNS:
   ```bash
   mcp-publisher login dns --domain worldly.pro
   ```
   It prints a **TXT record** to add.  → **[Claude] I add it in Cloudflare DNS**, you confirm, then re-run to finish login.
4. Publish:
   ```bash
   mcp-publisher publish
   ```
5. Confirm it appears at `https://registry.modelcontextprotocol.io/` (search "klar").

> Alternative auth if DNS is fussy: `mcp-publisher login github` and rename the manifest to `io.github.ahmedharb333/klar` (verifies via your GitHub account, no DNS).

---

## 2. Smithery  [you]

CLI publish. `https://smithery.ai`

```bash
npm i -g smithery       # or: npx smithery ...
smithery mcp publish https://mcp.worldly.pro/mcp -n worldly/klar
```
Needs a Smithery account (GitHub login). Add the description + demo key from launch-posts when prompted.

---

## 3. Glama  [Claude, then you verify]

`https://glama.ai/mcp/servers` — auto-crawls GitHub, then you **claim** to control the listing.
- It may already have crawled `ahmedharb333/Hasebha`. **[Claude]** I search Glama for it; if present, I open the claim flow; if absent, I submit via their "Add server" form (name, description, endpoint, transport, tool count = 36, one-line summary — all in launch-posts.md).
- **[you]** finish ownership verification (GitHub login).

---

## 4. PulseMCP  [Claude, then you verify]

`https://www.pulsemcp.com` — curated/crawled directory; a registry publish (step 1) usually pulls you in automatically since PulseMCP is a registry contributor.
- **[Claude]** I check if the listing exists after the registry publish; if a manual "submit"/"claim" form is available, I fill it.
- **[you]** confirm/claim if it asks for account auth.

---

## 5. mcp.so  [Claude]

`https://mcp.so/submit` — web form.
- **[Claude]** I fill: name (Klar), endpoint, description (short blurb), tags, tool list, demo key. Submit for review.

---

## 6. awesome-mcp-servers (GitHub PR)  [Claude drafts, you merge-request]

`https://github.com/punkpeye/awesome-mcp-servers`
- **[Claude]** I prepare the one-line entry under the right category and can open the PR from your GitHub (via `gh`), or hand you the exact diff to submit.
- Entry:
  ```markdown
  - [Klar](https://worldly.pro/agents/) 🌐 – Deterministic Jordan & GCC labour-law, tax and finance calculators (36 tools); every result returns assumptions and limitations.
  ```

---

## 7. Client-specific directories (optional, later)  [you]

- **Cursor** MCP directory — submit endpoint + config
- **Cline** MCP marketplace — GitHub-based submission

---

## Ready-to-paste facts (from server.json)

| Field | Value |
|---|---|
| Name | Klar |
| Namespace | `pro.worldly/klar` |
| Endpoint | `https://mcp.worldly.pro/mcp` |
| Transport | Streamable HTTP (stateless) |
| Auth | Bearer; public demo key `klar-demo-ND8Qr5tHx2mv7bKf` |
| Tools | 36 |
| Website | https://worldly.pro/agents/ |
| Repo | https://github.com/ahmedharb333/Hasebha |
| Contact | contact@worldly.pro |
