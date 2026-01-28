# ChipZone - Golf Chipping Gamification App
## Product Specification v1.0

---

## Executive Summary

**ChipZone** transforms backyard golf practice into an engaging, data-driven game. Using your phone's camera and AR capabilities, the app maps your practice area, lets you set virtual targets, tracks where your chips land, and gamifies the experience with scoring, challenges, and progression systems.

**The insight:** Launch monitors like Garmin R10 ($600+) and FlightScope Mevo ($2,000+) are expensive and overkill for casual chipping practice. There's a gap between "just chip toward a bucket" and "full professional tracking system."

---

## Market Research & Competitive Landscape

### Direct Competitors

| App | What It Does | Gaps |
|-----|--------------|------|
| **4Par** | AR targets for putting/chipping, stats tracking | Requires manual ball landing input, no automatic tracking |
| **Shot Tracer** | Ball flight tracing for video (post-recording) | Not real-time, focused on full swings not chipping |
| **PuttView X** | AR putting with HoloLens ($5,000+) | Expensive, putting-only, requires special hardware |
| **Head to Head Golf AR** | AR virtual golf game | Simulated physics, not real ball tracking |

### Hardware Competitors

| Device | Price | Notes |
|--------|-------|-------|
| Garmin Approach R10 | $599 | Doppler radar, full swing focused |
| FlightScope Mevo | $500 | 2D data only, requires metallic stickers on balls |
| FlightScope Mevo+ | $2,000 | Full 3D tracking, overkill for backyard |
| Rapsodo MLM2 Pro | $699 | Camera-based, needs outdoor light |

### The Gap We're Filling

- **Price:** Free app vs $500+ hardware
- **Use case:** Short game practice (chipping, pitching) vs full swings
- **Simplicity:** Point phone, chip ball, get score vs complex setup
- **Gamification:** Games, challenges, streaks vs just data

---

## Technical Research: Ball Detection & Tracking

### Approach 1: Apple Vision Framework (iOS - Recommended for MVP)

**VNDetectTrajectoriesRequest** - Purpose-built for this exact use case.

