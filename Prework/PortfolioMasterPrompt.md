# 🧠 VIDHEY BHOGADI — 3D PORTFOLIO MASTER PROMPT
### For: Antigravity (Site Build) + Google Veo (Intro Video)
### Version: 1.0 | March 2026

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 1 — ANTIGRAVITY MASTER PROMPT
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

### 🎯 PROJECT BRIEF

Build a **world-class, attention-grabbing 3D portfolio website** for **Vidhey Bhogadi** — a Systems Engineer (SDE + SDET hybrid) at Tata Consultancy Services, working for Morgan Stanley's Wealth Management division. The site must communicate: *"This person is not a developer — they are a cyborg engineer from the future."*

The site must seize full attention **within 3 seconds** of opening. Every scroll, hover, click, and cursor movement must feel like an interaction with living technology. The narrative arc of the entire site is:

> **Human → Cyborg → Processor → Code → Skills → Legacy**

This is not a resume site. This is a **cinematic experience**.

---

### 🎨 DESIGN SYSTEM

#### Color Palette — "CyberSynth"
A fusion of Cyber Black + Electric Blue + Neon Cyan + Midnight Purple + Electric Pink.

```
--color-void:         #000000   /* Pure black base */
--color-deep:         #040810   /* Deep space background */
--color-surface:      #0a0f1e   /* Card/section surfaces */
--color-border:       #0d1f3c   /* Subtle borders */

--color-cyber-blue:   #00d4ff   /* Primary neon — electric cyan-blue */
--color-neon-cyan:    #00ffea   /* Bright accent — glowing circuits */
--color-purple-deep:  #6c00ff   /* Synthwave purple — deep */
--color-purple-mid:   #9b59ff   /* Synthwave purple — mid glow */
--color-pink-neon:    #ff2d9b   /* Electric pink — synthwave pop */
--color-pink-soft:    #ff6ec7   /* Soft pink hover state */
--color-gold:         #ffd700   /* Award/achievement accent */

--color-text-primary: #e8f4ff   /* Near-white with blue tint */
--color-text-dim:     #7a9cc0   /* Dimmed secondary text */
--color-text-glow:    #00d4ff   /* Glowing text accent */

/* Gradients */
--gradient-hero:      linear-gradient(135deg, #6c00ff 0%, #00d4ff 50%, #ff2d9b 100%);
--gradient-card:      linear-gradient(145deg, rgba(0,212,255,0.08), rgba(108,0,255,0.05));
--gradient-glow:      radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%);
```

#### Typography
```
Display Font:    "Orbitron" (Google Fonts) — geometric, futuristic, for headings
Body Font:       "JetBrains Mono" — developer/terminal aesthetic for body copy
Accent Font:     "Exo 2" — clean tech for subtitles and labels
Data Font:       "Space Mono" — for metrics, percentages, stats
```

#### Core Visual Rules
- **NEVER** use white backgrounds. Everything is void black or deep space navy.
- All glows use `box-shadow` and `text-shadow` with neon cyan or electric blue.
- Circuit board patterns as subtle SVG background overlays on all sections.
- Noise texture grain overlay at 4% opacity on the entire site for cinematic depth.
- All borders use 1px with `rgba(0, 212, 255, 0.2)` — glowing but subtle.
- Hover states always intensify glow — never just change color.

---

### ⚡ TECH STACK

```
Framework:       React 18 + Vite
3D Engine:       Three.js + React Three Fiber (R3F) + Drei
Scroll Engine:   GSAP ScrollTrigger + Lenis (smooth scroll)
Animation:       Framer Motion 11 + GSAP 3
3D Models:       Three.js GLTFLoader (custom cyborg/processor models)
Shaders:         GLSL custom vertex/fragment shaders for morph effects
Particles:       Tsparticles or custom Three.js particle system
Cursor:          Custom canvas-based cursor engine
Audio:           Howler.js (cyberpunk ambient + interaction sounds)
Physics:         Cannon.js or Rapier (for floating card physics)
Fonts:           Google Fonts (Orbitron, JetBrains Mono, Exo 2, Space Mono)
Icons:           Lucide React + custom SVG set
Deployment:      Vercel (with edge functions for contact form)
Performance:     React.lazy + Suspense, WebGL detection, fallback 2D mode
```

