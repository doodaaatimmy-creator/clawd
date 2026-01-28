# x-scout - Local LLM Feed Analyzer

Token-efficient X/social feed analysis using local Ollama models.

## Why?

Opus tokens are expensive. Use local models for grunt work:
- **Filtering** — Is this post relevant? (yes/no)
- **Summarizing** — What's the key point?
- **Triaging** — What deserves attention?

Save Opus for judgment calls, writing, complex decisions.

## Install

```bash
# Already linked to ~/bin/x-scout
# Or manually:
ln -sf /Users/clawdchad/clawd/tools/local-scout/x-scout ~/bin/
```

## Usage

```bash
# Analyze a saved timeline
x-scout digest timeline.txt

# Filter for relevant posts
x-scout filter timeline.txt

# Summarize content
x-scout summarize article.txt

# Quick research (note: limited by model knowledge cutoff)
x-scout research "What is LangGraph"
```

## Configuration

```bash
export SCOUT_MODEL=llama3.2           # or qwen2.5-coder:14b for better quality
export SCOUT_TOPICS="AI, trading"     # topics to filter for
```

## Integration with Moltbot

Workflow for X check-ins:
1. Browser relay saves timeline to file
2. `x-scout digest timeline.txt` runs locally
3. Opus sees only the digest (5-10 posts, not 50+)
4. 80%+ token reduction

## Models

| Model | Speed | Quality | Best For |
|-------|-------|---------|----------|
| llama3.2 (3B) | Fast | Good | Filtering, quick summaries |
| qwen2.5-coder:14b | Slow | Better | Complex analysis, research |

## Limitations

- Local models have knowledge cutoffs (may not know recent tools)
- Slower than API models
- Quality varies by task complexity

## Research Findings

From building this:
- **CrewAI + Ollama** — Popular combo for local agents
- **LangGraph + Ollama** — Better for stateful workflows
- **Key insight**: Tighten task scope, shorten prompts for local models
