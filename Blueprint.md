# ⚡ VIDHEY BHOGADI — CINEMATIC TRON 3D PORTFOLIO
## ULTRA-DETAILED MASTER BLUEPRINT v2.0
## Netlify Deployment Edition — Every Minute Detail Included

---

> **HOW TO USE THIS DOCUMENT**
> This is a complete, self-contained specification. Read it top to bottom before touching any tool.
> Every section has: Visual spec → Animation spec → Code spec → AI prompt → Asset requirements.
> Pass each section's "ANTIGRAVITY PROMPT" directly into Antigravity for generation.
> Pass each "VEO PROMPT" directly into Google Veo 2 for video generation.
> Pass each "GEMINI PROMPT" directly into Gemini for asset/content generation.

---

## 📋 TABLE OF CONTENTS

1. Project Identity & Goals
2. Design System (Colors, Fonts, Grid, Spacing)
3. Tech Stack (Every library, version, purpose)
4. Netlify Deployment Configuration
5. Asset Production Plan (All videos, models, audio, images needed)
6. Phase 0 — Cinematic Preloader (Full Detail)
7. Section 1 — Hero / Landing
8. Section 2 — About Me
9. Section 3 — Experience
10. Section 4 — Projects
11. Section 5 — Skills
12. Section 6 — Certifications & Awards
13. Section 7 — GitHub Stats
14. Section 8 — Contact
15. The Bike — Persistent Scroll System (Full Detail)
16. Cursor System
17. Navigation System
18. Audio System
19. Dark/Light Mode System
20. Mobile Progressive Enhancement
21. Performance & Optimization
22. Accessibility
23. Complete File & Folder Structure
24. Antigravity Master Prompt
25. All AI Prompts Consolidated

---

## 1. PROJECT IDENTITY & GOALS

```
Site Name:        VIDHEY.GRID
Full Title:       Vidhey Bhogadi — The Program Has Entered The Grid
Owner:            Vidhey Bhogadi
Role:             Systems Engineer @ TCS | Client: Morgan Stanley Wealth Management
Deployment:       Netlify (vidhey.netlify.app)
Domain:           vidhey.netlify.app → custom domain vidhey.dev (optional future)
Theme:            TRON: Legacy — Cinematic World (NOT cartoon, NOT flat — dark, gritty, cinematic)
Primary Goal:     Recruiter opens site → within 3 seconds they are INSIDE a movie
Signature:        A TRON light-cycle bike that the visitor rides through the entire portfolio
                  via scroll — the bike is always visible, reacts to scroll speed, carries
                  the visitor from section to section as if navigating the Grid
Audience:         Tech recruiters, hiring managers, senior engineers, startup founders
Devices:          Desktop first (full 3D), mobile progressive (GPU-detected degradation)
Modes:            Dark mode (cyan+black / TRON Legacy) + Light mode (blue+white / TRON Uprising)
```

---

## 2. DESIGN SYSTEM

### 2.1 Color Tokens

#### DARK MODE — Electric Cyan + Pure Black (Default)
```css
:root[data-theme="dark"] {
  /* Backgrounds */
  --color-bg-void:        #000000;    /* Absolute black — the Grid void */
  --color-bg-deep:        #010b13;    /* Deep space — slightly tinted */
  --color-bg-surface:     #061219;    /* Card/panel background */
  --color-bg-elevated:    #0a1f2e;    /* Elevated panel (modals, tooltips) */
  --color-bg-grid-cell:   #001515;    /* Individual grid cell fill */

  /* Grid Lines */
  --color-grid-line:      #00f5ff14;  /* Primary grid lines — barely visible */
  --color-grid-bright:    #00f5ff35;  /* Highlighted grid lines on interaction */
  --color-grid-horizon:   #00f5ff60;  /* Horizon line on grid floor */

  /* Accent — Cyan Family */
  --color-accent-primary:   #00f5ff;  /* Main cyan — identity color */
  --color-accent-secondary: #0ff0fc;  /* Slightly brighter cyan */
  --color-accent-hot:       #00ffcc;  /* Hot teal — CTAs, important actions */
  --color-accent-warm:      #00e5d4;  /* Warm variant for hover states */
  --color-accent-dim:       #007a88;  /* Dimmed cyan — inactive states */

  /* Glow Layers (box-shadow / filter values) */
  --glow-xs:   0 0 4px #00f5ff60;
  --glow-sm:   0 0 8px #00f5ff80, 0 0 16px #00f5ff40;
  --glow-md:   0 0 12px #00f5ffaa, 0 0 30px #00f5ff60, 0 0 60px #00f5ff20;
  --glow-lg:   0 0 20px #00f5ff, 0 0 60px #00f5ff80, 0 0 120px #00f5ff30;
  --glow-text: 0 0 10px #00f5ffcc, 0 0 20px #00f5ff80;

  /* Energy Trail (bike) */
  --color-trail-core:     #00f5ff;    /* Trail center — pure bright */
  --color-trail-mid:      #00f5ff80;  /* Trail mid — 50% */
  --color-trail-fade:     #00f5ff00;  /* Trail end — fully transparent */

  /* Text */
  --color-text-primary:   #e0fbfc;    /* Main text — ice white */
  --color-text-secondary: #7ecfcf;    /* Supporting text — muted cyan */
  --color-text-muted:     #3a7a7a;    /* Placeholder, disabled */
  --color-text-accent:    #00f5ff;    /* Highlighted / link text */

  /* Status */
  --color-success:        #00ff88;    /* Success state */
  --color-error:          #ff3355;    /* Error state */
  --color-warning:        #ffaa00;    /* Warning */
}
```

#### LIGHT MODE — Electric Blue + Alice Blue
```css
:root[data-theme="light"] {
  /* Backgrounds */
  --color-bg-void:        #f0f8ff;    /* Alice blue — clean grid world */
  --color-bg-deep:        #e1f0fa;    /* Slightly deeper */
  --color-bg-surface:     #d6eaf8;    /* Card background */
  --color-bg-elevated:    #c5ddf0;    /* Elevated elements */
  --color-bg-grid-cell:   #ddf0fc;    /* Grid cell */

  /* Grid Lines */
  --color-grid-line:      #0057ff12;  /* Subtle blue grid */
  --color-grid-bright:    #0057ff30;  /* Active grid lines */
  --color-grid-horizon:   #0057ff55;  /* Horizon line */

  /* Accent — Blue Family */
  --color-accent-primary:   #0057ff;  /* Electric blue */
  --color-accent-secondary: #0080ff;  /* Bright blue */
  --color-accent-hot:       #0040cc;  /* Deep blue — CTAs */
  --color-accent-warm:      #1a6fff;  /* Warm hover */
  --color-accent-dim:       #7aacff;  /* Dimmed — inactive */

  /* Glow Layers */
  --glow-xs:   0 0 4px #0057ff40;
  --glow-sm:   0 0 8px #0057ff60, 0 0 16px #0057ff30;
  --glow-md:   0 0 12px #0057ff80, 0 0 30px #0057ff40, 0 0 60px #0057ff15;
  --glow-lg:   0 0 20px #0057ffcc, 0 0 60px #0057ff60, 0 0 120px #0057ff20;
  --glow-text: 0 0 10px #0057ff99, 0 0 20px #0057ff50;

  /* Energy Trail */
  --color-trail-core:     #0057ff;
  --color-trail-mid:      #0057ff80;
  --color-trail-fade:     #0057ff00;

  /* Text */
  --color-text-primary:   #0a0e1a;    /* Near black */
  --color-text-secondary: #1a3a6a;    /* Deep blue */
  --color-text-muted:     #6a90bb;    /* Muted */
  --color-text-accent:    #0057ff;    /* Link/accent */

  /* Status */
  --color-success:        #00aa55;
  --color-error:          #cc1133;
  --color-warning:        #cc7700;
}
```

### 2.2 Typography

```css
/* Import in <head> — next/font/google preferred for Next.js */
import { Orbitron, Rajdhani, JetBrains_Mono, Share_Tech_Mono } from 'next/font/google'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display'
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-mono'
})

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-stat'
})

/* CSS Variables */
--font-display:      var(--font-orbitron), 'Orbitron', sans-serif;
--font-body:         var(--font-rajdhani), 'Rajdhani', sans-serif;
--font-mono:         var(--font-jetbrains-mono), 'JetBrains Mono', monospace;
--font-stat:         var(--font-share-tech-mono), 'Share Tech Mono', monospace;

/* Type Scale */
--text-xs:     0.75rem;     /* 12px — fine print */
--text-sm:     0.875rem;    /* 14px — labels, tags */
--text-base:   1rem;        /* 16px — base */
--text-md:     1.125rem;    /* 18px — body */
--text-lg:     1.25rem;     /* 20px — large body */
--text-xl:     1.5rem;      /* 24px — sub-headings */
--text-2xl:    2rem;        /* 32px — section titles */
--text-3xl:    2.5rem;      /* 40px — large headings */
--text-4xl:    clamp(2.5rem, 5vw, 4rem);    /* Hero sub */
--text-hero:   clamp(3.5rem, 8vw, 7rem);    /* Main hero name */

/* Letter Spacing */
--tracking-tron:   0.15em;   /* Wide tracking for TRON headers */
--tracking-tight:  -0.02em;  /* Tight for large display text */
--tracking-normal: 0;
--tracking-wide:   0.05em;

/* Line Height */
--leading-tight:  1.1;
--leading-snug:   1.3;
--leading-normal: 1.5;
--leading-loose:  1.8;
```

### 2.3 Spacing & Layout

```css
/* Spacing Scale */
--space-1:    4px;
--space-2:    8px;
--space-3:    12px;
--space-4:    16px;
--space-5:    20px;
--space-6:    24px;
--space-8:    32px;
--space-10:   40px;
--space-12:   48px;
--space-16:   64px;
--space-20:   80px;
--space-24:   96px;
--space-32:   128px;

/* Section Padding */
--section-pad-y:    clamp(80px, 12vh, 160px);
--section-pad-x:    clamp(20px, 5vw, 80px);

/* Container */
--max-width:         1400px;
--max-width-text:    720px;    /* Text column max */
--max-width-narrow:  560px;

/* Grid */
--grid-cell-size:    60px;     /* TRON grid cell — 60x60px */
--grid-perspective:  800px;    /* CSS perspective for grid floor */
--grid-vanish-y:     60%;      /* Grid vanishing point from top */

/* Border Radius */
--radius-sm:   2px;    /* Barely there — TRON is sharp */
--radius-md:   4px;
--radius-lg:   8px;
--radius-pill: 999px;

/* Borders */
--border-thin:   1px solid var(--color-accent-primary);
--border-thick:  2px solid var(--color-accent-primary);
--border-glow:   1px solid var(--color-accent-primary), box-shadow: var(--glow-sm);

/* Z-Index Stack */
--z-grid:        0;     /* Background grid */
--z-content:     10;    /* Normal content */
--z-bike:        20;    /* Persistent bike */
--z-overlay:     30;    /* Section overlays */
--z-nav:         40;    /* Navigation */
--z-cursor:      50;    /* Custom cursor */
--z-preloader:   100;   /* Preloader (above everything) */
```

### 2.4 Animation Tokens

```css
/* Durations */
--duration-instant:  50ms;
--duration-fast:     150ms;
--duration-normal:   300ms;
--duration-slow:     600ms;
--duration-slower:   1000ms;
--duration-cinematic: 2000ms;

/* Easing */
--ease-tron:     cubic-bezier(0.16, 1, 0.3, 1);    /* Snappy TRON feel */
--ease-out:      cubic-bezier(0, 0, 0.2, 1);
--ease-in:       cubic-bezier(0.4, 0, 1, 1);
--ease-inout:    cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1); /* Spring bounce */
--ease-linear:   linear;
```

---

## 3. TECH STACK — EVERY LIBRARY WITH EXACT VERSION & PURPOSE

```
CATEGORY              LIBRARY                      VERSION    PURPOSE
──────────────────────────────────────────────────────────────────────────────────

FRAMEWORK
                      Next.js                      14.2.x     App Router, SSR/SSG, API routes
                      React                        18.3.x     UI rendering
                      TypeScript                   5.4.x      Type safety throughout

3D ENGINE
                      three                        0.163.x    Core WebGL 3D rendering
                      @react-three/fiber           8.16.x     React bindings for Three.js
                      @react-three/drei            9.105.x    3D helpers (camera, env, text, etc.)
                      @react-three/postprocessing  2.16.x     Post-FX: bloom, glitch, chromatic aberration
                      @react-three/rapier          1.3.x      Physics (for particle collisions)

ANIMATION
                      gsap                         3.12.x     Master animation + ScrollTrigger
                      @gsap/react                  2.1.x      React hooks for GSAP
                      gsap/ScrollTrigger           (bundled)  Scroll-driven animation
                      gsap/TextPlugin              (bundled)  Text scramble / typewriter
                      lenis                        1.1.x      Ultra-smooth scroll (replaces native)
                      framer-motion                11.2.x     React component animations + gestures

INTERACTION
                      @use-gesture/react           10.3.x     Mouse/touch gesture tracking
                      react-intersection-observer  9.10.x     Trigger animations on scroll into view

AUDIO
                      howler                       2.2.x      Audio engine (loops, SFX, spatial)

PERFORMANCE
                      detect-gpu                   5.0.x      GPU tier detection for progressive enhancement
                      @vercel/analytics            1.3.x      Core Web Vitals
                      sharp                        0.33.x     Image optimization (next/image backend)

UI / STYLING
                      tailwindcss                  3.4.x      Utility CSS
                      @radix-ui/react-*            latest     Headless accessible UI primitives
                      clsx                         2.1.x      Conditional classnames
                      tailwind-merge               2.3.x      Merge Tailwind classes safely

DATA
                      swr                          2.2.x      Data fetching with caching (GitHub API)
                      axios                        1.7.x      HTTP client

CONTENT
                      @emailjs/browser             4.3.x      Contact form email (no backend needed)

DEVELOPMENT
                      eslint                       8.x        Linting
                      prettier                     3.x        Formatting
                      @types/three                 0.163.x    Three.js types
```

### 3.1 package.json (Complete)

```json
{
  "name": "vidhey-tron-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "typescript": "5.4.5",
    "three": "0.163.0",
    "@react-three/fiber": "8.16.8",
    "@react-three/drei": "9.105.6",
    "@react-three/postprocessing": "2.16.2",
    "gsap": "3.12.5",
    "@gsap/react": "2.1.1",
    "lenis": "1.1.9",
    "framer-motion": "11.2.14",
    "@use-gesture/react": "10.3.1",
    "react-intersection-observer": "9.10.2",
    "howler": "2.2.4",
    "detect-gpu": "5.0.33",
    "@vercel/analytics": "1.3.1",
    "tailwindcss": "3.4.4",
    "clsx": "2.1.1",
    "tailwind-merge": "2.3.0",
    "swr": "2.2.5",
    "axios": "1.7.2",
    "@emailjs/browser": "4.3.3",
    "sharp": "0.33.4",
    "@radix-ui/react-tooltip": "1.1.1",
    "@radix-ui/react-dialog": "1.1.1"
  },
  "devDependencies": {
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "@types/three": "0.163.0",
    "@types/howler": "2.2.12",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.5",
    "prettier": "3.3.2",
    "autoprefixer": "10.4.19",
    "postcss": "8.4.38"
  }
}
```

