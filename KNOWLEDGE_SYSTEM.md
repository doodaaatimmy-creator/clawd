# KNOWLEDGE SYSTEM - Donny's Growth Engine

## Core Philosophy

Knowledge compounds. Every session, every research task, every build should leave a permanent trace that makes future work faster and smarter.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      DONNY KNOWLEDGE SYSTEM                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐           │
│  │   CAPTURE    │───▶│   PROCESS    │───▶│   RETRIEVE   │           │
│  └──────────────┘    └──────────────┘    └──────────────┘           │
│                                                                      │
│  Daily logs          Synthesize          Search + RAG                │
│  Session memory      Categorize          Vector similarity           │
│  Research notes      Link/graph          Context injection           │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Three-Tier Memory

### Tier 1: Ephemeral (Session)
**Location:** `memory/YYYY-MM-DD.md`
**Purpose:** Raw daily logs, conversations, discoveries
**Lifecycle:** Created each day, reviewed weekly

### Tier 2: Working (Project)
**Location:** `AGENTS.md` files scattered in repos
**Purpose:** Codebase-specific patterns, gotchas, learnings
**Lifecycle:** Updated during builds, persist with code

### Tier 3: Permanent (Long-term)
**Location:** `MEMORY.md` + `knowledge/` directory
**Purpose:** Distilled insights, recurring patterns, strategic knowledge
**Lifecycle:** Curated from Tier 1/2, reviewed monthly

---

## Knowledge Categories

### 1. Technical Patterns
- Code patterns that work
- Tool configurations
- Debugging solutions
- Performance optimizations

### 2. Domain Knowledge
- Options/trading concepts
- Higher ed / grants domain
- AI/ML developments
- Crypto/macro insights

### 3. People & Relationships
- Winn's preferences
- Key contacts
- Communication patterns
- Project stakeholders

### 4. Strategic Insights
- Business opportunities
- Market gaps
- Competitive intelligence
- Trend analysis

### 5. Operational Memory
- What tools are where
- API keys (by reference, not value)
- System configurations
- Workflow optimizations

---

## Capture Mechanisms

### Automatic
- [ ] Session transcripts → memory/YYYY-MM-DD.md
- [ ] Git commits → tracked in repo AGENTS.md
- [ ] Research outputs → knowledge/<topic>/
- [ ] Build learnings → progress.txt (Ralph)

### Manual Triggers
- `/log-session` skill → End-of-session summary
- `/synthesize-sessions` skill → Weekly consolidation
- `/knowledge-update` skill → Add specific insight

---

## Retrieval Mechanisms

### 1. Direct File Read
For known context:
```
Read MEMORY.md
Read memory/2026-01-28.md
```

### 2. Semantic Search (via memory_search tool)
For fuzzy recall:
```
memory_search("How did we set up the Gmail integration?")
```

### 3. Vector Embeddings (future)
Store embeddings of knowledge chunks in LanceDB for fast similarity search.

---

## Weekly Ritual

Every Sunday (or via cron):
1. Review `memory/*.md` from past week
2. Extract significant learnings
3. Update `MEMORY.md` with distilled insights
4. Archive or delete low-value daily logs
5. Update this document if system needs improvement

---

## MCP Integration Points

| MCP Server | Knowledge Use |
|------------|---------------|
| options-analyst | Market data → trading knowledge |
| tweet-vault | X insights → domain knowledge |
| grant-forge | Higher ed patterns → domain knowledge |
| filesystem | Read/write knowledge files |
| memory (custom) | Vector search over knowledge base |

---

## Growth Metrics

Track these to measure knowledge system health:
- Number of MEMORY.md entries
- memory_search recall accuracy
- Time-to-answer for recurring questions
- Build speed improvement over time

---

## Status: IMPLEMENTING

- [x] Daily memory files (memory/YYYY-MM-DD.md)
- [x] memory_search tool available
- [x] MEMORY.md structure
- [x] Chezmoi sync for skills
- [ ] Vector embeddings for knowledge
- [ ] Automated weekly synthesis
- [ ] MCP server for knowledge queries
