# Personal Private Programmable

> "There is an upcoming tech stack here that I'm calling personal private programmable."  
> — Balaji Srinivasan

## The Concept

Balaji Srinivasan coined the term **"Personal Private Programmable"** (PPP) to describe an emerging tech stack for AI-native knowledge work. While direct documentation of the original tweet is limited, the concept aligns with a broader movement in 2024-2026 toward:

- **Personal**: Your AI, trained on your data, serving your goals
- **Private**: Local-first, data never leaves your machine unless you choose
- **Programmable**: Customizable via code, prompts, skills, and workflows

This represents a fundamental shift from cloud-dependent SaaS to **sovereign AI infrastructure**.

---

## Why This Matters

### The Problem with Cloud AI

Traditional AI tools (ChatGPT, Notion AI, etc.) share common issues:

1. **No Memory**: Every conversation starts fresh
2. **No Context**: The AI doesn't know your goals, preferences, or history
3. **No Ownership**: Your data lives on company servers
4. **No Privacy**: Your thoughts are processed remotely, potentially used for training
5. **Vendor Lock-in**: Proprietary formats trap your knowledge

### The PPP Solution

A Personal Private Programmable stack inverts this:

| Cloud AI | PPP Stack |
|----------|-----------|
| Stateless | Persistent memory |
| Generic | Personalized to you |
| Cloud-dependent | Local-first |
| Data hostage | Data sovereign |
| Subscription forever | One-time or self-hosted |

---

## The Emerging Tech Stack

### Core Components

#### 1. Local Knowledge Base (Obsidian, SiYuan, etc.)
- Markdown files on your machine
- Bidirectional links for knowledge graphs
- Full-text search across thousands of notes
- Plugin ecosystem for customization

#### 2. AI Agent Framework (Claude Code, PAI, etc.)
- Agentic capabilities: read/write files, execute commands
- Persistent context via CLAUDE.md / AGENTS.md
- Skills system for reusable workflows
- Memory systems for continuous learning

#### 3. Bridge Protocol (MCP)
- **Model Context Protocol** connects AI to local tools
- Standardized interface for file operations, search, metadata
- Local REST APIs enable secure communication
- No data upload — everything stays on your device

---

## Key Tools & Projects

### Obsidian + Claude Integration

Several projects enable Claude to work directly with Obsidian vaults:

#### [obsidian-mcp-server](https://github.com/cyanheads/obsidian-mcp-server)
- Full MCP server for Obsidian vault access
- Tools: read, write, search, manage tags/frontmatter
- Uses Obsidian Local REST API plugin
- Works with Claude Desktop and Claude Code

#### [obsidian-claude-code-mcp](https://github.com/iansinnott/obsidian-claude-code-mcp)
- Dual transport: WebSocket (Claude Code) + HTTP/SSE (Claude Desktop)
- Auto-discovery for vault connection
- File operations through MCP protocol
- Multiple client support

#### [obsidian-claude](https://github.com/ZanderRuss/obsidian-claude)
- 31 commands, 27 agents, 19 AI skills
- PARA method organization
- Research workflow automation
- Dashboard with live vault metrics

### MCP Tools Plugin (Obsidian)
- Direct bridge between Claude and Obsidian
- Requires: Local REST API plugin
- Optional: Smart Connections (semantic search), Templater
- Security: Local only, encrypted, no data upload

