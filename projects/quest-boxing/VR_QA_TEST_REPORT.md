# VR QA Test Report - Knockout Boxing

**Build:** v2-locomotion-fix  
**Date:** 2026-01-29  
**Tester:** Donny 🦾 + Winn (manual verification)  
**Platform:** Meta Quest  

---

## Changes in This Build

### Bug Fix: Locomotion Not Working
**Root Cause:** Scene hierarchy was wrong. `PlayerBody` was a sibling of `XROrigin3D` instead of containing it.

**Fix Applied:**
```
BEFORE (broken):
TrainingGym
├── XROrigin3D
│   ├── LeftController → MovementDirect
│   └── RightController → MovementTurn
└── PlayerBody  ← SIBLING (can't find each other)

AFTER (fixed):
TrainingGym
├── PlayerBody  ← NOW CONTAINS XROrigin3D
│   └── XROrigin3D
│       ├── LeftController → MovementDirect
│       └── RightController → MovementTurn
└── ... rest of scene
```

**Files Modified:**
- `game/training/training_gym.tscn`
- `game/active/active_arena.tscn`

---

## Test Checklist

### 1. App Launch & VR Rendering
| Test | Expected | Status |
|------|----------|--------|
| App launches without crash | Opens to start screen | ⬜ |
| VR rendering works (not black) | Can see environment | ⬜ |
| Head tracking functional | Scene moves with head | ⬜ |
| Controllers visible | See gloves in VR | ⬜ |
| Controller tracking accurate | Gloves follow hands | ⬜ |

### 2. Start Menu Navigation
| Test | Expected | Status |
|------|----------|--------|
| Menu UI visible | Can see start UI | ⬜ |
| Pointer laser works | Laser from controllers | ⬜ |
| Can select Training | Button responds to trigger | ⬜ |
| Can select Active Mode | Button responds to trigger | ⬜ |
| Scene transitions work | Loads new scene smoothly | ⬜ |

### 3. Locomotion (THE FIX)
| Test | Expected | Status |
|------|----------|--------|
| **Left stick forward** | Player moves forward | ⬜ |
| **Left stick backward** | Player moves backward | ⬜ |
| **Left stick left (strafe)** | Player strafes left | ⬜ |
| **Left stick right (strafe)** | Player strafes right | ⬜ |
| **Right stick left** | Player rotates left | ⬜ |
| **Right stick right** | Player rotates right | ⬜ |
| Movement feels smooth | No jitter or lag | ⬜ |
| Collision with walls works | Can't walk through floor | ⬜ |

### 4. Training Mode - Heavy Bag
| Test | Expected | Status |
|------|----------|--------|
| Heavy bag visible | Can see bag in gym | ⬜ |
| Bag reacts to punches | Swings/moves on hit | ⬜ |
| Hit detection works | Registers contact | ⬜ |
| Stats update | Punch count increases | ⬜ |
| Can navigate TO bag | Locomotion works here | ⬜ |
| Can navigate AWAY | Can move freely | ⬜ |

### 5. Training Mode - Speed Bag
| Test | Expected | Status |
|------|----------|--------|
| Speed bag visible | Can see bag | ⬜ |
| Bag responds to hits | Moves on contact | ⬜ |
| Can reach bag | Locomotion lets you position | ⬜ |

### 6. Active Mode (Arena)
| Test | Expected | Status |
|------|----------|--------|
| Scene loads | Arena visible | ⬜ |
| Environment looks good | Mountains, clouds, platform | ⬜ |
| Locomotion works here too | Can move around arena | ⬜ |
| UI visible | Score/combo labels | ⬜ |

### 7. Navigation Between Scenes
| Test | Expected | Status |
|------|----------|--------|
| Return to menu works | Back button functional | ⬜ |
| Can switch between modes | Training ↔ Active | ⬜ |
| No crashes on transitions | Stable scene changes | ⬜ |

### 8. Performance
| Test | Expected | Status |
|------|----------|--------|
| Stable framerate | No judder/stuttering | ⬜ |
| No dropped frames | Smooth visuals | ⬜ |
| Responsive controls | No input lag | ⬜ |

---

## How to Run Tests

### Remote Testing (from Mac):
```bash
cd /Users/clawdchad/clawd/projects/quest-boxing

# Check status
./tools/vr-qa status

# View live logs
./tools/vr-qa logs

# Restart app
./tools/vr-qa restart

# Take screenshot (limited use in VR)
./tools/vr-qa screenshot
```

### Manual Testing (in headset):
1. Put on Quest headset
2. App should auto-launch (or find in Unknown Sources)
3. Test each checkbox above
4. Report results back

---

## Known Limitations
- Screenshots from `adb screencap` only capture 2D view, not VR rendering
- GDScript print statements don't appear in logcat by default
- Need user in headset to verify VR-specific behavior

---

## Test Results

### Session 1: 2026-01-29 @ 2:27 PM MST

**Build deployed:** ✅  
**App launches:** ⬜ (pending Winn verification)  
**Locomotion working:** ⬜ (pending Winn verification)  

**Notes:**
- Fixed PlayerBody hierarchy in training_gym.tscn and active_arena.tscn
- XROrigin3D is now a child of PlayerBody (correct XRTools structure)
- Movement providers should now find PlayerBody via parent chain lookup

### Session 2: 2026-01-29 @ 2:35 PM MST (Post-Script Fix)

**Additional Bug Found:** GDScript node paths were wrong after scene restructure!

**Issue:** Scripts still referenced `$XROrigin3D/LeftController` but the new hierarchy is `$PlayerBody/XROrigin3D/LeftController`

**Files Fixed:**
- `game/training/training_gym.gd` - Updated all controller/camera references
- `game/active/active_arena.gd` - Updated all controller/camera references

**Added Debug Logging:** Both scripts now print:
- "PlayerBody found!" or "ERROR - PlayerBody NOT found!"
- "XROrigin3D found under PlayerBody!" or ERROR
- Count of movement providers found
- Names of all movement providers

**Build v2 deployed:** ✅ @ 2:35 PM  
**App running:** ✅ (PID: 11380)  
**Pending Winn verification:** Locomotion, punching, scene transitions

---

## Next Steps If Issues Found

1. **If still no locomotion:**
   - Add debug prints to movement scripts
   - Check if PlayerBody._ready() finds movement providers
   - Verify XRTools addon version compatibility

2. **If black screen:**
   - Check `get_viewport().use_xr = true` in scene script
   - Verify OpenXR initialization

3. **If crashes:**
   - Check adb logcat for stack traces
   - Look for null reference errors in scene loading

---

*Report generated by Donny 🦾*