---

## 4. NETLIFY DEPLOYMENT CONFIGURATION

### 4.1 netlify.toml (Root of project)

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NEXT_TELEMETRY_DISABLED = "1"
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[dev]
  command = "npm run dev"
  port = 3000

# Redirects
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Headers for performance + security
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/models/*"
  [headers.values]
    Cache-Control = "public, max-age=86400"

[[headers]]
  for = "/audio/*"
  [headers.values]
    Cache-Control = "public, max-age=86400"

[[headers]]
  for = "/video/*"
  [headers.values]
    Cache-Control = "public, max-age=86400"
```

### 4.2 next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Static export for Netlify
  trailingSlash: true,
  images: {
    unoptimized: true,        // Required for static export
    domains: [
      'avatars.githubusercontent.com',
      'github.com',
    ]
  },
  // Enable WebGL shaders
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    })
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: { publicPath: '/_next/static/', outputPath: 'static/' }
      }
    })
    return config
  }
}

module.exports = nextConfig
```

### 4.3 Environment Variables (.env.local)

```bash
# GitHub API — for live stats section
NEXT_PUBLIC_GITHUB_USERNAME=Vidhey012
NEXT_PUBLIC_GITHUB_TOKEN=ghp_xxxxxxxxxxxx   # Read-only public repos token

# EmailJS — for contact form (no backend needed!)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx

# Site
NEXT_PUBLIC_SITE_URL=https://vidhey.netlify.app
```

### 4.4 .gitignore additions

```
.env.local
.env*.local
.netlify
node_modules
.next
out
```

---

## 5. ASSET PRODUCTION PLAN — COMPLETE LIST

### 5.1 Videos Required (Generate with Veo 2)

| File | Duration | Purpose | Generation Tool |
|------|----------|---------|----------------|
| `preloader-realworld.mp4` | 3 seconds | Real-world walking corridor scene | Veo 2 |
| `preloader-glitch-transition.mp4` | 2 seconds | World glitching/dissolving | Veo 2 |
| `hero-bg-ambient.mp4` | 10 seconds looping | Subtle TRON grid ambient movement | Veo 2 |

> See Section 25 for exact Veo prompts for each video.

### 5.2 3D Models Required

| File | Format | Purpose | How to Get |
|------|--------|---------|------------|
| `light-cycle.glb` | glTF Binary | The TRON bike — iconic | Sketchfab (free license) or generate via Meshy AI |
| `vidhey-tron-armor.glb` | glTF Binary | Vidhey in TRON suit | Ready Player Me + TRON skin via Blender |
| `identity-disc.glb` | glTF Binary | TRON identity disc | Sketchfab or model in Blender |
| `tron-orb.glb` | glTF Binary | The orb in preloader | Simple sphere — build in drei |
| `trophy-base.glb` | glTF Binary | Award pedestal | Build in Blender or drei primitives |

> **Simplification option:** For the bike and character, use Three.js primitives + custom shaders if model licensing is complex. A procedurally built bike from cylinders + boxes with TRON shader looks incredible.

### 5.3 Audio Files Required

| File | Duration | Purpose | Source |
|------|----------|---------|--------|
| `ambient-tron.mp3` | 3 min loop | Background TRON ambient | Daft Punk-style royalty-free / generate with Suno AI |
| `bike-idle.mp3` | 3 sec loop | Bike parked — engine hum | Freesound.org |
| `bike-accelerate.mp3` | 2 sec | Bike revving up | Freesound.org |
| `bike-max.mp3` | 2 sec loop | Bike at full speed | Freesound.org |
| `bike-brake.mp3` | 1.5 sec | Bike slowing down | Freesound.org |
| `bike-launch.mp3` | 2 sec | Bike launching in hero | Freesound.org |
| `section-whoosh.mp3` | 0.8 sec | Section transition | Freesound.org |
| `ui-hover.mp3` | 0.1 sec | Nav/button hover tick | Freesound.org |
| `ui-click.mp3` | 0.2 sec | General click | Freesound.org |
| `particle-burst.mp3` | 0.5 sec | Project card explode | Freesound.org |
| `orb-pulse.mp3` | 1 sec | Orb interaction in preloader | Freesound.org |
| `armor-lock.mp3` | 3 sec | Armor assembling sequence | Freesound.org (metal/mechanical) |
| `world-unleash.mp3` | 2 sec | Grid world expanding | Freesound.org |
| `disc-throw.mp3` | 0.8 sec | Contact form submit | Freesound.org |
| `trophy-hum.mp3` | 0.5 sec | Trophy hover | Freesound.org (electric hum) |
| `mode-switch.mp3` | 0.3 sec | Dark/light toggle | Freesound.org |
| `glitch-sfx.mp3` | 1 sec | Reality glitch in preloader | Freesound.org |
| `power-up.mp3` | 2 sec | Transformation complete | Freesound.org |
| `type-tick.mp3` | 0.05 sec | Typewriter each character | Freesound.org |

### 5.4 Images Required

| File | Size | Purpose |
|------|------|---------|
| `vidhey-photo.jpg` | 800x800px | Profile photo (hero + about) |
| `vidhey-photo-tron.jpg` | 800x800px | Photo with TRON overlay/scanlines (can be CSS) |
| `og-image.jpg` | 1200x630px | Open Graph social share image |
| `favicon.ico` | 32x32px | Browser tab icon (TRON disc or V.GRID) |
| `apple-touch-icon.png` | 180x180px | iOS home screen icon |
| `logo-dark.svg` | — | V.GRID logo — dark mode |
| `logo-light.svg` | — | V.GRID logo — light mode |

---

## 6. PHASE 0 — CINEMATIC PRELOADER

### 6.1 Concept

The preloader is a 10–13 second cinematic short film. The visitor is not waiting — they are experiencing. They are a regular human who walks into the digital world, touches an energy orb, transforms into Vidhey's TRON identity, and the world erupts. This is the most important 13 seconds of the entire site.

### 6.2 Timeline (Frame by Frame)

```
TIME        PHASE                   VISUALS                                         AUDIO
────────────────────────────────────────────────────────────────────────────────────────────
0.0s        BLACK                   Pure black screen                               Silence
0.2s        REAL WORLD BEGINS       Veo video plays: first-person POV corridor      City ambience fades in softly
            (video layer)           Slightly desaturated. Film grain overlay.       Footstep sounds
                                    Hallway/corridor — grey concrete walls.
                                    Camera bobs slightly (walking motion).
                                    Vignette edges.

0.0s–2.0s   LOADING COUNTER         Bottom left corner:                             —
            (always visible)        "GRID INTEGRITY: 0%"
                                    Font: Share Tech Mono, 14px, cyan
                                    Counts up in real time as assets load

1.5s        FIRST GLITCH            Single horizontal scan line flashes across      Electrical crackle (very brief)
                                    screen top-to-bottom
                                    Duration: 80ms — barely noticeable

2.0s        GLITCH INTENSIFIES      3 rapid flicker bursts (each 40ms)             Glitch SFX starts
                                    RGB chromatic aberration: red channel           Hum builds
                                    shifts +5px left, blue channel +5px right
                                    Saturation drops 30%

2.5s        GRID OVERLAY STARTS     Thin cyan grid lines materialize OVER           Electrical hum grows louder
                                    the real-world video
                                    Start at 0% opacity → 30% over 1 second
                                    Grid lines aligned with walls/floor

3.0s        FULL GLITCH             Screen flicker: 5 rapid on/off (20ms each)     Deep bass "reality tear" SFX
                                    Mosaic pixelation effect (pixels = 8x8 squares) Distortion peaks
                                    Real world video: opacity drops to 0%
                                    Text flashes: "GRID INITIALIZING..."
                                    (center screen, Orbitron 24px, 200ms visible)

3.5s        TRON WORLD REVEALS      Three.js canvas fades in (opacity 0→1)         Whoosh — world opens
                                    Infinite grid floor perspective — floor rises   Ambient TRON hum starts
                                    from bottom of screen
                                    Grid ceiling appears from top
                                    Side walls materialize
                                    Particle burst (500 particles) from center

4.0s        WORLD ESTABLISHED       Full TRON Grid world — stable                  Ambient steady
                                    Infinite floor in perspective
                                    Ambient floating particles (50 particles)
                                    Soft god-ray light shafts from ceiling

4.5s        ORB APPEARS             A glowing cyan energy orb (sphere r=0.3)       Orb pulse SFX (low, magnetic)
                                    materializes 3 meters ahead (Three.js)
                                    Starts at scale 0 → 1 with elastic spring
                                    Gentle pulse: scale oscillates ±5%
                                    Inner point light: #00f5ff, intensity 2
                                    Outer bloom: heavy postprocessing
                                    Particle emission: 20 particles/sec orbit orb

4.5s–6.0s   ORB INTERACTION         Text appears below orb:                        —
                                    "IDENTITY PROGRAM DETECTED"
                                    Scan-line reveal (lines wipe left to right)
                                    Font: Orbitron 16px, tracking 0.2em
                                    
                                    Hand reaches toward orb (camera moves forward  —
                                    slowly — Z axis lerp: 0 → -2 over 1.5 seconds)

6.0s        ORB CONTACT             Camera reaches orb position                     Power-up SFX starts
                                    FLASH: screen goes full white (#ffffff)
                                    Duration: 150ms hold
                                    Then: rapid fade to black over 300ms

6.1s        FLASH RESOLVES          Camera pulls back slightly                      SFX continues
            TRANSFORMATION          Vidhey's silhouette appears — dark 3D shape
            BEGINS                  (the character model, initially unlit)

6.2s–9.0s   ARMOR ASSEMBLY          ARMOR PIECES MATERIALIZE IN SEQUENCE:           Armor lock SFX (metallic)
            SEQUENCE                                                                 Each piece: clunk sound
                                    6.2s — BOOTS:
                                      Cyan light trace appears at feet
                                      Light travels upward from ankles
                                      Boot geometry "draws itself" — vertices
                                      animate from 0 opacity, bottom to top
                                      Boot surface: TRON circuit pattern texture
                                    
                                    6.5s — SHIN GUARDS:
                                      Same trace-up technique
                                      Circuit lines glow cyan on surface
                                    
                                    6.8s — THIGH ARMOR:
                                      Particles converge from sides → thighs
                                      Solidify into armor geometry
                                    
                                    7.1s — CHEST PLATE:
                                      IMPACT: chest plate SLAMS in from above
                                      Camera shake (intensity: 3px, duration 200ms)
                                      Bright flash at impact point
                                      Identity disc appears on back (glowing)
                                    
                                    7.5s — ARMS / GAUNTLETS:
                                      Light traces from shoulder → fingertips
                                      Geometric arm armor solidifies
                                    
                                    7.8s — HELMET:
                                      Helmet descends from above in two pieces
                                      Back half: locks in
                                      Front visor: slides down with metallic sound
                                      Visor activates — transparent with cyan tint
                                      VISOR GLOW activates: #00f5ff inner glow
                                    
                                    8.2s — FULL ARMOR COMPLETE:
                                      All circuits light up simultaneously
                                      Bright pulse emanates from character
                                      Character: fully lit TRON Vidhey
                                      Identity disc spins up on back

8.5s        CHARACTER REVEAL        Camera rotates 180° around Vidhey               Power crescendo
                                    3/4 view — we see his face through visor
                                    Text types out letter by letter:
                                    "PROGRAM: VIDHEY BHOGADI"
                                    Pause 200ms
                                    "STATUS: // ONLINE"
                                    Font: Orbitron 20px, tracking 0.2em

9.0s        LIGHT CYCLE             Light cycle materializes beside Vidhey          Bike materialize SFX
            MATERIALIZES            From grid floor — rises up
                                    Circuit lines trace the bike frame
                                    Wheels appear last (spin up)
                                    Engine hum starts

9.3s        VIDHEY MOUNTS           Animation: Vidhey turns, leg swings over        Bike idle rev
                                    bike, sits down
                                    Cockpit/handlebar glow activates

9.5s        LAUNCH SEQUENCE         Engine rev intensifies                           Engine ROARS
                                    Light trail appears at back wheel
                                    Vidhey leans forward
                                    Text: "LOADING INTEGRITY: 100%" → COMPLETE
                                    Camera slowly pushes toward bike front

10.0s       LAUNCH                  BIKE LAUNCHES FORWARD (Z-axis)                  LAUNCH BLAST SFX
                                    Motion blur: extreme (60px horizontal)
                                    Speed lines radiate from center
                                    Cyan trail STRETCHES to infinity behind

10.2s       TRANSITION              Preloader element: scale(20) transform          Whoosh
                                    Zoom blast expands until it's just cyan         Then: silence → landing
                                    Then fades to reveal HERO section              section ambient

10.5s       HERO LOADS              Main site appears                               Section ambient starts
            PRELOADER GONE          Preloader unmounts
                                    Hero entrance animations trigger
```

### 6.3 Preloader Technical Implementation

```typescript
// components/preloader/TronPreloader.tsx

'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { Howl } from 'howler'

interface PreloaderProps {
  onComplete: () => void
}

export function TronPreloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const [loadProgress, setLoadProgress] = useState(0)

  useEffect(() => {
    // Master GSAP timeline
    const tl = gsap.timeline({ onComplete })

    // Phase 1: Real world (0-3s)
    tl.to(videoRef.current, { opacity: 1, duration: 0.3 }, 0)
    
    // Phase 2: Glitch (3-4s)
    tl.call(() => triggerGlitch(), [], 2.5)
    
    // Phase 3: TRON world reveal (4s+)
    tl.to(canvasRef.current, { opacity: 1, duration: 0.5 }, 3.5)
    tl.to(videoRef.current, { opacity: 0, duration: 0.5 }, 3.5)
    
    // ... [full timeline]
    
    return () => { tl.kill() }
  }, [])

  return (
    <div ref={containerRef} className="preloader-container">
      {/* Film grain overlay */}
      <div className="grain-overlay" />
      
      {/* Real world video */}
      <video
        ref={videoRef}
        src="/video/preloader-realworld.mp4"
        autoPlay muted playsInline loop={false}
        className="real-world-video"
      />
      
      {/* Chromatic aberration overlay (CSS filter) */}
      <div className="chroma-overlay" />
      
      {/* Three.js TRON world */}
      <div ref={canvasRef} className="tron-canvas-container">
        <PreloaderThreeScene />
      </div>
      
      {/* Progress counter */}
      <div className="progress-counter">
        GRID INTEGRITY: <span ref={progressRef}>0</span>%
      </div>
      
      {/* Phase text */}
      <div className="phase-text" />
    </div>
  )
}
```

```css
/* Preloader CSS */
.preloader-container {
  position: fixed;
  inset: 0;
  z-index: var(--z-preloader);
  background: #000;
  overflow: hidden;
}

.grain-overlay {
  position: absolute;
  inset: 0;
  background-image: url('/images/noise.png');  /* Tileable noise texture */
  opacity: 0.04;
  animation: grain-shift 0.1s steps(1) infinite;
  mix-blend-mode: screen;
}

