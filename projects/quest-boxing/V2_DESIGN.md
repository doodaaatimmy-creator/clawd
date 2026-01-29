# Quest Boxing v2 - Design Document

## Research Summary

### VR Boxing Game Landscape
- **Thrill of the Fight**: Most realistic, physics-based, requires room scale
- **Creed: Rise to Glory**: Cinematic, arcade style, career mode, training challenges
- **BOXVR/FitXR**: **RHYTHM-BASED** - Beat Saber style punch indicators timed to music
- **Knockout League**: Arcade/goofy style with quirky characters

### Key Insight
**BOXVR is our model** - fitness-focused rhythm boxing where punch types (jab, hook, uppercut, weave) appear as indicators timed to beats. Guitar Hero but for boxing!

---

## v2 Features

### 1. Joystick Locomotion
**Goal**: Move around without physical space limitations

**Implementation** (using godot-xr-tools):
- Left stick: Movement (forward/back/strafe)
- Right stick: Snap or smooth turning
- Add `XRToolsPlayerBody` to scene
- Add `movement_direct.tscn` to left controller
- Add `movement_turn.tscn` to right controller

**Files needed**:
- `addons/godot-xr-tools/player/player_body.tscn`
- `addons/godot-xr-tools/functions/movement_direct.tscn`
- `addons/godot-xr-tools/functions/movement_turn.tscn`

### 2. Better Boxing Gloves
**Goal**: More realistic glove visuals (still cartoony/stylized)

**Design**:
- Red leather texture with slight shine
- Proper glove shape (not cylinder)
- Visible wrist wrap
- Slight puffiness/padding look

**Options**:
1. Model in Blender and import
2. Use procedural mesh with better shape
3. Find free glove model online (Sketchfab, etc.)

### 3. Punch Type Detection
**Goal**: Differentiate jabs, hooks, uppercuts

**Detection Logic**:
```
JAB: Straight forward punch, velocity mostly in Z direction
HOOK: Curved horizontal punch, velocity in X+Z with rotation
UPPERCUT: Upward punch, velocity primarily in Y direction
```

**Implementation**:
- Track controller velocity vector
- Analyze direction relative to head/body
- Classify punch type based on dominant axis and angle

### 4. Rhythm Combo System (Guitar Hero Style)
**Goal**: Indicators fly toward player, punch when they arrive

**Design**:
- **Indicator Types**:
  - 🔴 Left Jab (red, left side)
  - 🔵 Right Jab (blue, right side)
  - 🟡 Left Hook (yellow, curved path)
  - 🟢 Right Hook (green, curved path)
  - 🟣 Uppercut (purple, from below)
  - ⬛ Duck/Weave (gray bar, go under)

- **Spawning**:
  - Indicators spawn at distance, fly toward player
  - Timed to BPM of music track
  - Difficulty = more indicators, faster speed, complex combos

- **Scoring**:
  - PERFECT: Hit within 50ms of beat
  - GREAT: Hit within 100ms
  - GOOD: Hit within 200ms
  - MISS: Too early/late

- **Combos**:
  - Sequences like: Jab-Jab-Hook-Uppercut
  - Multiplier increases with streak
  - Visual/audio feedback for streaks

### 5. Sound Effects
**Needed**:
- Punch impact (leather on leather)
- Whoosh (swing)
- Combo announcer ("COMBO x5!")
- Background music with clear beat
- Perfect/Great/Good hit sounds
- Miss sound

**Sources** (free):
- freesound.org
- OpenGameArt.org
- Generate with AI

### 6. Visual Improvements
- Particles on hit
- Screen shake on big punches
- Glove trails
- Sweat particles during workout
- Calorie counter / workout stats

---

## Scene Structure (v2)

```
BoxingGym (Node3D)
├── WorldEnvironment
├── Lights
├── GymEnvironment
│   ├── Floor
│   ├── Walls
│   └── Ring/Area
├── PunchingBag (optional, free mode)
├── RhythmSystem (Node3D)
│   ├── IndicatorSpawner
│   ├── BeatTracker
│   └── ScoreManager
├── XROrigin3D
│   ├── XRCamera3D
│   ├── LeftController
│   │   ├── GloveModel
│   │   ├── HandCollider
│   │   ├── MovementDirect
│   │   └── PunchDetector
│   └── RightController
│       ├── GloveModel
│       ├── HandCollider
│       ├── MovementTurn
│       └── PunchDetector
├── XRToolsPlayerBody
├── UI3D
│   ├── ScoreDisplay
│   ├── ComboDisplay
│   └── CalorieDisplay
└── AudioManager
    ├── MusicPlayer
    ├── SFXPlayer
    └── AnnouncerPlayer
```

---

## Implementation Order

1. **Locomotion** - Add joystick movement (quick win)
2. **Punch Detection** - Classify punch types
3. **Indicator System** - Basic flying indicators
4. **Scoring System** - Timing-based scoring
5. **Sound Effects** - Add audio feedback
6. **Better Gloves** - Improved models
7. **Polish** - Particles, UI, music sync

---

## Music/BPM System

For rhythm sync:
1. Load music track
2. Detect/configure BPM
3. Spawn indicators on beat divisions (quarter notes, eighth notes)
4. Track playback position for scoring

Could start with fixed BPM tracks, add auto-detection later.

---

## Workout Tracking

- Count punches thrown
- Track punch speed (velocity magnitude)
- Estimate calories: ~10 cal per 100 punches (rough)
- Session duration
- Save stats to file for progress tracking

---

## MVP for v2

Minimum to feel like "Guitar Hero Boxing":
1. ✅ Locomotion working
2. ✅ Basic indicators spawning in sequence
3. ✅ Hit detection with timing score
4. ✅ Combo counter
5. ✅ Basic sound effects
6. Music track with synced beats

Then iterate from there!
