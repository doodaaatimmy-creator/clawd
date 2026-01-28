# Anthropic Context Engineering Guide

> **Source**: Official Anthropic engineering blog + Chroma research + AWS re:Invent 2025 talks
> **Last Updated**: 2026-01-28
> **Status**: Comprehensive summary

## What is Context Engineering?

**Definition**: The art and science of curating what goes into an LLM's limited context window from a constantly evolving universe of possible information.

Context engineering is the natural progression of prompt engineering:
- **Prompt engineering** = writing effective instructions
- **Context engineering** = curating the *entire* context state (system prompts, tools, MCP, external data, message history, etc.)

> "Good context engineering means finding the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome."
> — Anthropic Engineering

---

## The Core Problem: Context Rot

### What is Context Rot?

Research by Chroma demonstrated that **as the number of tokens in the context window increases, the model's ability to accurately recall information decreases**.

This isn't a cliff—it's a gradient. Models remain capable at longer contexts but show reduced precision for:
- Information retrieval
- Long-range reasoning
- Semantic matching (vs lexical matching)

### Why Does This Happen?

1. **Attention Budget Scarcity**: Transformers use n² pairwise attention relationships. More tokens = thinner attention spread.

2. **Training Data Distribution**: Models trained on shorter sequences more frequently, so they have less experience with long-range dependencies.

3. **Position Encoding Interpolation**: Techniques that extend context length work by adapting to smaller trained contexts, with some degradation.

### Four Types of Context Degradation

| Type | Description |
|------|-------------|
| **Context Poisoning** | Incorrect/outdated info pollutes reasoning |
| **Context Distraction** | Irrelevant info reduces focus on key data |
| **Context Confusion** | Similar but distinct info gets mixed up |
| **Context Clash** | Contradictory info—model doesn't know which to trust |

### Key Research Finding

The Chroma study found that even simple tasks degrade with context length:
- Lower similarity question-answer pairs degrade faster
- Distractors have non-uniform impact that amplifies with length
- Haystack structure affects performance (shuffled text performs *better* than structured—counterintuitive!)

---

## The Four Pillars of Context Engineering

### 1. System Prompts

**Goal**: Minimal, precise instructions at the "right altitude"

**Two failure modes to avoid**:
- **Too rigid**: Hardcoded if-else logic, brittle, high maintenance
- **Too vague**: High-level guidance that falsely assumes shared context

**Best practices**:
- Use structured sections (XML tags, Markdown headers)
- Start minimal with the best model, then add based on failure modes
- Be specific enough to guide, flexible enough to provide heuristics
- Minimal ≠ short—include sufficient info for desired behavior

### 2. Tools

**Goal**: Token-efficient, non-overlapping, self-contained tools

**Key principles**:
- Each tool should have a clear, unambiguous purpose
- If a human engineer can't definitively choose which tool to use, neither can the AI
- Single action per tool works better
- Avoid nested parameters beyond one level
- Include examples of expected input/output
- Test your tools!

**Common failure**: Bloated tool sets with overlapping functionality

### 3. Data Retrieval

**Paradigm shift**: Pre-loaded RAG → Just-In-Time (JIT) retrieval

| Strategy | Description |
|----------|-------------|
| **Lightweight identifiers** | Pass IDs, not objects. Agent requests details when needed |
| **Progressive disclosure** | Start with summaries, drill down as needed |
| **Autonomous exploration** | Provide discovery tools, not data dumps |

**Example**: Claude Code uses file paths, `head`, `tail`, `grep`, `glob` instead of loading entire codebases.

> "Don't send the whole library—send a librarian."

**The hybrid approach**: Pre-load some data for speed (like CLAUDE.md), allow autonomous exploration for the rest.

### 4. Long-Horizon Optimizations

Three strategies for extended tasks:

#### Compaction
- Summarize conversation near context limit
- Reinitialize with compressed context
- Preserve: architectural decisions, unresolved bugs, key details
- Discard: redundant tool outputs, resolved conversations
- **Lightest touch**: Tool result clearing (once called deep in history, raw result unnecessary)

#### Structured Note-Taking
- Agent writes notes persisted outside context
- Notes pulled back in when relevant
- Examples: `NOTES.md`, `TODO.md`, progress tracking files

**Claude playing Pokémon example**: Maintains tallies across thousands of steps, strategic notes, explored region maps—all in external memory.

