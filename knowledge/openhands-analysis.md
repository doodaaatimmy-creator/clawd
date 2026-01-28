# OpenHands Analysis

> **"The Open Platform for Cloud Coding Agents"**  
> Formerly OpenDevin — 67K+ stars, MIT licensed (core), most complete open-source Devin alternative

## Overview

**Repository:** [github.com/OpenHands/OpenHands](https://github.com/OpenHands/OpenHands)  
**Stars:** 67,205 | **Forks:** 8,361  
**License:** MIT (core) + Enterprise License for `enterprise/` directory  
**Created:** March 13, 2024  
**Primary Language:** Python (9.8M+ lines), TypeScript (2.4M+ lines)  
**Website:** [openhands.dev](https://openhands.dev)  
**Paper:** [arXiv:2511.03690](https://arxiv.org/abs/2511.03690)

---

## What Makes OpenHands "Most Complete"?

### 1. **Full-Stack Product Suite**

Unlike tools that are CLI-only or GUI-only, OpenHands offers a complete ecosystem:

| Component | Description |
|-----------|-------------|
| **Software Agent SDK** | Composable Python library — the core engine |
| **CLI (TUI)** | Terminal interface, similar to Claude Code |
| **Local GUI** | React SPA with REST API, similar to Devin/Jules |
| **OpenHands Cloud** | Hosted deployment with $10 free credit |
| **Enterprise** | Self-hosted Kubernetes deployment |

### 2. **State-of-the-Art Benchmark Performance**

- **SWE-Bench Verified: 77.6%** (top-tier performance)
- Uses inference-time scaling with critic models
- Log-linear improvement from 60.6% (single rollout) to 66.4% (5 attempts)
- Becoming the preferred harness for evaluating LLMs on coding tasks

### 3. **Model Agnostic**

Works with any LLM:
- Claude (Anthropic)
- GPT (OpenAI)
- Qwen (Alibaba)
- Devstral (Mistral)
- Local models via Ollama

### 4. **Native Integrations**

- GitHub, GitLab, Bitbucket
- Slack, Jira, Linear
- Chrome Extension
- GitHub Actions for automated issue resolution
- MCP (Model Context Protocol) support

---

## Architecture Deep Dive

### Component Structure

```
OpenHands/
├── openhands/              # Core Python package
│   ├── agenthub/           # Agent implementations
│   │   ├── codeact_agent/  # Primary coding agent
│   │   ├── browsing_agent/ # Web interaction
│   │   ├── loc_agent/      # Localization
│   │   └── visualbrowsing_agent/
│   ├── runtime/            # Sandbox execution
│   ├── controller/         # Agent orchestration
│   ├── llm/                # LLM abstraction layer
│   ├── mcp/                # Model Context Protocol
│   ├── memory/             # Context management
│   ├── security/           # Security analysis
│   ├── integrations/       # External service connectors
│   └── server/             # Backend services
├── frontend/               # React SPA
├── openhands-cli/          # CLI binary
├── openhands-ui/           # UI components
├── enterprise/             # Enterprise features (separate license)
├── evaluation/             # Benchmark infrastructure
└── containers/             # Docker definitions
```

### Runtime Architecture

The **Docker Runtime** is the core security component:

```
┌─────────────────────────────────────────────────────────────┐
│                    OpenHands Backend                         │
│  (openhands/runtime/impl/action_execution_client.py)        │
└─────────────────────────┬───────────────────────────────────┘
                          │ REST API
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   Docker Container                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │             Action Execution Server                      ││
│  │  - Bash shell environment                               ││
│  │  - Plugin system                                        ││
│  │  - ActionExecutor                                       ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │             Sandboxed Workspace                          ││
│  │  - File operations                                      ││
│  │  - Code execution                                       ││
│  │  - Process isolation                                    ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

**Key Security Features:**
- Sandboxed Docker containers for code execution
- Process isolation
- Resource control and limits
- Overlay filesystem support (copy-on-write)
- Network isolation options
- Hardened deployment configurations

### Image Tagging System

OpenHands uses a sophisticated three-tag system for reproducibility:

1. **Source Tag:** Most specific — MD5 of source directory
2. **Lock Tag:** Dependencies hash — base image + pyproject.toml + poetry.lock
3. **Versioned Tag:** Most generic — OpenHands version + base image

This enables:
- Identical source → identical image
- Fast rebuilds with dependency caching
- Development/production consistency

---

## SDK vs CLI vs GUI

### Software Agent SDK

```python
# Minimal agent definition
from openhands.sdk import Agent

agent = Agent()
result = await agent.run("Create a REST API for user management")
```

Key SDK features:
- Composable Python library
- Task planning and decomposition
- Automatic context compression
- Security analysis
- Strong agent-computer interfaces
- Local or cloud scaling (1000s of agents)

### CLI (TUI Mode)

```bash
# Install
uv tool install openhands --python 3.12

# Run interactively
openhands

# With initial task
openhands -t "Create a REST API for user management"

# Confirmation modes
openhands --always-approve    # Auto-approve (dangerous)
openhands --llm-approve       # LLM-based security

# Resume conversations
openhands --resume --last
```

**Controls:**
- `Ctrl+P`: Command palette (settings, MCP status)
- `Esc`: Pause agent
- `Ctrl+Q` or `/exit`: Exit

### Local GUI

```bash
# Via CLI launcher
openhands serve

# Or via Docker
docker run -it --rm \
  -e AGENT_SERVER_IMAGE_REPOSITORY=docker.openhands.dev/openhands/runtime \
  -e AGENT_SERVER_IMAGE_TAG=1.2-nikolaik \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -p 3000:3000 \
  docker.openhands.dev/openhands/openhands:1.2
```

Access at `http://localhost:3000`

---

## OpenHands vs Claude Code

| Feature | OpenHands | Claude Code |
|---------|-----------|-------------|
| **Model Lock-in** | Model agnostic (75+ providers) | Claude only |
| **Open Source** | MIT licensed | Proprietary SDK |
| **Sandbox Execution** | Native Docker sandboxing | Runs on host (trust model) |
| **GUI** | Web UI + Terminal TUI | Terminal only |
| **SDK** | Full Python SDK | Limited SDK |
| **MCP Support** | Yes (CLI + GUI) | Yes |
| **Benchmark** | SWE-bench 77.6% | Similar tier |
| **Enterprise** | Self-host Kubernetes | Anthropic API only |
| **Lifecycle Control** | Full (pause/resume/cancel) | Limited |
| **Security Analysis** | Built-in security analyzer | Trust-based |

**Claude Code Advantages:**
- Tighter Claude integration
- More polished CLI UX
- Native Anthropic support

**OpenHands Advantages:**
- Model freedom
- Sandboxed execution (safer for untrusted code)
- Full web GUI
- Better for enterprise/self-hosting
- Academic research backing

---

## MCP (Model Context Protocol) Integration

```bash
# Add MCP server
openhands mcp add tavily --transport stdio \
  npx -- -y mcp-remote "https://mcp.tavily.com/mcp/?tavilyApiKey=<key>"

# List servers
openhands mcp list

# Enable/disable
openhands mcp enable <server-name>
openhands mcp disable <server-name>
```

Configuration stored at `~/.openhands/mcp.json`:

```json
{
  "mcpServers": {
    "tavily-remote": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.tavily.com/mcp/?tavilyApiKey=..."]
    }
  }
}
```

---

## Running Locally

### Prerequisites
- Docker Desktop (Mac/Linux/WSL)
- 4GB+ RAM recommended
- Python 3.12+ (for CLI)

### Option 1: CLI with uv (Recommended)

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install OpenHands
uv tool install openhands --python 3.12

# Run
openhands
```

### Option 2: Docker Direct

```bash
# Pull runtime image
docker pull docker.openhands.dev/openhands/runtime:1.2-nikolaik

# Run with filesystem mount
export SANDBOX_VOLUMES=$HOME/code:/workspace:rw

docker run -it --rm --pull=always \
  -e AGENT_SERVER_IMAGE_REPOSITORY=docker.openhands.dev/openhands/runtime \
  -e AGENT_SERVER_IMAGE_TAG=1.2-nikolaik \
  -e LOG_ALL_EVENTS=true \
  -e SANDBOX_VOLUMES=$SANDBOX_VOLUMES \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ~/.openhands:/.openhands \
  -p 3000:3000 \
  --add-host host.docker.internal:host-gateway \
  docker.openhands.dev/openhands/openhands:1.2
```

### Option 3: Development Setup

```bash
git clone https://github.com/OpenHands/OpenHands.git
cd OpenHands
make build
make run
```

---

## Patterns Worth Borrowing

### 1. **Sandboxed Execution Architecture**

The Docker-based runtime with ActionExecutor pattern is excellent:
- Clear separation between orchestration and execution
- REST API communication for language-agnostic execution
- Plugin system for extensibility
- Overlay filesystem for safe file operations

### 2. **Three-Tag Image System**

For reproducibility + speed:
- Source hash (exact match)
- Lock hash (dependencies)
- Version tag (generic fallback)

### 3. **Confirmation Modes**

```bash
--always-approve    # Dangerous but fast
--llm-approve       # LLM-based security analysis
(default)           # Human confirmation
```

This graduated trust model is worth emulating.

### 4. **MCP Configuration Pattern**

Clean separation of MCP servers in `~/.openhands/mcp.json` with CLI management.

### 5. **Resume/Conversation System**

```bash
openhands --resume          # List recent
openhands --resume --last   # Resume last
openhands --resume abc123   # Resume specific
```

### 6. **Agent Hub Pattern**

Multiple specialized agents under `agenthub/`:
- `codeact_agent` — Primary coding
- `browsing_agent` — Web interaction
- `loc_agent` — Localization
- `visualbrowsing_agent` — Visual browsing

This modular agent design allows task-specific optimization.

### 7. **Inference-Time Scaling**

Using critic models for best-of-n selection dramatically improves results (60.6% → 66.4%).

---

## Technical Insights

### Agent Implementation Pattern

From the SDK paper (arXiv:2511.03690):

> "To achieve flexibility, we design a simple interface for implementing agents that requires only a few lines of code in the default case, but is easily extensible to more complex, full-featured agents with features such as custom tools, memory management, and more."

Key SDK differentiators vs OpenAI/Claude/Google SDKs:
1. Native sandboxed execution
2. Lifecycle control (pause/resume/cancel)
3. Model-agnostic multi-LLM routing
4. Built-in security analysis

### Memory and Context

- Automatic context compression
- Memory management APIs
- Conversation persistence

### Security Model

Built-in security analyzer that can:
- Analyze actions before execution
- Use LLM-based approval (`--llm-approve`)
- Sandbox all code execution

---

## Enterprise Features (Source-Available)

The `enterprise/` directory contains:
- Slack/Jira/Linear integrations
- Multi-user support
- RBAC and permissions
- Collaboration features
- Usage reporting
- Budget enforcement
- Kubernetes deployment

License: One month free evaluation, then requires purchase.

---

## Research & Evaluation

OpenHands includes extensive evaluation infrastructure:

- **SWE-bench** — Real GitHub issues
- **SWT-bench** — Software testing
- **Multi-SWE-bench** — Multi-file changes
- **GAIA** — General AI assistant

The `evaluation/` directory contains benchmark harnesses that are becoming the standard for evaluating coding agents.

---

## Summary

OpenHands is the most complete open-source Devin alternative because it offers:

1. **Complete stack** — SDK + CLI + GUI + Cloud + Enterprise
2. **Model freedom** — Works with any LLM
3. **Production-ready security** — Docker sandboxing, security analysis
4. **Best-in-class performance** — 77.6% SWE-bench
5. **Active research** — Academic backing, inference-time scaling
6. **Enterprise-ready** — Self-hosting, RBAC, integrations

For our purposes, the key patterns to consider:
- Sandboxed execution architecture
- Graduated confirmation modes
- Agent hub for task specialization
- MCP integration pattern
- Conversation persistence/resume

---

## Links

- **GitHub:** https://github.com/OpenHands/OpenHands
- **Docs:** https://docs.openhands.dev
- **Cloud:** https://app.all-hands.dev
- **Paper:** https://arxiv.org/abs/2511.03690
- **Slack:** https://openhands.dev/joinslack
- **CLI Repo:** https://github.com/OpenHands/OpenHands-CLI
