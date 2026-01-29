# Local AI Tools — When Claude Opus Runs Out

## 🟢 Ready Now: `llm` CLI with Ollama

Simon Willison's `llm` tool is installed and working with your local models.

### Quick Start
```bash
# Add to PATH (add to ~/.zshrc for permanent)
export PATH="$HOME/.local/bin:$PATH"

# Chat with llama3.2
llm -m llama3.2 "explain this code" < file.py

# Interactive chat
llm chat -m llama3.2

# Continue a conversation
llm -c "follow up question"

# System prompt
llm -m llama3.2 -s "You are a senior Python developer" "review this code"
```

### With Files
```bash
# Pipe file content
cat main.py | llm -m llama3.2 "review this code for bugs"

# Multiple files
cat *.py | llm -m llama3.2 "summarize what this project does"
```

### Available Models
- `llama3.2` — 3.2B params, fast, good for most tasks
- `qwen3:4b` — 4B params (has thinking issues, use llama3.2)

### Pull More Models
```bash
ollama pull codellama      # Code-specific
ollama pull deepseek-coder # DeepSeek coder
ollama pull mistral        # Good all-rounder
```

---

## 🟢 Ready Now: Aider (v0.86.1)

Aider is the community favorite for AI coding. Once installed:

```bash
# Use with Ollama
aider --model ollama/llama3.2

# Edit specific files
aider --model ollama/llama3.2 main.py utils.py

# Watch mode (auto-add files with # AI: comments)
aider --model ollama/llama3.2 --watch
```

---

## 🔧 Quick Script: Interactive Code Helper

Save this as `~/bin/code-help`:

```bash
#!/bin/bash
# Interactive code helper with local LLM

MODEL="${LLM_MODEL:-llama3.2}"
export PATH="$HOME/.local/bin:$PATH"

if [ -n "$1" ]; then
    # File mode: analyze a file
    cat "$1" | llm -m $MODEL -s "You are a senior developer. Be concise." "Review this code. Identify bugs, suggest improvements:"
else
    # Interactive mode
    llm chat -m $MODEL -s "You are a senior developer helping with code. Be concise and practical."
fi
```

Make executable: `chmod +x ~/bin/code-help`

Usage:
- `code-help` — Interactive chat
- `code-help main.py` — Review a file

---

## 📊 Model Recommendations

| Task | Model | Why |
|------|-------|-----|
| Quick questions | llama3.2 | Fast, capable |
| Code review | codellama | Code-specialized |
| Complex reasoning | deepseek-coder | Best open coder |
| General chat | mistral | Good all-rounder |

---

## 💡 Pro Tips

1. **Smaller context = faster**: Local models are slower, keep prompts focused
2. **System prompts help**: Always tell it what kind of expert to be
3. **Pipe > paste**: Use shell pipes for file content
4. **llm logs everything**: Check history with `llm logs`

---

*Created by Donny 🦾 — Jan 28, 2026*