@keyframes grain-shift {
  0%  { transform: translate(0, 0); }
  25% { transform: translate(-2px, 3px); }
  50% { transform: translate(4px, -1px); }
  75% { transform: translate(-3px, -2px); }
}

.real-world-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  filter: saturate(0.3) brightness(0.8);
}

.chroma-overlay {
  position: absolute;
  inset: 0;
  /* Activated via JS class: adds mix-blend-mode: color-dodge with red/blue */
  opacity: 0;
  transition: opacity 0.1s;
}

.chroma-overlay.active {
  /* Uses CSS animation to create chromatic aberration */
  animation: chroma-split 0.1s steps(2) infinite;
}

@keyframes chroma-split {
  0%  { filter: none; }
  50% { filter: drop-shadow(-3px 0 0 rgba(255,0,0,0.5)) 
                drop-shadow(3px 0 0 rgba(0,0,255,0.5)); }
}

.progress-counter {
  position: absolute;
  bottom: 24px;
  left: 24px;
  font-family: var(--font-stat);
  font-size: 12px;
  color: var(--color-accent-primary);
  letter-spacing: 0.1em;
  text-shadow: var(--glow-text);
}

.tron-canvas-container {
  position: absolute;
  inset: 0;
  opacity: 0;
}
```

### 6.4 VEO PROMPT — Preloader Real World Video

```
VEO 2 PROMPT #1: REAL WORLD CORRIDOR
─────────────────────────────────────────────────────────────────────────────
Generate a 3-second first-person POV video of a person walking forward through 
a narrow, slightly dark concrete corridor or hallway. The corridor has grey 
concrete walls and a smooth floor. Lighting is cool and slightly blue-tinted 
from overhead fluorescent lights. The camera bobs gently with footstep rhythm. 
The edges of the frame have a soft black vignette. Film grain is visible — 
cinematic 35mm texture. The walk is slow and deliberate. At exactly 2.8 seconds, 
a single horizontal bright white scan line should flash across the screen top 
to bottom very rapidly. Overall color grade: desaturated, cold, cinematic.
Aspect ratio: 16:9. Quality: maximum. No text, no UI, no HUD elements.
─────────────────────────────────────────────────────────────────────────────
```

---

## 7. SECTION 1 — HERO / LANDING

### 7.1 Full Visual Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│  [NAV — hidden, slides in on scroll-up]                                │
│                                                                        │
│                     INFINITE TRON GRID FLOOR                           │
│          (perspective, vanishing point at 60% from top)                │
│                   Slow drift: Z-axis forward, 0.5px/frame              │
│                                                                        │
│  LEFT SIDE (40% of viewport width)                                     │
│  ─────────────────────────────────                                     │
│  Vidhey's photo — rendered as TRON identity                            │
│                                                                        │
│  The photo has TWO SIMULTANEOUS TREATMENTS:                            │
│    1. 3D Mouse Parallax (option 3):                                    │
│       Photo is split into depth layers (CSS 3D or Three.js plane)      │
│       Face layer: moves 8px opposite to mouse direction                │
│       Hair/background: moves 14px opposite (more depth)               │
│       Creates illusion of 3D without a 3D model                       │
│                                                                        │
│    2. TRON Scanline Overlay (option 4):                                │
│       CSS pseudo-element: repeating horizontal lines                   │
│       opacity: 0.15, height: 2px, gap: 4px (total: 6px repeat)        │
│       Slowly scrolls downward (animation: 8s linear infinite)          │
│       Edge of photo: cyan circuit-board glow border                    │
│       (box-shadow: inset 0 0 20px #00f5ff40)                          │
│                                                                        │
│       Additional: color-dodge cyan overlay on photo                    │
│       Occasional glitch: translateX ±3px, 40ms, random interval        │
│                                                                        │
│  Photo container: hexagonal clip-path (TRON hexagon shape)             │
│  Border: 2px solid #00f5ff with var(--glow-md) box-shadow              │
│                                                                        │
│  RIGHT SIDE (60% of viewport width)                                    │
│  ─────────────────────────────────                                     │
│                                                                        │
│  Line 1: "VIDHEY BHOGADI"                                              │
│    Font: Orbitron 900 weight                                           │
│    Size: clamp(3.5rem, 7vw, 6.5rem)                                    │
│    Color: var(--color-text-primary)                                    │
│    Text shadow: var(--glow-text)                                       │
│    Letter spacing: 0.08em                                              │
│    ANIMATION: Word-by-word laser reveal                                │
│      Each word shoots in from left (translateX(-120px) → 0)           │
│      + opacity 0→1                                                     │
│      Duration: 400ms per word, 120ms stagger                          │
│      Ease: --ease-tron                                                 │
│                                                                        │
│  Line 2: Cyan divider                                                  │
│    Width: 0 → 180px (draws from left)                                  │
│    Height: 2px                                                         │
│    Color: var(--color-accent-primary)                                  │
│    Box-shadow: var(--glow-sm)                                          │
│    Duration: 600ms, delay: 800ms after name                            │
│                                                                        │
│  Line 3: Typewriter title                                              │
│    Font: Rajdhani 600 weight, 1.5rem                                   │
│    Color: var(--color-accent-primary)                                  │
│    Letter spacing: 0.15em                                              │
│    PREFIX (static): "I AM A "                                          │
│    CYCLING TEXT (typewriter):                                          │
│      → "SOFTWARE ENGINEER"  (type 80ms/char, hold 1800ms, delete 40ms/char)
│      → "AI-POWERED BUILDER" (type, hold, delete)                      │
│      → "SDET SPECIALIST"    (type, hold, delete)                      │
│      → "FORCE ON THE GRID"  (type — stay permanently on last cycle)   │
│    Cursor: block cursor █ blinking at 530ms interval                   │
│    After all cycles complete: cursor fades out                         │
│                                                                        │
│  Line 4: Company line                                                  │
│    "Systems Engineer @ TCS — Morgan Stanley Wealth Management"         │
│    Font: Rajdhani 400, 1.1rem                                          │
│    Color: var(--color-text-secondary)                                  │
│    Fade in from translateY(10px) → 0 after typewriter starts          │
│                                                                        │
│  Line 5: CTA Buttons                                                   │
│    [⚡ ENTER THE GRID]        [↓ VIEW RESUME]                          │
│    Primary: filled, --color-accent-hot bg, black text                  │
│    Secondary: transparent, --border-thick border                       │
│    Both: border-trace hover effect (see Button spec below)             │
│                                                                        │
│  BOTTOM CENTER:                                                        │
│  "SCROLL TO RIDE" with pulsing down-arrow                             │
│    Arrow: bounces up/down 6px, 1.5s ease-in-out infinite              │
│    Text: blinks at 1s interval                                         │
│    After 3s: fades out and doesn't return                             │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Hero Background (Three.js)

```typescript
// components/three/GridFloor.tsx

