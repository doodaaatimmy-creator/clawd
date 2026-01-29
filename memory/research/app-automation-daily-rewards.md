# Mobile App Automation & Daily Rewards Research
*Compiled: January 28, 2026*

---

## PART 1: Bill Pay Setup for Bitcoin Rewards

### Fold App Bill Pay

**What it is:** Fold lets you pay bills via ACH using your Fold account/routing number and earn up to **1.5% back in Bitcoin**.

**Which bills work:**
- ✅ Mortgage payments
- ✅ Rent payments  
- ✅ Credit card payments (Chase, AMEX, etc.)
- ✅ Utilities
- ✅ Insurance
- ✅ Taxes
- ✅ Phone bills

**Setup:**
1. Go to Home tab → grab your account and routing number
2. Add Fold as a payment method at your billers (as a bank account)
3. Set up automatic payments or manual payments
4. At month end, you get a roundup of qualifying spend + expected rewards

**Reward Rates (Fold+ members):**
| Tier | Rate |
|------|------|
| First $2,500 ACH | Up to 1.5% |
| Above $2,500 | 0.25% |

**The catch - Qualifying Spend:**
- Your ACH rewards are CAPPED by your prior month's non-ACH Fold spending
- Example: If you spend $5,000 on Fold card + DCA in Month 1, you can earn rewards on up to $5,000 in ACH bills in Month 2
- This means: you need to USE Fold actively to maximize bill pay rewards

**Optimization Tips:**
1. Max out Fold card spending + bitcoin purchases to unlock higher ACH reward capacity
2. Stack: Credit card → Pay off via Fold ACH → Earn on both
3. Route ALL recurring bills through Fold
4. The PayPal Bill Pay + Fold Card method reportedly works for 99% of billers

**Gotchas:**
- Requires Fold+ subscription (paid)
- Must have qualifying spend from prior month
- Some billers may take 1-3 days for ACH to clear

---

### Lolli - NOT a Bill Pay Service

**Clarification:** Lolli is NOT for bill pay. It's a **shopping cashback app**.

**What Lolli actually does:**
- Browser extension + mobile app
- Earn 0.5% to 30% back in Bitcoin/cash at 25,000+ stores
- Card Boosts for in-store purchases
- Play games in the Arcade for small rewards
- $15 minimum withdrawal

**If you want bill pay + rewards, consider:**

### Bilt Rewards (for Rent specifically)

**What it is:** Credit card + app that lets you pay rent with no transaction fee and earn points.

