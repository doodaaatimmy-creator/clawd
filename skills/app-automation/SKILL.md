# App Automation Skill

**Description:** Control macOS applications via AppleScript/System Events. Move windows, click menus, send keystrokes, and automate workflows.

## Overview

This skill provides macOS desktop automation through:
1. **System Events** - UI automation, menu access, keystrokes
2. **AppleScript** - Direct application scripting  
3. **osascript CLI** - Execute scripts from shell

## Key Learnings

### What Works Well
- **Keystrokes via System Events** - Fast, reliable for shortcuts
- **Window positioning/sizing** - Direct System Events commands
- **Menu enumeration** - Getting menu structure from native apps
- **Activating apps** - `tell application "X" to activate`

### What's Slow/Problematic
- **Direct menu clicking** - Can hang on non-native apps (Godot, Electron)
- **Deep UI element traversal** - Enumerating all elements takes forever
- **Non-Cocoa apps** - Custom UI frameworks may not expose full accessibility tree

### Best Practices
1. **Keystrokes > Menu clicks** for speed and reliability
2. **Timeout all commands** - AppleScript can hang indefinitely
3. **Activate app first** - Always bring to front before sending keys
4. **Use small delays** - `delay 0.3` between activate and keystroke

## Quick Reference

### Get Running Apps
```bash
osascript -e 'tell application "System Events" to get name of every process whose background only is false'
```

### Get App Menu Structure
```bash
osascript -e 'tell application "System Events"
    tell process "AppName"
        get name of every menu bar item of menu bar 1
    end tell
end tell'
```

### Get Window Info
```bash
osascript -e 'tell application "System Events"
    tell process "AppName"
        set w to window 1
        return "Position: " & (position of w) & ", Size: " & (size of w)
    end tell
end tell'
```

### Send Keystroke (PREFERRED METHOD)
```bash
osascript <<'EOF'
tell application "AppName" to activate
delay 0.3
tell application "System Events"
    keystroke "f" using {control down, command down}
end tell
EOF
```

### Move/Resize Window
```bash
osascript -e 'tell application "System Events"
    tell process "AppName"
        set position of window 1 to {100, 100}
        set size of window 1 to {1280, 720}
    end tell
end tell'
```

### Click Menu Item (may be slow on non-native apps)
```bash
osascript -e 'tell application "System Events"
    tell process "AppName"
        click menu item "MenuItemName" of menu "MenuName" of menu bar item "MenuName" of menu bar 1
    end tell
end tell'
```

## Common Keyboard Shortcuts

| Action | Shortcut | osascript |
|--------|----------|-----------|
| Fullscreen | Ctrl+Cmd+F | `keystroke "f" using {control down, command down}` |
| Close Window | Cmd+W | `keystroke "w" using command down` |
| Quit App | Cmd+Q | `keystroke "q" using command down` |
| Save | Cmd+S | `keystroke "s" using command down` |
| New | Cmd+N | `keystroke "n" using command down` |
| Copy | Cmd+C | `keystroke "c" using command down` |
| Paste | Cmd+V | `keystroke "v" using command down` |
| Undo | Cmd+Z | `keystroke "z" using command down` |
| Select All | Cmd+A | `keystroke "a" using command down` |

## MCP Integration

For Claude Code / Claude Desktop, these MCP servers provide native integration:

### @peakmojo/applescript-mcp
Simple, less than 100 lines. Full Mac control.
```bash
claude mcp add applescript -- npx @peakmojo/applescript-mcp
```

### @steipete/macos-automator-mcp  
200+ pre-built automation scripts with knowledge base.
```bash
claude mcp add macos_automator -- npx -y @steipete/macos-automator-mcp@latest
```

## Permissions Required

1. **System Settings > Privacy & Security > Accessibility**
   - Add Terminal (or the app running osascript)
   
2. **System Settings > Privacy & Security > Automation**
   - Allow Terminal to control target apps

## Troubleshooting

### Commands hang indefinitely
- Use timeout in shell: `timeout 10 osascript -e '...'`
- Or use exec timeout parameter when calling from Moltbot

### App not responding to AppleScript
- Non-Cocoa apps (Electron, Qt, Godot) may have limited accessibility
- **Workaround:** Use keystrokes instead of menu clicks
- **Workaround:** Use screen coordinates with `click at {x, y}`

### Permission denied errors
1. Open System Settings > Privacy & Security > Accessibility
2. Click the lock icon to make changes
3. Add Terminal.app (or your shell app)
4. Restart Terminal

### UI elements not found
- App may use custom UI framework
- Try `entire contents of window 1` to see available elements (WARNING: slow)
- Use Accessibility Inspector.app to explore UI hierarchy

## App-Specific Notes

### Godot Engine
- Custom UI, limited AppleScript accessibility
- **Use keystrokes** - Menu clicking hangs
- Window positioning works via System Events

### Electron Apps (VS Code, Slack, Discord)
- Chromium-based, partial accessibility
- Keystrokes work reliably
- May need `delay` between actions

### Native macOS Apps (Finder, Safari, Mail)
- Full AppleScript support
- Direct application scripting often faster than System Events
- Example: `tell application "Safari" to get URL of current tab of window 1`

## Example: Control Godot

```bash
# Make Godot fullscreen
osascript <<'EOF'
tell application "Godot" to activate
delay 0.3
tell application "System Events"
    keystroke "f" using {control down, command down}
end tell
EOF

# Position Godot window at 100,100 with size 1280x720
osascript -e 'tell application "System Events"
    tell process "Godot"
        set position of window 1 to {100, 100}
        set size of window 1 to {1280, 720}
    end tell
end tell'

# Save current scene (Cmd+S)
osascript <<'EOF'
tell application "Godot" to activate
delay 0.2
tell application "System Events"
    keystroke "s" using command down
end tell
EOF
```

## Pipeline for New Apps

1. **Identify app** - Get process name from running apps
2. **Check accessibility** - Try basic window info
3. **Enumerate menus** - Get menu structure
4. **Test keystrokes** - Most reliable method
5. **Document shortcuts** - Build app-specific reference
6. **Create automation scripts** - Combine for workflows

---

*Last updated: 2026-01-29*
*This skill is part of the meta-skill: learning to automate ANY application*
