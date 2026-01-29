# Three Projects Research
**Date:** 2026-01-29
**Status:** Research complete, ready for discussion

---

## 1. 🎤 VOICE INPUT IN WEBCHAT

### Current State
- **Webchat does NOT have native voice input** in the current config
- Moltbot DOES support voice via:
  - WhatsApp/Telegram voice notes (transcribed automatically)
  - Voice Call plugin (Twilio/Telnyx for phone calls)
  - "Voice Wake + Talk Mode" for macOS/iOS/Android (ElevenLabs)

### Options

**Option A: Use macOS Dictation (Easiest)**
- macOS already has dictation enabled (you said so)
- Press `Fn` twice (or set custom shortcut) → Speak → Text appears
- Works in ANY text field including webchat
- **Zero setup, works now**

**Option B: Browser Extension**
- Voice-to-text browser extensions exist
- Chrome/Safari have speech recognition APIs
- Could find/build a simple extension

**Option C: Add Voice Mode to Moltbot Webchat**
- Would require frontend changes to webchat
- Could use Web Speech API (browser native)
- More complex, would need PR to Moltbot

**Option D: Switch to Voice-Native Channel**
- Use WhatsApp/Telegram for voice (send voice notes)
- Moltbot auto-transcribes

### Recommendation
**Start with Option A (macOS Dictation)** — it's free, works now, no setup. Just press `Fn Fn` and talk. If you want deeper integration later, we can explore Option C.

---

## 2. 🎮 DURANGO GTA REPLICA

### The Vision
GTA-style game using real Durango landscape, downtown, and Fort Lewis College. Runnable on Mac Mini M4 (16GB).

### Data Sources Available

| Source | Data | Cost |
|--------|------|------|
| **City of Durango GIS** | Building footprints, roads, parcels | FREE |
| **OpenTopography / USGS 3DEP** | High-res terrain elevation | FREE |
| **Colorado Geospatial Portal** | Statewide GIS data | FREE |
| **OpenStreetMap** | Roads, buildings, POIs | FREE |

**Durango GIS Contact:** gis@durangogov.org

### Tech Stack Options

**Engine: Godot 4 (Recommended)**
- Open source, FREE
- Runs great on M4 Mac
- GDScript is easy to learn
- Growing community, good docs
- Lighter than Unity/Unreal

**Approach: Hybrid Real + Procedural**
1. Import REAL terrain heightmap from USGS (Durango area)
2. Import REAL road network from OpenStreetMap
3. Generate LOW-POLY buildings procedurally from GIS footprints
4. Add stylized textures (Vice City aesthetic)
5. Player/vehicle mechanics standard GTA-style

### Resource Constraints (M4 16GB)

| Component | Strategy |
|-----------|----------|
| Terrain | Chunked loading, LOD |
| Buildings | Low-poly, instanced |
| Textures | Compressed, stylized |
| Vehicles | Simple physics |
| NPCs | Limited, pooled |

### Feasibility Assessment
- **Doable:** Yes, if we use low-poly aesthetic
- **Timeline:** 3-6 months for playable prototype
- **Complexity:** Medium-High
- **Learning curve:** Need to learn Godot + GIS pipeline

### Next Steps (if proceed)
1. Download Durango terrain heightmap
2. Set up Godot 4 on Mac
3. Import terrain as first test
4. Build GIS → Godot pipeline
5. Start with small area (downtown only)

---

## 3. 🥊 META QUEST BOXING/WORKOUT GAME

### The Vision
Open-source VR boxing game for Meta Quest with:
- Workout tracking
- Health metrics sync (Quest → Watch → Donny)
- Custom training programs

### Platform Landscape

**HUGE NEWS: Godot + Meta Partnership!**
- W4 Games (Godot company) partnered with Meta (April 2025)
- Official **Godot Meta Toolkit** released
- **Godot runs STANDALONE on Quest 3/Pro**
- Optimized templates specifically for Quest
- This is the path.

### Tech Stack

| Component | Tool |
|-----------|------|
| Engine | Godot 4 + Meta Toolkit |
| VR Standard | OpenXR |
| Sideloading | Quest Developer Mode |
| Health Data | Meta Movement SDK |

### Health Data Integration

**Quest Built-in:**
- Hand tracking
- Body tracking (Quest 3)
- Movement/calories estimation
- Meta Move app integration

**Watch Sync:**
- Quest can pair with compatible watches
- OR: Export workout data → Apple Health → Watch syncs
- OR: Build companion app that bridges

**Donny Integration:**
- Quest workout data → Export to file/API
- Donny reads workout logs
- Adjusts fitness protocol based on VR sessions

### Existing Open Source Projects

| Project | Description |
|---------|-------------|
| Godot XR Tools | VR interaction toolkit for Godot |
| OpenXR Plugin | Godot's official OpenXR support |
| Various GitHub boxing demos | Starting points |

### Feasibility Assessment
- **Doable:** Yes, especially with Godot-Meta partnership
- **Timeline:** 2-4 months for basic prototype
- **Complexity:** Medium
- **Advantages:** We have Quest, M4 Mac, and motivation

### Next Steps (if proceed)
1. Enable Developer Mode on Quest
2. Install Godot 4 + Meta Toolkit
3. Deploy "Hello VR World" to Quest
4. Study existing boxing game mechanics
5. Build punch detection prototype

---

## 📊 COMPARISON

| Project | Effort | Time | Learning | Fun Factor | Money Potential |
|---------|--------|------|----------|------------|-----------------|
| Voice Input | Low | 1 day | None | Medium | None |
| Durango GTA | High | 3-6 mo | GIS + Godot | HIGH | Medium (could sell) |
| Quest Boxing | Medium | 2-4 mo | Godot VR | HIGH | High (fitness market) |

---

## 🎯 MY TAKE

**Voice Input:** Just use macOS dictation for now. Done.

**Durango GTA vs Quest Boxing:** Both are awesome. But...

**I'd start with Quest Boxing because:**
1. Fitness market is HOT
2. Aligns with our health protocols
3. Faster to prototype
4. Godot-Meta partnership is fresh momentum
5. Could actually monetize on Quest Store
6. Data feedback loop with your workouts

**Durango GTA:** Park as a "someday" project. Cool but complex, less monetizable.

---

**Ready to discuss. What resonates?**
