# ChipZone Ball Detection Prototype

## Objective

Validate that we can reliably detect golf ball trajectories using Apple's Vision framework (VNDetectTrajectoriesRequest) on an iPhone.

## Success Criteria

- **>80% detection rate** for white golf balls on grass
- **<50ms latency** from ball launch to trajectory display
- **Landing accuracy** within 6 inches of actual landing spot
- Works in **daylight outdoor conditions**

## Prototype Scope

### In Scope
- Ball trajectory detection (VNDetectTrajectoriesRequest)
- Visual overlay showing detected trajectory
- Landing spot estimation
- Basic stats display (detection confidence, trajectory length)

### Out of Scope
- AR ground mapping
- Target placement
- Scoring/gamification
- UI polish

## Technical Approach

### Step 1: Basic Trajectory Detection

```swift
import Vision
import AVFoundation

class BallTracker {
    var trajectoryRequest: VNDetectTrajectoriesRequest!
    
    func setupRequest() {
        trajectoryRequest = VNDetectTrajectoriesRequest(
            frameAnalysisSpacing: .zero,
            trajectoryLength: 10
        ) { [weak self] request, error in
            self?.handleTrajectoryResults(request.results)
        }
        
        // Golf ball is small relative to frame
        trajectoryRequest.objectMinimumNormalizedRadius = 0.005
        trajectoryRequest.objectMaximumNormalizedRadius = 0.05
    }
    
    func handleTrajectoryResults(_ results: [Any]?) {
        guard let observations = results as? [VNTrajectoryObservation] else { return }
        
        for observation in observations {
            // Detected trajectory points
            let detectedPoints = observation.detectedPoints
            
            // Projected trajectory (quadratic fit)
            let projectedPoints = observation.projectedPoints
            
            // Confidence score
            let confidence = observation.confidence
            
            // Display trajectory...
        }
    }
}
```

### Step 2: Camera Pipeline

```swift
class CameraManager: NSObject, AVCaptureVideoDataOutputSampleBufferDelegate {
    let captureSession = AVCaptureSession()
    let sequenceHandler = VNSequenceRequestHandler()
    
    func setupCamera() {
        captureSession.sessionPreset = .hd1920x1080
        
        guard let camera = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back),
              let input = try? AVCaptureDeviceInput(device: camera) else { return }
        
        captureSession.addInput(input)
        
        let output = AVCaptureVideoDataOutput()
        output.setSampleBufferDelegate(self, queue: DispatchQueue(label: "vision"))
        captureSession.addOutput(output)
    }
    
    func captureOutput(_ output: AVCaptureOutput, 
                       didOutput sampleBuffer: CMSampleBuffer, 
                       from connection: AVCaptureConnection) {
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        
        try? sequenceHandler.perform(
            [trajectoryRequest],
            on: pixelBuffer,
            orientation: .right
        )
    }
}
```

### Step 3: Trajectory Visualization

Draw detected and projected points as overlay on camera preview.

### Step 4: Landing Estimation

Last point of detected trajectory approximates landing. Apply gravity physics to projected quadratic for better estimate:

```swift
func estimateLanding(from observation: VNTrajectoryObservation, frameHeight: CGFloat) -> CGPoint? {
    let coefficients = observation.equationCoefficients
    let a = coefficients.x  // quadratic term
    let b = coefficients.y  // linear term
    let c = coefficients.z  // constant
    
    // Solve for y = 0 (ground level, normalized)
    // ax² + bx + c = 0
    let discriminant = b*b - 4*a*c
    guard discriminant >= 0 else { return nil }
    
    let x1 = (-b + sqrt(discriminant)) / (2*a)
    let x2 = (-b - sqrt(discriminant)) / (2*a)
    
    // Take the forward solution (ball moving in +x direction typically)
    let landingX = max(x1, x2)
    
    return CGPoint(x: CGFloat(landingX), y: 0)
}
```

## Test Plan

### Test 1: Static Ball Detection
- Place ball on grass, verify it doesn't trigger trajectory
- Roll ball slowly, verify trajectory detects

### Test 2: Chip Shot Detection
- Standard chip from 10 yards
- Measure detection rate over 20 shots
- Record: detection success, confidence, point count

### Test 3: Variable Conditions
- Morning light (low sun angle)
- Midday light (harsh shadows)
- Overcast (diffuse light)
- Different ball colors (white, yellow, orange)

### Test 4: Landing Accuracy
- Place marker at actual landing spots
- Compare to app's estimated landing
- Measure error in inches

## Reference Implementation

Clone and study: [MIZUNO-CORPORATION/IdentifyingBallTrajectoriesinVideo](https://github.com/MIZUNO-CORPORATION/IdentifyingBallTrajectoriesinVideo)

This is a working iOS app using VNDetectTrajectoriesRequest for golf ball tracking.

## Files to Create

```
ChipZonePrototype/
├── ChipZonePrototype.xcodeproj
├── ChipZonePrototype/
│   ├── AppDelegate.swift
│   ├── SceneDelegate.swift
│   ├── CameraViewController.swift    # Camera setup & preview
│   ├── BallTracker.swift             # Vision request handling
│   ├── TrajectoryOverlayView.swift   # Draw trajectories
│   ├── StatsView.swift               # Display detection stats
│   └── Info.plist                    # Camera permission
└── README.md
```

## Estimated Time

- Day 1: Camera pipeline + basic trajectory detection
- Day 2: Visualization overlay
- Day 3: Landing estimation + stats
- Day 4-5: Testing in real conditions

## Go/No-Go Decision

After prototype testing:

**GO if:**
- Detection rate >80% in good conditions
- Landing accuracy within 12 inches
- Users find it "magical" in demos

**NO-GO if:**
- Detection rate <60% consistently
- Requires specific ball colors/brands
- Performance issues on iPhone 12

**PIVOT if:**
- Detection works but landing accuracy poor → Consider manual "tap where it landed" fallback
- Works only in perfect conditions → Market as "outdoor daylight only" feature

---

## Quick Start Commands

```bash
# Clone reference implementation
git clone https://github.com/MIZUNO-CORPORATION/IdentifyingBallTrajectoriesinVideo.git

# Open in Xcode
cd IdentifyingBallTrajectoriesinVideo
open IdentifyingBallTrajectoriesinVideo.xcodeproj

# Build and run on device (simulator won't work - needs real camera)
```

Test with a golf ball, verify it works, then adapt for ChipZone prototype.
