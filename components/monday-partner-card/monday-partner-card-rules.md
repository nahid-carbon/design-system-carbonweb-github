---
component: monday-partner-card
variants: [default, interactive]
states: [default]
depends_on: [colors, typography, radii, shadows]
version: 1.0.0
last_updated: 2026-07-22
---

# Monday Partner Card — Rules

## Overview
Trust/credibility card section showcasing CarbonWeb's monday.com partnership. Features heading, description, three stat counters with gradient text, and an infinite logo marquee of client brands.

## Structure
- `.monday-partner-card` — outer card container (white, rounded, bottom gradient bar)
- `.monday-partner-card__shine` — animated shine layer (`aria-hidden`, exactly 6 `<i>` children)
- `.monday-partner-card__heading` — main heading (Raleway Bold 44px)
- `.monday-partner-card__description` — subtext (Raleway Regular 20px, max-width 620px)
- `.monday-partner-card__stats` — flex row of stat counters
  - `.monday-partner-card__stat` — individual stat block
    - `.monday-partner-card__stat-value` — large number (Montserrat Bold 42px, gradient text)
    - `.monday-partner-card__stat-label` — descriptor text (Raleway Regular 20px)
- `.monday-partner-card__marquee` — logo marquee container (overflow hidden, edge fade mask)
  - `.monday-partner-card__marquee-track` — flex wrapper for groups
    - `.monday-partner-card__marquee-group` — repeating set of logos (animated)

## Visual Details
- Card: white bg, 16px border-radius, `overflow: hidden`
- Bottom gradient bar: 6px height, teal-500 → green-500 (via `::after`)
- Stat numbers: `linear-gradient(225deg, teal-500, green-500)` with `background-clip: text`
- Stat numbers font: Montserrat Bold 42px (NOT Raleway)
- Logo marquee: edge fade via CSS `mask-image`, 20s infinite scroll animation
- Logo size: 102px width, auto height

## WebGL Fluid Shine (primary, requires JS)
- `monday-partner-card.js` mounts a WebGL canvas inside `.monday-partner-card__shine`
- Fragment shader: 40-iteration sine domain warp (lightswind gradient-background style), recolored to brand palette
- Two phase-offset wave channels drive dominance-weighted teal/green mix — no grey mush
- Alpha: wave energy × vignette × top-fade — saturated fluid pockets, bottom stays clean for logos
- Canvas CSS: `blur(36px) saturate(160%)`, opacity 0.9
- `IntersectionObserver` pauses rendering off-screen
- `prefers-reduced-motion: reduce` skips WebGL entirely
- Fallback chain: WebGL fluid → CSS blobs (no JS/no WebGL) → static blobs (reduced motion)

## Interactive Variant
- Add `monday-partner-card--interactive` to the card element (keep same markup otherwise)
- Flow speed 1.0 (vs 0.55 ambient)
- Cursor: field bends away from pointer (`exp` falloff push + local swirl), eased at 0.08/frame for liquid lag; strength fades in/out on enter/leave
- Click: spawns expanding ripple ring (up to 4 concurrent, ~3s life) that distorts the domain and flashes brightness
- All interaction handled by `monday-partner-card.js` via `iMouse`/`iMouseStrength`/`iRipples[4]` shader uniforms
- Interaction listeners attach to the card, not the canvas (shine layer is `pointer-events: none`)

## CSS Blob Shine (fallback)
- `.monday-partner-card__shine` holds 6 `<i>` blobs, GPU-animated via `transform` (not background keyframes)
- Blobs 1–5: corner-anchored radial gradients (teal/green), `blur(60px)`, drift/breathe loops
- Durations 9–16s, staggered so composite pattern never visibly repeats
- All keyframes start/end at identity transform — seamless infinite loop
- Blob 6: diagonal white/teal light sweep (`mp-shine-sweep`, 12s) — rests, glides across, rests
- `prefers-reduced-motion: reduce` disables all shine animation
- Markup: `<div class="monday-partner-card__shine" aria-hidden="true"><i></i>×6</div>` — must be first child

## Logo Marquee
- 3 duplicate `.monday-partner-card__marquee-group` elements for seamless loop
- Groups 2 and 3 have `aria-hidden="true"`
- Animation: `translate3d(-100%, 0, 0)` on each group for perfect loop
- Edge fade: `mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent)`
- Speed variable: `--marquee-speed: 20s`

## Responsive
- Tablet (≤991px): heading 36px, stat numbers 36px, marquee 15s
- Mobile (≤767px): heading 28px, stats stack vertically, logos 80px wide, marquee 10s

## Rules
- Always include Montserrat Bold font import for stat numbers
- Card designed for dark page backgrounds (white card contrasts)
- On light backgrounds, add `box-shadow` for depth
- Logos stored in `logos/` subdirectory
- No JS required — pure CSS animation
- Duplicate marquee groups 2–3 times for seamless scroll on wide viewports
