# Context7 Analysis: Hallucination Prevention via Live Docs Injection

**Researched:** 2026-01-28  
**Stars:** ~44K  
**Repo:** https://github.com/upstash/context7  
**Company:** Upstash

---

## What Context7 Is

Context7 is an MCP (Model Context Protocol) server that provides LLMs with **up-to-date, version-specific code documentation**. It solves the problem of AI coding assistants hallucinating deprecated APIs or generating broken code based on outdated training data.

### The Problem It Solves

LLMs are trained on static datasets with knowledge cutoffs. When you ask about:
- Next.js 15 App Router
- Tailwind 4 changes
- Recently updated library APIs

...they often hallucinate non-existent methods or generate code for old versions.

### How It Works (Technical)

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   User Query    │────▶│  Context7 MCP   │────▶│  Vector DB +    │
│ "use context7"  │     │    Server       │     │  Reranking      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                │                        │
                                ▼                        ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │ LLM generates   │◀────│  Relevant docs  │
                        │ grounded code   │     │  (filtered)     │
                        └─────────────────┘     └─────────────────┘
```

**Pipeline:**
1. **Parse** - Extract code snippets from official documentation (GitHub repos)
2. **Enrich** - Add metadata/explanations via LLMs
3. **Vectorize** - Embed for semantic search
4. **Rerank** - Score results using custom algorithm (server-side)
5. **Cache** - Serve from Redis for performance

**Two MCP Tools:**
- `resolve-library-id` - Maps library name to Context7 ID (e.g., "react" → "/facebook/react")
- `query-docs` - Fetches relevant documentation snippets for a query

### Performance (After Recent Architecture Update)

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Context tokens | ~9.7k | ~3.3k | ↓ 65% |
| Latency | 24s | 15s | ↓ 38% |
| Tool calls | 3.95 | 2.96 | ↓ 30% |

The key change: reranking happens server-side now, so LLMs get only the most relevant docs instead of iteratively searching.

---

## Integration Options

### 1. MCP Server (Recommended)

**For Claude Code:**
```bash
# Local connection
claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key YOUR_API_KEY

# Remote connection
claude mcp add --header "CONTEXT7_API_KEY: YOUR_API_KEY" --transport http context7 https://mcp.context7.com/mcp
```

**For Cursor/Windsurf (`~/.cursor/mcp.json`):**
```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

### 2. REST API

**Search for library:**
```bash
curl "https://context7.com/api/v2/libs/search?libraryName=react&query=hooks" \
  -H "Authorization: Bearer CONTEXT7_API_KEY"
```

**Get documentation:**
```bash
curl "https://context7.com/api/v2/context?libraryId=/facebook/react&query=useEffect" \
  -H "Authorization: Bearer CONTEXT7_API_KEY"
```

### 3. TypeScript SDK

```typescript
import { Context7 } from "@upstash/context7-sdk";

const client = new Context7();

// Search libraries
const libraries = await client.searchLibrary(
  "I need to build a UI with components",
  "react"
);

// Get docs
const context = await client.getContext(
  "How do I use hooks?",
  "/facebook/react"
);
```

### 4. OAuth (For MCP Clients Supporting It)

Change endpoint from `/mcp` to `/mcp/oauth`.

---

## Use Cases for Our Projects

### ❌ Grant Nexus - NOT A FIT

**Why it won't help:**
- Context7 is specifically for **code/library documentation**
- It indexes GitHub repos and official docs
- Grant information (SAM.gov, Grants.gov, foundations) is NOT in their index
- No mechanism to add non-code data sources

**What would help Grant Nexus instead:**
- RAG pipeline with grant database scraping
- Structured API integrations (SAM.gov API)
- Scheduled refresh of grant data into vector store

### ❌ Options Analyst - NOT A FIT

**Why it won't help:**
- Context7 doesn't handle real-time market data
- No integration with financial APIs
- Documentation ≠ live market data

**What would help Options Analyst instead:**
- Direct API integrations (IBKR, TD Ameritrade)
- Real-time data feeds
- Financial data RAG if analyzing historical patterns

### ✅ Moltbot/Claude Code - EXCELLENT FIT

**Perfect use case:**
- When Clawd writes code, Context7 ensures correct API usage
- Prevents hallucinating deprecated methods
- Especially valuable for fast-moving frameworks

**Recommended setup:**
```bash
# Add to Moltbot's Claude Code MCP config
claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key YOUR_API_KEY
```

**Usage pattern:**
```
"Create a Next.js middleware for auth. use context7"
```

Or add an auto-rule to CLAUDE.md:
```
Always use Context7 MCP when I need library/API documentation, 
code generation, setup or configuration steps without me having 
to explicitly ask.
```

---

## Setup Instructions (For Moltbot)

### 1. Get API Key

1. Go to https://context7.com/dashboard
2. Create account (GitHub OAuth available)
3. Generate API key (format: `ctx7sk...`)

### 2. Add MCP Server

**Option A: Local (runs npx each time):**
```bash
claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key ctx7sk_YOUR_KEY
```

**Option B: Remote (faster, no local process):**
```bash
claude mcp add --header "CONTEXT7_API_KEY: ctx7sk_YOUR_KEY" --transport http context7 https://mcp.context7.com/mcp
```

### 3. Test It

```
> Create a basic Express server with rate limiting. use context7
```

The agent should call `resolve-library-id` then `query-docs` and generate code grounded in current Express documentation.

### 4. Auto-Invoke (Optional)

Add to `CLAUDE.md` or equivalent:
```
## Code Generation Rule
When writing code that uses external libraries, automatically use 
Context7 to fetch current documentation. Don't hallucinate APIs.
```

---

## Supported Libraries

Context7 indexes 1000s of libraries. Popular ones include:
- React, Next.js, Vue, Svelte
- FastAPI, Django, Flask
- Playwright, Puppeteer
- tRPC, Prisma, Drizzle
- Tailwind, shadcn/ui
- Docker, Kubernetes
- And many more...

**Adding custom libraries:**
- Submit via https://context7.com/add-library
- Or add `context7.json` to your repo root

---

## Limitations

1. **Code docs only** - Not for general knowledge or non-code data
2. **Depends on source quality** - If library docs are poor, Context7 output is poor
3. **Community-contributed** - Not all docs verified for accuracy
4. **Latency** - ~15s average for doc retrieval (acceptable for coding, not real-time)
5. **Rate limits** - Free tier has limits; paid plans available

---

## Alternatives

- **docs-mcp-server** (arabold) - Open-source alternative
- **Manual RAG** - Build your own doc retrieval
- **llms.txt** - Standardized LLM-friendly doc format (Context7 generates these)

---

## Verdict

| Use Case | Fit | Recommendation |
|----------|-----|----------------|
| Coding assistance | ✅ Excellent | Integrate with Claude Code |
| Grant Nexus | ❌ None | Build custom RAG |
| Options Analyst | ❌ None | Direct API integrations |

**Bottom line:** Context7 is a must-have for coding workflows. It significantly reduces hallucinations when working with libraries. For our non-code projects (grants, finance), we need custom solutions—but those solutions could follow Context7's architecture pattern (parse → vectorize → rerank → serve).