function GridFloor() {
  const gridRef = useRef<THREE.Mesh>()
  
  // Shader material for infinite grid
  const material = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float scrollVelocity;
      uniform vec3 gridColor;
      varying vec2 vUv;
      
      void main() {
        // Grid pattern
        float cellSize = 60.0;
        vec2 grid = abs(fract(vUv * cellSize - 0.5) - 0.5) / fwidth(vUv * cellSize);
        float line = min(grid.x, grid.y);
        
        // Perspective fade (fade toward horizon)
        float fade = 1.0 - vUv.y;
        fade = pow(fade, 0.5);
        
        // Scroll-reactive movement
        float movement = mod(time * (0.1 + scrollVelocity * 0.5), 1.0);
        
        // Glow on primary lines
        float glow = 1.0 - smoothstep(0.0, 1.5, line);
        
        float alpha = glow * fade * 0.6;
        gl_FragColor = vec4(gridColor, alpha);
      }
    `,
    uniforms: {
      time: { value: 0 },
      scrollVelocity: { value: 0 },
      gridColor: { value: new THREE.Color('#00f5ff') }
    },
    transparent: true,
    side: THREE.DoubleSide
  })

  useFrame(({ clock }) => {
    material.uniforms.time.value = clock.getElapsedTime()
    material.uniforms.scrollVelocity.value = currentScrollVelocity
  })

  // Plane: 200x200 units, tilted to look like floor
  return (
    <mesh rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -2, -10]}>
      <planeGeometry args={[200, 200, 100, 100]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}
```

### 7.3 Scroll → Bike Launch Trigger

```typescript
// When user first scrolls in Hero section:
ScrollTrigger.create({
  trigger: '#hero',
  start: 'top top',
  end: '+=200px',
  onLeave: () => {
    // Vidhey character: mount animation
    // gsap: character leans forward, leg swings over
    // Bike: engine revs (audio)
    // Camera: pulls back to show full bike
    // After 800ms: bike launches forward
    // Transition: Hero → About section
    triggerBikeLaunch()
  }
})
```

### 7.4 NeonButton Component (Used Throughout)

```typescript
// components/ui/NeonButton.tsx
// Border-trace hover effect: a line traces around the button border on hover

function NeonButton({ children, variant = 'primary', onClick }) {
  return (
    <button className={`neon-btn neon-btn--${variant}`} onClick={onClick}>
      {/* The tracing border — 4 lines that animate clockwise */}
      <span className="trace top" />
      <span className="trace right" />
      <span className="trace bottom" />
      <span className="trace left" />
      <span className="content">{children}</span>
    </button>
  )
}

/* CSS */
.neon-btn {
  position: relative;
  padding: 14px 32px;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-tron);
  cursor: none; /* Using custom cursor */
  overflow: hidden;
  background: transparent;
  border: 1px solid var(--color-accent-primary);
  color: var(--color-accent-primary);
  box-shadow: var(--glow-xs);
  transition: box-shadow var(--duration-normal) var(--ease-tron);
}

.neon-btn--primary {
  background: var(--color-accent-hot);
  color: #000;
  border-color: var(--color-accent-hot);
}

.neon-btn:hover {
  box-shadow: var(--glow-md);
}

/* The trace lines — start hidden, animate on hover */
.neon-btn .trace {
  position: absolute;
  background: var(--color-accent-primary);
}
.neon-btn .trace.top    { top: 0; left: -100%; height: 1px; width: 100%; }
.neon-btn .trace.right  { top: -100%; right: 0; height: 100%; width: 1px; }
.neon-btn .trace.bottom { bottom: 0; right: -100%; height: 1px; width: 100%; }
.neon-btn .trace.left   { bottom: -100%; left: 0; height: 100%; width: 1px; }

.neon-btn:hover .trace.top    { animation: trace-h 400ms ease forwards; }
.neon-btn:hover .trace.right  { animation: trace-v 400ms 200ms ease forwards; }
.neon-btn:hover .trace.bottom { animation: trace-h-rev 400ms 400ms ease forwards; }
.neon-btn:hover .trace.left   { animation: trace-v-rev 400ms 600ms ease forwards; }

@keyframes trace-h     { to { left: 0; } }
@keyframes trace-v     { to { top: 0; } }
@keyframes trace-h-rev { to { right: 0; } }
@keyframes trace-v-rev { to { bottom: 0; } }
```

---

## 8. SECTION 2 — ABOUT ME

### 8.1 Layout

```
Bike enters from right edge → decelerates → parks LEFT side
Left 20% of viewport: Bike + idle animation

CENTER (60%):
  Section header: "ABOUT: VIDHEY BHOGADI" — glitch reveal on scroll enter
  
  Two-column content:
  ┌──────────────────────┬─────────────────────────────────────┐
  │  PHOTO (left 40%)    │  BIO TEXT (right 60%)               │
  │                      │                                     │
  │  Hexagonal frame     │  "Hi, I'm Vidhey Bhogadi —          │
  │  Cyan glow border    │  a Systems Engineer at TCS,         │
  │  3D mouse parallax   │  building tools and systems for     │
  │  Scanline overlay    │  Morgan Stanley Wealth Management.  │
  │                      │  I architect AI-powered developer   │
  │  Profile card:       │  tools, automate complex testing    │
  │  @vidhey012          │  pipelines, and engineer full-stack │
  │  "Online" indicator  │  applications at enterprise scale." │
  │  (pulsing green dot) │                                     │
  │                      │  Key highlights:                    │
  │                      │  ▸ 1.5+ years @ TCS/Morgan Stanley  │
  │                      │  ▸ CGPA: 8.65 — B.Tech CSE JNTUK   │
  │                      │  ▸ Google AI Leader Certified       │
  │                      │  ▸ AWS Certified                    │
  │                      │  ▸ 3 Awards from TCS/Morgan Stanley │
  └──────────────────────┴─────────────────────────────────────┘

BELOW: Horizontal TRON Timeline (Career Journey)
  ════╦═════════════╦══════════════╦═════════════╦════════════════╗
  2018║  2021       ║  2022        ║  2024 Feb   ║  2024 Nov      ║
  SSC ║  Diploma    ║  B.Tech +    ║  GalaxE     ║  TCS @ Morgan  ║
      ║  AANMVVRSR  ║  Internships ║  Solutions  ║  Stanley       ║
  [⬡] ║  [⬡]        ║  [⬡]         ║  [⬡]        ║  [⬡ PULSING]   ║

  Timeline path: dashed line, animated dash (traveling from left to right)
  Active node (TCS): pulsing ring, 3x scale
  Hover any node: expand panel with details
```

### 8.2 Glitch Text Reveal (Section Headers — Used Throughout)

```typescript
// components/ui/GlitchText.tsx
// When element enters viewport, text scrambles then resolves

function GlitchText({ text, className }: { text: string, className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const { inView } = useInView(ref, { threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    if (!inView || !ref.current) return
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'
    let iteration = 0
    const originalText = text
    
    const interval = setInterval(() => {
      if (!ref.current) return
      ref.current.innerText = originalText
        .split('')
        .map((char, i) => {
          if (i < iteration) return char  // Resolved characters
          if (char === ' ') return ' '
          return chars[Math.floor(Math.random() * chars.length)]  // Scrambled
        })
        .join('')
      
      iteration += 0.4  // Resolve speed
      if (iteration >= originalText.length) clearInterval(interval)
    }, 30)
    
    return () => clearInterval(interval)
  }, [inView, text])

  return (
    <h2 ref={ref} className={className}
        style={{ fontFamily: 'var(--font-display)', letterSpacing: 'var(--tracking-tron)' }}>
      {text}
    </h2>
  )
}
```

---

## 9. SECTION 3 — EXPERIENCE (Cinematic Full-Screen Per Role)

### 9.1 Architecture

This section is a **pinned scroll section**. It takes up 500vh of scroll space. As the user scrolls through those 500vh, GSAP ScrollTrigger moves through 4 scenes (each ~125vh of scroll = 1 scene). The bike is always visible in the lower portion of the screen.

```typescript
// GSAP ScrollTrigger pin
ScrollTrigger.create({
  trigger: '#experience-section',
  start: 'top top',
  end: '+=500vh',
  pin: true,        // Pins the section in place
  scrub: 1,         // Ties animation progress to scroll position
  onUpdate: (self) => {
    const progress = self.progress  // 0 to 1
    const sceneIndex = Math.floor(progress * 4)  // 0, 1, 2, 3
    showScene(sceneIndex, (progress * 4) % 1)    // scene + local progress
  }
})
```

### 9.2 Scene Descriptions

#### SCENE 0: TCS / Morgan Stanley (Scroll 0–25%)

```
BACKGROUND:
  Veo-generated OR procedural: Financial district at night
  Style: TRON version — skyscrapers are glowing grid structures
  Data streams visible between buildings (vertical flowing particles)
  Color: Deep blacks, cyan accents

CAMERA MOVEMENT:
  Slow forward push (dolly in) — feels cinematic, never static

BIKE:
  Visible lower-left, parked, idle. Occasional rev.

LEFT PANEL (holographic floating, 3D tilt with mouse):
  Depth: z-index 1, positioned 20px from left edge
  
  ┌─────────────────────────────────────────────┐
  │  ⚡ SYSTEMS ENGINEER                         │
  │  Tata Consultancy Services                   │
  │  Client: Morgan Stanley Wealth Management    │
  │  November 2024 — Present (1.5+ years)        │
  │  ─────────────────────────────────────────── │
  │  ▸ Built AI VS Code extension → 45% faster   │
  │    test creation (GitHub Copilot + MS AI)    │
  │  ▸ JSON Validator (React + Node.js) → 30x    │
  │    faster than manual validation             │
  │  ▸ PDF Comparator: 500+ docs/run automated  │
  │  ▸ Spring Boot microservices → 40% faster   │
  │  ▸ CI/CD integration → 30% less overhead    │
  │  ─────────────────────────────────────────── │
  │  🏆 On the Spot Award — Morgan Stanley       │
  │  ⚡ TCS Artificial Intelligence Spark        │
  │  🛡️  Xcelerate Warrior (3.33 T-Factor)       │
  └─────────────────────────────────────────────┘

RIGHT SIDE (floating 3D tech badges):
  Badges float at varying Z-depths, slow Y-axis rotation:
  Java | Spring Boot | Playwright | TypeScript | React 
  Node.js | CI/CD | GitHub Copilot
  Each badge: hexagon shape, tech icon + name, glow border

TRANSITION TO SCENE 1:
  Panel slides left off screen
  Camera: pulls back → pans right
  Bike: revs up → starts moving right
  Light beam wipe (left to right, 300ms) reveals Scene 1
```

#### SCENE 1: GalaxE Solutions (Scroll 25–50%)

```
BACKGROUND: Campus / university aesthetic — open courtyard in TRON grid style
  Softer than the financial district — more open, wider grid spacing

PANEL:
  ┌─────────────────────────────────────────────┐
  │  💼 SOFTWARE ENGINEERING INTERN              │
  │  GalaxE Solutions, Inc.                      │
  │  Bangalore, India                            │
  │  February 2024 — April 2024 (3 months)       │
  │  ─────────────────────────────────────────── │
  │  ▸ Built Student Portal with Java +          │
  │    Spring MVC + PostgreSQL                   │
  │  ▸ 1,000+ active users supported            │
  │  ▸ 80% improvement in attendance tracking   │
  │  ▸ JWT auth with 3-tier RBAC system         │
  │  ▸ 60% reduction in admin workload          │
  │  ▸ 10-week timeline, production-ready       │
  └─────────────────────────────────────────────┘

TECH BADGES: Java | Spring MVC | PostgreSQL | JWT | REST APIs
```

#### SCENE 2: JNTUK / ICAR / Others (Scroll 50–75%)

```
BACKGROUND: Network hub aesthetic — web strands, data nodes
  Less cinematic, this is the "formative years" aesthetic

PANEL (wider, shows multiple roles):
  Web Development Admin @ JNTUK (2 years)
  Web Dev @ ICAR/ISTS (4 months)
  DATAVALLEY.AI Full Stack Intern
  TronTech Labs (Web + Drone)

  Condensed format — grid of mini role cards
  Each mini card: role, company, duration, 2 bullet points
```

#### SCENE 3: Other Internships (Scroll 75–100%)

```
BACKGROUND: Training/growth aesthetic — ascending light pillars

PANEL: Scale AI, Employment Express, APSSDC
  Show condensed cards
  Emphasize the breadth of experience

TRANSITION OUT:
  Bike revs → launches → horizontal tunnel wipe → Projects section
```

---

## 10. SECTION 4 — PROJECTS (Particle Explosion Gallery)

### 10.1 Layout

```
6 cards in a 3-column, 2-row grid (desktop)
2-column on tablet, 1-column on mobile

Grid is inside a Three.js canvas — cards are CSS3D objects
positioned in 3D space with slight Z-variation:
  Row 1: cards at Z=0, Z=-20, Z=-10
  Row 2: cards at Z=-15, Z=5, Z=-25
Creates subtle depth — not flat

CARD AT REST:
  Size: 320px × 220px
  Background: var(--color-bg-surface) with 80% opacity
  Border: 1px solid var(--color-accent-primary)
  Box-shadow: var(--glow-xs)
  
  Contents:
  ┌─────────────────────────────────┐
  │  [PROJECT ICON — glowing SVG]   │
  │                                 │
  │  PROJECT NAME                   │  ← Orbitron 700, 1.1rem
  │  Domain Tag                     │  ← Rajdhani 400, 0.8rem, muted
  │  ─────────────────────          │
  │  [badge] [badge] [badge]        │  ← Tech stack icons
  └─────────────────────────────────┘

HOVER STATE (PRE-EXPLODE):
  Mouse enters card → particles begin charging at corners
  (small particles converge toward center — "energy charging")
  Border glow intensifies: var(--glow-md)
  Slight Z-axis lift: translateZ(20px) scale(1.02)
  Duration: 200ms

CLICK / INTERACTION — PARTICLE EXPLODE + REFORM:

  PHASE 1 — CHARGE (0–100ms):
    500 particles converge toward card center from edges
    Particle color: var(--color-accent-primary)
    
  PHASE 2 — EXPLODE (100ms–400ms):
    All 500 particles scatter outward with random velocity:
      velocity = random(150, 400)px in random direction
    Physics: slight gravity (y-0.3 per frame)
    Particle size: random 2–6px
    Trail: each particle has 3-frame motion trail
    SFX: particle-burst.mp3 plays
    Camera: slight shake (2px, 150ms)
    
  PHASE 3 — DRIFT (400ms–600ms):
    Particles float in space, losing velocity
    Chaos state — no pattern
    
  PHASE 4 — REFORM (600ms–1100ms):
    Particles attracted back (magnetic force from center)
    They form into: EXPANDED PROJECT DETAILS CARD
    Final shape is 480px × 340px card

EXPANDED CARD CONTENTS:
  ┌──────────────────────────────────────────────┐
  │  PROJECT NAME                    [✕ CLOSE]  │
  │  ─────────────────────────────────────────── │
  │  Short description (2-3 lines, Rajdhani)     │
  │                                              │
  │  TECH USED:                                  │
  │  [TypeScript] [React] [Node.js] [etc.]       │
  │                                              │
  │  IMPACT:                                     │
  │  "30x validation speed improvement"          │
  │                                              │
  │  [🔗 GitHub]     [🌐 Live Demo]              │
  └──────────────────────────────────────────────┘
```

### 10.2 Six Projects — Complete Content

```
PROJECT 1: BDD Automation Code Generator
  Icon: Code brackets + AI sparkle
  Domain: AI Developer Tooling
  Tech: TypeScript, VS Code Extension API, GitHub Copilot, Test Gen AI
  Description: A VS Code extension that reads a Jira ticket ID, invokes
               the Test Gen AI to extract user story requirements, then
               auto-generates structured BDD feature files and maps them
               to existing Page Object Models via GitHub Copilot.
  Impact: 50% reduction in test authoring time, 45% faster feature-to-code
  GitHub: [link to extension repo]
  Demo: N/A (internal tool — Morgan Stanley)

PROJECT 2: JSON Bulk Validator
  Icon: JSON brackets + checkmark
  Domain: Developer Tooling / QA
  Tech: React, Node.js, Bootstrap, REST APIs
  Description: A full-stack tool with a React UI for comparing bulk JSON
               datasets. Generates interactive HTML reports with built-in
               analytics highlighting discrepancies, field mismatches,
               and data drift across large datasets.
  Impact: 30x faster than manual validation processes
  GitHub: [link]
  Demo: [link if available]

PROJECT 3: PDF Visual Comparator
  Icon: PDF icon + eye
  Domain: QA Automation / Document Processing
  Tech: Playwright, Node.js, JavaScript
  Description: Automated visual comparison tool that processes 500+ document
               pairs per run using Playwright's pixel-by-pixel comparison.
               Generates dynamic discrepancy reports highlighting visual
               differences with bounding box overlays.
  Impact: Eliminated manual review for 500+ docs/run
  GitHub: [link]

PROJECT 4: Steganography Image Generator
  Icon: Lock + image
  Domain: Cyber Security / Cryptography
  Tech: HTML5, CSS3, JavaScript, Canvas API, Unicode Binary, Morse Code, XOR Cipher
  Description: A secure web app that hides encrypted messages inside image
               files using dual-layer encryption: Unicode binary encoding +
               Morse code with XOR cipher. "Gift box" metaphor — encrypt is
               wrapping, decrypt is unwrapping.
  Impact: 100+ secure message transactions, intuitive UI
  GitHub: [link]
  Demo: [live link]

PROJECT 5: JBot — Feed Forward Chatbot
  Icon: Robot head
  Domain: Machine Learning / NLP
  Tech: Python, Django, FFNN, NLP, NLTK, HTML5, CSS3, Bootstrap
  Description: AI-powered chatbot for JNTUK University answering 500+
               college-related queries (admissions, tuition, academics,
               financial aid) using a Feed Forward Neural Network with
               NLP intent classification. 24/7 availability.
  Impact: 24/7 student support, 500+ query types handled
  GitHub: [link]

PROJECT 6: Student Portal (GalaxE)
  Icon: Graduation cap + database
  Domain: Full Stack / Enterprise
  Tech: Java, Spring MVC, PostgreSQL, JWT, REST APIs, XML
  Description: Full-stack Student Portal with role-based access control
               across Admin, Principal, Department Head, Faculty, and
               Student levels. RESTful API backend with JWT authentication.
               Supports 1,000+ concurrent users.
  Impact: 80% improvement in attendance tracking, 60% reduction in admin work
  GitHub: [if available]
```

### 10.3 Particle System Implementation

```typescript
// components/three/ParticleSystem.tsx

interface ParticleSystemProps {
  cardPosition: THREE.Vector3
  cardSize: { w: number; h: number }
  onComplete: (phase: 'explode' | 'reform') => void
}

function useProjectCardParticles(props: ParticleSystemProps) {
  const particles = useRef<THREE.Points>()
  const velocities = useRef<Float32Array>()
  const phase = useRef<'charge' | 'explode' | 'drift' | 'reform'>('charge')

  // 500 particles
  const COUNT = 500
  const positions = useMemo(() => new Float32Array(COUNT * 3), [])
  const colors = useMemo(() => new Float32Array(COUNT * 3), [])

  // Explode: assign random outward velocity to each particle
  function triggerExplode() {
    phase.current = 'explode'
    velocities.current = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const elevation = (Math.random() - 0.5) * Math.PI
      const speed = 150 + Math.random() * 250
      velocities.current[i * 3] = Math.cos(angle) * Math.cos(elevation) * speed
      velocities.current[i * 3 + 1] = Math.sin(elevation) * speed
      velocities.current[i * 3 + 2] = Math.sin(angle) * Math.cos(elevation) * speed
    }
  }

  useFrame((_, delta) => {
    if (phase.current === 'explode') {
      // Update positions with velocity + gravity
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     += velocities.current![i * 3] * delta
        positions[i * 3 + 1] += velocities.current![i * 3 + 1] * delta - 9.8 * delta * 20
        positions[i * 3 + 2] += velocities.current![i * 3 + 2] * delta
        // Dampen velocity
        velocities.current![i * 3]     *= 0.95
        velocities.current![i * 3 + 1] *= 0.95
        velocities.current![i * 3 + 2] *= 0.95
      }
      particles.current!.geometry.attributes.position.needsUpdate = true
    }
    // ... reform phase: lerp back toward new target positions
  })
}
```

---

## 11. SECTION 5 — SKILLS (3D Orb Galaxy)

### 11.1 Concept

35 skill orbs arranged in 3 orbital rings around a central glowing core. The user can click any orb to expand it to center with full details. The bike parks and we see the orb galaxy floating in the TRON grid space.

### 11.2 Orb Configuration

```typescript
interface SkillOrb {
  id: string
  name: string
  icon: string           // SVG icon path
  category: SkillCategory
  proficiency: number    // 0–100
  usedAtMS: boolean      // Used at Morgan Stanley?
  ring: 0 | 1 | 2       // Which orbital ring
  angle: number          // Starting angle (radians)
  orbitSpeed: number     // Radians per second
  orbRadius: number      // Distance from center (Three.js units)
  color: string          // Hex — slight hue variation within category
  size: number           // 0.3 to 0.8 — based on proficiency
}

const SKILLS: SkillOrb[] = [
  // RING 0 — Inner core (most proficient, most used)
  { id: 'java', name: 'Java', ring: 0, orbRadius: 4, orbitSpeed: 0.4, size: 0.7, proficiency: 90, usedAtMS: true, color: '#f89820', category: 'language' },
  { id: 'typescript', name: 'TypeScript', ring: 0, orbRadius: 4, orbitSpeed: 0.35, size: 0.65, proficiency: 88, usedAtMS: true, color: '#3178c6', category: 'language' },
  { id: 'javascript', name: 'JavaScript', ring: 0, orbRadius: 4, orbitSpeed: 0.45, size: 0.65, proficiency: 90, usedAtMS: true, color: '#f7df1e', category: 'language' },
  { id: 'python', name: 'Python', ring: 0, orbRadius: 4, orbitSpeed: 0.3, size: 0.6, proficiency: 82, usedAtMS: false, color: '#3776ab', category: 'language' },
  { id: 'react', name: 'React', ring: 0, orbRadius: 4, orbitSpeed: 0.5, size: 0.65, proficiency: 85, usedAtMS: true, color: '#61dafb', category: 'frontend' },
  { id: 'springboot', name: 'Spring Boot', ring: 0, orbRadius: 4, orbitSpeed: 0.38, size: 0.65, proficiency: 85, usedAtMS: true, color: '#6db33f', category: 'backend' },

  // RING 1 — Middle (proficient, frequently used)
  { id: 'playwright', name: 'Playwright', ring: 1, orbRadius: 7, orbitSpeed: 0.25, size: 0.55, proficiency: 80, usedAtMS: true, color: '#2ead33', category: 'testing' },
  { id: 'nodejs', name: 'Node.js', ring: 1, orbRadius: 7, orbitSpeed: 0.22, size: 0.55, proficiency: 78, usedAtMS: true, color: '#339933', category: 'backend' },
  { id: 'selenium', name: 'Selenium', ring: 1, orbRadius: 7, orbitSpeed: 0.28, size: 0.5, proficiency: 82, usedAtMS: true, color: '#43b02a', category: 'testing' },
  { id: 'cypress', name: 'Cypress', ring: 1, orbRadius: 7, orbitSpeed: 0.2, size: 0.5, proficiency: 75, usedAtMS: false, color: '#17202c', category: 'testing' },
  { id: 'postgresql', name: 'PostgreSQL', ring: 1, orbRadius: 7, orbitSpeed: 0.32, size: 0.55, proficiency: 80, usedAtMS: false, color: '#336791', category: 'database' },
  { id: 'mongodb', name: 'MongoDB', ring: 1, orbRadius: 7, orbitSpeed: 0.18, size: 0.5, proficiency: 72, usedAtMS: false, color: '#47a248', category: 'database' },
  { id: 'nextjs', name: 'Next.js', ring: 1, orbRadius: 7, orbitSpeed: 0.26, size: 0.5, proficiency: 75, usedAtMS: false, color: '#ffffff', category: 'frontend' },
  { id: 'django', name: 'Django', ring: 1, orbRadius: 7, orbitSpeed: 0.24, size: 0.45, proficiency: 70, usedAtMS: false, color: '#092e20', category: 'backend' },

  // RING 2 — Outer (working knowledge)
  { id: 'aws', name: 'AWS', ring: 2, orbRadius: 10, orbitSpeed: 0.15, size: 0.45, proficiency: 68, usedAtMS: false, color: '#ff9900', category: 'cloud' },
  { id: 'docker', name: 'Docker', ring: 2, orbRadius: 10, orbitSpeed: 0.12, size: 0.45, proficiency: 65, usedAtMS: false, color: '#2496ed', category: 'devops' },
  { id: 'graphql', name: 'GraphQL', ring: 2, orbRadius: 10, orbitSpeed: 0.18, size: 0.4, proficiency: 60, usedAtMS: false, color: '#e10098', category: 'backend' },
  { id: 'kubernetes', name: 'Kubernetes', ring: 2, orbRadius: 10, orbitSpeed: 0.1, size: 0.4, proficiency: 55, usedAtMS: false, color: '#326ce5', category: 'devops' },
  { id: 'firebase', name: 'Firebase', ring: 2, orbRadius: 10, orbitSpeed: 0.14, size: 0.4, proficiency: 65, usedAtMS: false, color: '#ffca28', category: 'database' },
  { id: 'mysql', name: 'MySQL', ring: 2, orbRadius: 10, orbitSpeed: 0.16, size: 0.4, proficiency: 78, usedAtMS: false, color: '#4479a1', category: 'database' },
  { id: 'redis', name: 'Redis', ring: 2, orbRadius: 10, orbitSpeed: 0.13, size: 0.38, proficiency: 55, usedAtMS: false, color: '#dc382d', category: 'database' },
  { id: 'git', name: 'Git', ring: 2, orbRadius: 10, orbitSpeed: 0.17, size: 0.42, proficiency: 88, usedAtMS: true, color: '#f05032', category: 'devops' },
  { id: 'copilot', name: 'GitHub Copilot', ring: 2, orbRadius: 10, orbitSpeed: 0.11, size: 0.45, proficiency: 90, usedAtMS: true, color: '#ffffff', category: 'ai' },
  // ... add remaining skills to reach ~35 total
]
```

### 11.3 Orb Interaction

```typescript
// On orb hover:
//   - Stop orb's orbit (freeze angle)
//   - Scale from current size → size * 1.5 (spring animation)
//   - Tooltip appears: name + category tag
//   - Other orbs: dim slightly (opacity 0.4)

// On orb click:
//   - All other orbs: scale to 0.1 + drift away from center
//   - Clicked orb: flies to screen center
//   - Expands to: 300px diameter circle
//   - Shows:
//     ┌─────────────────────────────────┐
//     │  [TECH ICON — large, 80px]      │
//     │  SKILL NAME                     │
//     │  Category: Frontend Framework   │
//     │                                 │
//     │  Proficiency:                   │
//     │  ████████████░░░  85%           │  ← Animated fill ring
//     │                                 │
//     │  Used at Morgan Stanley: ✓ YES  │
//     │                                 │
//     │  Projects:                      │
//     │  • JSON Validator               │
//     │  • BDD Code Generator           │
//     │                                 │
//     │              [✕ CLOSE]         │
//     └─────────────────────────────────┘
```

---

## 12. SECTION 6 — CERTIFICATIONS & AWARDS (3D Trophy Case)

### 12.1 Layout — Trophy Room

```
3D ROOM (Three.js — perspective camera looking into the room)

BACK WALL: Certification Display Panel
  5 certification holographic cards mounted on wall:
  
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │  🤖 GOOGLE   │  │  ☁️  AWS      │  │  🌐 CISCO    │
  │  CERTIFIED   │  │  CLOUD       │  │  NETWORKING  │
  │  GENERATIVE  │  │  COMPUTING   │  │  ESSENTIALS  │
  │  AI LEADER   │  │  (AMAZON)    │  │              │
  │              │  │              │  │              │
  │  Credential: │  │  Credential: │  │  Credential: │
  │  [ID]        │  │  [ID]        │  │  [ID]        │
  └──────────────┘  └──────────────┘  └──────────────┘
  
  ┌──────────────┐  ┌──────────────┐
  │  🎬 SELENIUM │  │  + MORE      │
  │  4 COMPLETE  │  │  CERTS...    │
  │  (UDEMY)     │  │              │
  └──────────────┘  └──────────────┘

  Each cert card:
    Background: var(--color-bg-elevated)
    Border: 1px cyan with glow
    Hover: glow intensifies, card moves forward (Z+10), details expand

FLOOR PEDESTALS (4 pedestals, evenly spaced):

  PEDESTAL 1 — Gold:
    Trophy model: Star/medal shape
    Inscription: "ON THE SPOT AWARD"
    Sub: "Morgan Stanley"
    Glow: gold #ffd700
    
  PEDESTAL 2 — Cyan Electric:
    Trophy model: Lightning bolt
    Inscription: "TCS AI SPARK"
    Sub: "Artificial Intelligence"
    Glow: cyan #00f5ff
    
  PEDESTAL 3 — Silver:
    Trophy model: Shield/warrior
    Inscription: "XCELERATE WARRIOR"
    Sub: "3.33 T-Factor"
    Glow: silver #c0c0c0
    
  PEDESTAL 4 — Bronze:
    Trophy model: Flame/torch
    Inscription: "CHAMPION TRAINING"
    Sub: "2390+ Points"
    Glow: bronze #cd7f32

  Each trophy:
    Slow Y-axis rotation: 0.3 radians/second
    Point light directly beneath (upward god-ray)
    Hover: rotation stops, trophy rises 0.5 units, detailed panel appears
    Click: full viewport takeover moment:
      - Screen dims (other content: opacity 0.2)
      - Trophy zooms to center (scale 3x)
      - Award story appears: when, why, context
      - Particle confetti burst (gold/cyan)
      - [✕] to close

AMBIENT:
  God-ray light shafts from ceiling: 3 shafts, slow drift
  Dust particles (very subtle): 200 particles, extremely slow movement
  Floor: reflective (Three.js reflection/mirror via EquirectangularReflectionMapping)
```

---

## 13. SECTION 7 — GITHUB STATS (Live Data Grid)

### 13.1 Data Fetching

```typescript
// hooks/useGitHubStats.ts
// Fetches from GitHub REST API v3 — public data, no auth needed for basic stats

const GITHUB_USERNAME = 'Vidhey012'

async function fetchGitHubStats() {
  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`)
  ])
  
  const user = await userRes.json()
  const repos = await reposRes.json()
  const events = await eventsRes.json()
  
  return {
    totalRepos: user.public_repos,
    followers: user.followers,
    totalStars: repos.reduce((acc, r) => acc + r.stargazers_count, 0),
    totalForks: repos.reduce((acc, r) => acc + r.forks_count, 0),
    topRepos: repos.slice(0, 6),
    recentCommits: events.filter(e => e.type === 'PushEvent').length,
    languages: aggregateLanguages(repos),
  }
}
```

### 13.2 Layout

```
THREE STAT TERMINALS:
  ┌────────────────────┐
  │  GRID: PUBLIC REPOS│
  │  ─────────────────  │
  │      [NUMBER]       │
  │  Number rolls up    │
  │  on scroll enter    │
  └────────────────────┘
  Same for: TOTAL STARS | RECENT COMMITS

