# Quest Boxing 🥊
## Open-Source VR Boxing & Workout Game for Meta Quest

**Started:** January 29, 2026
**Status:** Research & Setup
**Platform:** Meta Quest 3 (sideload first, Quest Store later)
**Engine:** Godot 4 + Meta Toolkit

---

## Vision

A VR boxing game that:
1. Gives you a killer workout
2. Tracks your performance (punches, calories, intensity)
3. Syncs data with Donny for fitness protocol adjustments
4. Is FUN — not just exercise

---

## Why This Will Win

- **Fitness VR is HOT** — Supernatural, FitXR, Thrill of the Fight all crushing it
- **Open source gap** — No good FOSS boxing games exist
- **Godot-Meta partnership** — Fresh momentum, official support
- **We have the hardware** — Quest + M4 Mac
- **Data flywheel** — Workout data feeds back to our health system
- **Monetization path** — Quest Store, Patreon, or premium features

---

## Tech Stack

| Component | Tool |
|-----------|------|
| Engine | Godot 4.3+ |
| VR Framework | Godot XR Tools + Meta Toolkit |
| VR Standard | OpenXR |
| Language | GDScript |
| 3D Modeling | Blender (if needed) |
| Audio | Godot built-in |

---

## Phase 1: Setup & Hello VR (Week 1)

- [ ] Enable Developer Mode on Quest
- [ ] Install Godot 4 on Mac
- [ ] Install Godot Meta Toolkit
- [ ] Deploy "Hello VR World" to Quest
- [ ] Verify hand tracking works
- [ ] Document the pipeline

## Phase 2: Punch Detection (Week 2-3)

- [ ] Implement hand/controller tracking
- [ ] Detect punch velocity and direction
- [ ] Create target system (pads/bags)
- [ ] Score hits based on accuracy + power
- [ ] Basic haptic feedback

## Phase 3: Workout Mode (Week 4-5)

- [ ] Timed rounds (3 min rounds, 1 min rest)
- [ ] Combo sequences to follow
- [ ] Calorie estimation
- [ ] Session summary stats
- [ ] Export workout data to file

## Phase 4: Polish & Donny Integration (Week 6-8)

- [ ] Workout data → JSON export
- [ ] Donny reads workout logs
- [ ] Adjusts fitness protocol based on VR sessions
- [ ] Add music/rhythm elements
- [ ] Multiple difficulty levels

## Phase 5: Release (Week 9+)

- [ ] App Lab submission (easier than Quest Store)
- [ ] Open source the code (GitHub)
- [ ] Community feedback
- [ ] Iterate

---

## Health Data Flow

```
[Quest Boxing Session]
        ↓
[Workout Data: punches, duration, intensity, calories]
        ↓
[Export to ~/clawd/health/workouts/YYYY-MM-DD-boxing.json]
        ↓
[Donny reads during morning brief]
        ↓
[Adjusts fitness protocol: "Great VR session yesterday, lighter workout today"]
```

---

## Resources

### Official Docs
- [Godot XR Documentation](https://docs.godotengine.org/en/stable/tutorials/xr/index.html)
- [Meta Quest Developer](https://developers.meta.com/horizon/)
- [Godot Meta Toolkit](https://w4games.com) (W4 Games)

### Learning
- [ ] Godot basics tutorial
- [ ] Godot XR starter project
- [ ] Study "Thrill of the Fight" mechanics

### Inspiration
- Thrill of the Fight (realistic boxing)
- FitXR (rhythm + boxing)
- Supernatural (guided workouts)
- BoxVR (workout focused)

---

## File Structure

```
projects/quest-boxing/
├── README.md (this file)
├── docs/
│   ├── setup-guide.md
│   └── architecture.md
├── godot/
│   └── (Godot project goes here)
├── exports/
│   └── (APK builds)
└── research/
    └── (reference materials)
```

---

## Success Metrics

**Week 2:** Hand tracking working, can detect punch
**Week 4:** Playable workout session
**Week 8:** Donny integration working
**Week 12:** App Lab submission ready

---

## Notes

- Start SIMPLE — one bag, one punch type, one round
- Iterate fast — test on Quest frequently
- Fun > Features — if it's not fun, nobody uses it

---

*Let's build something that makes us healthier AND makes money.*
