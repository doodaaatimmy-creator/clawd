# Quest Boxing VR - Development Learnings

## Session 1: 2026-01-29

### The Black Screen Bug
**Problem:** App launched but displayed pitch black - no rendering.

**Root Cause:** OpenXR was initialized by the plugin/autoload, but the viewport wasn't told to use XR rendering.

**Fix:** In the main scene script's `_ready()`:
```gdscript
func _ready():
    var xr_interface = XRServer.find_interface("OpenXR")
    if xr_interface:
        if not xr_interface.is_initialized():
            xr_interface.initialize()
        # CRITICAL: This line is what actually enables VR rendering!
        get_viewport().use_xr = true
```

**Key Insight:** Just because OpenXR initializes successfully doesn't mean rendering works. You MUST set `get_viewport().use_xr = true` on the viewport explicitly.

### Godot Quest Deployment Workflow
1. Export preset is called "Meta Quest" (not "Android")
2. Build folder must exist: `mkdir -p build/`
3. Start adb server: `adb start-server`
4. Export: `/Applications/Godot.app/Contents/MacOS/Godot --headless --export-debug "Meta Quest" ../build/boxing.apk`
5. Install: `adb install -r boxing.apk`
6. Launch: `adb shell am start -n org.godotengine.xrtemplate/com.godot.game.GodotAppLauncher`

### Package/Activity Names
- Package: `org.godotengine.xrtemplate`
- Launcher activity: `com.godot.game.GodotAppLauncher`
- Main VR activity: `com.godot.game.GodotApp` (requires VR focus, can't launch directly via adb)

### Debugging
- Check logs: `adb logcat -d | grep -i godot`
- Common warning (can ignore): `HEAD_TRACKER: client does not have access` - happens when app doesn't have VR focus
- Look for: `No viewport was marked with use_xr` - this means the viewport.use_xr fix is needed

### Project Structure
```
quest-boxing/
├── godot/
│   ├── project.godot
│   ├── game/
│   │   ├── boxing/
│   │   │   ├── simple_bag.tscn    # Main scene
│   │   │   └── simple_bag.gd      # Main script
│   │   └── game_state.gd
│   └── addons/
│       ├── godot-xr-tools/        # XR utilities
│       └── godotopenxrvendors/    # Meta Quest support
└── build/
    └── boxing.apk
```

### What Worked in v1
- XROrigin3D + XRCamera3D + XRController3D setup
- Simple bag physics (spring + damping)
- Hit detection via Area3D collision
- Visual feedback (material flash on hit)
- Haptic feedback via `controller.trigger_haptic_pulse()`
- 3D score labels (Label3D)
- Combo system with timeout

---

## Session 2: 2026-01-29 (Locomotion Fix)

### XRTools PlayerBody Hierarchy
**Problem:** Locomotion wasn't working. Controllers tracked, punching worked, but joystick movement did nothing.

**Root Cause:** XRToolsMovementDirect and XRToolsMovementTurn look for XRToolsPlayerBody in their parent chain using `XRHelpers.get_xr_origin()`. Our scene had:
```
TrainingGym
├── XROrigin3D
│   ├── LeftController → MovementDirect
│   └── RightController → MovementTurn
└── PlayerBody  ← SIBLING (can't be found!)
```

**Correct Structure:**
```
TrainingGym
├── PlayerBody
│   └── XROrigin3D  ← CHILD of PlayerBody
│       ├── LeftController → MovementDirect
│       └── RightController → MovementTurn
```

**How XRHelpers.get_xr_origin() works:**
1. Try explicit path if provided
2. Walk UP the tree looking for XROrigin3D ancestor
3. Check ONE LEVEL of children

Since PlayerBody was a sibling, the movement providers couldn't find it.

### Script Path Gotcha
**Problem:** After fixing scene hierarchy, scripts broke!

**Cause:** Scripts had hardcoded paths like `$XROrigin3D/LeftController`

**Fix:** Update all node paths to reflect new hierarchy:
```gdscript
# BEFORE (broken)
@onready var left_controller = $XROrigin3D/LeftController

# AFTER (fixed)
@onready var left_controller = $PlayerBody/XROrigin3D/LeftController
```

**Lesson:** When restructuring scenes, ALWAYS grep for node path references in associated scripts!

### Debug Strategy for VR Apps
Since GDScript print() doesn't show in logcat by default:
1. Add explicit debug prints in _ready()
2. Check node existence with get_node_or_null()
3. Print group membership counts
4. Use visual debug (Label3D) for runtime values

---

## Next: v2 Features
- [x] Joystick locomotion (smooth movement + snap/smooth turning) - FIXED!
- [ ] Better glove models
- [ ] Guitar Hero style combo indicators
- [ ] Sound effects
- [ ] Punch type detection (jab, hook, uppercut)