LANGUAGE RING CHART (Three.js):
  Donut chart in 3D (tilted plane)
  Segments: Java, TypeScript, JavaScript, Python, HTML, CSS, others
  Each segment: TRON color, glow border, hover tooltip with %

CONTRIBUTION GRID (custom — replaces GitHub's default):
  52 columns (weeks) × 7 rows (days) = 364 squares
  Each square: 10×10px, 2px gap
  Empty day: var(--color-bg-grid-cell)
  Active day: glow intensity proportional to commit count:
    1 commit:  opacity 0.3 + var(--glow-xs)
    2-4:       opacity 0.6 + var(--glow-sm)
    5-9:       opacity 0.8 + var(--glow-md)
    10+:       opacity 1.0 + var(--glow-lg) — bright pulsing
  
  Entrance animation: squares light up in sequence from left to right
    Each column: 20ms delay, squares in column fade in simultaneously
    Total entrance: ~1 second (52 columns × 20ms)
  
  Hover: Square scales 1.5x, tooltip shows "3 commits on March 15, 2025"

TOP REPOS CARDS:
  6 cards in a 3×2 grid
  Each card:
    Repo name (Orbitron)
    Description (truncated 80 chars)
    Language badge (colored dot + name)
    ⭐ stars count | 🍴 forks count
    Last updated date
    Hover: border glow + link to GitHub
```

---

## 14. SECTION 8 — CONTACT (Final Cinematic Scene)

### 14.1 Bike Arrival Sequence

```
BIKE enters from LEFT edge, full speed
Decelerates over 2 seconds (easing: ease-out cubic)
Stops CENTER of screen
Brake SFX plays
Light trail fades out behind bike

Vidhey dismounts (animation — legs swing, stands up)
Armor DISSOLVES piece by piece (reverse of preloader):
  Helmet visor goes up → helmet lifts off
  Chest plate: breaks into particles that drift up
  Gauntlets: dissolve from fingertips to shoulder
  Leg armor: fades downward
  Duration: 2 seconds total — much faster than assembly
  Remaining: Vidhey in regular (slightly TRON-styled) appearance
  
Vidhey walks to LEFT side of screen
Turns to face visitor
Friendly, open body language
```

### 14.2 Split Screen Layout

```
LEFT 50% — VIDHEY'S HOLOGRAM PANEL:
  Vidhey's image/hologram
  Treatment: half-TRON, half-human
    Left half of face: normal photo
    Right half: slight TRON circuit overlay, glow edge
    Boundary between two halves: glitches occasionally (80ms)
  
  "Let's build something legendary together."
    Font: Rajdhani 600, 1.4rem
    Appears word by word, 80ms stagger
  
  SOCIAL LINKS (as TRON badge pills):
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ LinkedIn │  │  GitHub  │  │  Email   │
    └──────────┘  └──────────┘  └──────────┘
    Each: icon + label, hover: glow + slight Y lift
    Click LinkedIn: opens linkedin.com/in/bhogadi-vidhey-aa62b71a8
    Click GitHub: opens github.com/Vidhey012
    Click Email: mailto:vidhey.bhogadi2003@gmail.com
    
  CONTACT INFO:
    📧 vidhey.bhogadi2003@gmail.com
    📞 +91 7396104404
    📍 Bangalore, India (currently at TCS)
    
  Bike: still visible in background, idle rev

RIGHT 50% — CONTACT FORM PANEL:
  Floating holographic panel
  Background: var(--color-bg-elevated) 85% opacity
  Border: 2px var(--color-accent-primary) with var(--glow-md)
  Panel title: "INITIATE CONTACT" (Orbitron, tracking 0.15em)
  
  FORM FIELDS:
    NAME:
      Label: "DESIGNATION:" (Orbitron, 0.75rem, tracking 0.15em, muted)
      Input: full width, transparent bg, 1px bottom border cyan
      Focus: bottom border glows (var(--glow-sm)), label slides up 8px
      Placeholder: "Your Name" (muted, italic)
    
    EMAIL:
      Label: "SIGNAL FREQUENCY:"
      Input: same style
      Validation: cyan border on valid, red on invalid
    
    SUBJECT:
      Label: "TRANSMISSION TYPE:"
      Select/Input: dropdown or text input
      Options: "Job Opportunity" | "Collaboration" | "General" | "Other"
    
    MESSAGE:
      Label: "MESSAGE PAYLOAD:"
      Textarea: 4 rows, same style
      Character counter: "0 / 500" — bottom right, muted
    
    SUBMIT BUTTON:
      Full width
      Text: "⚡ SEND TRANSMISSION"
      Font: Orbitron 700, tracking 0.15em
      Background: var(--color-accent-hot)
      Color: #000
      Hover: border trace effect
      
  ON SUBMIT CLICK — IDENTITY DISC THROW ANIMATION:
    1. Identity disc appears on Vidhey's back (LEFT panel)
    2. He reaches back, grabs it (hand animation)
    3. Throws it across the screen (RIGHT direction)
       Arc trajectory: slight parabola, 400ms duration
       Trail: cyan glow trail behind disc
       Spin: disc rotates on X axis during flight
    4. Disc hits SEND button → button flashes → form submits (EmailJS)
    5. Disc bounces back (physics reverse) → returns to Vidhey's back
    6. SUCCESS STATE:
       Form fades out
       "TRANSMISSION SENT // MESSAGE RECEIVED" appears
       Cyan particle burst at form location
       Vidhey gives thumbs up (if animated model available)
    
  ERROR STATE:
    "TRANSMISSION FAILED // CHECK SIGNAL" in red
    Form shakes slightly (3px horizontal, 300ms)

FOOTER:
  Full width, below split screen
  Thin cyan line separator (with var(--glow-xs))
  LEFT: "© VIDHEY BHOGADI 2025 — 2026"
  CENTER: "V.GRID — END OF LINE"  (Orbitron, tracking 0.2em)
  RIGHT: Social icon row (LinkedIn, GitHub, Instagram)
  Below: "Built with Next.js • Three.js • GSAP • Deployed on Netlify"
  Font: Rajdhani 400, 0.8rem, muted color
```

---

## 15. THE BIKE — PERSISTENT SCROLL GUIDE (Complete Technical Spec)

### 15.1 The Bike Model

```
If using a pre-made model (Sketchfab):
  Search: "TRON Light Cycle" filter: Free, CC0 license
  Format: Download as GLB (compressed glTF binary)
  Target poly count: under 15,000 polygons for performance

If building procedurally (recommended for full control):
```

```typescript
// components/three/LightCycle.tsx
// Build the bike from Three.js primitives

function buildLightCycle(): THREE.Group {
  const group = new THREE.Group()
  
  // TRON accent material
  const tronMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#00f5ff'),
    emissive: new THREE.Color('#00f5ff'),
    emissiveIntensity: 2,
    metalness: 0.9,
    roughness: 0.1
  })
  
  const bodyMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#111111'),
    metalness: 0.95,
    roughness: 0.05
  })
  
  // MAIN BODY
  // Elongated box — sleek, low profile
  const bodyGeo = new THREE.BoxGeometry(3.5, 0.5, 1.2)
  // Bevel with custom geometry for sleek edges
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  body.position.set(0, 0.5, 0)
  group.add(body)
  
  // COCKPIT / RIDER AREA
  const cockpitGeo = new THREE.BoxGeometry(1.2, 0.6, 1)
  const cockpit = new THREE.Mesh(cockpitGeo, bodyMat)
  cockpit.position.set(0.3, 0.95, 0)
  group.add(cockpit)
  
  // FRONT LIGHT CANNON (TRON accent)
  const frontGeo = new THREE.CylinderGeometry(0.15, 0.25, 0.8, 8)
  frontGeo.rotateZ(Math.PI / 2)
  const front = new THREE.Mesh(frontGeo, tronMat)
  front.position.set(1.9, 0.5, 0)
  group.add(front)
  
  // WHEELS (2)
  const wheelGeo = new THREE.TorusGeometry(0.5, 0.1, 16, 32)
  
  const frontWheel = new THREE.Mesh(wheelGeo, tronMat)
  frontWheel.position.set(1.5, 0, 0)
  frontWheel.rotation.y = Math.PI / 2
  group.add(frontWheel)
  
  const rearWheel = new THREE.Mesh(wheelGeo, tronMat)
  rearWheel.position.set(-1.5, 0, 0)
  rearWheel.rotation.y = Math.PI / 2
  group.add(rearWheel)
  
  // CIRCUIT LINE ACCENTS on body
  // Use LineSegments for the glowing edge circuits
  const circuitPoints = [
    // Side stripe
    new THREE.Vector3(-1.5, 0.5, 0.6), new THREE.Vector3(1.5, 0.5, 0.6)
  ]
  const circuitGeo = new THREE.BufferGeometry().setFromPoints(circuitPoints)
  const circuitMat = new THREE.LineBasicMaterial({ color: '#00f5ff', linewidth: 2 })
  const circuit = new THREE.LineSegments(circuitGeo, circuitMat)
  group.add(circuit)
  
  // POINT LIGHT (under bike — rim lighting)
  const bikeLight = new THREE.PointLight('#00f5ff', 3, 4)
  bikeLight.position.set(0, -0.2, 0)
  group.add(bikeLight)
  
  // SPOTLIGHT (front headlight)
  const headlight = new THREE.SpotLight('#00f5ff', 5, 20, 0.3, 0.5)
  headlight.position.set(2, 0.5, 0)
  headlight.target.position.set(10, 0, 0)
  group.add(headlight)
  
  return group
}
```

### 15.2 Light Trail System

```typescript
// The bike's iconic light trail
// Implemented as a THREE.Line with a custom buffer that grows as the bike moves

