# RouteLLM: Deep Dive into Cost-Optimized LLM Routing

> **Bottom Line:** RouteLLM achieves **85% cost reduction** while maintaining **95% GPT-4 quality** by intelligently routing queries to strong/weak models based on task complexity.

## What is RouteLLM?

RouteLLM is an open-source framework from LMSYS (the Chatbot Arena folks) that dynamically routes LLM requests between a "strong" expensive model and a "weak" cheap model based on query complexity.

- **Paper:** [arXiv:2406.18665](https://arxiv.org/abs/2406.18665) (June 2024)
- **GitHub:** [lm-sys/RouteLLM](https://github.com/lm-sys/RouteLLM)
- **Blog:** [lmsys.org/blog/2024-07-01-routellm](https://lmsys.org/blog/2024-07-01-routellm/)

---

## How the Routing Logic Works

### The Core Insight

Different LLMs have vastly different cost:capability ratios. The key insight:
- **Simple queries** (greetings, basic facts) don't need GPT-4/Claude Opus
- **Complex queries** (reasoning, code, nuanced analysis) benefit from frontier models
- A lightweight classifier can predict which queries need the "big guns"

### The Routing Algorithm

```
For each incoming query:
1. Router calculates win_rate = P(strong model gives better answer)
2. If win_rate > threshold → route to strong model (GPT-4, Claude)
3. If win_rate ≤ threshold → route to weak model (Mixtral, Llama)
```

The **threshold** controls the cost/quality tradeoff:
- Higher threshold = fewer GPT-4 calls = more savings = slightly lower quality
- Lower threshold = more GPT-4 calls = less savings = higher quality

### Available Router Types

| Router | Method | Best For | Overhead |
|--------|--------|----------|----------|
| **mf** (Matrix Factorization) | Learns latent embeddings of prompts & models | **Recommended** - best perf/cost | Low |
| **sw_ranking** | Weighted Elo based on similarity to Arena data | Works well on general chat | Low |
| **bert** | BERT classifier trained on preference data | Good generalization | Medium |
| **causal_llm** | Fine-tuned LLM classifier | Highest accuracy, highest overhead | High |

### Training Data

Routers are trained on **Chatbot Arena preference data**:
- Human A/B comparisons between model responses
- ~55K public conversations with preference labels
- Augmented with LLM-as-judge synthetic labels

---

## Real-World Results

### MT Bench (Conversational AI)
- **85% cost reduction** at 95% GPT-4 quality
- Matrix factorization router: Only **14% of calls** to GPT-4 needed
- 75% cheaper than random routing baseline

### MMLU (Knowledge/Reasoning)
- **45% cost reduction** at 95% GPT-4 quality
- Causal LLM router performs best here
- Requires domain-specific augmentation for best results

### GSM8K (Math)
- **35% cost reduction** at 95% GPT-4 quality
- More conservative routing (math needs powerful models more often)

### vs Commercial Solutions
RouteLLM achieves **same quality as Martian/Unify AI** while being:
- **40%+ cheaper** than commercial offerings
- Fully open-source and self-hostable
- No vendor lock-in

---

## Integration Guide

### Quick Start (Python SDK)

```python
from routellm.controller import Controller
import os

os.environ["OPENAI_API_KEY"] = "sk-..."
os.environ["ANYSCALE_API_KEY"] = "..."  # or any provider

client = Controller(
    routers=["mf"],  # Matrix factorization - recommended
    strong_model="gpt-4-1106-preview",
    weak_model="anyscale/mistralai/Mixtral-8x7B-Instruct-v0.1",
)

# Calibrate threshold for 50% GPT-4 usage
# python -m routellm.calibrate_threshold --routers mf --strong-model-pct 0.5

response = client.chat.completions.create(
    model="router-mf-0.11593",  # router-{name}-{threshold}
    messages=[{"role": "user", "content": "Hello!"}]
)
```

### OpenAI-Compatible Server

```bash
# Launch server
python -m routellm.openai_server \
    --routers mf \
    --strong-model gpt-4-1106-preview \
    --weak-model anyscale/mistralai/Mixtral-8x7B-Instruct-v0.1

# Server runs at http://0.0.0.0:6060
```

Then use with any OpenAI client:
```python
import openai
client = openai.OpenAI(base_url="http://localhost:6060")
response = client.chat.completions.create(
    model="router-mf-0.11593",
    messages=[...]
)
```

### Threshold Calibration

```bash
# Calibrate for X% of calls going to strong model
python -m routellm.calibrate_threshold \
    --routers mf \
    --strong-model-pct 0.5 \  # 50% to GPT-4
    --config config.yaml

# Output: "For 50.0% strong model calls, threshold = 0.11593"
```

---

## Could We Use This with Moltbot?

### Integration Options

**Option 1: RouteLLM as Upstream Proxy**
```
User → Moltbot → RouteLLM Server → GPT-4/Mixtral
```
- Run RouteLLM server alongside Moltbot
- Point Moltbot's model config to RouteLLM endpoint
- RouteLLM handles model selection transparently

**Option 2: LiteLLM Integration**
RouteLLM uses LiteLLM under the hood, and Moltbot could integrate similarly:
- LiteLLM supports 100+ providers
- Has built-in routing, fallbacks, cost tracking
- Could wrap Moltbot's model calls

**Option 3: Native Implementation**
Since Moltbot already has model switching:
- Add query complexity classifier
- Route based on estimated complexity
- Simpler than full RouteLLM but same principle

### Considerations for Moltbot

| Factor | Impact |
|--------|--------|
| Latency | Router adds ~50-100ms per request |
| Memory | mf router: ~100MB for embeddings |
| API Keys | Need keys for both strong + weak providers |
| Use Case | Best for high-volume, cost-sensitive workloads |

### When It Makes Sense
- ✅ Running lots of automated queries (agents, batch processing)
- ✅ Mixed query complexity (simple + complex in same app)
- ✅ Cost is a significant concern
- ❌ Low volume (overhead not worth it)
- ❌ All queries need frontier-model quality

---

## Alternatives to RouteLLM

### 1. LiteLLM
**What:** Universal LLM API gateway with routing

**Routing Features:**
- Load balancing across deployments
- Fallback on errors
- Rate-limit-aware routing
- Latency-based routing
- Cost-based routing
- Auto-routing via semantic similarity

**Pros:** Production-ready, 100+ providers, enterprise features
**Cons:** Routing is simpler (not ML-based quality prediction)

**Best For:** Multi-provider reliability, not cost optimization

```python
from litellm import Router

router = Router(
    model_list=[
        {"model_name": "gpt-4", "litellm_params": {...}},
        {"model_name": "gpt-4", "litellm_params": {...}},  # fallback
    ],
    routing_strategy="cost-based-routing"
)
```

### 2. OpenRouter
**What:** Hosted LLM gateway with auto-routing

**Auto Router Features:**
- `openrouter/auto` model selection
- Powered by NotDiamond
- Analyzes prompt → picks best model
- Supports wildcard restrictions (`anthropic/*`)

**Pros:** Zero setup, pay-as-you-go, automatic updates
**Cons:** Hosted only, less control, markup on pricing

**Best For:** Quick start, don't want to manage infrastructure

```python
response = client.chat.completions.create(
    model="openrouter/auto",  # Let OpenRouter pick
    messages=[...]
)
```

### 3. Martian Router
**What:** Commercial routing service

**Claims:**
- Beats GPT-4 by routing to specialist models
- Up to 99.7% cost savings
- Automatic new model integration
- Custom optimization objectives

**Pros:** Sophisticated routing, enterprise support
**Cons:** Commercial/closed, costs unclear

### 4. NotDiamond
**What:** ML-based model routing service

**Used By:** OpenRouter's auto-router

**Features:**
- Trained on preference data
- Real-time model selection
- Quality prediction

### 5. DIY Approaches

**Simple Heuristics:**
```python
def route_query(query):
    # Token count heuristic
    if len(query.split()) < 20:
        return "cheap-model"
    
    # Keyword detection
    if any(k in query.lower() for k in ["code", "analyze", "complex"]):
        return "expensive-model"
    
    return "cheap-model"
```

**Embedding Similarity:**
```python
def route_by_similarity(query, complex_examples, simple_examples):
    query_emb = embed(query)
    complex_sim = max(cosine_sim(query_emb, e) for e in complex_examples)
    simple_sim = max(cosine_sim(query_emb, e) for e in simple_examples)
    return "expensive" if complex_sim > simple_sim else "cheap"
```

---

## Comparison Matrix

| Solution | Type | Cost Savings | Setup | Quality | Best For |
|----------|------|--------------|-------|---------|----------|
| **RouteLLM** | OSS | Up to 85% | Medium | Excellent | Cost optimization |
| **LiteLLM** | OSS | Variable | Easy | Good | Reliability/fallbacks |
| **OpenRouter** | Hosted | ~40-60% | None | Good | Quick start |
| **Martian** | Commercial | Claims 99%+ | Easy | Unknown | Enterprise |
| **DIY** | Custom | 20-40% | High | Depends | Full control |

---

## Key Takeaways

1. **RouteLLM proves the concept works** - ML-based routing can achieve massive cost savings without quality loss

2. **The magic is in the training data** - Chatbot Arena preferences are gold for learning query difficulty

3. **Routers generalize well** - Trained on GPT-4/Mixtral, works for Claude/Llama pairs too

4. **Threshold is the key knob** - Tune for your cost/quality needs

5. **Start simple, add complexity** - Even basic heuristics beat always-use-expensive

---

## Resources

- **RouteLLM Paper:** https://arxiv.org/abs/2406.18665
- **RouteLLM GitHub:** https://github.com/lm-sys/RouteLLM
- **LiteLLM Docs:** https://docs.litellm.ai/
- **OpenRouter Docs:** https://openrouter.ai/docs
- **Chatbot Arena:** https://chat.lmsys.org

---

*Last updated: 2025-01-28*
