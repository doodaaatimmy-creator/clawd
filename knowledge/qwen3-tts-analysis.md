# Qwen3-TTS Analysis

**Research Date:** January 28, 2026  
**Status:** Released January 22, 2026 — Apache 2.0 License

---

## TL;DR

Qwen3-TTS is a **game-changer** for open-source TTS. It matches or beats ElevenLabs/MiniMax in quality, runs locally on Mac via MLX, has sub-100ms latency, supports 10 languages, and is completely free. This could replace our ElevenLabs dependency in Moltbot.

---

## 1. Where's the Model?

### Official Sources
- **GitHub:** https://github.com/QwenLM/Qwen3-TTS
- **HuggingFace Collection:** https://huggingface.co/collections/Qwen/qwen3-tts
- **Demo Space:** https://huggingface.co/spaces/Qwen/Qwen3-TTS
- **Technical Paper:** https://arxiv.org/abs/2601.15621

### Model Variants

| Model | Size | Features |
|-------|------|----------|
| Qwen3-TTS-12Hz-1.7B-Base | 4.54GB | Voice cloning, fine-tuning base |
| Qwen3-TTS-12Hz-1.7B-VoiceDesign | ~4.5GB | Create voices from text descriptions |
| Qwen3-TTS-12Hz-1.7B-CustomVoice | ~4.5GB | 9 preset voices + instruction control |
| Qwen3-TTS-12Hz-0.6B-Base | 2.52GB | Lightweight voice cloning |
| Qwen3-TTS-12Hz-0.6B-CustomVoice | ~2.5GB | Lightweight preset voices |

---

## 2. Languages & Voices Supported

### Languages (10 total)
- Chinese (incl. Beijing & Sichuan dialects)
- English
- Japanese
- Korean
- German
- French
- Russian
- Portuguese
- Spanish
- Italian

### Built-in Voices (CustomVoice models)

| Voice | Description | Native Language |
|-------|-------------|-----------------|
| Vivian | Bright, slightly edgy young female | Chinese |
| Serena | Warm, gentle young female | Chinese |
| Uncle_Fu | Seasoned male, low mellow timbre | Chinese |
| Dylan | Youthful Beijing male, clear natural | Chinese (Beijing) |
| Eric | Lively Chengdu male, slightly husky | Chinese (Sichuan) |
| Ryan | Dynamic male, strong rhythmic drive | English |
| Aiden | Sunny American male, clear midrange | English |
| Ono_Anna | Playful Japanese female, light nimble | Japanese |
| Sohee | Warm Korean female, rich emotion | Korean |

**Voice Design**: The VoiceDesign model can **create entirely new voices from text descriptions** like "gruff pirate voice" or "cheerful anime girl".

---

## 3. Quality Comparison

### Benchmarks vs ElevenLabs/MiniMax

From the technical paper (arxiv:2601.15621):

| Metric | Qwen3-TTS | ElevenLabs | MiniMax |
|--------|-----------|------------|---------|
| **Avg WER** (10 languages) | **1.835%** | Higher | Higher |
| **Speaker Similarity** | **0.789** | Lower | Lower |
| Voice cloning reference | 3 seconds | 1-3 minutes | varies |