Key findings from research:
- Built into iOS 14+, no ML model needed
- Detects parabolic trajectories automatically
- Provides: detected points, projected trajectory, quadratic equation coefficients, confidence score
- Working implementation exists: [Mizuno Corp's IdentifyingBallTrajectoriesinVideo](https://github.com/MIZUNO-CORPORATION/IdentifyingBallTrajectoriesinVideo)
- Tested with golf balls specifically

**Configuration for golf balls:**
```swift
var request = VNDetectTrajectoriesRequest(
    frameAnalysisSpacing: .zero,  // Analyze all frames
    trajectoryLength: 10,          // 10 points for golf ball trajectory
    completionHandler: completionHandler
)
request.objectMinimumNormalizedRadius = 0.01  // Filter tiny noise
request.objectMaximumNormalizedRadius = 0.1   // Filter large objects
```

**Limitations:**
- Requires static background (camera on tripod/mount)
- Struggles with very fast motion blur
- Works best with high contrast (white ball on grass)

### Approach 2: YOLO + Kalman Filter (Cross-platform)

For Android or more custom needs:

**Available resources:**
- [rucv/golf_ball](https://github.com/rucv/golf_ball) - CNN + Kalman filter paper & code
- [RyanShihabi/Golf-Ball-Broadcast-Model](https://github.com/RyanShihabi/Golf-Ball-Broadcast-Model) - YOLOv8 Nano trained on golf broadcasts
- [Roboflow golf ball datasets](https://universe.roboflow.com/search?q=class:golfball) - Multiple datasets available:
  - 17,460 images (anna-gaming/golfball)
  - 1,171 images with holes (sai-gon-university/golf-ball-and-hole-detection)
  - 185 images (appleroot/golf-ball-detection)

**Architecture:**
1. Kalman filter predicts ball region
2. YOLO detects ball within predicted region
3. Combine for robust tracking even with occlusion

### Approach 3: ARKit Ground Plane + Landing Detection

**For landing zone mapping:**
- ARKit plane detection for ground surface
- LiDAR (iPhone Pro) for precise ground mesh
- Anchor targets at specific AR coordinates
- Calculate ball landing relative to anchors

**Challenge:** ARKit struggles with fast-moving objects. Use Vision for trajectory, ARKit for environment mapping.

### Recommended Technical Stack

**iOS MVP (fastest to market):**
- ARKit: Ground plane detection, target placement
- Vision Framework: VNDetectTrajectoriesRequest for ball tracking
- RealityKit: AR visualization
- Core ML: Optional custom model for low-light conditions

**Android (Phase 2):**
- ARCore: Ground plane detection
- TensorFlow Lite + YOLO: Ball detection
- Kalman filter: Trajectory prediction

---

## Core User Flow

### Setup (First Launch)
1. Tutorial explaining the concept
2. Permission requests (camera, motion)
3. "Let's map your yard" - pan camera around practice area
4. Place first target (bucket, flag, towel as marker)

### Practice Session
1. **Place phone on tripod/mount** (stable position required)
2. **Verify camera view** - shows practice area with AR overlay
3. **Set target** - tap to place virtual target rings at landing zone
4. **Chip ball** - app auto-detects trajectory and landing
5. **See results** - landing spot highlighted, distance from target, score
6. **Repeat** - accumulate points, track streaks

### Post-Session
1. Session summary (shots, accuracy, best/worst)
2. Progress graphs over time
3. Share highlights (optional)
4. Unlock achievements

---

## MVP Features (v1.0)

### Must Have
- [ ] Phone mount/tripod mode (static camera)
- [ ] Ground plane detection
- [ ] Single target placement (virtual bullseye)
- [ ] Ball trajectory detection (Vision framework)
- [ ] Landing spot calculation
- [ ] Distance-from-target scoring
- [ ] Session history (local storage)
- [ ] Basic stats (accuracy, average distance)

### Nice to Have (v1.0)
- [ ] Multiple target rings (closer = more points)
- [ ] "Closest to the pin" game mode
- [ ] Sound effects on landing
- [ ] Share session screenshot

### Explicitly NOT in MVP
- ❌ Multi-player
- ❌ Club recommendation
- ❌ Swing analysis
- ❌ Ball speed/spin data
- ❌ Android version
- ❌ Cloud sync

---

## Future Features (v2.0+)

### Games & Modes
- **Target Golf:** 9 holes around the yard, par scores
- **Elimination:** Progressive difficulty, 3 strikes you're out
- **Time Attack:** Most accurate chips in 60 seconds
- **Trick Shots:** Hit specific trajectories for bonus points
- **Daily Challenge:** Global leaderboard, same target setup for everyone

### Social
- Challenge friends (async)
- Share clips with trajectory overlay
- Local multiplayer (pass the phone)
- Leaderboards by handicap tier

### Advanced Tech
- **LiDAR precision mode** (iPhone Pro)
- Automatic ball collection tracking
- Multiple ball detection (practice bucket)
- Swing video capture with trajectory overlay
- Integration with Shot Tracer for full swing days

### Hardware Add-on (v3.0?)
- Bluetooth-enabled targets with impact detection
- LED rings that confirm landing zone
- Works at night/low light

---

## Monetization Strategy

### Freemium Model (Recommended)

**Free Tier:**
- 3 practice sessions per day
- Basic single target mode
- 7-day history
- Ads between sessions

**Pro Subscription ($4.99/month or $29.99/year):**
- Unlimited sessions
- All game modes
- Full history & analytics
- Cloud backup
- No ads
- Custom targets & themes

**Why subscription over one-time:**
- Ongoing server costs for future social features
- Continuous updates and game modes
- $4.99 is "cup of coffee" price point
- Golf demographic has spending power

### Alternative: Hardware Bundle (Future)

Partner with phone mount manufacturer or create branded "ChipZone Stand":
- Phone mount optimized for yard viewing angle
- Optional LED target marker
- Bundle with 1-year Pro subscription
- Price: $49.99

---

## Unique Angles / Differentiation

1. **Phone-only, no expensive hardware** - Democratizes practice tracking
2. **Games first, data second** - Fun > charts (though charts are there)
3. **Short game focus** - Underserved niche vs full-swing trackers
4. **Backyard/indoor ready** - Works in any space, any surface
5. **Social/competitive hooks** - Daily challenges, friend battles
6. **"Proof mode"** - Record chip-ins with verified AR overlay

### Marketing Hooks
- "Turn your backyard into a practice facility"
- "The gamification your short game needs"
- "No $600 launch monitor required"
- "Challenge your golf buddies without leaving home"

---

## Technical Requirements

### Minimum Device Specs

**iOS (Primary):**
- iPhone 11 or newer (for ARKit 3+ performance)
- iOS 14+ (Vision trajectory detection)
- A12 chip or newer
- Camera: 12MP or higher

**Ideal:**
- iPhone 12 Pro+ with LiDAR
- Good outdoor lighting
- Phone mount/tripod

### Sensors Used
- Main camera (30fps minimum)
- Gyroscope/accelerometer (camera stability detection)
- LiDAR (optional, for precision ground mapping)

### Not Required
- Internet (offline-capable for core features)
- GPS (yard size doesn't need it)
- Additional hardware

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Ball detection fails in variable lighting | High | High | Require high-contrast balls, add "detection confidence" indicator, fallback to manual tap |
| Users don't have tripod/mount | Medium | High | Partner with $15 Amazon tripod, show DIY options, allow handheld mode with reduced accuracy |
| VNDetectTrajectories too CPU-intensive | Medium | Medium | Add "battery saver" mode with reduced frame analysis |
| Competitors copy quickly | Medium | Low | First mover + strong game mechanics = retention moat |
| Users expect launch monitor accuracy | Low | High | Clear marketing: "practice game, not data tool" |

---

## Validation Plan (MVP Testing)

### Phase 1: Technical Proof of Concept (2 weeks)
1. Build ball trajectory detection using VNDetectTrajectoriesRequest
2. Test with different balls (white, yellow, orange)
3. Test in different lighting (morning, noon, evening)
4. Measure detection success rate (target: >80%)

### Phase 2: Core Loop Prototype (2 weeks)
1. Add AR ground plane + target placement
2. Calculate landing distance from target
3. Basic scoring UI
4. Test with 5 golfers, gather feedback

### Phase 3: Closed Beta (4 weeks)
1. Add session history, basic stats
2. TestFlight with 50-100 golfers
3. Metrics: retention (D1, D7), sessions per user, NPS
4. Iterate based on feedback

### Phase 4: Public Launch
1. App Store submission
2. Golf subreddit soft launch
3. Golf influencer seeding
4. Measure CAC vs LTV

---

## Success Metrics

**MVP Success (3 months post-launch):**
- 10,000 downloads
- 20% D7 retention
- 5% conversion to Pro
- 4.0+ App Store rating

**Product-Market Fit Indicators:**
- Users practicing 3+ times per week
- Organic word-of-mouth growth
- Feature requests for more game modes
- Golf influencers using without payment

---

## Open Questions

1. Should we require a tripod or try to support handheld?
2. What color golf balls should we optimize for first?
3. Partner with chipping net manufacturers for bundle deals?
4. Build Android simultaneously or iOS-first?
5. Is there a B2B angle (golf instructors, academies)?

---

## Next Steps

1. **Prototype ball detection** - Can we reliably detect a golf ball's trajectory using VNDetectTrajectoriesRequest?
2. Test landing spot calculation accuracy
3. User interviews with casual golfers about practice habits
4. Competitive deep-dive on 4Par (download, test, find gaps)

---

## Appendix: Key Resources

### Open Source Models & Code
- [MIZUNO-CORPORATION/IdentifyingBallTrajectoriesinVideo](https://github.com/MIZUNO-CORPORATION/IdentifyingBallTrajectoriesinVideo) - Apple Vision trajectory detection, tested with golf
- [rucv/golf_ball](https://github.com/rucv/golf_ball) - CNN + Kalman filter research paper
- [RyanShihabi/Golf-Ball-Broadcast-Model](https://github.com/RyanShihabi/Golf-Ball-Broadcast-Model) - YOLOv8 Nano for golf balls
- [onkar-99/Golf-Ball-Tracking](https://github.com/onkar-99/Golf-Ball-Tracking) - YOLOv5 + optical flow approach

### Datasets
- [Roboflow golfball datasets](https://universe.roboflow.com/search?q=class:golfball) - 17k+ labeled images

### Apple Documentation
- [VNDetectTrajectoriesRequest](https://developer.apple.com/documentation/vision/vndetecttrajectoriesrequest)
- [Building a feature-rich app for sports analysis](https://developer.apple.com/documentation/vision/building-a-feature-rich-app-for-sports-analysis)
- [Tracking and visualizing planes](https://developer.apple.com/documentation/arkit/tracking-and-visualizing-planes)

### Reference Apps
- 4Par (App Store) - AR targets for putting/chipping
- Shot Tracer (App Store) - Ball flight tracing
- Garmin Golf (App Store) - R10 companion app

---

*Last updated: January 2026*
*Author: ChipZone Product Team*
