---
component: glowing-cards
variants: [teal, green, yellow, pink, ink, dark, elevated]
states: [default]
depends_on: [colors, typography, radii, shadows]
version: 1.0.0
last_updated: 2026-07-21
---

# Glowing Cards — Rules

## Overview
Interactive card group with mouse-tracking glow border effect. The glow follows the cursor position across all cards in a group, creating a unified interactive surface.

## Structure
- `.glow-cards` — container, tracks mouse position
- `.glow-card` — individual card with `::before` (glow border) and `::after` (glow fill)
- `.glow-card__icon` — colored icon container
- `.glow-card__title` — card heading
- `.glow-card__description` — card body text

## Color Variants
| Class | Glow Color |
|-------|-----------|
| `glow-card--teal` | Teal 500 |
| `glow-card--green` | Green 500 |
| `glow-card--yellow` | Yellow 500 |
| `glow-card--pink` | Pink 500 |
| `glow-card--ink` | Ink/Slate |

## Modifiers
- `glow-cards--dark` — dark background variant (cards become `#111113`)
- `glow-card--elevated` — adds box-shadow elevation

## Behavior
- Glow tracks mouse via CSS custom properties `--glow-x` and `--glow-y`
- `::before` renders the glow border using `mask-composite: exclude`
- `::after` renders a subtle inner fill gradient
- Both fade in on `.glow-cards:hover`
- Requires `glowing-cards.js` for mouse tracking

## Rules
- Always wrap cards in `.glow-cards` container
- Each card needs a color variant class
- JS sets `--glow-x` and `--glow-y` on each card relative to its own bounds
- Cards use `flex: 1 1 260px` — responsive by default
- Do not use outside a `.glow-cards` wrapper (glow won't trigger)
