# 🥊 Knockout Boxing VR

A full-featured VR boxing game for Meta Quest, built with Godot 4.6.

## Features

### 🏠 Main Menu
- Epic mystical floating platform environment
- Glowing orbs and pillars
- Point-and-click VR menu interaction
- Two game modes available

### 🏋️ Training Mode (Gym)
- **Heavy Punching Bag**
  - Realistic physics (spring + damping)
  - Swing response based on punch power
  - Visual flash feedback on hit
  - Haptic feedback
  
- **Speed Bag**
  - Fast rhythm-based hitting
  - Streak tracking
  - Angular velocity simulation
  
- **Stats Display**
  - Session time
  - Total hits (heavy + speed)
  - Current streak
  - Max punch speed (m/s)

### ⚡ Active Mode (Rhythm Boxing)
- **Portal System**
  - Glowing blue portals spawn around player (360°)
  - Portals rotate every 8 targets (forces player to turn)
  - Smooth portal open/close animations
  
- **Target Types**
  | Target | Color | Hand | Action |
  |--------|-------|------|--------|
  | Left Jab | 🔴 Red | Left | Punch |
  | Right Jab | 🔵 Blue | Right | Punch |
  | Left Hook | 🟠 Orange | Left | Punch |
  | Right Hook | 🩵 Cyan | Right | Punch |
  | Uppercut | 🟣 Purple | Either | Punch |
  | Duck Bar | 🟡 Yellow | - | Duck under |

- **Scoring System**
  - PERFECT: ≤50ms timing = 100 pts
  - GREAT: ≤100ms timing = 75 pts
  - GOOD: ≤200ms timing = 50 pts
  - Combo multiplier up to 3x
  
- **Wave System**
  - Difficulty increases each wave
  - Faster targets, more complex patterns
  - More duck bars at higher waves

- **Epic Environment**
  - Mountain top floating arena
  - Procedural clouds and distant peaks
  - HDR skybox support (sunrise/sunset)
  - Atmospheric fog effects

### 🎮 Controls
- **Left Stick**: Move (forward/back/strafe)
- **Right Stick**: Smooth turn
- **Punch**: Swing controller at targets
- **Duck**: Lower your head below the yellow bar
- **Trigger**: Select menu items

### 🔊 Audio
- Real punch impact sounds (5 variations)
- Whoosh/miss sounds
- Boxing bell
- Pop effects for balloon hits
- Procedural UI sounds

### 🎨 Visual Effects
- Impact particles on hits
- Material flash feedback
- Glowing portal effects
- Combo/score UI

## Technical Details

### Built With
- Godot 4.6
- godot-xr-tools (MIT)
- OpenXR

### Project Structure
```
godot/
├── game/
│   ├── main_menu/     # Start menu
│   ├── training/      # Training gym scene
│   ├── active/        # Rhythm boxing arena
│   ├── autoload/      # Singletons (GameManager, AudioManager)
│   └── boxing/        # Legacy v1/v2 scenes
├── assets/
│   ├── audio/sfx/     # Sound effects (.wav)
│   └── textures/      # Skybox HDRIs
└── addons/
    └── godot-xr-tools/ # XR utilities
```

### Performance
- Targets 72-90 FPS on Quest 2/3
- Max ~50 dynamic targets
- Efficient particle systems
- Compatible renderer (gl_compatibility)

## Building

```bash
# Export for Quest
cd godot
/Applications/Godot.app/Contents/MacOS/Godot --headless --export-debug "Meta Quest" ../build/boxing.apk

# Install
adb install -r ../build/boxing.apk

# Launch
adb shell am start -n org.godotengine.xrtemplate/com.godot.game.GodotAppLauncher
```

## Credits
- Punch sounds: qubodup (CC0) - OpenGameArt.org
- XR Tools: Bastiaan Olij, Malcolm Nixon (MIT)

## TODO
- [ ] Music tracks (BPM-synced)
- [ ] Announcer voice lines
- [ ] Workout stats/calories
- [ ] Difficulty selection
- [ ] High score persistence
- [ ] Better glove models
- [ ] Hand tracking support

---

*Built by Donny 🦾 for Winn*
