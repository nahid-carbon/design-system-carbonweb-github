---
component: liquid-glass-cards
variants: [teal, green, yellow, pink, ink, dark, elevated, refract]
states: [default]
depends_on: [colors, typography, radii, shadows]
version: 1.0.0
last_updated: 2026-07-21
---

# Liquid Glass Cards — Rules

## Overview
Apple-inspired liquid glass card group using `color-mix()` box-shadow stack for multi-directional specular highlights and rim lighting. Single-element glass with backdrop blur, SVG displacement map refraction, mouse-tracking specular highlight, and glow border effect.

## Structure
- `.liquid-glass-cards` — container, tracks mouse position, holds glass CSS variables
- `.liquid-glass-card` — individual card (single element handles glass via CSS)
  - `::after` — mouse-tracking specular highlight (radial gradient)
  - `.liquid-glass-card__content` — card content wrapper (`position: relative; z-index: 1`)
- `.liquid-glass-card__icon` — glass-styled icon container (also uses `color-mix()` box-shadow)
- `.liquid-glass-card__title` — card heading
- `.liquid-glass-card__description` — card body text
- `.liquid-glass-cards__glow` — glow border overlay (created by JS)

## Glass Effect (Single Element)
All glass rendering happens on `.liquid-glass-card` itself:
- **Background**: `color-mix(in srgb, var(--c-glass) 12%, transparent)` — subtle translucent tint
- **Backdrop filter**: `blur(8px) url(#liquidGlassLens) saturate(var(--saturation))` — frosted blur with SVG displacement
- **Box-shadow stack**: 10-layer `inset` + outer shadows using `color-mix()` with `--glass-reflex-light` and `--glass-reflex-dark` multipliers for theme-adaptive rim lighting
- **Specular `::after`**: radial gradient following `--glass-x` / `--glass-y` mouse position

## CSS Variables
| Variable | Default | Purpose |
|----------|---------|---------|
| `--c-glass` | `#bbbbbc` | Base glass tint color |
| `--c-light` | `#fff` | Light reflex color |
| `--c-dark` | `#000` | Dark shadow color |
| `--glass-reflex-light` | `1` | Light reflex intensity multiplier |
| `--glass-reflex-dark` | `1` | Dark shadow intensity multiplier |
| `--saturation` | `150%` | Backdrop saturation boost |

## SVG Displacement Map Filter
Include once per page. Uses base64 WebP displacement map for subtle refraction:
```html
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <filter id="liquidGlassLens" x="-50%" y="-50%" width="200%" height="200%">
    <feImage href="data:image/webp;base64,UklGRlIA..." result="map" />
    <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
    <feDisplacementMap in="blur" in2="map" scale="0.5" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>
```

## Color Variants
| Class | Glow Color |
|-------|-----------|
| `liquid-glass-card--teal` | Teal 500 |
| `liquid-glass-card--green` | Green 500 |
| `liquid-glass-card--yellow` | Yellow 500 |
| `liquid-glass-card--pink` | Pink 500 |
| `liquid-glass-card--ink` | Ink/Slate |

## Modifiers
- `liquid-glass-cards--dark` — dark variant (`--glass-reflex-dark: 2`, `--glass-reflex-light: 0.3`)
- `liquid-glass-card--elevated` — stronger glass tint (`18%` instead of `12%`)

## Glow Border
- 1px `inset box-shadow` on glow overlay clones (not CSS `border`)
- Radial-gradient mask follows mouse via `--glow-x` / `--glow-y`
- Border radius matches card exactly (`24px`)

## JS Behavior
The JS automatically:
- Wraps card children in `.liquid-glass-card__content` if needed
- Creates glow border overlay with cloned cards
- Tracks mouse for both glow border and per-card specular highlight

## Rules
- Always wrap cards in `.liquid-glass-cards` container
- Place over colorful backgrounds — glass on plain white looks flat
- Each card needs a color variant class for glow border color
- Include SVG filter element once per page
- Cards use `flex: 1 1 260px` — responsive by default
- Requires `liquid-glass-cards.js` for mouse tracking and glow overlay
