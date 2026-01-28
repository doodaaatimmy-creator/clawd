# Plandex Analysis

**Stars:** ~15K | **Repo:** [plandex-ai/plandex](https://github.com/plandex-ai/plandex)

## 1. How Does It Achieve 2M Token Context?

Plandex uses a **multi-layered context management system**:

- **Direct context:** Handles up to 2M tokens with default model pack (~100k per file max)
- **Tree-sitter project maps:** Can index projects with 20M+ tokens by generating fast syntax maps for 30+ languages
- **Smart loading:** Only loads what's needed for each step (not everything at once)
- **Context caching:** Uses caching across OpenAI, Anthropic, and Google models to reduce cost/latency

Essentially: It's not stuffing 2M tokens into a single prompt. It intelligently indexes large codebases and loads relevant portions on-demand.

## 2. Key Features vs Claude Code

| Feature | Plandex | Claude Code |
|---------|---------|-------------|
| **Context** | 2M tokens (indexed), 20M+ via maps | ~200K native |
| **Sandbox** | Cumulative diff review sandbox | Direct file edits |
| **Version Control** | Built-in branching for plans | Git-based |
| **Models** | Multi-provider (Anthropic, OpenAI, Google, open source) | Claude only |
| **Autonomy** | Configurable (full auto → fine control) | Agentic with guardrails |
| **Browser Debug** | Auto-debug with Chrome | Via MCP/tools |
| **Hosting** | Self-hosted/local (Docker) | Anthropic hosted |

**Plandex differentiators:**
- Diff sandbox keeps AI changes isolated until reviewed
- Plan version control with branches
- Multi-model support (mix providers in one workflow)

**Claude Code differentiators:**
- Native Claude integration, latest models immediately
- Simpler setup (just API key)
- Tighter Anthropic ecosystem integration

## 3. When Would You Use Plandex?

**Use Plandex when:**
- Working on **very large codebases** (100k+ lines) where context is a bottleneck
- You want **strict change isolation** (diff sandbox before applying)
- You need to **compare different models** on the same task
- You prefer **self-hosted** solutions
- You want **plan branching** to explore multiple approaches

**Use Claude Code when:**
- You want tight Anthropic model integration
- Simpler setup is preferred
- You're already in the Anthropic ecosystem
- Codebase fits comfortably in Claude's native context

---

*Plandex is particularly strong for "enterprise-scale" codebases where other AI tools struggle with context limits. The sandbox approach is great for cautious, reviewable changes.*
