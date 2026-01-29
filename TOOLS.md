# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH
- home-server → 192.168.1.100, user: admin

### TTS
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## Browser Relay (Chrome)

### Troubleshooting: "tab not found" errors

When browser actions fail with "tab not found" but `tabs` still lists them:
1. The CDP websocket connections are stale (tabs exist but aren't responding)
2. **Recovery steps:**
   - `close` action still works on stale tabs
   - Close all orphaned tabs
   - `open` a fresh tab to the target URL
   - Proceed with snapshot/act

**Don't:** Keep retrying the same broken connection
**Do:** Close stale tabs → open fresh → continue

This happens when Chrome tabs have been idle too long or the relay connection hiccupped.

---

Add whatever helps you do your job. This is your cheat sheet.