function LightTrail({ bikePosition, maxPoints = 200 }) {
  const lineRef = useRef<THREE.Line>()
  const points = useRef<THREE.Vector3[]>([])
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(maxPoints * 3)
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [maxPoints])
  
  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      attribute float alpha;
      varying float vAlpha;
      void main() {
        vAlpha = alpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 trailColor;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(trailColor, vAlpha);
      }
    `,
    uniforms: {
      trailColor: { value: new THREE.Color('#00f5ff') }
    },
    transparent: true,
    blending: THREE.AdditiveBlending
  }), [])
  
  useFrame(() => {
    // Add current bike position to trail
    points.current.unshift(bikePosition.clone())
    if (points.current.length > maxPoints) points.current.pop()
    
    // Update geometry
    const positions = geometry.attributes.position.array as Float32Array
    const alphas = new Float32Array(points.current.length)
    
    points.current.forEach((pt, i) => {
      positions[i * 3] = pt.x
      positions[i * 3 + 1] = pt.y
      positions[i * 3 + 2] = pt.z
      alphas[i] = 1 - (i / points.current.length)  // Fade from front to back
    })
    
    geometry.setDrawRange(0, points.current.length)
    geometry.attributes.position.needsUpdate = true
  })
  
  return <line ref={lineRef} geometry={geometry} material={material} />
}
```

### 15.3 Scroll Velocity → Bike Speed Mapping

```typescript
// hooks/useScrollVelocity.ts

export function useScrollVelocity() {
  const velocity = useRef(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())
  
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      const dt = now - lastTime.current
      const dy = window.scrollY - lastScrollY.current
      
      // Pixels per millisecond
      velocity.current = Math.abs(dy / dt)
      
      lastScrollY.current = window.scrollY
      lastTime.current = now
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return velocity
}

// BikeController.tsx — mapping velocity to effects:
function updateBikeFromVelocity(velocity: number) {
  // Clamp: 0 to 2 (pixels/ms)
  const normalized = Math.min(velocity / 2, 1)
  
  // Wheel spin speed (radians per second)
  wheelSpinSpeed = 0.5 + normalized * 8
  
  // Engine audio pitch (Howler)
  bikeIdleSound.rate(0.8 + normalized * 1.2)  // 0.8x to 2.0x pitch
  
  // Grid scroll speed (Three.js shader uniform)
  gridMaterial.uniforms.scrollVelocity.value = normalized
  
  // Motion blur on bike (CSS filter)
  bikeElement.style.filter = `blur(${normalized * 3}px)`
  
  // Lean angle (tilt bike forward when fast)
  bike.rotation.z = -normalized * 0.15  // Max 8.6 degree forward lean
  
  // Trail length (more points when faster)
  trailMaxPoints = Math.floor(50 + normalized * 200)
}
```

### 15.4 Waypoints (Where Bike Goes Per Section)

```typescript
// Section waypoints in Three.js world space
// These are the positions the bike visits as the user scrolls through each section

const SECTION_WAYPOINTS = {
  hero:         new THREE.Vector3(0, 0, 0),           // Center stage
  about:        new THREE.Vector3(-5, 0, 0),           // Parks left
  experience0:  new THREE.Vector3(-8, 0, -5),          // Left, forward
  experience1:  new THREE.Vector3(8, 0, -5),           // Right (new scene)
  experience2:  new THREE.Vector3(-6, 0, -10),
  experience3:  new THREE.Vector3(6, 0, -10),
  projects:     new THREE.Vector3(0, 0, -15),          // Center, weaves between cards
  skills:       new THREE.Vector3(-8, 0, -20),         // Parks left of orb galaxy
  certs:        new THREE.Vector3(0, 0, -25),          // Ceremonial ride through
  github:       new THREE.Vector3(6, 0, -28),          // Right of stats
  contact:      new THREE.Vector3(0, 0, -32),          // Final stop center
}

// Smooth path: use THREE.CatmullRomCurve3 through all waypoints
const bikePath = new THREE.CatmullRomCurve3([
  SECTION_WAYPOINTS.hero,
  SECTION_WAYPOINTS.about,
  SECTION_WAYPOINTS.experience0,
  // ... all waypoints
])

// In BikeController useFrame:
function updateBikePosition(scrollProgress: number) {
  const point = bikePath.getPoint(scrollProgress)
  const tangent = bikePath.getTangent(scrollProgress)
  
  // Move bike to point
  bikeGroup.position.copy(point)
  
  // Orient bike toward path tangent (direction of travel)
  bikeGroup.lookAt(point.clone().add(tangent))
}
```

---

## 16. CURSOR SYSTEM (Complete)

```typescript
// components/cursor/TronCursor.tsx

export function TronCursor() {
  const orb = useRef<HTMLDivElement>(null)      // Inner dot
  const ring = useRef<HTMLDivElement>(null)      // Outer ring
  const shockwave = useRef<HTMLDivElement>(null) // Click ripple
  
  const mouse = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })       // Lags behind mouse
  
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      
      // Inner orb: follows immediately
      orb.current!.style.transform = 
        `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
    }
    
    const onClick = (e: MouseEvent) => {
      // Shockwave: appears at click position, expands then fades
      const sw = shockwave.current!
      sw.style.transform = `translate(${e.clientX - 40}px, ${e.clientY - 40}px)`
      sw.classList.add('active')
      setTimeout(() => sw.classList.remove('active'), 500)
      
      // SFX
      uiClickSound.play()
    }
    
    // Outer ring: lerp toward mouse (creates lag/inertia)
    let raf: number
    function animateRing() {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12
      ring.current!.style.transform = 
        `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`
      raf = requestAnimationFrame(animateRing)
    }
    animateRing()
    
    document.addEventListener('mousemove', onMove)
    document.addEventListener('click', onClick)
    
    // Hover states
    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.current!.classList.add('hovering')
        ring.current!.style.transform += ' scale(1.5)'
      })
      el.addEventListener('mouseleave', () => {
        ring.current!.classList.remove('hovering')
      })
    })
    
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
    }
  }, [])
  
  return (
    <>
      {/* Inner energy orb */}
      <div ref={orb} className="cursor-orb" />
      
      {/* Outer ring (lags behind) */}
      <div ref={ring} className="cursor-ring" />
      
      {/* Click shockwave */}
      <div ref={shockwave} className="cursor-shockwave" />
    </>
  )
}
```

```css
/* cursor.css */
*, *::before, *::after {
  cursor: none !important;  /* Hide all default cursors */
}

.cursor-orb {
  position: fixed;
  top: 0; left: 0;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--color-accent-primary);
  box-shadow: var(--glow-md);
  pointer-events: none;
  z-index: var(--z-cursor);
  will-change: transform;
  /* NO transition — must follow immediately */
}

.cursor-ring {
  position: fixed;
  top: 0; left: 0;
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 1.5px solid var(--color-accent-primary);
  opacity: 0.6;
  pointer-events: none;
  z-index: var(--z-cursor);
  will-change: transform;
  /* Lerp via JS, no CSS transition */
}

.cursor-ring.hovering {
  border-color: var(--color-accent-hot);
  opacity: 1;
  mix-blend-mode: difference;  /* Inverts colors under ring on hover — luxury effect */
}

.cursor-shockwave {
  position: fixed;
  top: 0; left: 0;
  width: 80px; height: 80px;
  border-radius: 50%;
  border: 2px solid var(--color-accent-primary);
  opacity: 0;
  pointer-events: none;
  z-index: calc(var(--z-cursor) - 1);
  transform-origin: center;
}

.cursor-shockwave.active {
  animation: shockwave 500ms var(--ease-out) forwards;
}

@keyframes shockwave {
  0%   { transform: scale(0.2); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
}
```

---

## 17. NAVIGATION SYSTEM

```typescript
// components/navigation/TronNav.tsx

export function TronNav() {
  const [visible, setVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const lastScrollY = useRef(0)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const isScrollingUp = currentY < lastScrollY.current
      
      if (isScrollingUp && currentY > 200) {
        setVisible(true)
      } else {
        setVisible(false)
      }
      lastScrollY.current = currentY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate the beam reveal when nav shows
  useEffect(() => {
    if (visible) {
      gsap.fromTo(navRef.current, 
        { yPercent: -100 }, 
        { yPercent: 0, duration: 0.25, ease: 'power2.out' }
      )
      // Beam: separate div that shoots across then nav follows
    }
  }, [visible])

  const links = [
    { href: '#about', label: 'ABOUT' },
    { href: '#experience', label: 'EXPERIENCE' },
    { href: '#projects', label: 'PROJECTS' },
    { href: '#skills', label: 'SKILLS' },
    { href: '#certifications', label: 'CERTS' },
    { href: '#contact', label: 'CONTACT' },
  ]

  return (
    <nav ref={navRef} className={`tron-nav ${visible ? 'visible' : ''}`}>
      {/* Beam that shoots across on reveal */}
      <div className="nav-reveal-beam" />
      
      {/* Logo */}
      <a href="#hero" className="nav-logo">V.GRID</a>
      
      {/* Links */}
      <ul className="nav-links">
        {links.map(link => (
          <li key={link.href}>
            <a 
              href={link.href}
              className={activeSection === link.href.slice(1) ? 'active' : ''}
              onClick={() => smoothScrollTo(link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      
      {/* Right side */}
      <div className="nav-right">
        <ModeToggle />
        <AudioToggle />
        <NeonButton variant="secondary" onClick={downloadResume}>
          RESUME ↓
        </NeonButton>
      </div>
    </nav>
  )
}
```

```css
.tron-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--section-pad-x);
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-accent-primary);
  box-shadow: 0 1px 0 0 var(--color-accent-primary), var(--glow-xs);
  transform: translateY(-100%);  /* Default: hidden above viewport */
  z-index: var(--z-nav);
  transition: none;  /* Controlled by GSAP */
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: var(--color-accent-primary);
  text-shadow: var(--glow-text);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: var(--space-8);
  list-style: none;
}

.nav-links a {
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--color-text-secondary);
  text-decoration: none;
  position: relative;
  transition: color var(--duration-fast);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 50%; right: 50%;
  height: 1px;
  background: var(--color-accent-primary);
  box-shadow: var(--glow-xs);
  transition: left var(--duration-normal) var(--ease-tron),
              right var(--duration-normal) var(--ease-tron);
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--color-accent-primary);
  text-shadow: var(--glow-text);
}

.nav-links a:hover::after,
.nav-links a.active::after {
  left: 0; right: 0;  /* Underline expands from center out */
}

/* Beam reveal animation */
.nav-reveal-beam {
  position: absolute;
  top: 0; left: 0;
  height: 2px; width: 0;
  background: linear-gradient(90deg, transparent, var(--color-accent-primary), transparent);
  box-shadow: var(--glow-sm);
  animation: beam-shoot 300ms ease forwards;
}

@keyframes beam-shoot {
  to { width: 100%; }
}
```

---

## 18. AUDIO SYSTEM

```typescript
// lib/audio.ts
import { Howl, Howler } from 'howler'

// Global volume (controlled by user toggle)
let masterVolume = 0.6
let audioEnabled = false  // Off by default — user opts in

export const Audio = {
  ambient: new Howl({
    src: ['/audio/ambient-tron.mp3'],
    loop: true,
    volume: 0.15,
    preload: false
  }),
  
  bikeIdle: new Howl({
    src: ['/audio/bike-idle.mp3'],
    loop: true,
    volume: 0.3,
    preload: false
  }),
  
  // Non-looping SFX — preloaded
  whoosh:       new Howl({ src: ['/audio/section-whoosh.mp3'], volume: 0.5 }),
  uiHover:      new Howl({ src: ['/audio/ui-hover.mp3'], volume: 0.2 }),
  uiClick:      new Howl({ src: ['/audio/ui-click.mp3'], volume: 0.3 }),
  burst:        new Howl({ src: ['/audio/particle-burst.mp3'], volume: 0.5 }),
  discThrow:    new Howl({ src: ['/audio/disc-throw.mp3'], volume: 0.6 }),
  trophyHum:    new Howl({ src: ['/audio/trophy-hum.mp3'], volume: 0.2 }),
  modeSwitch:   new Howl({ src: ['/audio/mode-switch.mp3'], volume: 0.4 }),
  typeTick:     new Howl({ src: ['/audio/type-tick.mp3'], volume: 0.15 }),
  bikeLaunch:   new Howl({ src: ['/audio/bike-launch.mp3'], volume: 0.7 }),
  bikeBrake:    new Howl({ src: ['/audio/bike-brake.mp3'], volume: 0.5 }),
  armorLock:    new Howl({ src: ['/audio/armor-lock.mp3'], volume: 0.6 }),
  worldUnleash: new Howl({ src: ['/audio/world-unleash.mp3'], volume: 0.7 }),
  
  // Play helper — checks if audio is enabled
  play(sound: Howl, options?: { pitch?: number }) {
    if (!audioEnabled) return
    if (options?.pitch) sound.rate(options.pitch)
    sound.play()
  },
  
  enable() {
    audioEnabled = true
    Howler.volume(masterVolume)
    this.ambient.play()
    this.bikeIdle.play()
  },
  
  disable() {
    audioEnabled = false
    Howler.volume(0)
  },
  
  // Real-time pitch adjustment for bike engine
  setBikeSpeed(normalized: number) {  // 0 to 1
    if (!audioEnabled) return
    this.bikeIdle.rate(0.8 + normalized * 1.2)
    this.bikeIdle.volume(0.2 + normalized * 0.3)
  }
}
```

### Audio Toggle Component

```typescript
// components/ui/AudioToggle.tsx
// Small button in nav — speaker icon with TRON styling

export function AudioToggle() {
  const [enabled, setEnabled] = useState(false)
  
  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    if (next) Audio.enable()
    else Audio.disable()
    Audio.play(Audio.modeSwitch)
  }
  
  return (
    <button onClick={toggle} className="audio-toggle" title={enabled ? 'Mute' : 'Enable Audio'}>
      {enabled ? <SpeakerIcon /> : <MutedIcon />}
      <span>{enabled ? 'SFX ON' : 'SFX OFF'}</span>
    </button>
  )
}
```

---

## 19. DARK/LIGHT MODE SYSTEM

```typescript
// components/ui/ModeToggle.tsx

export function ModeToggle() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  
  useEffect(() => {
    // On mount: check localStorage or system preference
    const saved = localStorage.getItem('vidhey-theme') as 'dark' | 'light' | null
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setMode(saved || system)
  }, [])
  
  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    
    // CINEMATIC TRANSITION:
    // 1. Flash overlay
    const flash = document.createElement('div')
    flash.style.cssText = `
      position: fixed; inset: 0; z-index: 999;
      background: ${next === 'light' ? '#ffffff' : '#000000'};
      opacity: 0; pointer-events: none;
    `
    document.body.appendChild(flash)
    
    gsap.timeline()
      .to(flash, { opacity: 0.8, duration: 0.15 })
      .call(() => {
        document.documentElement.setAttribute('data-theme', next)
        setMode(next)
        localStorage.setItem('vidhey-theme', next)
        // Update Three.js materials
        updateThreeJSColors(next)
      })
      .to(flash, { opacity: 0, duration: 0.3 })
      .call(() => flash.remove())
    
    Audio.play(Audio.modeSwitch)
  }
  
  return (
    <button onClick={toggle} className="mode-toggle">
      <div className={`toggle-track ${mode}`}>
        <div className="toggle-thumb">
          {mode === 'dark' ? <MoonIcon /> : <SunIcon />}
        </div>
        <div className="circuit-decoration" />
      </div>
    </button>
  )
}
```

---

## 20. MOBILE PROGRESSIVE ENHANCEMENT

```typescript
// lib/gpu-detect.ts
import { getGPUTier } from 'detect-gpu'