**Key findings:**
- Achieves **highest speaker similarity scores across all 10 evaluated languages**
- Outperforms both MiniMax and ElevenLabs on standardized benchmarks
- Voice cloning from just **3 seconds** of reference audio (vs ElevenLabs' 1-3 minute requirement)
- Speaker similarity scores reach **0.95** approaching human-level reproduction

### Community Feedback (Reddit/HN)
- "About the same output as ElevenLabs" on voice cloning (RTX 3060)
- "Qwen3-TTS family blows away [other local models] in performance"
- Simon Willison successfully cloned his own voice with the HuggingFace demo

---

## 4. Mac Local Setup ✅ YES!

### mlx-audio (Recommended for Mac)

Prince Canuma's `mlx-audio` library provides **native Apple Silicon support**:

```bash
# Install
pip install mlx-audio

# Basic generation with voice description
mlx_audio.tts.generate \
  --model mlx-community/Qwen3-TTS-12Hz-1.7B-VoiceDesign-bf16 \
  --text "Hello, world!" \
  --lang_code en \
  --instruct "warm friendly voice"
```

### Available MLX Models
- `mlx-community/Qwen3-TTS-12Hz-1.7B-VoiceDesign-bf16`
- `mlx-community/Qwen3-TTS-12Hz-0.6B-Base-bf16`

### Python API (Mac)
```python
from mlx_audio.tts.utils import load_model

model = load_model("mlx-community/Qwen3-TTS-12Hz-0.6B-Base-bf16")
results = list(model.generate(
    text="Hello from MLX-Audio!",
    voice="Chelsie",
    language="English",
))
audio = results[0].audio  # mx.array
```

### Requirements
- Apple Silicon Mac (M1/M2/M3/M4)
- Python 3.10+
- ~2.5GB for 0.6B model, ~4.5GB for 1.7B model

### CLI One-liner (via Simon Willison)
```bash
uv run https://tools.simonwillison.net/python/q3_tts.py \
  'I am a pirate, give me your gold!' \
  -i 'gruff voice' -o pirate.wav
```

---

## 5. Latency

### Official Benchmarks (from paper)

| Model | Concurrency | First-Packet Latency | RTF |
|-------|-------------|---------------------|-----|
| 12Hz-0.6B | 1 | **97ms** | 0.288 |
| 12Hz-1.7B | 1 | **101ms** | 0.313 |
| 25Hz-0.6B | 1 | 138ms | 0.234 |
| 25Hz-1.7B | 1 | 150ms | 0.253 |

**Key insight:** The 12Hz tokenizer achieves **sub-100ms first-packet latency** — suitable for real-time conversation.

### Architecture Innovation
- **Dual-track streaming**: Can output audio immediately after first character input
- **12.5Hz multi-codebook**: Extreme bitrate reduction + ultra-low latency
- **Causal ConvNet decoder**: No diffusion model needed for reconstruction

---

## 6. Moltbot Integration Potential

### Current TTS Setup
Moltbot uses ElevenLabs (`sag` skill) for TTS. Cost: ~$5-22/month depending on usage.

### Integration Options

#### Option A: Replace ElevenLabs Entirely
```yaml
# Potential skill config
tts:
  provider: qwen3-tts
  model: mlx-community/Qwen3-TTS-12Hz-0.6B-Base-bf16
  voice: Ryan  # or dynamic based on context
```

**Pros:**
- Free (no API costs)
- Local processing (privacy)
- 10 languages supported
- Voice cloning capability

**Cons:**
- Requires Mac (MLX) or GPU for good performance
- Initial download of 2.5-4.5GB model
- May need tuning for latency in real-time use

#### Option B: Hybrid Approach
- Use Qwen3-TTS for bulk/batch TTS (stories, summaries)
- Keep ElevenLabs for real-time conversational responses where their API latency might be lower

#### Option C: OpenAI-Compatible Server
mlx-audio provides an OpenAI-compatible API:
```bash
mlx_audio.server --host 0.0.0.0 --port 8000

# Then use like OpenAI TTS API
curl -X POST http://localhost:8000/v1/audio/speech \
  -H "Content-Type: application/json" \
  -d '{"model": "mlx-community/Qwen3-TTS-...", "input": "Hello!", "voice": "Ryan"}'
```

### Implementation Estimate
- **Effort:** Medium (2-4 hours to add as new TTS provider)
- **Testing:** Voice quality comparison needed
- **Recommended:** Start with 0.6B model for speed, upgrade to 1.7B if quality insufficient

---

## Summary

| Question | Answer |
|----------|--------|
| **Where?** | HuggingFace + GitHub (Apache 2.0) |
| **Languages?** | 10 (EN, ZH, JA, KO, DE, FR, RU, PT, ES, IT) |
| **Quality?** | Matches/beats ElevenLabs on benchmarks |
| **Mac local?** | ✅ Yes via mlx-audio |
| **Latency?** | 97-150ms first packet (excellent) |
| **Moltbot integration?** | Very feasible — free TTS replacement |

---

## Next Steps

1. [ ] Install mlx-audio and test locally
2. [ ] Compare voice quality with current ElevenLabs output
3. [ ] Test latency in practice on Mac mini
4. [ ] Add Qwen3-TTS provider to Moltbot TTS skill
5. [ ] Consider voice cloning for personalized voices

---

## References

- GitHub: https://github.com/QwenLM/Qwen3-TTS
- Paper: https://arxiv.org/abs/2601.15621
- mlx-audio: https://github.com/Blaizzy/mlx-audio
- HN Discussion: https://news.ycombinator.com/item?id=46719229
- Simon Willison's writeup: https://simonwillison.net/2026/Jan/22/qwen3-tts/
