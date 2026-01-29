# Quest Boxing - Full Architecture

## Game Modes

### 1. Training Mode (Gym)
- **Heavy Punching Bag**: Classic bag physics, swing on hit
- **Speed Bag**: Fast rhythm-based hitting, realistic rebound
- **Environment**: Boxing gym interior
- **Features**:
  - Punch power tracking
  - Speed tracking
  - Calorie counter
  - Session timer

### 2. Active Mode (Rhythm/Combat)
- **Portal System**: Portals open around player at different angles
- **Balloon Targets**: Fly out from portals
- **Duck Bars**: Horizontal bars player must duck under
- **Weave Walls**: Obstacles to dodge left/right
- **Environment**: Epic mountain top arena / stadium
- **Features**:
  - Score multipliers
  - Combo system
  - Difficulty waves
  - Boss patterns

---

## Scene Structure

```
res://
├── game/
│   ├── main_menu/
│   │   ├── main_menu.tscn          # VR start menu
│   │   └── main_menu.gd
│   ├── training/
│   │   ├── training_gym.tscn       # Training mode scene
│   │   ├── training_gym.gd
│   │   ├── heavy_bag.tscn          # Heavy bag prefab
│   │   ├── heavy_bag.gd
│   │   ├── speed_bag.tscn          # Speed bag prefab
│   │   └── speed_bag.gd
│   ├── active/
│   │   ├── active_arena.tscn       # Active mode scene
│   │   ├── active_arena.gd
│   │   ├── portal.tscn             # Portal prefab
│   │   ├── portal.gd
│   │   ├── balloon_target.tscn     # Balloon prefab
│   │   ├── balloon_target.gd
│   │   ├── duck_bar.tscn           # Duck obstacle
│   │   ├── duck_bar.gd
│   │   └── wave_patterns.gd        # Wave/pattern definitions
│   ├── shared/
│   │   ├── player_rig.tscn         # XR player with gloves
│   │   ├── player_rig.gd
│   │   ├── boxing_glove.tscn       # Glove prefab
│   │   ├── boxing_glove.gd
│   │   ├── score_manager.gd        # Scoring singleton
│   │   └── audio_manager.gd        # Sound effects manager
│   └── autoload/
│       ├── game_manager.gd         # Game state singleton
│       └── settings.gd             # Player settings
├── assets/
│   ├── audio/
│   │   ├── sfx/                    # Sound effects
│   │   └── music/                  # Background tracks
│   ├── models/
│   │   ├── gloves/
│   │   ├── bags/
│   │   └── environment/
│   ├── textures/
│   │   └── skybox/                 # HDRI skyboxes
│   └── materials/
└── addons/
    └── godot-xr-tools/
```

---

## Portal System Design

### Concept
- Player stands in center of circular arena
- Portals can spawn at any angle (0-360°) around player
- Portals have spawn animation (swirl open)
- Balloons emerge from portal
- After wave, portal closes and new one opens elsewhere

### Portal Positions (Clock System)
```
        12 (0°)
    11      1
  10          2
 9    PLAYER   3
  8           4
    7       5
        6 (180°)
```

### Wave Structure
```gdscript
var wave = {
    "portals": [
        {"angle": 0, "duration": 10.0},      # Front portal
        {"angle": 90, "duration": 8.0},      # Right portal
    ],
    "patterns": [
        {"type": "jab_combo", "count": 8},
        {"type": "hook_sequence", "count": 4},
        {"type": "duck_bar", "count": 2},
        {"type": "uppercut_mix", "count": 6},
    ],
    "bpm": 120,
    "difficulty": 1
}
```

---

## Balloon Target Types

| Type | Color | Hand | Motion |
|------|-------|------|--------|
| Left Jab | Red | Left | Straight |
| Right Jab | Blue | Right | Straight |
| Left Hook | Orange | Left | Curved |
| Right Hook | Cyan | Right | Curved |
| Left Upper | Pink | Left | Low arc |
| Right Upper | Purple | Right | Low arc |
| Duck Bar | Yellow | - | Horizontal bar |
| Weave Left | Green | - | Dodge right |
| Weave Right | Green | - | Dodge left |

---

## Audio System

### Sound Categories
1. **Punches**
   - Light hit (jab)
   - Heavy hit (power punch)
   - Miss (whoosh)
   - Perfect timing (satisfying pop)

2. **Balloons**
   - Spawn (woosh)
   - Pop (satisfying burst)
   - Miss (sad deflate)

3. **Portals**
   - Open (magical swirl)
   - Close (reverse swirl)

4. **Feedback**
   - Combo announcer ("Combo x5!", "PERFECT!", "UNSTOPPABLE!")
   - Round start bell
   - Round end bell

5. **Ambient**
   - Background music (BPM-synced)
   - Crowd noise (optional)

---

## Difficulty Progression

### Easy
- Single portal, front only
- Slow balloon speed
- Simple patterns (jab, jab, jab)
- No duck bars

### Medium
- 2 portals (front + side)
- Medium speed
- Mixed patterns
- Occasional duck bars

### Hard
- 3+ portals (requires turning)
- Fast speed
- Complex combos
- Frequent duck bars + weaves

### Extreme
- Rapid portal switching
- Very fast
- Unpredictable patterns
- Constant movement required

---

## Environment Concepts

### Training Gym
- Worn wooden floor
- Boxing ring in corner
- Mirrors on walls
- Gym equipment in background
- Warm lighting (incandescent)

### Active Arena - Mountain Top
- Floating platform on mountain peak
- Epic vista (clouds below, mountains in distance)
- HDR skybox with sunset/sunrise
- Magical/mystical portal effects
- Particle effects (snow, embers, energy)

---

## VR Menu System

### Main Menu (Floating in front of player)
```
╔═══════════════════════════════════════╗
║          🥊 KNOCKOUT BOXING 🥊          ║
╠═══════════════════════════════════════╣
║                                       ║
║    [ TRAINING MODE ]                  ║
║    Practice with bags                 ║
║                                       ║
║    [ ACTIVE MODE ]                    ║
║    Rhythm boxing challenge            ║
║                                       ║
║    [ SETTINGS ]                       ║
║                                       ║
║    [ QUIT ]                           ║
║                                       ║
╚═══════════════════════════════════════╝
```

### Interaction
- Point with controller
- Trigger to select
- Haptic feedback on hover

---

## Implementation Order

### Phase 1: Core Framework
1. [x] XR initialization
2. [ ] Player rig with locomotion
3. [ ] Menu system
4. [ ] Scene transitions
5. [ ] Audio manager

### Phase 2: Training Mode
1. [ ] Gym environment
2. [ ] Heavy bag with physics
3. [ ] Speed bag with physics
4. [ ] Punch tracking stats

### Phase 3: Active Mode
1. [ ] Arena environment
2. [ ] Portal system
3. [ ] Balloon spawning
4. [ ] Hit detection
5. [ ] Duck bars
6. [ ] Scoring + combos

### Phase 4: Polish
1. [ ] Sound effects
2. [ ] Particles
3. [ ] Skybox/environment
4. [ ] Announcer
5. [ ] Stats/leaderboard

---

## Performance Targets (Quest 2/3)
- 72 FPS minimum (preferably 90)
- Max 50 dynamic objects
- LOD for distant objects
- Baked lighting where possible
- Efficient particle systems