export type RenderTier = 'full' | 'medium' | 'lite'

export async function detectRenderTier(): Promise<RenderTier> {
  try {
    const gpuTier = await getGPUTier()
    
    if (gpuTier.tier >= 3) return 'full'    // Desktop GPU, flagship mobile
    if (gpuTier.tier === 2) return 'medium' // Mid-range, some mobile
    return 'lite'                            // Low-end, older devices
  } catch {
    return 'lite'  // Safe fallback
  }
}

// FULL TIER — Everything:
// ✅ Three.js full scenes
// ✅ Particle systems (500 particles)
// ✅ Persistent bike
// ✅ Postprocessing (bloom, chromatic aberration)
// ✅ Real-time scroll-reactive grid shader
// ✅ Preloader full cinematic

// MEDIUM TIER:
// ✅ Three.js scenes (simplified)
// ✅ Particle systems (100 particles)
// ✅ Persistent bike (simplified model)
// ❌ Postprocessing (disabled — too expensive)
// ✅ Grid (static, CSS-only animation)
// ✅ Preloader (simplified — skip video phase)

// LITE TIER — CSS Only:
// ❌ Three.js (disabled entirely)
// ❌ Particle systems
// ❌ Persistent bike (replaced with progress bar)
// ❌ Postprocessing
// ✅ CSS grid animations
// ✅ Framer Motion for UI transitions
// ✅ All content sections (same info, simpler presentation)
// ✅ Same TRON color scheme and typography
```

---

## 21. PERFORMANCE & OPTIMIZATION

```typescript
// Lazy loading heavy Three.js scenes
const HeroThreeScene = dynamic(() => import('./HeroThreeScene'), { ssr: false })
const ExperienceScenes = dynamic(() => import('./ExperienceScenes'), { ssr: false })
const SkillsOrbGalaxy = dynamic(() => import('./SkillsOrbGalaxy'), { ssr: false })

// Intersection-based loading: only init Three.js when section is near viewport
const { ref, inView } = useInView({ threshold: 0, rootMargin: '200px 0px' })
return <div ref={ref}>{inView && <SkillsOrbGalaxy />}</div>

// Texture atlas: combine all skill icons into single sprite sheet
// Reduces draw calls from ~35 to 1 for the orb galaxy

// Dispose Three.js resources on unmount:
useEffect(() => {
  return () => {
    geometry.dispose()
    material.dispose()
    renderer.dispose()
  }
}, [])

// Target metrics:
// LCP: < 2.5s (hero content loads fast — Three.js loads progressively)
// FPS: 60 desktop, 30 minimum mobile
// Bundle: < 200kb initial JS (Three.js code-split and lazy loaded)
// Total page weight: < 5MB (excluding video)
```

---

## 22. COMPLETE FOLDER STRUCTURE

```
vidhey-tron-portfolio/
│
├── app/
│   ├── layout.tsx                    # Root layout: fonts, theme init, analytics
│   ├── page.tsx                      # Main page: all sections + preloader
│   ├── globals.css                   # CSS custom properties, base reset
│   ├── api/
│   │   └── github/route.ts           # GitHub API proxy (avoid CORS)
│   └── favicon.ico
│
├── components/
│   │
│   ├── preloader/
│   │   ├── TronPreloader.tsx         # Orchestrator — controls all preloader phases
│   │   ├── PreloaderVideo.tsx        # Real-world video layer + film grain
│   │   ├── GlitchEffects.tsx         # Chromatic aberration, scan lines, flicker
│   │   ├── PreloaderScene.tsx        # Three.js TRON world for preloader
│   │   ├── OrbInteraction.tsx        # The energy orb + touch detection
│   │   ├── ArmorAssembly.tsx         # Piece-by-piece armor animation
│   │   └── PreloaderProgress.tsx     # "GRID INTEGRITY: 0%" counter
│   │
│   ├── navigation/
│   │   ├── TronNav.tsx               # Main nav (hidden, scroll-up reveal)
│   │   └── NavLink.tsx               # Individual nav link with underline effect
│   │
│   ├── cursor/
│   │   └── TronCursor.tsx            # Dual-layer cursor + shockwave
│   │
│   ├── bike/
│   │   ├── BikeController.tsx        # Scroll orchestration + waypoint system
│   │   ├── LightCycle.tsx            # Three.js bike model (procedural)
│   │   ├── LightTrail.tsx            # The glowing trail behind the bike
│   │   └── BikeAudio.tsx             # Engine SFX tied to scroll velocity
│   │
│   ├── sections/
│   │   ├── Hero/
│   │   │   ├── Hero.tsx              # Hero section orchestrator
│   │   │   ├── HeroCharacter.tsx     # Vidhey photo with parallax + scanline
│   │   │   ├── HeroText.tsx          # Name + typewriter + CTA
│   │   │   └── HeroScene.tsx         # Three.js grid floor + ambient particles
│   │   │
│   │   ├── About/
│   │   │   ├── About.tsx
│   │   │   ├── AboutPhoto.tsx        # Photo with 3D parallax + scanline
│   │   │   ├── AboutBio.tsx          # Bio text with line-by-line reveal
│   │   │   └── AboutTimeline.tsx     # Horizontal career timeline
│   │   │
│   │   ├── Experience/
│   │   │   ├── Experience.tsx        # Pinned scroll section orchestrator
│   │   │   ├── ExperienceScene.tsx   # Three.js background per scene
│   │   │   ├── RoleCard.tsx          # Holographic floating role card
│   │   │   └── TechBadge.tsx         # Floating 3D tech badges
│   │   │
│   │   ├── Projects/
│   │   │   ├── Projects.tsx
│   │   │   ├── ProjectCard.tsx       # Individual card with particle system
│   │   │   ├── ProjectParticles.tsx  # Particle explode/reform engine
│   │   │   └── ProjectDetail.tsx     # Expanded project details panel
│   │   │
│   │   ├── Skills/
│   │   │   ├── Skills.tsx
│   │   │   ├── OrbGalaxy.tsx         # Three.js orbital system
│   │   │   ├── SkillOrb.tsx          # Individual orb (3D sphere + glow)
│   │   │   └── OrbDetail.tsx         # Expanded skill detail panel
│   │   │
│   │   ├── Certifications/
│   │   │   ├── Certifications.tsx
│   │   │   ├── TrophyRoom.tsx        # Three.js room + pedestals
│   │   │   ├── TrophyPedestal.tsx    # Individual award trophy
│   │   │   └── CertCard.tsx         # Wall-mounted cert display
│   │   │
│   │   ├── GitHubStats/
│   │   │   ├── GitHubStats.tsx
│   │   │   ├── StatTerminal.tsx      # Individual metric display
│   │   │   ├── ContribGrid.tsx       # Custom contribution heatmap
│   │   │   └── LanguageRing.tsx      # 3D donut chart
│   │   │
│   │   └── Contact/
│   │       ├── Contact.tsx
│   │       ├── ContactLeft.tsx       # Vidhey hologram + social links
│   │       ├── ContactForm.tsx       # Form with identity disc animation
│   │       ├── DiscThrow.tsx         # Identity disc throw physics
│   │       └── Footer.tsx
│   │
│   ├── three/
│   │   ├── GridFloor.tsx             # Reusable infinite TRON grid (shader)
│   │   ├── ParticleField.tsx         # Ambient floating particles
│   │   ├── Bloom.tsx                 # Postprocessing bloom wrapper
│   │   ├── GodRays.tsx               # Volumetric light shafts
│   │   ├── TronEnvironment.tsx       # Lighting setup for TRON scenes
│   │   └── ShaderMaterials.ts        # All custom GLSL shaders
│   │
│   └── ui/
│       ├── GlitchText.tsx            # Scramble → resolve text animation
│       ├── TypewriterText.tsx        # Typewriter with TRON cursor
│       ├── NeonButton.tsx            # Border-trace hover button
│       ├── ModeToggle.tsx            # Dark/light TRON switch
│       ├── AudioToggle.tsx           # Mute/unmute button
│       ├── SectionHeader.tsx         # Glitch-reveal section title
│       └── HolographicCard.tsx       # Reusable holographic panel
│
├── hooks/
│   ├── useScrollVelocity.ts          # Real-time scroll speed measurement
│   ├── useGPUTier.ts                 # Async GPU detection on mount
│   ├── useGitHubStats.ts             # SWR fetch for GitHub data
│   ├── useLenis.ts                   # Lenis smooth scroll setup
│   └── useTheme.ts                   # Dark/light mode state + transitions
│
├── lib/
│   ├── gsap.ts                       # GSAP + plugins init (ScrollTrigger, TextPlugin)
│   ├── three-utils.ts                # Dispose helpers, material factories
│   ├── audio.ts                      # Howler.js instance map
│   ├── gpu-detect.ts                 # Render tier detection
│   └── emailjs.ts                    # EmailJS send helper
│
├── shaders/
│   ├── grid.vert                     # Grid floor vertex shader
│   ├── grid.frag                     # Grid floor fragment shader
│   ├── trail.vert                    # Bike trail vertex
│   ├── trail.frag                    # Bike trail fragment (alpha fade)
│   ├── orb.vert                      # Skill orb vertex
│   └── orb.frag                      # Skill orb glow fragment
│
├── public/
│   ├── models/
│   │   ├── light-cycle.glb
│   │   ├── identity-disc.glb
│   │   └── trophy-base.glb
│   ├── audio/
│   │   ├── ambient-tron.mp3
│   │   ├── bike-idle.mp3
│   │   ├── bike-accelerate.mp3
│   │   ├── bike-max.mp3
│   │   ├── bike-brake.mp3
│   │   ├── bike-launch.mp3
│   │   ├── section-whoosh.mp3
│   │   ├── ui-hover.mp3
│   │   ├── ui-click.mp3
│   │   ├── particle-burst.mp3
│   │   ├── orb-pulse.mp3
│   │   ├── armor-lock.mp3
│   │   ├── world-unleash.mp3
│   │   ├── disc-throw.mp3
│   │   ├── trophy-hum.mp3
│   │   ├── mode-switch.mp3
│   │   ├── glitch-sfx.mp3
│   │   ├── power-up.mp3
│   │   └── type-tick.mp3
│   ├── video/
│   │   ├── preloader-realworld.mp4   # Veo 2 generated
│   │   └── hero-ambient.mp4          # Optional Veo 2 generated (looping bg)
│   ├── images/
│   │   ├── vidhey-photo.jpg
│   │   ├── noise.png                 # Tileable film grain texture
│   │   ├── og-image.jpg
│   │   └── icons/                    # Tech stack SVG icons (36x36)
│   │       ├── java.svg
│   │       ├── typescript.svg
│   │       ├── react.svg
│   │       └── ... (all 35 skills)
│   └── fonts/
│       └── (handled by next/font/google — no manual files needed)
│
├── styles/
│   ├── preloader.css
│   ├── cursor.css
│   ├── navigation.css
│   ├── sections.css                  # Section-level layout
│   └── animations.css                # Shared animation keyframes
│
├── types/
│   ├── skill.ts
│   ├── project.ts
│   ├── experience.ts
│   └── three-extensions.d.ts        # Three.js type augmentations
│
├── netlify.toml
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.local                        # Git-ignored
└── .env.example                      # Template for team
```

---

## 23. EMAILJS SETUP (No Backend Needed — Free for 200 emails/month)

```
1. Go to https://emailjs.com → Create free account
2. Add Email Service: Gmail (connect vidhey.bhogadi2003@gmail.com)
3. Create Email Template:
   Template ID: template_vidhey_contact
   
   Subject: "New Contact from {{from_name}} — vidhey.netlify.app"
   Body:
     Name: {{from_name}}
     Email: {{from_email}}
     Subject: {{subject}}
     Message: {{message}}
     Sent from: vidhey.netlify.app/contact
   
