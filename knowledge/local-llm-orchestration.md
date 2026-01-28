# Local LLM Orchestration

Knowledge base for local LLM usage patterns, tools, and hybrid architectures.

## X/Twitter Insights
*Collected: 2026-01-28*

### Ollama Ecosystem

**Key Developments:**
- **Ollama 0.15** introduced `ollama launch` command supporting Claude Code, Codex, Droid, and OpenCode
- **GLM 4.7 Flash** optimized for lower memory usage with 64k+ context
- Moltbot integration: `ollama launch clawdbot` for personal assistants with local models (198K views, @ollama)

**Practitioner Setup Examples:**
- @parthsareen: Running Ollama + neovim with gpt-oss:20b on M4 Max - "living in terminal with bajillion coding agents"
- @AkashClub_: WebUI + Ollama deployed on Akash network with combined SDL

**Contrarian Take:**
- @TheAhmadOsman: Claims Ollama is slower than llama.cpp (Windows) and mlx (Mac)
- Suggested alternatives: lmstudio, llama.cpp, exllamav2/v3, vllm, sglang

### Local LLM Use Cases & Patterns

**Workflow Automation:**
- **Sim** (@oliviscusAI): 100% open-source n8n rival for agentic workflows
  - Visual Figma-like canvas interface
  - Works with any local LLM via Ollama
  - Native MCP support (100+ tools)
  - 74K views, 980 likes

**Recommended Small Models:**
- **Nemotron 3 Nano** (@TheAhmadOsman): Runs on "potato GPU" via expert offloading, even CPU+RAM only
- **Liquid AI 450M vision model** (@jalam1001): Running on Android tablet via Termux + llama.cpp
- Unsloth for good quantizations

**Mac-Specific:**
- @reach_vb: Chat with PDFs using Llama 3.2 on Mac, powered by llama.cpp
- @andres_vidoza: Clawdbot/Moltbot on Mac Mini with local LLM (17K views)

### Small Model Performance Reports

**Qwen Models:**
- **Qwen3-Next-80B-A3B** (@Whats_AI): 80B MoE with only 3B active params at inference
  - Fast generation at 10% cost of Qwen 32B
- **3B Qwen with RL** (@rohanpaul_ai): Small model trained with reinforcement learning outperforms prompt-only agents on ML engineering tasks
- @dylan522p: Qwen 4B comparable to Mistral's model; small 30B MoE performs better

**Llama Models:**
- Llama 3.2 for PDF chat via llama.cpp
- Pre-deployed options: Qwen 2.5 72B, Llama 3.1 70B, Command R+

### LLM Routing Architectures

**LLMRouter Library** (@youjiaxuan, @taofeng_uiuc):
- First unified LLM routing library: `pip install llmrouter-lib`
- 16+ routers in one framework:
  - Single-round routers
  - Multi-round routers
  - Agentic routers
  - Personalized routers
- GitHub: github.com/ulab-uiuc/LLMR
- 1K likes, 73K views

**Research Approaches:**
- **RGD (Routing with Generated Data)** (@EliasEskin): Annotation-free LLM routing
- **CASCAL**: Label-free router using consensus-voting to identify niche skills

**Production Patterns:**
- @GregKamradt on Perplexity:
  - LLM routing depends on question type and complexity
  - Users accept waiting for better answers
  - Streaming interactions valued for perceived responsiveness

### Claude + Local LLM Hybrid Setups

**Claude Code + Local Models:**
- @TheAhmadOsman built proxy tool for Claude Code with any local LLM:
  - vLLM serving GLM-4.5 Air on 4x RTX 3090s
  - Single Python file + .env handles requests
  - 174K views, 1.1K likes

- **Official Integration**: Ollama blog guide for Claude Code with local models
  - @donvito: "wait what, you can run Claude Code with @ollama using local models"
  - 77K views, 1.2K likes

**Claude 3.7 Sonnet:**
- Hybrid reasoning model: instant responses OR extended step-by-step thinking
- "One model, two ways to think"

### Accounts to Follow

**Local LLM Practitioners:**
- @TheAhmadOsman - LocalLLaMA community admin, hardware setups, contrarian takes
- @parthsareen - Terminal-native workflows, neovim integration
- @Technovangelist (Matt Williams) - Ex-Ollama evangelist
- @oliviscusAI - Workflow automation tools

**Model Research:**
- @rohanpaul_ai - RL-trained small models
- @Whats_AI (Louis-François Bouchard) - Model efficiency analysis
- @dylan522p (Dylan Patel) - Benchmarking, export restrictions news

**Routing & Architecture:**
- @youjiaxuan - LLMRouter library author
- @taofeng_uiuc - LLM routing research
- @EliasEskin - Annotation-free routing

### Trending Topic (2026-01-28)

> "Developers Switch from Cursor to Terminal AI Tools Like Claude Code" - 285 posts

Key theme: Migration from IDE-based AI tools to terminal-native agents.

---

## Tools Mentioned

| Tool | Purpose | Notes |
|------|---------|-------|
| Ollama | Local LLM serving | `ollama launch` for agent integration |
| llama.cpp | Direct inference | Faster than Ollama on some platforms |
| vLLM | Production serving | Used for multi-GPU setups |
| mlx | Mac inference | Faster than Ollama on Mac |
| LMStudio | GUI local LLM | Alternative to Ollama |
| exllamav2/v3 | Quantized inference | Efficient VRAM usage |
| sglang | Structured generation | Production alternative |
| Sim | Workflow automation | Open-source n8n alternative with MCP |
| LLMRouter | Routing library | 16+ routing algorithms |

---

*Last updated: 2026-01-28*
