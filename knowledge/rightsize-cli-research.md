# RightSize CLI Research

**Date:** 2026-01-28  
**Source:** https://github.com/NehmeAILabs/rightsize-cli

## What It Does

RightSize CLI is a benchmarking tool that helps find the **cheapest LLM that still works** for your specific task. Instead of defaulting to expensive frontier models, it tests your prompts against 200+ models via OpenRouter to identify cost-effective alternatives.

Key tagline: *"The Biggest Model for Every Task? That's Just Lazy."*

### Core Functionality
- Benchmarks prompts against multiple LLMs in parallel
- Uses an "LLM-as-Judge" pattern to score outputs against expected results
- Reports cost, accuracy, and latency for each model
- Calculates savings compared to a baseline model

## How It Optimizes Model Selection

### The Process
1. **You provide test cases** - CSV with inputs and expected outputs
2. **Candidate models compete** - All models run the same prompts in parallel via OpenRouter
3. **LLM-as-Judge scores** - A judge model (e.g., Claude, Gemini) compares outputs to expected results
4. **Results displayed** - Cost per 1k requests, accuracy %, latency (p95), and savings vs baseline

### Scoring System
The judge model scores each output:
- **1.0** - Exact or semantic match
- **0.8** - Very close with minor differences
- **0.5** - Partially correct
- **0.0** - Wrong or irrelevant

### Example Output
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━┓
┃ Model                       ┃ Accuracy ┃ Latency (p95) ┃ Cost/1k  ┃ Savings  ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━┩
│ google/gemma-3-12b-it       │ 71.0%    │ 4200ms        │ $0.0028  │ +93.7%   │
│ deepseek/deepseek-chat-v3.1 │ 95.0%    │ 800ms         │ $0.0180  │ +60.0%   │
│ google/gemini-2.5-flash     │ 100.0%   │ 1900ms        │ $0.0450  │ —        │
└─────────────────────────────┴──────────┴───────────────┴──────────┴──────────┘
```

## Installation

```bash
# Using pip
pip install rightsize-cli

# Using uv
uv pip install rightsize-cli

# Run without installing (uvx)
uvx rightsize-cli models
```

### Configuration
Set your OpenRouter API key:
```bash
export RIGHTSIZE_OPENROUTER_API_KEY="sk-or-..."
```

Or use a `.env` file with:
- `RIGHTSIZE_OPENROUTER_API_KEY` (required)
- `RIGHTSIZE_MAX_CONCURRENCY` (default: 10)
- `RIGHTSIZE_TIMEOUT_SECONDS` (default: 60)

## CLI Commands

### List Models
```bash
rightsize-cli models
```

### Run Benchmark
```bash
rightsize-cli benchmark test_cases.csv \
  -t prompt.j2 \                    # Prompt template (Jinja2 or f-string)
  -m google/gemma-3-12b-it \        # Model to test (repeat for multiple)
  -m deepseek/deepseek-chat-v3.1 \
  -j google/gemini-2.5-flash \      # Judge model
  -b google/gemini-2.5-flash        # Baseline for savings calculation
```

### Options
| Option | Short | Description |
|--------|-------|-------------|
| `--template` | `-t` | Path to prompt template (required) |
| `--model` | `-m` | Model ID to test (repeatable) |
| `--judge` | `-j` | Model for judging outputs |
| `--baseline` | `-b` | Baseline model for savings calc |
| `--concurrency` | `-c` | Max parallel requests (default: 10) |
| `--output` | `-o` | Output format: table, json, csv |
| `--verbose` | `-v` | Show detailed outputs and scores |

## How This Could Help Pick Cheapest Model Per Task

### Use Case for Moltbot/Clawd

**The Problem:** We often default to expensive models (Claude Opus, GPT-4) when cheaper models might work fine for specific tasks.

**The Solution:** Use RightSize to benchmark different task types:

1. **Create test cases for each task category:**
   - Simple Q&A / factual lookup
   - Code generation
   - Classification / routing
   - Summarization
   - Creative writing
   - Structured data extraction

2. **Benchmark cheap models against expensive baselines:**
   ```bash
   rightsize-cli benchmark classification_tests.csv \
     -t classify.j2 \
     -m google/gemma-3-12b-it \
     -m qwen/qwen3-8b \
     -m meta-llama/llama-3.3-70b-instruct \
     -m deepseek/deepseek-chat-v3.1 \
     -j anthropic/claude-sonnet-4 \
     -b anthropic/claude-sonnet-4
   ```

3. **Build a model routing table:**
   | Task Type | Minimum Accuracy | Recommended Model | Cost/1k |
   |-----------|------------------|-------------------|---------|
   | Classification | 95% | deepseek-chat-v3.1 | $0.018 |
   | Summarization | 90% | qwen3-8b | $0.005 |
   | Code gen | 95% | claude-sonnet | $0.150 |

4. **Implement task-based routing:**
   - Detect task type from user prompt
   - Route to cheapest model that meets accuracy threshold
   - Fall back to stronger model if confidence is low

### Best Practices from RightSize

- **Use minimal output formats** - `category::confidence` cheaper than JSON/prose
- **Start with 10-20 test cases** - Representative but fast
- **Set a quality bar** - Decide acceptable accuracy % (e.g., 95%+)
- **Consider latency** - Slow cheap models may not be worth it
- **Iterate on prompts** - Better prompts make cheaper models work better

### Potential Savings

Example from their demo shows:
- **Baseline (Gemini 2.5 Flash):** $0.045/1k at 100% accuracy
- **DeepSeek v3.1:** $0.018/1k at 95% accuracy → **60% savings**
- **Gemma 3 12B:** $0.0028/1k at 71% accuracy → **93.7% savings** (if accuracy acceptable)

## Related Resources

- **Web tool:** https://nehmeailabs.com/right-size
- **Hacker News discussion:** https://news.ycombinator.com/item?id=46793694
- **License:** MIT

## Next Steps

1. Install the CLI: `pip install rightsize-cli`
2. Get OpenRouter API key if we don't have one
3. Create test case CSVs for our common task types
4. Run benchmarks and build a routing decision matrix
5. Consider integrating results into Moltbot's model selection logic