---

### 🚀 SECTION-BY-SECTION SPECIFICATION

---

#### SECTION 0 — PRELOADER (0–3 seconds)

**Experience:** A radar/sonar scan that reveals Vidhey's world layer by layer.

**Animation sequence:**
1. Screen starts **completely black** with a single glowing cyan horizontal line at center.
2. A **scanning beam** (horizontal glowing line, #00d4ff, 2px height, full-width, `box-shadow: 0 0 20px #00d4ff, 0 0 60px #00d4ff`) sweeps **top to bottom** like military radar — takes exactly **1.8 seconds**.
3. As the beam passes, content **materializes** below it: first Vidhey's face (grayscale silhouette), then his name, then the subtitle.
4. Simultaneously: circuit board grid lines draw themselves in the background (SVG `stroke-dashoffset` animation).
5. A subtle **radar ping** sound plays on scan completion (Howler.js).
6. At **2.2 seconds**: The text `> SYSTEM ONLINE` appears bottom-left in #00ffea, JetBrains Mono font, with a blinking cursor.
7. At **3 seconds**: Preloader fades out with a horizontal **wipe** (not a fade — a sharp edge wipe from left to right), revealing the hero section.

**Code hint:** Use a canvas element for the scan beam, GSAP for orchestration, CSS clip-path for the reveal wipe.

---

#### SECTION 1 — HERO / LANDING (The Statement)

**Goal:** Viewer must understand in 3 seconds: "This is a cyborg engineer from the future."

**Layout:**
- Full viewport height (`100vh`)
- Left 55%: Text content + CTA
- Right 45%: **3D WebGL canvas** (the Human→Cyborg model)

**Left side content:**
```
[Small label, Exo 2, #00d4ff, letter-spacing: 0.3em]
SYSTEMS ENGINEER · TCS × MORGAN STANLEY

[Giant display text, Orbitron Bold, 80px, white with glow]
VIDHEY
BHOGADI

[Animated subtitle — typewriter cycling through:]
"AI-Powered Developer Tools Engineer"
"Full-Stack Software Engineer"
"SDET · Automation Architect"
"Building the Future at Morgan Stanley"

[Metric strip — 4 live-counting numbers]
[ 30× ] FASTER VALIDATION    [ 45% ] FASTER TEST AUTHORING
[ 85% ] XPATH ACCURACY       [ 500+ ] DOCS PROCESSED/RUN

[Two CTAs]
[PRIMARY] VIEW MY WORK → (neon cyan, glow on hover)
[SECONDARY] DOWNLOAD RESUME (ghost button, purple border)
```

**Right side — 3D WebGL model:**
- On load: Render a **photorealistic 3D head model** (human, lit with soft warm light from below-left, everything else dark).
- The model **slowly rotates** on Y-axis (autorotate, very slow — 0.001 rad/frame).
- **Mouse parallax:** model tilts toward mouse position (max ±15° on X and Y).
- **Scroll trigger starts here** — as user scrolls, the Human→Cyborg→Processor transformation begins (detailed in next section).

**Background:**
- Animated particle field (Three.js Points) — 2,000 small white/cyan particles floating slowly.
- Radial glow behind the 3D model: `radial-gradient(ellipse, rgba(0,212,255,0.12), transparent)`.
- Bottom of section fades to black with a gradient.

**Entrance animation (on load, after preloader):**
- Left content: staggered slide-up + fade-in, 0.1s delay between each element.
- 3D model: scales from 0.7 to 1.0 with easing, 0.4s delay after preloader exit.
- Metric numbers: count up from 0 to their values over 1.5s using GSAP.

---

#### SECTION 2 — THE TRANSFORMATION (Human → Cyborg → Processor)

**This is the centerpiece of the entire site. It must be jaw-dropping.**

**Mechanism:** This section is **pinned** — meaning the page appears to scroll, but the 3D canvas stays fixed while scroll progress drives the animation. Total scroll height of this section: `400vh` (4 full screens of scroll = one full transformation).

**3D transformation timeline (driven by GSAP ScrollTrigger + scrub):**

```
SCROLL 0% → 25%: HUMAN PHASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Full human 3D face, warm lighting
- Skin texture, natural colors
- Right side: floating text panel slides in:
  "I started as a student in Kakinada, Andhra Pradesh..."
  "B.Tech CSE · JNTUK · 8.65 CGPA"
  "Prathibha Puraskar — State Merit Award"
- Background particles: warm orange/white

SCROLL 25% → 50%: LASER SCAN + SKIN PEEL (TRANSITION)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- A cyan laser beam sweeps across the face (shader effect)
- Wherever the laser passes, skin is "scanned" — peels back
  in geometric polygon segments to reveal metallic chrome beneath
- Eyes glow electric blue mid-transition
- Screen: subtle horizontal scan lines appear (CRT effect)
- Glitch micro-bursts: RGB channel separation for 0.05s at 30% and 45% scroll
- Text panel updates: "Joined TCS as Systems Engineer (Prime Category)"
                      "Assigned to Morgan Stanley Wealth Management"

SCROLL 50% → 75%: CYBORG PHASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Full cyborg head: chrome/titanium jaw, glowing blue eye, neural mesh
- DNA double helix strand orbits the head (Three.js tube geometry, animated)
- Circuit lines pulse across the skull surface (shader animation)
- Right side text panel:
  "Built AI-powered VS Code extensions at Morgan Stanley"
  "45% faster test authoring · 30× faster validation"
  "AI Chrome XPath Locator · 85% accuracy"
- Background particles: cyan + purple, faster movement
- Particle count increases to 4,000

SCROLL 75% → 100%: PROCESSOR / BRAIN PHASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- The cyborg head EXPLODES outward (particles scatter)
- From the explosion, a glowing CPU/processor forms at center
- The processor has visible circuit traces that light up in sequence
- Around the processor: skill nodes orbit like electrons —
  each node is a glowing sphere labeled with a tech:
  [Java] [React] [Node.js] [TypeScript] [Playwright] [Spring Boot]
  [Selenium] [Cypress] [Docker] [AWS] [PostgreSQL] [GitHub Copilot]
- Text: "The brain behind the tools that power Morgan Stanley"
- Background: deep purple/blue nebula particle cloud
```

**Implementation notes:**
- Use Three.js MorphTargetInfluences for face→cyborg morph between two GLTF models.
- Skin peel effect: custom vertex displacement shader + mask texture.
- DNA helix: Three.js TubeGeometry along a parametric helix curve.
- Circuit traces: animated `stroke-dashoffset` on SVG overlaid on the canvas.
- Explosion: Three.js particle burst with instanced mesh.
- Skill node orbits: each on an elliptical path with different radius + speed.

---

#### SECTION 3 — ABOUT ME (The Identity)

**Layout:** Split — left is a glowing terminal/code card, right is prose.

**Left — Terminal Card:**
```
┌─────────────────────────────────────────┐
│  > cat vidhey.yaml                      │
│                                         │
│  name: "Vidhey Bhogadi"                 │
│  role: "Systems Engineer"               │
│  company: "TCS × Morgan Stanley"        │
│  location: "Bangalore, India 🇮🇳"       │
│  experience: "1.5+ years"               │
│  cgpa: 8.65                             │
│                                         │
│  strengths:                             │
│    - AI-powered developer tools         │
│    - Full-stack microservices           │
│    - Test automation architecture       │
│    - VS Code & Chrome extensions        │
│                                         │
│  dream: "FAANG-equivalent product co."  │
│  currently_building: "Playwright MCP"   │
│  learning: ["GenAI", "Agentic AI"]      │
│                                         │
│  █ _                                    │
└─────────────────────────────────────────┘
```
The terminal text types out character by character when section enters viewport (Intersection Observer).

**Right — Prose:**
- Clean paragraph about who Vidhey is — tone: confident, enterprise-grade.
- 4 glowing stat pills: `[ 1.5+ yrs exp ]` `[ 8.65 CGPA ]` `[ 7 tools built ]` `[ 4 awards ]`
- Parallax: background has a floating circuit board image at 0.3x scroll speed.

**Entrance:** Left slides from left, right slides from right. Both triggered by scroll.

---

#### SECTION 4 — WORK EXPERIENCE (The Timeline)

**Layout:** Vertical timeline with 3D depth cards.

**Timeline structure:**
- Centered vertical line (glowing cyan, 2px, `box-shadow` glow)
- Timeline nodes are glowing hexagons (not circles)
- Cards alternate left/right of the timeline

**Experience Cards:**

```
TCS × MORGAN STANLEY (Nov 2024 – Present)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Systems Engineer (Prime Category)
Wealth Management Division, Bengaluru
[7 tools built] [Morgan Stanley AI] [GitHub Copilot]
→ BDD Auto Code Generator — 45% faster
→ JSON Validator (30× faster)
→ PDF Visual Comparator (500+ docs/run)
→ AI XPath Locator (85% accuracy)

GalaxE Solutions / DataValley.AI (Feb 2024 – Apr 2024)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Software Engineering Intern
Student Portal → 1,000+ users, 80% tracking improvement

ISTS (Jan 2023 – Mar 2023)
━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Stack Developer Intern
FeedForward Chatbot + Steganography Tool

TRONTECH (May 2022 – Jul 2022)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Web Developer Intern · HTML/CSS/JS
```

**Card interactions:**
- On hover: card lifts with `transform: translateZ(30px)` + perspective, intensified glow.
- On hover: a subtle circuit board pattern animates inside the card.
- Tech tags glow on hover individually.

**Parallax:** Background has floating translucent hexagons drifting slowly.

---

#### SECTION 5 — PROJECTS (The Arsenal)

**Layout:** Three-tier hybrid display.

**Tier 1 — Orbital showcase (top 4 projects, 3D canvas):**
- A central glowing sphere labeled "MORGAN STANLEY"
- 4 project cards orbit it in 3D space on elliptical paths
- Cards face the camera at all times (billboarding)
- On hover: card breaks orbit, zooms toward viewer, expands to full detail

**The 4 orbital projects:**
```
[1] BDD Auto Code Generator (VS Code Extension)
    Stack: TypeScript · Test Gen AI · GitHub Copilot · Jira API
    Impact: 45% faster test authoring · 50% faster feature-to-code
    Color: Neon cyan

[2] Full-Stack JSON Validator
    Stack: React · Node.js · Bootstrap · VS Code API
    Impact: 30× faster than manual validation
    Color: Electric blue

[3] PDF Visual Comparator
    Stack: TypeScript · Playwright · Node.js · VS Code API
    Impact: 500+ docs/run · eliminates manual review
    Color: Purple

[4] AI Chrome XPath Locator
    Stack: JavaScript · DOM Crawling · Chrome Extension API · GitHub Copilot
    Impact: 85% XPath accuracy · reduces Selenium test flakiness
    Color: Pink neon
```

**Tier 2 — Skill Tree (Personal Projects):**
- SVG-based interactive skill/project tree
- Root node: "VIDHEY" — branches split into "Enterprise" and "Personal"
- Personal branch nodes:
  - Steganography Tool (Python, LSB encoding, 500+ users)
  - FeedForward Chatbot (MERN, NLP)
  - Student Portal (Java, Spring-MVC, PostgreSQL, 1000+ users)
- Clicking a node expands it with project details
- Lines between nodes pulse with animated `stroke-dashoffset`

**Tier 3 — Holographic metric cards (bottom):**
- 4 floating stat cards with holographic shimmer effect (CSS `background: linear-gradient` rotating)
- Each shows a key metric with the number animated counting up:
  `30×` | `45%` | `85%` | `500+`

---

#### SECTION 6 — SKILLS (The Processor Brain)

**Layout:** Interactive 3D skill constellation.

**Visual:**
- Dark void background with star field
- Skills float as glowing nodes at various Z-depths
- Lines connect related skills (Java → Spring Boot → REST API)
- Node size = proficiency level (bigger = more proficient)
- Node color = category:
  - Cyan: Languages (Java, TypeScript, Python, JavaScript)
  - Purple: Frameworks (Spring Boot, React, Node.js, Angular)
  - Pink: Testing (Playwright, Cypress, Selenium, Cucumber, BDD)
  - Gold: Cloud/DevOps (AWS, Docker, Kubernetes, Jenkins, Bitbucket)
  - Blue: Tools (VS Code API, Chrome Extension API, GitHub Copilot, Jira)
  - Green: Databases (PostgreSQL, MongoDB, MySQL)

**Interactions:**
- Mouse: constellation tilts slightly toward cursor (parallax)
- Hover on node: node expands, shows skill name + proficiency bar
- Click on node: pulls up a card with tools built using that skill
- Drag: can rotate the entire constellation in 3D space

**Entrance animation:** Nodes fly in from off-screen, each following a curved path to their final position (staggered, GSAP).

---

#### SECTION 7 — AWARDS & RECOGNITIONS (The Trophies)

**Layout:** Horizontal scroll with 3D trophy cards.

**Awards:**
```
🥇 On the Spot Team Award — Morgan Stanley / TCS
   "Recognized for building AI-powered developer tools at enterprise scale"

🏆 TCS Artificial Intelligence Spark — TCS
   "AI innovation recognition — Generative AI and tooling excellence"

⚡ Xcelerate Warrior — TCS
   "T-Factor: 3.33 — Top performance band"

🎓 Prathibha Puraskar — Government of Andhra Pradesh
   "State-level merit award for top 10th grade marks"

🏅 Certificate of Excellence — JNTUCEK
   "Awarded by Dr. Suneetha Eluri for productive service"
```

**Card design:**
- Each card is a 3D trophy-case style with golden shimmer
- On hover: card flips 180° (CSS 3D perspective flip) to reveal award description on back
- Background: particle burst in gold/amber floats upward

---

#### SECTION 8 — CERTIFICATIONS

**Layout:** Glowing certification badges in a grid.

```
[ Google Generative AI Leader ]   [ AWS Cloud Computing ]
[ Cisco Networking ]              [ Cisco Cybersecurity ]
[ Selenium 4 — Udemy ]           [ Accenture Developer Virtual ]
[ Data Analytics ]                [ Computer Hardware ]
```

- Each badge has a shimmer animation (CSS background-position sweep)
- On hover: badge glows intensely + scales 1.05
- Badges animate in with a staggered "scan in" effect on scroll

---

#### SECTION 9 — CONTACT (All Four Modes Combined)

**This is a four-phase contact experience:**

**Phase 1 — Terminal Input (top):**
```
> ESTABLISH CONNECTION
> Enter your message, human...

$ name:     [___________________________]
$ email:    [___________________________]
$ subject:  [___________________________]
$ message:  [___________________________]
            [ > TRANSMIT ]
```
Terminal-style inputs with monospace font, cyan caret cursor. Labels type out when input is focused.

**Phase 2 — Floating Holographic Form (visual layer):**
- The terminal is wrapped in a glowing 3D holographic card
- Card has a subtle shimmer and is slightly tilted in 3D perspective
- Mouse parallax: card tilts toward cursor (max ±10°)
- Glass morphism: `backdrop-filter: blur(20px)`, very subtle

**Phase 3 — Direct Links Galaxy (bottom):**
```
         ⬤ GitHub
       /
VIDHEY ─── ⬤ LinkedIn      [Each orbits around the center]
       \
         ⬤ Email
         ⬤ Twitter/X
         ⬤ Instagram
```
- Social links orbit a center "V" monogram in a slow CSS animation
- On hover: planet stops orbiting, scales up, shows label

**Phase 4 — Transmission Sent animation (on submit):**
- Form fades out
- Sci-fi "signal transmission" plays:
  1. Concentric rings expand from center
  2. Text: `> TRANSMITTING...`
  3. A beam of light shoots upward
  4. Text: `> SIGNAL RECEIVED. I'LL RESPOND SOON.`
- Particle burst in cyan/blue

**Contact details to hardcode:**
```
Email:     vidhey.bhogadi2003@gmail.com
Phone:     +91 7396104404
GitHub:    github.com/Vidhey012
LinkedIn:  linkedin.com/in/bhogadi-vidhey-aa62b71a8
Twitter:   @name_is_vidhey
Instagram: @b_vidhey
Portfolio: vidhey.netlify.app
```

---

### 🖱️ GLOBAL UX SYSTEMS

#### Custom Cursor
- Hide default cursor globally (`cursor: none`)
- Two-layer cursor:
  1. **Inner orb** (8px): solid neon cyan circle, follows cursor with 0ms delay
  2. **Outer ring** (32px): hollow circle with glow, follows with 80ms lag (lerp)
- **Trailing particles:** Every 16ms, spawn a tiny particle (2px, cyan→purple gradient) at cursor position. Particles fade out over 600ms and drift slightly downward — creating a comet trail.
- **On hover over interactive elements:** Inner orb expands to 16px + pulses; outer ring changes to pink neon; small "CLICK" label appears near orb.
- **On click:** Ring flashes white, inner orb squishes and rebounds (spring physics).
- **On text:** Cursor morphs into a thin I-beam with glow.

#### Ambient Audio System (Howler.js)
- **Background:** Cyberpunk ambient drone at 15% volume. Loops seamlessly.
- **Interactions:**
  - Hover on buttons: soft electronic "tick" (50ms, subtle)
  - Click on buttons: "whoosh" + digital confirm sound
  - Preloader scan: radar ping at end of scan sweep
  - Section transitions: brief sci-fi "transition" chime
  - Contact form submit: transmission sequence sound
- **Mute button:** Fixed bottom-right, 40px, speaker icon with animated wave rings. Toggle with smooth volume fade (not instant cut).

#### Scroll System
- **Lenis** for buttery smooth inertial scrolling
- **GSAP ScrollTrigger** pinned to Lenis RAF
- **Scroll progress indicator:** Thin neon cyan line on the right edge of viewport, fills as you scroll
- **Section snap:** Gentle magnetic pull to section starts (not hard snap)

#### Performance
- WebGL capability detection: if not supported, serve a graceful 2D fallback
- Three.js models: LOD (Level of Detail) — high quality above 60fps, reduced geometry below
- Images: WebP format, lazy loaded
- Code split: each section is a lazy-loaded React component
- Target: 90+ Lighthouse Performance score

---

### 📱 MOBILE EXPERIENCE (Full Parity)

- All 3D WebGL renders are maintained on mobile (Three.js runs on mobile WebGL)
- Touch events replace mouse events (touchstart/touchmove for parallax and constellation drag)
- Cursor system disabled on touch devices; replaced with touch ripple effect
- Audio: requires user gesture to start (Web Audio API policy) — play button appears on mobile
- Parallax: gyroscope data used for 3D model tilt on mobile (DeviceOrientation API)
- Transformation section: scroll-driven on touch, same animation quality
- Orbital project cards: touch to break orbit, swipe to navigate
- All tap targets: minimum 44×44px
- Typography scales: fluid type using `clamp()` — never breaks on small screens
- Contact form: native keyboard support, inputs don't trigger zoom

---

### 🔢 CONTENT DATA (Exact Copy)

**Personal:**
- Name: Vidhey Bhogadi
- Role: Systems Engineer (SDE + SDET Hybrid)
- Company: Tata Consultancy Services → Morgan Stanley Wealth Management
- Location: Bangalore, India
- Experience: 1.5+ years

**Education:**
- B.Tech CSE · JNTUK (Kakinada) · 8.65 CGPA · 2021–2024
- Diploma in Computer Engineering · 2018–2021
- Prathibha Puraskar — State Merit Award (10th Grade)

**Key metrics to display:**
- 30× faster JSON validation
- 45% faster test authoring
- 50% faster feature-to-code turnaround
- 85% XPath locator accuracy
- 500+ documents processed per run
- 40% improvement in API execution efficiency
- 30% reduction in manual deployment overhead
- 1,000+ active users (Student Portal)
- 80% improvement in tracking efficiency

**Skills (complete list):**
Languages: Java, Python, JavaScript, TypeScript, C, SQL, HTML, CSS
Frontend: React, AngularJS, Bootstrap, Tailwind, HTML5, CSS3
Backend: Spring Boot, Node.js, Express.js, Django, Flask, Spring MVC
Testing: Selenium WebDriver, Playwright, Cypress, Cucumber, BDD, TestNG, JUnit
Extensions: VS Code Extension API, Chrome Extension API
AI/Tools: GitHub Copilot, Morgan Stanley AI, Test Gen AI
Cloud/DevOps: AWS, Docker, Kubernetes, Jenkins, Bitbucket CI/CD, GitHub Actions
Databases: PostgreSQL, MongoDB, MySQL, Firebase, SQLite
APIs: REST APIs, RESTful Microservices, Jira API
IDEs: VS Code, IntelliJ IDEA, Eclipse

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 2 — GOOGLE VEO VIDEO PROMPT
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 🎬 VIDEO PURPOSE
A **10–15 second cinematic intro video** that auto-plays (muted, looped) as the hero background OR plays as a standalone "Watch My Story" video on the portfolio. The narrative is the same as the site: Human → Cyborg → Processor.

---

### 🎥 VEO PROMPT — PRIMARY (Full Transformation)

```
Cinematic 10-second sequence. Extreme close-up of a young Indian man's 
face in complete darkness, lit only by cold neon blue light from below. 
His expression is calm, focused, intense — the look of a scientist 
becoming his own invention.

At 0s: Face is fully human. Soft shadows. Natural skin texture. Eyes 
catch the blue light with a faint reflection.

At 2s: A horizontal laser beam of electric cyan (#00d4ff) sweeps across 
his face from top to bottom like a military scanner. Wherever the laser 
passes, the skin begins to change — geometric polygon segments lift away 
and reveal chrome-titanium metal underneath.

At 4s: The transformation accelerates. Metallic panels spread across the 
jaw, cheekbones, and forehead. One eye becomes an electric blue LED lens 
that pulses. Circuit trace lines glow across the exposed metal skull. A 
DNA double helix made of light orbits the head slowly.

At 6s: Full cyborg. The head is now chrome, electric, alive. Neon cyan 
and purple light pulses through circuit channels across the skull. The 
eye glows with binary data streams reflected in it.

At 8s: The cyborg head shatters — not violently but gracefully — 
exploding outward into thousands of luminous particles. The particles 
swirl and reassemble in the center as a massive glowing CPU processor 
chip, floating in space, its circuit pathways lighting up in sequence.

At 10s: Pull back. The processor floats in a galaxy of orbiting tech 
nodes — spheres labeled "Java", "React", "TypeScript", "Playwright" — 
orbiting like electrons. The camera pulls back further to reveal it all 
fits inside the skull silhouette of the cyborg.

Aesthetic: Blade Runner 2049 meets Ghost in the Shell. Color palette — 
void black background, neon cyan (#00d4ff), electric purple (#6c00ff), 
hot pink (#ff2d9b), chrome silver. Photorealistic CGI quality. 
Cinematic lens flares. Subtle film grain. Dramatic depth of field.

Camera movement: Slow push-in from 0-6s. Orbital pan at 6-8s. Rapid 
pull-back at 8-10s.

Sound design (if applicable): Low cyberpunk ambient hum building to a 
climax with a digital "shatter" sfx at 8s, resolving into a clean 
electronic tone.
```

---

### 🎥 VEO PROMPT — VARIANT B (DNA & Code Focus)

```
Cinematic 12-second slow-motion sequence. A human eye opens in darkness — 
the iris is electric blue, reflecting lines of code scrolling upward.

Zoom out gradually to reveal: the eye belongs to a cyborg — half human, 
half chrome-titanium machine. A glowing DNA double helix wraps around 
its skull, slowly rotating. Each base pair of the DNA glows with a 
different programming language: Java (orange), React (blue), TypeScript 
(cyan), Python (yellow).

The DNA helix accelerates, unwrapping from the skull and stretching 
into the foreground — passing through the camera like a tunnel. The 
camera travels down the DNA strand.

Inside the strand: code snippets flash — Java Spring Boot annotations, 
TypeScript VS Code extension code, Playwright test scripts. The code 
glows and morphs into circuit board traces.

The circuit board traces converge into a processor chip. The chip powers 
on — electricity arcs across it, lighting up all pathways. The processor 
is labeled "VIDHEY" in circuit-etched text.

Final frame: Black screen. Then text types out, character by character, 
in neon cyan monospace font:
"> VIDHEY BHOGADI"
"> SYSTEMS ENGINEER"
"> ONLINE"
Blinking cursor.

Aesthetic: Ghost in the Shell (2017) meets Tron Legacy. Ultra-HD, 
photorealistic CGI. Shallow depth of field with chromatic aberration on 
edges. Cold blue and purple color grading.
```

---

### 🎥 VEO PROMPT — VARIANT C (Short 5-second Loop, Hero Background)

```
5-second seamless loop for website hero background. Abstract and 
atmospheric — not character-focused.

A CPU processor chip floats in deep space, slowly rotating. Its surface 
is detailed — circuit pathways glow sequentially in neon cyan and purple, 
like a heartbeat. Tiny particles of light drift past the camera (bokeh 
particle field). 

The lighting is dramatic — deep shadow, with cyan light emanating from 
the circuit traces themselves, casting color onto surrounding darkness.

The loop is seamless: camera drifts in a gentle orbit. The processor 
pulses rhythmically. Stars drift slowly.

This plays behind the hero text as a muted, looping background video. 
It establishes the "brain/processor" metaphor visually without 
distracting from the text content.

Aesthetic: Ultra-HD. Photorealistic CGI. Muted 25% opacity so text 
remains readable when overlaid. Color palette: void black, neon cyan, 
deep purple, chrome silver.
```

---

## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 3 — ANTIGRAVITY IMPLEMENTATION CHECKLIST
## ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Deliverables Expected from Antigravity:

```
✅ React 18 + Vite project setup (TypeScript)
✅ Three.js scene with Human→Cyborg GLTF morph (2 models)
✅ Custom GLSL shaders for skin peel + circuit trace effects
✅ GSAP ScrollTrigger pinned transformation section (400vh)
✅ Custom cursor engine (two-layer orb + particle trail)
✅ Lenis smooth scroll integration
✅ Howler.js audio system with mute toggle
✅ Orbital project card system (Three.js + Framer Motion)
✅ Interactive SVG skill constellation
✅ Skill tree (SVG, animated, clickable nodes)
✅ Preloader with scan beam animation
✅ Typewriter subtitle cycle
✅ Live-counting metrics (GSAP)
✅ Terminal YAML "About" card with typeout effect
✅ Timeline experience section with 3D card depth
✅ Award trophy cards with CSS 3D flip
✅ Certification badge shimmer grid
✅ Four-mode contact section (terminal + holo form + galaxy links + tx animation)
✅ Scroll progress indicator (right edge)
✅ WebGL fallback detection + 2D mode
✅ Mobile touch events + gyroscope parallax
✅ Full responsive design (fluid type with clamp())
✅ Vercel deployment config + contact form edge function
✅ SEO meta tags (Open Graph, Twitter Card)
✅ Performance optimization (React.lazy, WebP, LOD)
✅ Google Fonts: Orbitron + JetBrains Mono + Exo 2 + Space Mono
```

### Performance Targets:
```
Lighthouse Performance:    90+
Lighthouse Accessibility:  85+
First Contentful Paint:    < 1.5s
Time to Interactive:       < 3.5s
WebGL Target FPS:          60fps (desktop), 30fps (mobile)
```

---

*Master Prompt generated for Vidhey Bhogadi · vidhey.bhogadi2003@gmail.com · March 2026*
*Portfolio: vidhey.netlify.app · GitHub: Vidhey012 · LinkedIn: bhogadi-vidhey-aa62b71a8*
