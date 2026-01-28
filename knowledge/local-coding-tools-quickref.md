# Local Coding Tools Quick Reference

*Installed: 2026-01-28*

## 🔧 Tools Installed

### 1. Aider (Local Code Assistant)
```bash
# With DeepSeek Coder (recommended)
aider --model ollama/deepseek-coder:6.7b --no-show-model-warnings

# Quick test
aider --model ollama/deepseek-coder:6.7b -m "create a hello world python file"
```

### 2. SERA CLI (Claude Code with Open Models)
```bash
# Add to PATH first
source ~/.local/bin/env

# Option A: Deploy to Modal (cloud GPUs, ~10min first run)
modal setup  # One-time account setup
sera --modal

# Option B: Use existing vLLM endpoint
export SERA_API_KEY=<key>
sera --endpoint <url>

# Team deployment (persistent)
deploy-sera --model allenai/SERA-32B
# Then share endpoint URL + API key with team
```

### 3. RightSize CLI (Model Benchmarking)
```bash
# Add to PATH
export PATH="$HOME/.local/bin:$PATH"

# Benchmark a prompt against multiple models
rightsize benchmark --prompt "Summarize this text" --models gpt-4o,claude-sonnet,deepseek

# List available models
rightsize models
```

### 4. llm CLI (Quick Local Queries)
```bash
# Simple query
llm -m llama3.2 "explain this error"

# With file context
cat error.log | llm -m llama3.2 "what went wrong?"

# Interactive chat
llm chat -m llama3.2
```

---

## 📊 Model Selection Guide

| Task Type | Recommended Model | Why |
|-----------|-------------------|-----|
| File scaffolding | `ollama/deepseek-coder:6.7b` | Free, follows edit format |
| Simple code edits | Aider + deepseek-coder | Structured editing |
| Complex reasoning | Claude Sonnet/Opus | Best quality |
| Cost optimization | RightSize benchmark | Find cheapest that works |
| Claude Code fallback | SERA --modal | Open 32B model |

---

## 🎯 Token-Saving Strategy

**Tier 1 - Free (Local)**
- Aider + deepseek-coder for code tasks
- llm CLI for quick questions
- Use for: scaffolding, boilerplate, simple refactors

**Tier 2 - Cheap (API)**
- DeepSeek Chat API (~$0.07/1M tokens)
- Use RightSize to find cheapest model per task

**Tier 3 - Premium (Claude)**
- Reserve for: complex reasoning, multi-step planning, personality
- Moltbot main sessions

---

## 🚀 Tomorrow's Experiments

1. [ ] Run RightSize benchmark on common task types
2. [ ] Test SERA --modal for Claude Code replacement
3. [ ] Build routing table: task → cheapest model
4. [ ] Try Aider in Moltbot workflow for code tasks

---

## PATH Setup (add to ~/.zshrc)

```bash
export PATH="$HOME/.local/bin:$PATH"
source $HOME/.local/bin/env
```

---

*Created by Donny 🦾*