#### Sub-Agent Architectures
- Specialized sub-agents handle focused tasks with clean context
- Main agent coordinates with high-level plan
- Sub-agents may use 10,000+ tokens but return 1,000-2,000 token summaries
- Clear separation: detailed search context stays in sub-agents

**When to use which**:
- **Compaction**: Extensive back-and-forth conversations
- **Note-taking**: Iterative development with clear milestones
- **Multi-agent**: Complex research requiring parallel exploration

---

## Skills System

Skills are folders of instructions, scripts, and resources that Claude dynamically discovers and loads.

### Structure

```
skill_name/
├── SKILL.md      # Main entry with YAML frontmatter
├── reference.md  # Detailed reference
└── examples/     # Examples and scripts
```

### SKILL.md Format

```yaml
---
name: pdf
description: Comprehensive PDF toolkit for extracting text and tables,
  merging/splitting documents, and filling out forms.
---

## Overview
This guide covers essential PDF processing operations...

## Quick Start
```python
from pypdf import PdfReader
```

## Workflows
When creating presentations, read `./slide-decks.md`
```

### Best Practices

**Naming**:
- Use gerund-style: `processing-pdfs`, `analyzing-spreadsheets`
- Avoid vague names: `helper`, `utils`

**Organization**:
- Keep SKILL.md under 500 lines
- Split into separate files as needed
- Single depth references (avoid nested file chains)

**Content**:
- Consistent terminology
- Concrete input/output examples
- Show the behavior you want to encourage

---

## Sub-Agent Configuration

### Description Field is Critical

Sub-agent descriptions control auto-invocation:
```
"Use PROACTIVELY when code changes might impact performance. 
MUST BE USED for optimization tasks."
```

### Tool Permissions

Restrict tools to what each sub-agent needs:
- Code reviewer gets: `Read`, `Grep`, `Glob`
- Code reviewer does NOT get: `Write`, `Edit`

### Model Selection

- `inherit` = match main conversation for consistency
- Specify `sonnet`, `opus`, `haiku` for specific needs
- Default: `sonnet`

### Orchestration Best Practices

- When context clears, consider restarting vs compressing
- Be prescriptive about how to start
- Provide verification tools (agents need to verify correctness without constant human feedback)

---

## Applying to Our Sub-Agent Architecture

### Moltbot-Specific Recommendations

1. **Keep sub-agent context fresh**
   - Each sub-agent starts with clean context
   - Only essential info from parent passed through task description
   - Return condensed results, not full traces

2. **Use AGENTS.md as lightweight identifiers**
   - Don't load full project history into sub-agents
   - Reference file paths, let sub-agent read what's needed

3. **Progressive disclosure in skills**
   - Main SKILL.md stays lean
   - Sub-files loaded on demand
   - Sub-agents can explore skill directories autonomously

4. **Memory hierarchy**
   - `memory/YYYY-MM-DD.md` = daily raw logs
   - `MEMORY.md` = curated long-term (main agent only)
   - Sub-agents don't load `MEMORY.md` (isolation + security)

5. **Compaction strategy**
   - Main agent manages conversation compaction
   - Sub-agents are short-lived, fresh context each spawn
   - Results from sub-agents already compressed

6. **Avoid context clash**
   - Don't mix conflicting instructions in same context
   - Clear separation: main agent vs sub-agent responsibilities
   - Use explicit task boundaries

---

## Key Takeaways

1. **Context is the bottleneck, not intelligence.** Claude is smart enough—give it the right context.

2. **Treat context as finite resource.** Every token competes for attention budget.

3. **JIT > preloading.** Load what you need when you need it.

4. **Structure matters.** How you organize context affects performance.

5. **Minimal viable tools.** Each tool must justify its existence.

6. **Sub-agents = clean slate.** Use them to avoid context pollution in long tasks.

7. **Write it down.** External memory > stuffing everything in context.

8. **Test your context engineering.** Evaluate real tasks, iterate on failures.

---

## References

- [Anthropic: Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Chroma Research: Context Rot](https://research.trychroma.com/context-rot)
- [Anthropic: Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)
- [Anthropic: Claude Code](https://www.anthropic.com/claude-code)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [AWS re:Invent 2025 Talk Notes](https://01.me/en/2025/12/context-engineering-from-claude/)
