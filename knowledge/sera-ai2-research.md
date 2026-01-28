# SERA / AI2 Open Coding Agents Research

*Researched: 2026-01-28*

## 1. What It Is

**SERA (Soft-verified Efficient Repository Agents)** is an open-source coding agent system from the Allen Institute for AI (Ai2). It's the first release in their "Open Coding Agents" family.

### Key Highlights:
- **Open-source**: Models, training code, datasets, and Claude Code integration all released
- **State-of-the-art performance**: SERA-32B solves 54.2% of SWE-Bench Verified problems
- **Cost-efficient**: Reproducing prior best open-source results costs ~$400, rivaling best industry models costs ~$12,000
- **Codebase specialization**: Can be fine-tuned to any private codebase (internal APIs, org conventions, etc.)
- **Built by one researcher**: Demonstrates the method's accessibility

### Core Innovation: Soft-Verified Generation (SVG)
Traditional methods require patches to be fully correct. SERA's insight: **patches don't need to be correct to be helpful** - partially correct patches still teach agentic behavior. This removes complex testing infrastructure needs and dramatically cuts costs.

---

## 2. How It Works with Claude Code

SERA is designed as a **drop-in replacement** for Claude's backend in Claude Code. It works through a proxy that translates requests:

### Quick Start (Modal - easiest):
```bash
# Install tools
uv tool install modal
uv tool install ai2-sera-cli

# Setup modal account
modal setup

# Deploy SERA and launch Claude Code automatically
sera --modal
```

### How the Proxy Works:
1. `sera-cli` starts a local proxy server (default port 8080)
2. The proxy intercepts Claude Code API calls
3. Requests are forwarded to a vLLM endpoint running SERA
4. Responses are translated back to Claude Code format

### Deployment Options:
| Option | Use Case | Command |
|--------|----------|---------|
| Modal (ephemeral) | Quick testing, single user | `sera --modal` |
| Modal (persistent) | Team sharing | `deploy-sera --model allenai/SERA-32B` |
| Self-hosted vLLM | Full control, existing infrastructure | `sera --endpoint <url>` |

---

## 3. Model Sizes

Available models in the Open Coding Agents collection:

| Model | Parameters | Notes |
|-------|------------|-------|
| **SERA-8B** | 8B | Smaller, faster inference |
| **SERA-8B-GA** | 8B | General availability variant |
| **SERA-32B** | 32B | Flagship model, best performance |
| **SERA-32B-GA** | 32B | General availability variant |

All models:
- Built on **Qwen3** base
- Trained up to **32K context length** (evaluates well at 64K too)
- Available on Hugging Face: `allenai/SERA-32B`, `allenai/SERA-8B`, etc.

### Performance Benchmarks (SWE-Bench Verified):
- SERA-32B @ 32K context: **49.5%** (±1.9%)
- SERA-32B @ 64K context: **54.2%** (±1.4%)
- Comparable to Devstral Small 2 (50.0%) and GLM-4.5-Air (50.5%)

### Inference Performance (BF16 on 4xH100):
- ~1,950 peak output tokens/sec @ 16K context
- FP8 precision: ~3,700 tokens/sec
- Blackwell 4xB200 (NVFP4): ~8,600 tokens/sec

---

## 4. Training Costs

The headline figures from AI2:

| Goal | Cost | Notes |
|------|------|-------|
| Reproduce prior best open-source | **~$400** | SWE-smith equivalent at 57× lower cost |
| Match SkyRL (open RL system) | **~$400** | 26× lower cost |
| Rival best industry models | **~$12,000** | Comparable to Devstral Small 2 |
| Specialize to a codebase | **~$1,300** | 8,000 samples (Django/Sympy example) |

### Hardware Requirements:
- **40 GPU days or fewer** on 2× NVIDIA Hopper GPUs (or RTX PRO 6000 Blackwell)
- Standard SFT training - no custom RL infrastructure needed
- Can run on commodity cloud GPUs

