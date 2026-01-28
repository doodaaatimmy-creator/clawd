# Maple AI Analysis — Privacy-Preserving LLM Proxy via TEE

**Research Date:** 2026-01-28  
**Source:** @TryMapleAI / OpenSecret  
**Status:** Production (launched March 2025)

---

## Executive Summary

Maple AI is a **privacy-first AI chat platform** built on OpenSecret's Trusted Execution Environment (TEE) infrastructure. It provides end-to-end encrypted access to open-source LLMs (Llama 3.3, DeepSeek R1, Kimi K2, Qwen, GPT-OSS) with cryptographic proof that your data cannot be accessed by the operator—including Maple themselves.

**Key Value Prop:** "The Signal of AI" — cloud-powered AI with local-level privacy.

---

## 1. What is Maple AI?

### Product Overview
- **End-to-end encrypted AI chat** with multi-device sync
- Built on **OpenSecret** — an open-source confidential computing platform
- Uses **AWS Nitro Enclaves** + **NVIDIA GPU TEEs** (via Edgeless Systems)
- All code is **open-source and reproducible** (NixOS builds)
- Accepts **Bitcoin payments** (10% discount) via Zaprite

### Platforms
- Web: [trymaple.ai](https://trymaple.ai)
- Desktop: macOS, Linux (native apps)
- Mobile: iOS, Android (Google Play available)
- API: OpenAI-compatible proxy

### Team
- **Mark Suman** (@marksuman) — early team member
- Connected to Bitcoin ecosystem (Marty Bent's TFTC podcast featured them in episode #678)
- Austin, TX based

---

## 2. How the TEE (Trusted Execution Environment) Works

### Architecture Overview
```
┌─────────────────┐   E2E Encrypted   ┌─────────────────┐   TEE Boundary   ┌─────────────────┐
│   User Client   │ ──────────────────▶│  AWS Nitro     │ ─────────────────▶│  NVIDIA GPU    │
│  (attestation)  │                    │   Enclave      │                   │     TEE        │
└─────────────────┘                    └─────────────────┘                   └─────────────────┘
        │                                     │                                     │
        ▼                                     ▼                                     ▼
   Client verifies                    Auth, encryption,                      LLM inference
   enclave attestation               key management                         (Llama, DeepSeek)
```

### Technical Stack
1. **AWS Nitro Enclaves**: Isolated mini-VMs with no network access, no persistent storage
2. **NVIDIA H100 GPU TEEs**: GPU memory encryption for AI inference (via Edgeless Systems)
3. **Remote Attestation**: Hardware-backed proof of code integrity
4. **Reproducible Builds**: NixOS flake produces verifiable PCR (Platform Configuration Register) values

### What TEE Guarantees
| Protected From | How |
|----------------|-----|
| Cloud provider (AWS) | Hardware-level isolation, encrypted memory |
| Maple operators | Enclave code can't be modified, attestation proves integrity |
| Memory dumps | Nitro prevents external memory inspection |
| Key extraction | Private keys never leave enclave boundary |
| AI training on your data | Data only decrypted inside TEE, never persisted |

### Trust Boundaries
- **You trust:** Hardware vendors (AWS, NVIDIA, Intel/AMD)
- **You verify:** Code via attestation + open-source reproducible builds
- **You don't trust:** Maple as operators (they can't access your data)

---

## 3. Available Models

### Current Model Lineup (via Maple Proxy)

| Model | Use Case | Price (per 1M tokens) |
|-------|----------|----------------------|
| `llama-3.3-70b` | General reasoning, daily tasks | $4 input / $4 output |
| `gpt-oss-120b` | ChatGPT-style creativity, structured data | $4 input / $4 output |
| `deepseek-r1-0528` | Research, advanced math, coding | $4 input / $4 output |
| `kimi-k2-thinking` | Complex agentic workflows, multi-step coding | $4 input / $4 output |
| `qwen3-vl-30b` | Vision: images, video, OCR, GUI automation | $4 input / $4 output |
| `qwen3-coder-480b` | Specialized coding assistant | $4 input / $4 output |
| `gemma-3-27b-it-fp8` | Fast image analysis | $10 input / $10 output |

### Key Points
- ✅ DeepSeek R1 available
- ✅ Kimi K2 available (announced recently)
- ✅ Qwen models (including vision/coder variants)
- ✅ All open-source models (no proprietary model dependencies)
- ❌ No Claude or GPT-4 (closed-source, can't run in self-controlled TEE)

---

## 4. Pricing

### Consumer Plans

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 | 10 chats/week |
| **Starter** | $5.99/mo | Increased usage |
| **Pro** | $20/mo | Full access, API credits available |
| **Team** | $30/mo/seat | Pooled usage across team |
| **Max** | (enterprise) | Custom |

### API Pricing
- **$4 per million tokens** (most models)
- **$10 per million tokens** (Gemma vision)
- **Pay-as-you-go** — purchase credits starting at $10
- **Bitcoin accepted** (10% discount)

### Comparison
- DeepSeek direct: ~$0.14-0.55/M tokens (but no privacy)
- OpenAI GPT-4: $2.50-10/M tokens (but no privacy)
- **Maple premium for privacy:** ~10-30x DeepSeek direct pricing

---

## 5. Integration with Moltbot

### Option A: Maple Proxy (Recommended)
**OpenAI-compatible API** — drop-in replacement, no code changes needed.

```bash
# Run Maple Proxy locally via Docker
docker run -p 8080:8080 \
  -e MAPLE_BACKEND_URL=https://enclave.trymaple.ai \
  ghcr.io/opensecretcloud/maple-proxy:latest
```

```python
# Use with any OpenAI client
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8080/v1",
    api_key="your-maple-api-key"
)

response = client.chat.completions.create(
    model="deepseek-r1-0528",
    messages=[{"role": "user", "content": "Hello!"}],
    stream=True  # Required - Maple only supports streaming
)
```

### Option B: OpenSecret SDK (For Deeper Integration)
```typescript
import { OpenSecretProvider } from '@opensecret/sdk';

function App() {
  return (
    <OpenSecretProvider clientId="your-project-id">
      <YourApp />
    </OpenSecretProvider>
  );
}
```

### Integration Requirements
1. **Maple Pro account** ($20/mo minimum)
2. **API credits** (purchase starting at $10)
3. **Maple Proxy** running locally or in Docker
4. Point Moltbot's LLM client to `http://localhost:8080/v1`

### Moltbot Config Example
```yaml
# moltbot config (conceptual)
llm:
  provider: openai-compatible
  base_url: http://localhost:8080/v1
  api_key: ${MAPLE_API_KEY}
  model: deepseek-r1-0528
```

---

## 6. Is This the Privacy Layer We Need?

### ✅ Strengths

| Benefit | Details |
|---------|---------|
| **True privacy** | End-to-end encryption, TEE attestation, open-source code |
| **No data training** | Cryptographically impossible for them to access prompts |
| **Bitcoin native** | Accepts BTC, 10% discount, aligned with cypherpunk values |
| **OpenAI compatible** | Drop-in replacement for existing code |
| **Open source** | Full code audit possible via GitHub |
| **Reproducible builds** | Verify deployed code matches published code |
| **Multi-model** | DeepSeek, Kimi K2, Qwen, Llama — not vendor-locked |

### ⚠️ Considerations

| Concern | Assessment |
|---------|------------|
| **Price premium** | ~$4/M tokens vs $0.14-0.55 direct — ~10-30x more expensive |
| **Streaming only** | No non-streaming API (may affect some integrations) |
| **No Claude/GPT-4** | Only open models (privacy tradeoff) |
| **Hardware trust** | Must trust AWS Nitro + NVIDIA TEE implementations |
| **Latency** | TEE handshake + attestation adds overhead |
| **Scale** | Newer company, unclear production scale/reliability |

### Verdict

**For sensitive operations where privacy is critical:**
- ✅ Medical/legal/financial data processing
- ✅ Confidential business strategy
- ✅ Journalist source protection
- ✅ Personal mental health/intimate conversations

**For general Moltbot usage:**
- 🤔 Cost may be prohibitive for high-volume usage
- 🤔 Streaming-only may require code changes
- 🤔 Consider hybrid: Maple for sensitive, direct API for general

---

## 7. Open Source & Verification

### Repositories
- **OpenSecret Platform**: [github.com/OpenSecretCloud/opensecret](https://github.com/OpenSecretCloud/opensecret)
- **Maple App**: [github.com/OpenSecretCloud/Maple](https://github.com/OpenSecretCloud/Maple)
- **Maple Proxy**: [github.com/OpenSecretCloud/maple-proxy](https://github.com/OpenSecretCloud/maple-proxy)

### Verification Process
1. Build EIF locally using Nix flake
2. Compare PCR values against deployed enclave
3. Attestation document publicly verifiable at [trymaple.ai/proof](https://trymaple.ai/proof)

---

## 8. Competitive Landscape

| Service | Privacy | Models | Price | Open Source |
|---------|---------|--------|-------|-------------|
| **Maple AI** | ✅ TEE + E2E | Open models | $4/M | ✅ Full |
| Apple Private Cloud Compute | ✅ TEE | Apple models | Bundled | ❌ |
| OpenAI | ❌ Trust them | GPT-4/o1 | $2.50-60/M | ❌ |
| Anthropic | ❌ Trust them | Claude | $3-15/M | ❌ |
| DeepSeek Direct | ❌ China-hosted | DeepSeek | $0.14-0.55/M | Partial |
| Local (Ollama) | ✅ Local | Limited | Hardware | ✅ |

---

## 9. Next Steps for Moltbot

### Evaluation Path
1. [ ] Sign up for Maple Pro ($20/mo)
2. [ ] Purchase $10 API credits
3. [ ] Deploy maple-proxy Docker container
4. [ ] Test with Moltbot LLM routing
5. [ ] Benchmark latency vs direct API
6. [ ] Evaluate cost at projected usage

### Questions to Answer
- What's our monthly token usage?
- Which conversations need privacy protection?
- Can we route selectively (private → Maple, general → direct)?
- What's the latency impact acceptable for our use case?

---

## 10. References

- [OpenSecret Technical Deep-Dive](https://blog.opensecret.cloud/opensecret-technicals/)
- [Maple Proxy Documentation](https://blog.trymaple.ai/maple-proxy-documentation/)
- [OpenSecret Developer Docs](https://docs.opensecret.cloud)
- [TFTC Podcast #678 — Mark Suman on Privacy-First AI](https://podscan.fm/podcasts/tftc-a-bitcoin-podcast/episodes/678-building-privacy-first-ai-in-an-age-of-surveillance-with-mark-suman)
- [GitHub: OpenSecretCloud](https://github.com/OpenSecretCloud)

---

*"Don't trust, verify."* — This is the first AI platform where that's actually possible.