**How it works:**
- Get Bilt Mastercard (no annual fee)
- Pay rent through Bilt app → pulls from linked bank (doesn't use credit line)
- Earn 1 point per $1 on rent (up to 100k points/year)

**New Bilt 2.0 tiered structure:**
- Must spend 25%+ of your rent amount on everyday purchases to earn 0.5 pts/$1 on housing
- Higher tiers for more spending ratio

**Best for:** Rent specifically, since most landlords don't accept credit cards

---

### Optimal Bill Pay Stack

For maximum Bitcoin rewards on bills:

1. **Rent** → Bilt Rewards OR Fold ACH
2. **Mortgage** → Fold ACH (1-1.5% back)
3. **Credit cards** → Fold ACH to pay off
4. **Utilities** → Fold ACH
5. **Shopping** → Lolli browser extension + Fold Card for the actual purchase

---

## PART 2: Mobile App Automation from Terminal/Desktop

### Android Approaches

#### 1. ADB (Android Debug Bridge) - THE FOUNDATION

**What it is:** Google's official command-line tool for Android device communication.

**Setup on Mac:**
```bash
brew install android-platform-tools
# Enable USB debugging on Android device
# Connect via USB
adb devices  # verify connection
```

**Key automation commands:**
```bash
# Launch an app
adb shell am start -n com.package.name/.MainActivity

# Tap at coordinates
adb shell input tap 500 1200

# Swipe
adb shell input swipe 500 1300 500 400 200  # x1 y1 x2 y2 duration_ms

# Type text
adb shell input text "hello"

# Key events
adb shell input keyevent KEYCODE_HOME
adb shell input keyevent KEYCODE_BACK

# Screenshot
adb shell screencap -p /sdcard/screen.png
adb pull /sdcard/screen.png
```

**Python automation libraries:**
- [androidAutomate](https://github.com/KonradStanski/androidAutomate) - CLI + Python API
- [usefuladbplus](https://github.com/hansalemaos/usefuladbplus) - UI hierarchy inspection + automation
- [android-automator](https://github.com/SzymonLisowiec/android-automator) - Node.js lightweight tool
- [Nico](https://github.com/letmeNo1/Nico) - Full framework for Android automation

**Sample Python script:**
```python
from subprocess import Popen, PIPE
import time

def adb_tap(x, y):
    Popen(['adb', 'shell', 'input', 'tap', str(x), str(y)])
    
def adb_swipe(x1, y1, x2, y2, duration=200):
    Popen(['adb', 'shell', 'input', 'swipe', 
           str(x1), str(y1), str(x2), str(y2), str(duration)])

def launch_app(package):
    Popen(['adb', 'shell', 'am', 'start', '-n', package])

# Example: Open Fold, wait, tap spin button
launch_app('com.fold.app/.MainActivity')
time.sleep(5)
adb_tap(540, 1200)  # Tap spin button coordinates
```

#### 2. Appium - Professional Mobile Automation

**What it is:** Cross-platform automation framework supporting Android + iOS.

**Pros:**
- Write tests/scripts in Python, JS, Java, etc.
- Supports element identification (not just coordinates)
- Works with real devices and emulators

**Setup on Mac:**
```bash
npm install -g appium
pip install Appium-Python-Client

# Start Appium server
appium
```

**Python example:**
```python
from appium import webdriver
from appium.webdriver.common.mobileby import MobileBy

desired_caps = {
    "platformName": "Android",
    "deviceName": "your_device",
    "appPackage": "com.fold.app",
    "appActivity": ".MainActivity",
    "automationName": "UiAutomator2"
}

driver = webdriver.Remote("http://localhost:4723/wd/hub", desired_caps)

# Find and click element
spin_btn = driver.find_element(MobileBy.ACCESSIBILITY_ID, "Spin")
spin_btn.click()
```

**Cons:**
- Complex setup
- Slower than raw ADB
- iOS requires Mac + Xcode

#### 3. scrcpy - Screen Mirroring + Control

**What it is:** Mirror Android screen to desktop, enables mouse/keyboard control.

**Setup:**
```bash
brew install scrcpy
scrcpy  # launches mirror window
```

**Automation approach:**
- Use scrcpy for visual monitoring
- Automate with ADB commands (scrcpy uses ADB under the hood)
- Or use pyautogui to control the scrcpy window

#### 4. Tasker + AutoInput (On-Device)

**What it is:** Android app that automates tasks entirely on the device.

**Best for:** 
- Scheduled daily tasks without computer
- Runs even when disconnected

**Setup:**
1. Install Tasker ($3.49) + AutoInput plugin from Play Store
2. Enable Accessibility Service for AutoInput
3. Create Task with UI interactions
4. Create Profile with Time trigger

**Example: Daily spin at 9am:**
1. Profile: Time → 9:00 AM
2. Task:
   - Launch App: Fold
   - Wait 5s
   - AutoInput Action: Click on "Spin" button
   - Wait 2s
   - AutoInput Action: Click "Collect"

**Pros:** Runs automatically without computer
**Cons:** Requires unlocked phone, can be finicky with UI changes

---

### iOS Approaches

#### The Hard Truth

**iOS is significantly harder to automate than Android** due to Apple's locked-down ecosystem.

| Approach | Jailbreak Required | Difficulty | Reliability |
|----------|-------------------|------------|-------------|
| Shortcuts App | No | Easy | Limited |
| Appium + Mac | No | Hard | Good |
| go-iOS | No | Medium | Good |
| iOS Simulator | No (but devs only) | Medium | Limited |
| Jailbreak tools | Yes | Hard | Full control |

#### 1. iOS Shortcuts App (Built-in, No Jailbreak)

**Capabilities:**
- ✅ Open apps
- ✅ Run at scheduled times
- ✅ Chain multiple actions
- ❌ CANNOT tap buttons inside apps
- ❌ CANNOT interact with arbitrary UI elements

**What you CAN automate:**
- Opening an app at a specific time (just opens, doesn't interact)
- Notification reminders
- Simple URL scheme actions (if app supports)

**Setup:**
1. Open Shortcuts app → Automation tab
2. Create Personal Automation → Time of Day
3. Set time (e.g., 9:00 AM daily)
4. Actions: Open App → Select "Fold"
5. Toggle "Ask Before Running" OFF (requires Face ID)

**Result:** Phone opens Fold at 9am, but YOU still have to tap the spin button manually.

#### 2. go-iOS - Cross-Platform iOS Control

**What it is:** Open-source tool to control iOS devices without Mac (mostly).

**GitHub:** https://github.com/danielpaulus/go-ios

**Capabilities:**
- Launch/kill apps
- Run UI tests
- Install apps
- Doesn't require jailbreak

**Setup:**
```bash
brew tap danielpaulus/go-ios
brew install go-ios

# List devices
ios list

# Launch app
ios launch com.fold.app
```

**Limitation:** Still needs XCUITest for actual UI interactions, which needs Xcode on Mac.

#### 3. Appium for iOS

**Requirements:**
- macOS (can't test iOS from Windows/Linux)
- Xcode installed
- Real device or Simulator
- Apple Developer account (free works)

**Setup:**
1. Install Xcode from App Store
2. `xcode-select --install`
3. Install Appium: `npm install -g appium`
4. Install iOS driver: `appium driver install xcuitest`
5. On device: Settings → Developer → Enable UI Automation

**Pros:** Full UI automation possible
**Cons:** Complex setup, only works on Mac, may need paid dev account for real devices

#### 4. Web Versions as Alternative

Since iOS automation is hard, target web versions when available:

| App | Web Version? | Notes |
|-----|--------------|-------|
| Fold | ❌ No | Mobile only |
| Lolli | ✅ Yes (Chrome extension) | Automate with Playwright |
| Swagbucks | ✅ Yes | Full web interface |
| Microsoft Rewards | ✅ Yes | Bing searches, daily set |
| PCH | ✅ Yes | Can automate entries |

---

### Web-Based Automation (Easiest Path)

#### Playwright/Selenium for Browser Automation

**This is your best bet** for most reward apps with web versions.

**Setup:**
```bash
pip install playwright
playwright install chromium
```

**Example - Automate Swagbucks Daily:**
```python
from playwright.sync_api import sync_playwright

def daily_swagbucks():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        # Login
        page.goto('https://www.swagbucks.com/p/login')
        page.fill('#sbxJx498', 'your_email')
        page.fill('#sbxJxv98', 'your_password')
        page.click('#loginBtn')
        
        # Daily poll
        page.goto('https://www.swagbucks.com/polls')
        page.click('.pollChoice:first-child')
        page.click('.submitPoll')
        
        browser.close()
```

#### Existing Browser Automation Projects

**Microsoft Rewards:**
- [Microsoft-Rewards-Farmer](https://github.com/charlesbel/Microsoft-Rewards-Farmer) ⭐ Most popular
- [bing-rewards](https://github.com/jjjchens235/bing-rewards) - Python + Selenium
- [MS-Rewards-Bot](https://github.com/LightZirconite/Microsoft-Rewards-Bot) - Full featured with Discord notifications

Features: Desktop searches, mobile searches, daily set, quizzes

**Swagbucks:**
- [swagbucks-poll-search-bot](https://github.com/huyszn/swagbucks-poll-search-bot) - Daily poll + search
- [swagbucks-daily-automatizer](https://github.com/danibiro/swagbucks-daily-automatizer) - Selenium-based

**Crypto Faucets:**
- [cryptos-faucets-bot](https://github.com/XternA/cryptos-faucets-bot) - Hourly faucet claims
- [FaucetCryptoBot](https://github.com/souravrs999/FaucetCryptoBot) - PTC ads, shortlinks
- [pyCriptoFaucets](https://github.com/Xpl0itU/pyCriptoFaucets) - Multiple faucets

**Greasemonkey/Tampermonkey Scripts:**
- [greasyfork.org swagbucks scripts](https://greasyfork.org/en/scripts/by-site/swagbucks.com)

---

### Specific Apps to Target

#### Apps WITH Daily Spin/Check-in:

| App | Platform | Web? | Automation Approach |
|-----|----------|------|---------------------|
| **Fold** | iOS/Android | ❌ | ADB (Android) or Tasker |
| **Lolli** | iOS/Android/Web | ✅ | Playwright for extension |
| **Microsoft Rewards** | Web | ✅ | Selenium/Playwright (many bots exist) |
| **Swagbucks** | Web + Mobile | ✅ | Selenium (bots exist) |
| **PCH** | Web + Mobile | ✅ | Playwright (careful - they detect bots) |
| **Mistplay** | Android only | ❌ | ADB/Tasker (risky) |
| **Freecash** | Web | ✅ | Playwright |
| **Cointiply** | Web | ✅ | Selenium |

#### Crypto Faucets with Daily Claims:

- FreeBitco.in - hourly rolls (bots exist)
- FireFaucet - auto-claim system built in
- Cointiply - daily loyalty bonus
- Faucetpay - multi-faucet aggregator

---

### Recommended Tech Stack

**For Android automation:**
```
Android Phone (dedicated if possible)
├── ADB for command execution
├── Python + adb commands for scripting
├── Cron job on Mac for scheduling
└── Optional: Tasker + AutoInput for on-device automation
```

**For iOS automation:**
```
Limited options - focus on:
├── iOS Shortcuts for app launching reminders
├── Web versions via Playwright (primary approach)
└── Manual daily habit (set phone alarm)
```

**For Web rewards:**
```
Mac Terminal
├── Python 3.x
├── Playwright (preferred) or Selenium
├── Persistent browser profile (avoid re-login)
├── Cron/launchd for scheduling
└── Discord webhook for notifications
```

---

## PART 3: Risk Assessment

### Terms of Service Violations

**⚠️ IMPORTANT: Most reward apps explicitly prohibit automation.**

**Microsoft Rewards ToS:**
> "A search is the act of an individual user **manually** entering text for the good faith purpose of obtaining Bing search results... does not include any query entered by a bot, macro, or other automated or fraudulent means"

**What happens if caught:**
1. **Warning** - Temporary suspension
2. **Point forfeiture** - Lose accumulated points
3. **Account ban** - Permanent termination
4. **IP ban** - Can't create new account

### Detection Methods Apps Use:

1. **Timing patterns** - Inhuman consistency (exactly every 24h)
2. **Mouse/touch patterns** - No natural variation
3. **User agent analysis** - Headless browser detection
4. **Behavioral analysis** - Same sequence every time
5. **CAPTCHAs** - Triggered by suspicious activity
6. **Rate limiting** - Too many actions too fast

### Risk Levels by App:

| App | Detection Sophistication | Ban Risk |
|-----|-------------------------|----------|
| Microsoft Rewards | HIGH | High - they actively hunt bots |
| Swagbucks | MEDIUM | Medium - some bots work for years |
| Fold | LOW (mobile only) | Unknown - newer app |
| Crypto faucets | LOW | Low - many tolerate bots |
| PCH | MEDIUM-HIGH | Medium - lawsuit potential |

### Mitigation Strategies:

1. **Randomize timing** - Don't run at exact same time daily
2. **Add delays** - Random pauses between actions (2-10 seconds)
3. **Vary behavior** - Don't follow exact same click path
4. **Use real browser** - Avoid headless mode
5. **Persistent sessions** - Stay logged in like a human
6. **Don't be greedy** - Don't max out every possible reward
7. **One account** - Multiple accounts = definite ban
8. **Keep low profile** - Don't discuss publicly

### What's "Safer":

- ✅ Browser extensions that assist (vs fully automate)
- ✅ iOS Shortcuts that just remind you
- ✅ Single daily task vs continuous farming
- ✅ Low-value rewards (faucets) vs high-value (MS Rewards)

### Legal Considerations:

- Most ToS violations are **civil** not criminal
- They can ban you, not prosecute you
- Exception: Creating fake accounts = potential fraud
- Don't automate anything involving real money movement

---

## Recommended Approach: The Playbook

### Tier 1: Low-Risk, High-Reward (DO THESE)

1. **Fold Bill Pay** - Not automation, just payment routing
   - Set up ACH for mortgage/rent/utilities
   - Legitimate use, passive Bitcoin rewards
   - No ToS risk

2. **Lolli Browser Extension** - Passive cashback
   - Install extension, shop normally
   - Activate deals before checkout
   - No automation needed

3. **Bilt for Rent** - Pay rent, earn points
   - Legitimate service
   - Points transfer to travel partners

### Tier 2: Medium Risk, Assisted Automation

4. **iOS Shortcuts Reminders**
   - Set daily 9am automation to open Fold
   - You tap the spin button manually
   - No ToS violation - you're doing the action

5. **Tasker + AutoInput (Android, careful)**
   - Automate opening app + single tap
   - Add randomization (9:00-9:30am window)
   - Don't run 24/7

### Tier 3: Higher Risk, Full Automation (PROCEED WITH CAUTION)

6. **Microsoft Rewards Farmer**
   - Use existing GitHub projects
   - Run on throwaway account first
   - Accept you might get banned

7. **Crypto Faucet Bots**
   - Lower stakes, lower risk
   - Faucets expect/tolerate some botting
   - Don't do anything requiring KYC'd account

### What I'd Skip:

- ❌ Swagbucks video watching automation (heavily monitored)
- ❌ Multi-account setups (guaranteed ban)
- ❌ Apps with real money cash out (PCH, surveys)
- ❌ Anything involving your main email/identity

---

## Quick Start: Today's Actions

### Android Setup (5 minutes):
```bash
# Install ADB
brew install android-platform-tools

# Enable USB Debugging on phone
# Settings → About → Tap Build Number 7x
# Settings → Developer Options → USB Debugging ON

# Connect phone, verify
adb devices
```

### Fold Bill Pay Setup (10 minutes):
1. Open Fold app → Home tab
2. Copy Account + Routing number
3. Log into your mortgage/rent portal
4. Add as new payment method (bank account)
5. Set up autopay or schedule payment

### Daily Automation Test (Android):
```bash
# Save as ~/scripts/fold-spin.sh
#!/bin/bash
sleep $((RANDOM % 300))  # Random 0-5 min delay
adb shell am start -n com.fold.app/.MainActivity
sleep 5
adb shell input tap 540 1200  # Adjust coordinates
```

### Schedule with cron:
```bash
crontab -e
# Add:
0 9 * * * /Users/you/scripts/fold-spin.sh
```

---

## Resources

### GitHub Repos:
- [Microsoft-Rewards-Farmer](https://github.com/charlesbel/Microsoft-Rewards-Farmer)
- [androidAutomate](https://github.com/KonradStanski/androidAutomate)
- [go-ios](https://github.com/danielpaulus/go-ios)
- [cryptos-faucets-bot](https://github.com/XternA/cryptos-faucets-bot)

### Docs:
- [ADB Command Reference](https://developer.android.com/studio/command-line/adb)
- [Appium Docs](https://appium.io/docs/en/2.0/)
- [Playwright Python](https://playwright.dev/python/docs/intro)

### Communities:
- r/beermoney - General reward app discussion
- r/MicrosoftRewards - MS Rewards specific
- BlackHatWorld forums - Automation discussion (gray hat)