### Daniel Miessler's PAI (Personal AI Infrastructure)
[GitHub: danielmiessler/Personal_AI_Infrastructure](https://github.com/danielmiessler/Personal_AI_Infrastructure)

A comprehensive framework for personalized AI:

**Core Principles:**
1. User Centricity — built around your goals, not tooling
2. The Foundational Algorithm — Observe → Think → Plan → Build → Execute → Verify → Learn
3. Scaffolding > Model — architecture matters more than which model
4. UNIX Philosophy — do one thing well, composable tools

**Key Primitives:**
- **TELOS**: 10 files capturing who you are (MISSION.md, GOALS.md, etc.)
- **User/System Separation**: Your customizations survive upgrades
- **Skill System**: Deterministic workflows (Code → CLI → Prompt → Skill)
- **Memory System**: Three-tier (hot/warm/cold) with continuous learning
- **Agent Personalities**: Specialized agents with unique voices

### Local-First Second Brain Tools

The "second brain" movement (Tiago Forte, Zettelkasten) is merging with local AI:

- **Obsidian**: Local markdown, knowledge graph, 1500+ plugins
- **SiYuan**: Open-source, MCP-compatible, block-based
- **Logseq**: Outliner-style, local-first, open source
- **LocArk**: Privacy-first PKM with AES-256 encryption
- **Anytype**: Self-hosted, encrypted, "digital sovereignty"

---

## How This Applies to Moltbot

Moltbot already embodies many PPP principles:

### What We Have

| PPP Principle | Moltbot Implementation |
|---------------|------------------------|
| Personal | SOUL.md, MEMORY.md, USER.md — identity and preferences |
| Private | Local workspace, files on your machine |
| Programmable | Skills, hooks, cron, HEARTBEAT.md |
| Memory | Daily notes (memory/YYYY-MM-DD.md), long-term MEMORY.md |
| Context | AGENTS.md, TOOLS.md loaded per session |

### Opportunities

#### 1. Obsidian Integration
- Add obsidian-mcp-server or similar to Moltbot
- Enable direct vault access from Moltbot sessions
- Semantic search across knowledge base
- Auto-organize notes based on conversations

#### 2. Enhanced Memory System
Inspired by PAI's three-tier memory:
- **Hot**: Current session context
- **Warm**: Recent daily notes (loaded on startup)
- **Cold**: MEMORY.md, archived knowledge (loaded on demand)

#### 3. TELOS-style Goal Tracking
Add structured files for:
- `GOALS.md` — what you're working toward
- `PROJECTS.md` — active work with deadlines
- `BELIEFS.md` — worldview and values
- `LEARNED.md` — lessons and insights

#### 4. Skill Library Expansion
Build reusable skills for common workflows:
- Research → summarize → file to vault
- Capture → categorize → connect (PARA method)
- Review → distill → update long-term memory

#### 5. Knowledge Graph
- Track connections between notes
- Surface related context automatically
- Identify knowledge gaps

---

## The AI-Native Philosophy Alignment

From our AGENTS.md principles:

> "This folder is home. Treat it that way."

The PPP concept reinforces this:
- Your workspace IS your second brain
- Files ARE your memory
- The AI IS your thinking partner
- Everything stays local, private, programmable

### Design Principles

1. **Local First**: Data never leaves unless you send it
2. **Markdown Everything**: Future-proof, portable, grep-able
3. **Sovereign Identity**: You define who the AI is to you
4. **Continuous Learning**: Every interaction improves the system
5. **Human Amplification**: AI magnifies capabilities, doesn't replace agency

---

## Implementation Roadmap

### Phase 1: Foundation (Current)
- [x] Local workspace with AGENTS.md, SOUL.md, etc.
- [x] Daily memory system (memory/YYYY-MM-DD.md)
- [x] Long-term memory (MEMORY.md)
- [x] Skill/hook system via Moltbot

### Phase 2: Knowledge Integration
- [ ] Add Obsidian MCP server
- [ ] Configure vault connection
- [ ] Test read/write operations
- [ ] Enable semantic search

### Phase 3: Enhanced Memory
- [ ] Implement three-tier memory system
- [ ] Auto-summarize sessions to daily notes
- [ ] Periodic distillation to MEMORY.md
- [ ] Knowledge graph tracking

### Phase 4: TELOS System
- [ ] Create goal/project tracking files
- [ ] Daily/weekly review workflows
- [ ] Progress tracking and surfacing
- [ ] Automated goal alignment checks

---

## Resources

### GitHub Projects
- [obsidian-mcp-server](https://github.com/cyanheads/obsidian-mcp-server) — Full MCP bridge
- [obsidian-claude-code-mcp](https://github.com/iansinnott/obsidian-claude-code-mcp) — Claude Code plugin
- [obsidian-claude](https://github.com/ZanderRuss/obsidian-claude) — PARA method integration
- [Personal_AI_Infrastructure](https://github.com/danielmiessler/Personal_AI_Infrastructure) — Daniel Miessler's PAI

### Articles & Guides
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) — Anthropic
- [Using CLAUDE.md Files](https://claude.com/blog/using-claude-md-files) — Official guide
- [Privacy-First Knowledge Management 2025](https://locark.com/privacy-first-knowledge-management-2025/) — LocArk
- [Connect Claude AI with Obsidian](https://dev.to/sroy8091/connect-claude-ai-with-obsidian-a-game-changer-for-knowledge-management-25o2) — Dev.to

### Discussions
- [Reddit: MCP + Obsidian](https://www.reddit.com/r/ClaudeAI/comments/1hdl0cl/mind_blown_mcp_obsidian/) — User experiences
- [Reddit: Claude MCP Integration](https://www.reddit.com/r/ObsidianMD/comments/1kln9w9/claude_mcp_integration_optimizing_ai_integration/) — Optimization tips

---

## Key Takeaway

The "Personal Private Programmable" stack isn't just a technical architecture — it's a philosophy:

> **Your AI should know you, serve your goals, stay on your machine, and be fully customizable.**

Moltbot is already positioned in this space. The next evolution is deeper integration with local knowledge bases (Obsidian), enhanced memory systems (PAI-inspired), and more sophisticated goal tracking (TELOS).

The future is local-first, privacy-respecting AI that amplifies human capabilities rather than replacing them.

---

*Research compiled: 2026-01-28*  
*Related: AI-native workflows, second brain methodology, sovereign computing*
