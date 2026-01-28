# Aider + Local Model Optimization Guide

*Research Date: 2026-01-28*

## 🎯 TL;DR — Quick Wins

1. **Use `ollama_chat/` prefix** (not `ollama/`)
2. **Increase context window** — Ollama defaults to 2k (way too small)
3. **Get a better model** — `qwen2.5-coder:32b` or `deepseek-coder-v2`
4. **Create custom Aider settings** for your model
5. **Use diff edit format** for capable models

---

## 📊 Best Local Models for Aider (by benchmark)

| Model | Aider Score | Size | Notes |
|-------|-------------|------|-------|
| **Qwen2.5-Coder-32B-Instruct** | 16.4% | ~20GB | Best open-source for Aider |
| DeepSeek-Coder-V2 | ~15% | ~16GB | Good balance |
| Codestral 25.01 | 11.1% | ~14GB | Mistral's coder |
| deepseek-coder:6.7b (current) | ~5-8% | 3.8GB | Works but limited |

**Recommendation:** Pull `qwen2.5-coder:32b` if you have RAM, or `qwen2.5-coder:14b` for balance.

```bash
# Best option (needs ~20GB RAM)
ollama pull qwen2.5-coder:32b-instruct-q4_K_M

# Good balance (needs ~10GB RAM)  
ollama pull qwen2.5-coder:14b

# Lightweight alternative
ollama pull qwen2.5-coder:7b
```

---

## ⚙️ Configuration Optimizations

### 1. Increase Context Window (CRITICAL)

Ollama defaults to **2048 tokens** — Aider needs much more.

**Option A: Environment Variable**
```bash
# Set before running ollama serve
export OLLAMA_CONTEXT_LENGTH=16384  # or 32768 for 32k

# Then run aider
aider --model ollama_chat/qwen2.5-coder:32b
```

**Option B: Aider Config File**

Create `~/.aider.model.settings.yml`:
```yaml
- name: ollama_chat/qwen2.5-coder:32b
  edit_format: diff
  use_repo_map: true
  extra_params:
    num_ctx: 32768
    
- name: ollama_chat/deepseek-coder:6.7b
  edit_format: whole  # smaller models need 'whole' format
  use_repo_map: false  # disable for small context
  extra_params:
    num_ctx: 8192
```

### 2. Edit Format Selection

| Model Size | Recommended Format | Why |
|------------|-------------------|-----|
| <7B | `whole` | Can't reliably do diffs |
| 7B-14B | `whole` or `diff` | Test both |
| 14B+ | `diff` | More efficient, works well |
| 32B+ | `diff` | Best results |

```bash
# Force edit format
aider --model ollama_chat/qwen2.5-coder:7b --edit-format whole
```

### 3. Use Repo Map for Large Codebases

```bash
# Enable repo map (helps model understand project structure)
aider --model ollama_chat/qwen2.5-coder:32b --map-tokens 2048
```

---

## 🔧 Ollama Model Customization

### Create Optimized Modelfile

```bash
# Create custom coding model
cat > /tmp/CodeAssistant.Modelfile << 'EOF'
FROM qwen2.5-coder:14b

# Increase context
PARAMETER num_ctx 16384

# Lower temperature for more precise code
PARAMETER temperature 0.2

# Stop sequences for clean output
PARAMETER stop "<|endoftext|>"
PARAMETER stop "```"

# Optimized system prompt for Aider
SYSTEM """You are an expert AI programming assistant. You MUST:
1. Follow the edit format EXACTLY as specified
2. Include the full file path before code blocks
3. Only output the requested changes, nothing extra
4. Use precise, working code

When editing files, use this format:
path/to/file.py
```python
<complete file contents>
```"""
EOF

# Create the model
ollama create code-assistant -f /tmp/CodeAssistant.Modelfile
```

Then use it:
```bash
aider --model ollama_chat/code-assistant
```

### Key Parameters to Tune

| Parameter | Default | Recommended | Effect |
|-----------|---------|-------------|--------|
| `num_ctx` | 2048 | 8192-32768 | Context window size |
| `temperature` | 0.8 | 0.1-0.3 | Lower = more precise |
| `top_p` | 0.9 | 0.9 | Keep default |
| `repeat_penalty` | 1.1 | 1.0 | Disable for code |
| `num_predict` | 128 | -1 | Unlimited output |

---

## 🏗️ Architect Mode (Best for Complex Tasks)

Use a reasoning model for planning + editing model for implementation:

```bash
# Local architect mode (if you have 2 models)
aider --architect \
  --model ollama_chat/qwen2.5-coder:32b \
  --editor-model ollama_chat/qwen2.5-coder:14b
```

Or mix local + API:
```bash
# DeepSeek R1 for reasoning (cheap API) + local for editing
aider --architect \
  --model deepseek/deepseek-reasoner \
  --editor-model ollama_chat/qwen2.5-coder:14b
```

---

## 📁 Complete Setup Example

### Step 1: Pull Better Model
```bash
ollama pull qwen2.5-coder:14b  # ~8GB download
```

### Step 2: Create Aider Config
```bash
mkdir -p ~/.config/aider
cat > ~/.aider.model.settings.yml << 'EOF'
- name: ollama_chat/qwen2.5-coder:14b
  edit_format: diff
  use_repo_map: true
  extra_params:
    num_ctx: 16384
    temperature: 0.2

- name: ollama_chat/qwen2.5-coder:7b
  edit_format: whole
  use_repo_map: false
  extra_params:
    num_ctx: 8192
    temperature: 0.2

- name: ollama_chat/deepseek-coder:6.7b
  edit_format: whole
  use_repo_map: false
  extra_params:
    num_ctx: 8192
EOF
```

### Step 3: Create Shell Alias
```bash
# Add to ~/.zshrc
alias aider-local='OLLAMA_CONTEXT_LENGTH=16384 aider --model ollama_chat/qwen2.5-coder:14b --no-show-model-warnings'
alias aider-fast='aider --model ollama_chat/qwen2.5-coder:7b --no-show-model-warnings --edit-format whole'
```

### Step 4: Test
```bash
source ~/.zshrc
aider-local
```

---

## 🚨 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "LLM did not conform to edit format" | Model too small or wrong format | Use `--edit-format whole` |
| Truncated responses | Context too small | Increase `num_ctx` |
| Slow responses | Model too large for RAM | Use smaller quantization or model |
| Hallucinated file paths | No repo map | Enable `--map-tokens 1024` |

---

## 💡 Pro Tips

1. **Start small, scale up**: Test with 7B, then try 14B, then 32B
2. **Use `/ask` mode first**: Discuss before editing to avoid failed edits
3. **Keep context focused**: Add only files you're working on
4. **Check `/tokens`**: Monitor token usage to avoid truncation
5. **Use `--dry-run`**: Preview changes before applying

---

## 📈 Upgrade Path

**Current:** deepseek-coder:6.7b (3.8GB, ~5-8% benchmark)

**Recommended upgrades:**
1. `qwen2.5-coder:7b` — Better format following, similar size
2. `qwen2.5-coder:14b` — Significant quality jump, ~8GB
3. `qwen2.5-coder:32b-instruct-q4_K_M` — Best local, ~20GB

---

*Created by Donny 🦾*