### Why So Cheap?
1. **Soft-verified generation**: No need for complex testing infrastructure
2. **Bug-type menu**: 51 common bug patterns for diverse data generation
3. **SFT-only**: No reinforcement learning complexity
4. **Efficient data scaling**: One repo with thousands of functions → tens of thousands of trajectories

---

## 5. GitHub Repositories & Resources

### Code Repositories:
| Repo | Purpose | URL |
|------|---------|-----|
| **sera-cli** | Claude Code integration | https://github.com/allenai/sera-cli |
| **SERA** | Training & data generation | https://github.com/allenai/SERA |

### Other Resources:
- **Technical Report**: https://allenai.org/papers/opencodingagents
- **Blog Post**: https://allenai.org/blog/open-coding-agents
- **HuggingFace Collection**: https://huggingface.co/collections/allenai/open-coding-agents
- **PyPI Package**: `ai2-sera-cli`

### Training Datasets Released:
- `allenai/Sera-4.5A-Lite-T1` (24k samples)
- `allenai/Sera-4.5A-Lite-T2` (23.7k samples)
- `allenai/Sera-4.5A-Full-T1` (47.6k samples)
- `allenai/Sera-4.5A-Full-T2` (44.4k samples)
- `allenai/Sera-4.6-Lite-T1` (24.6k samples)
- `allenai/Sera-4.6-Lite-T2` (32.6k samples)

---

## 6. How We Could Use It

### Immediate Uses:

#### A. Free/Cheap Claude Code Alternative
```bash
# One command to try it
uv tool install modal ai2-sera-cli && modal setup && sera --modal
```
- Uses Modal's free tier for initial testing
- Pay-per-use GPU time only when running
- Full Claude Code experience with open model

#### B. Self-Hosted Coding Agent
- Run on our own hardware (2-4 GPUs for 32B model)
- Complete privacy - no API calls leaving our network
- Predictable costs (infrastructure only)

### Advanced Uses:

#### C. Codebase Specialization
Train SERA specifically on our repositories:
1. Use their data generation pipeline to create training data from our code
2. Fine-tune SERA-8B or SERA-32B (costs ~$1,300 for 8k samples)
3. Result: Model that knows our internal APIs, conventions, patterns

Example config for personal repos:
```yaml
- org_name: our-org
  last_name: our-repo
  install_cmds:
    - "pip install -e ."
  python_version: 3.12
  top_level_folder:
    - src
```

#### D. Research & Experimentation
- All training data released for inspection
- Can study what makes effective coding agent training
- Test hypotheses about agentic behavior at low cost

### Cost Comparison for Our Use:

| Use Case | Monthly Cost (Est.) |
|----------|---------------------|
| Claude Code API (heavy use) | $200-500+ |
| SERA on Modal (occasional) | $20-50 |
| SERA self-hosted (2xH100 rental) | $2,500-4,000 |
| SERA self-hosted (own hardware) | Electricity only |

### Recommended Starting Point:
1. **Try it**: `sera --modal` with Modal free tier
2. **Evaluate**: Compare against our Claude Code usage patterns
3. **If good**: Deploy persistent instance or self-host
4. **If great**: Train specialized version on our codebase

---

## Key Takeaways

1. **It's real and accessible** - Not vaporware, working today with 2 lines of code
2. **Competitive performance** - Within ~5% of best closed models
3. **Dramatically cheaper** - $400 to reproduce vs $10,000+ typical
4. **Specialization is the killer feature** - Train on your private code cheaply
5. **Claude Code native** - Drop-in replacement, same workflow
6. **Full transparency** - Models, data, training code all open

---

## References

- Shen, E., Tormoen, D., Shah, S., Farhadi, A., & Dettmers, T. (2026). *SERA: Soft-Verified Efficient Repository Agents*. Allen Institute for AI.
- https://allenai.org/blog/open-coding-agents
- https://github.com/allenai/SERA
- https://github.com/allenai/sera-cli