4. Get Public Key from Account → API Keys
5. Add to .env.local:
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_vidhey_contact
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
```

---

## 24. ANTIGRAVITY MASTER PROMPT

Copy and paste this into Antigravity as the foundation prompt:

```
═══════════════════════════════════════════════════════════════════
ANTIGRAVITY MASTER PROMPT — VIDHEY BHOGADI TRON PORTFOLIO
═══════════════════════════════════════════════════════════════════

BUILD a cinematic TRON: Legacy themed 3D personal portfolio website
for Vidhey Bhogadi, Systems Engineer at TCS (Client: Morgan Stanley
Wealth Management), Bangalore, India.

FRAMEWORK: Next.js 14 (App Router, static export for Netlify), TypeScript.
3D ENGINE: Three.js 0.163 + React Three Fiber + @react-three/drei + postprocessing.
ANIMATION: GSAP 3 + ScrollTrigger + Lenis smooth scroll + Framer Motion.
AUDIO: Howler.js.
STYLING: Tailwind CSS + CSS Custom Properties.
DEPLOYMENT: Netlify (static export — next.config.js: output: 'export').
CONTACT: EmailJS (no backend required).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DARK MODE (default):
  Background: #000000 (pure black)
  Accent: #00f5ff (electric cyan)
  Text: #e0fbfc (ice white)
  Grid lines: #00f5ff14 (barely visible)
  Glow: box-shadow: 0 0 12px #00f5ffaa, 0 0 30px #00f5ff60, 0 0 60px #00f5ff20

LIGHT MODE:
  Background: #f0f8ff (alice blue)
  Accent: #0057ff (electric blue)
  Text: #0a0e1a (near black)

FONTS:
  Display: Orbitron (900 weight for hero, 700 for headings)
  Body: Rajdhani (400/600)
  Mono: JetBrains Mono (terminals, code)
  Stats: Share Tech Mono (numbers, counters)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE SIGNATURE FEATURE: PERSISTENT LIGHT-CYCLE BIKE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A TRON light-cycle bike rides through EVERY section of the portfolio
as the user scrolls. This bike is always visible (Three.js canvas 
overlaid on the page). The bike:
  • Follows GSAP ScrollTrigger waypoints — one per section
  • Reacts to scroll VELOCITY:
      - Fast scroll → bike accelerates, wheels spin faster, engine pitch rises,
        light trail elongates, grid floor speeds up
      - Slow/stopped scroll → bike decelerates, parks, idle engine hum
  • Carries a glowing cyan light trail behind it at all times
  • Has its own point light that illuminates nearby grid floor
  • Audio: engine pitch controlled by Howler.js .rate() tied to scroll velocity

Bike per section behaviors:
  HERO: Launches forward on first scroll (dramatic launch SFX + motion blur)
  ABOUT: Decelerates, parks left side, idle
  EXPERIENCE: Rides between job scenes (4 cinematic scenes = 4 stops)
  PROJECTS: Weaves/orbits around project cards before parking
  SKILLS: Weaves through orb galaxy, parks left
  CERTS: Ceremonial slow ride past trophy pedestals
  GITHUB: Loops around stats grid
  CONTACT: Final approach + full stop + Vidhey dismounts + armor dissolves

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CINEMATIC PRELOADER (10–13 seconds)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A full cinematic sequence before the site loads:
1. [0–3s] Real world: first-person POV walking a corridor (Veo video plays).
   Film grain, desaturated, vignette. Corner counter: "GRID INTEGRITY: 0%"
2. [2–4s] Glitch begins: RGB chromatic aberration splits, scan lines flash,
   reality flickers. Text: "GRID INITIALIZING..."
3. [3.5–4.5s] TRON world materializes over the real world (Three.js canvas
   fades in). Infinite grid floor, ceiling, walls. 500 particle burst.
4. [4.5–6s] Energy orb appears ahead, pulses with cyan glow, particles orbit it.
   Text: "IDENTITY PROGRAM DETECTED" — scan line reveal.
5. [6–9s] Contact orb → FLASH → ARMOR ASSEMBLY:
   Boots → shins → thighs → chest (SLAM + camera shake) → arms → helmet visor.
   Each piece traces in with cyan light, locks with metallic SFX.
6. [8.5s] Character reveal: "PROGRAM: VIDHEY BHOGADI // ONLINE"
7. [9–10s] Light cycle materializes. Vidhey mounts.
8. [10–10.5s] LAUNCH → camera blast transition → Hero section reveals.
GSAP timeline controls all phases. preloader div: scale(20) zoom-out transition.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTIONS (8 total)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. HERO: Vidhey photo (hexagonal clip, 3D mouse parallax + scanline overlay).
   Name in Orbitron 900. Typewriter cycling: "SOFTWARE ENGINEER" → "AI-POWERED
   BUILDER" → "SDET SPECIALIST" → "FORCE ON THE GRID". Two CTA buttons with
   border-trace hover effect. Infinite Three.js grid floor background.

2. ABOUT: Split layout: photo (left) + bio text (right). Horizontal career
   timeline below — nodes at 2018/2021/2022/2024/present. Animated dashed path.

3. EXPERIENCE: GSAP ScrollTrigger PINNED section (500vh total scroll space).
   4 cinematic scenes (TCS/MS, GalaxE, JNTUK, Others). Each scene has its own
   Three.js background, holographic role card (3D tilt), floating tech badges.
   Camera moves between scenes with horizontal light-beam wipe transitions.

4. PROJECTS: 6 project cards in 3D space (varying Z-depths). HOVER: particles
   charge at corners. CLICK: 500 particles EXPLODE outward, drift, then REFORM
   into expanded project details card. Howler SFX on explosion.

5. SKILLS: ~35 skill orbs in 3 orbital rings (Three.js). Click: orb flies to
   center, expands with proficiency ring + projects used + MS badge.

6. CERTIFICATIONS: Three.js room. Back wall: 5 cert cards. Floor: 4 trophy
   pedestals with rotating awards (gold/cyan/silver/bronze). Click: full viewport
   trophy moment + particle confetti. God-ray light shafts from ceiling.

7. GITHUB STATS: Live data from GitHub REST API. 3 stat terminals (repos/stars/
   commits). Custom contribution grid (TRON-colored, wave entrance animation).
   3D tilted language donut chart.

8. CONTACT: Bike arrives → Vidhey dismounts → armor dissolves. Split screen:
   LEFT: Vidhey hologram (half-human half-TRON) + social links + contact info.
   RIGHT: Contact form. Submit → identity disc flies from Vidhey's back across
   screen to hit submit button → EmailJS sends email. Footer: "END OF LINE".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CURSOR: Dual-layer.
  Layer 1 (orb): 8px glowing circle, follows immediately.
  Layer 2 (ring): 32px ring, 12% lerp lag, mix-blend-mode:difference on hover.
  Layer 3: 80px shockwave ring on click.

NAV: Hidden (translateY -100%). Reveals on scroll-up via GSAP + beam animation.
Orbitron font, cyan active underline that slides between links.

AUDIO: Howler.js. Ambient loop (off by default, toggle in nav). Engine SFX tied
to scroll velocity. Section whoosh on transitions. UI hover/click ticks.
Particle burst on project card click. Disc throw SFX on contact submit.

DARK/LIGHT TOGGLE: Cinematic flash transition (full-screen flash → CSS variables
swap → Three.js material colors update).

MOBILE: detect-gpu → tier 3 = full 3D, tier 2 = simplified 3D, tier 1 = CSS only.

PERFORMANCE: Dynamic imports for all Three.js scenes. Intersection Observer for
lazy init. Dispose all Three.js geometry/materials on unmount.

CONTACT FORM: EmailJS (@emailjs/browser). No backend. Service/template/key from
environment variables.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OWNER INFORMATION (populate the site with this)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: Vidhey Bhogadi
Role: Systems Engineer @ TCS | Client: Morgan Stanley Wealth Management
Email: vidhey.bhogadi2003@gmail.com
Phone: +91 7396104404
Location: Bangalore, India (currently at TCS Whitefield)
LinkedIn: https://linkedin.com/in/bhogadi-vidhey-aa62b71a8
GitHub: https://github.com/Vidhey012
Portfolio (old): https://vidhey.netlify.app
Instagram: https://instagram.com/b_vidhey

EDUCATION:
  B.Tech Computer Science — JNTUK UCEK — CGPA: 8.65 (Dec 2021 – May 2024)
  Diploma Computer Engineering — AANMVVRSR Polytechnic (2018–2021)

AWARDS:
  On the Spot Team Award — Morgan Stanley
  TCS Artificial Intelligence Spark
  Xcelerate Warrior — 3.33 T-Factor
  Champion Level Training — 2390+ points

CERTIFICATIONS:
  Google Certified Generative AI Leader
  AWS Cloud Computing (Amazon)
  Cisco Networking Essentials
  Selenium 4 Complete (Udemy)
═══════════════════════════════════════════════════════════════════
```

---

## 25. ALL AI PROMPTS CONSOLIDATED

### VEO 2 PROMPTS

#### VEO PROMPT #1 — Preloader Real World Corridor
```
Generate a 3-second first-person POV video of a person walking slowly forward 
through a narrow, dimly lit concrete corridor or hallway. The corridor walls are 
grey concrete with subtle texture. Overhead fluorescent lighting casts a cool, 
slightly blue-tinted light. The camera bobs gently with the natural rhythm of 
footsteps — subtle vertical movement, very slight horizontal sway. The edges of 
the frame have a soft black vignette. Visible 35mm film grain texture throughout.
The walk pace is slow and deliberate — not rushed. At 2.8 seconds, a single 
bright white horizontal scan line flashes rapidly from top to bottom of screen 
in approximately 80 milliseconds — barely perceptible but creates unease.
Color grade: heavily desaturated (near monochrome with slight blue tint), 
dark shadows, cinematic look. No people visible ahead. No text, no HUD, 
no UI elements. Aspect ratio: 16:9. This will be used as the opening of a 
website preloader.
```

#### VEO PROMPT #2 — Hero Ambient Background (Optional)
```
Generate a 10-second seamlessly looping ambient video of an infinite glowing 
grid floor extending to the horizon, viewed from slightly above and in front.
The grid is made of fine cyan-colored lines (#00f5ff) on a pure black background.
The grid slowly moves toward the camera (Z-axis scroll toward viewer) at a very 
gentle pace — giving the sensation of slow forward movement through a digital 
world. Small glowing particles float gently upward throughout the frame — about 
20–30 visible at any time, varying sizes 2–5px, cyan glow. The horizon line glows 
brighter than the rest of the grid. The entire scene has a slight blue-tinted 
atmospheric haze toward the horizon. Absolute darkness at edges. No text, no 
characters, no objects — just the infinite grid, particles, and void. Must loop 
perfectly — last frame matches first frame. Cinematic quality. 16:9 aspect ratio.
```

### GEMINI PROMPTS

#### GEMINI PROMPT #1 — Vidhey TRON Character Description (for 3D model generation)
```
Generate a detailed written description for creating a 3D character model of a 
young South Indian male (early 20s, athletic build, medium height, short dark 
hair) wearing full TRON: Legacy style armor. The armor should be:

HELMET: Smooth, aerodynamic helmet with a T-shaped visor gap. The visor is a 
transparent dark cyan-tinted panel. Glowing cyan circuit lines trace along the 
edges of the helmet. Two rear fins for aerodynamic styling.

CHEST: A form-fitting chest plate with a prominent glowing cyan identity circuit 
on the front — a geometric pattern of straight lines forming a simplified 
human-figure shape. The identity disc (a flat circular disc approximately 30cm 
diameter) is mounted on the back, glowing cyan, slowly spinning.

ARMS: Sleek arm guards from shoulder to wrist. Circuit line accents along 
outer edges. Fingerless gauntlets at the wrist.

LEGS: Smooth thigh plates and shin guards. Knee pads with circuit detailing.
Boots with slight heel elevation.

COLOR SCHEME: Base armor color is near-black (very dark charcoal, #111111). 
All circuit lines, edges, and glowing elements are electric cyan (#00f5ff).
The glow should appear as if emitting light — not just colored, but luminous.
The identity disc on the back: solid glowing cyan, significant light emission.

POSE: Standing tall, confident, slight forward lean, one arm relaxed at side, 
other arm slightly raised. Facing slightly right (3/4 view preferred).
```

#### GEMINI PROMPT #2 — Site Copy Generation
```
Generate compelling, TRON-themed website copy for each section of a portfolio 
website for Vidhey Bhogadi, a Systems Engineer at TCS working on Morgan Stanley 
Wealth Management. Use TRON: Legacy language themes (Grid, Program, System, 
Identity, etc.) but keep it professional — not gimmicky. Tone: confident, 
technically impressive, slightly cinematic.

Generate copy for:
1. Hero tagline (1 line, under the name)
2. About section bio (3 paragraphs)
3. Experience section intro (2 sentences)
4. Projects section intro (1-2 sentences)
5. Skills section intro (1 sentence)
6. Contact section message from Vidhey (2-3 sentences, warm but TRON-themed)
7. Footer tagline

Context: Vidhey builds AI tools (VS Code extensions), automation frameworks
(Playwright/Selenium), full-stack apps (React/Spring Boot), and works on 
enterprise systems for Morgan Stanley. He's 22 years old, ambitious, and 
passionate about AI-powered engineering. CGPA 8.65, multiple awards.
```

#### GEMINI PROMPT #3 — Open Graph Image
```
Create a 1200x630px Open Graph social share image for the website vidhey.netlify.app.
TRON: Legacy aesthetic. Pure black background. Center: "VIDHEY BHOGADI" in large 
Orbitron font, electric cyan (#00f5ff) with outer glow. Below: "Systems Engineer 
// Morgan Stanley // TCS" in smaller Rajdhani font, same cyan color, muted.
Background: subtle TRON grid lines at 10% opacity. Right side: abstract TRON 
light-cycle silhouette in cyan, simplified/iconic. Top-left corner: "V.GRID" 
in small Orbitron as the logo. Bottom: "vidhey.netlify.app" URL in Share Tech 
Mono font. Overall: cinematic, dark, professional. Exactly 1200x630px PNG.
```

### SUNO AI PROMPTS (for ambient audio generation)

#### SUNO PROMPT #1 — Ambient Background Music
```
Electronic ambient music in the style of Daft Punk's TRON: Legacy soundtrack.
Key elements: Deep pulsing synthesizer bass drone. High-frequency arpeggiated 
synthesizer melody (major scale, hopeful). Subtle orchestral strings in 
background. Digital glitch percussive elements every 8 bars. Tempo: very slow, 
approximately 60 BPM. Key: D minor then resolving to F major. Duration: 3 minutes 
seamlessly looping. No vocals. No drums/beats — purely ambient and atmospheric. 
Sound design: futuristic, cinematic, digital world. Emotional tone: wonder, 
discovery, digital frontier. Style: Hans Zimmer meets Daft Punk. Use synthesizers, 
pads, strings, and subtle electronic effects. Must end in a way that loops 
seamlessly back to beginning.
```

---

*VIDHEY.GRID — Complete Master Blueprint v2.0*
*Netlify Deployment Edition*
*Every detail specified. Ready for Antigravity + Flow + Claude + Veo + Gemini.*
*Built for: vidhey.netlify.app*
*Date: March 2026*
