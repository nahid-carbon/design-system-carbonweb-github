---
component: avatar-library
variants: [photo-frame, illus-frame, borderless, initials-fallback, library-app]
states: [default]
depends_on: [colors, typography, radii, spacing]
version: 1.0.0
last_updated: 2026-08-04
---

# Avatar Library — Rules

## Overview
Browsable library of CarbonWeb people imagery, imported from the "Carbon Avatar Library" claude.ai/design project. Two asset kinds share the brand hexagon:
- **Employee photos** (`photos-cutout/`) — cutout portraits on the teal hex backplate; use for real-people contexts (team pages, testimonials, bios)
- **Illustrated avatars** (`avatars/`) — stylized portraits on the Carbon "C" hex backplate; use for personas, placeholders, light touches

## Atoms
| Class | What it renders |
|-------|-----------------|
| `.avlib .photo-frame` | teal hex backplate + photo masked by `assets/_hex-bg.svg` (same SVG drives plate AND mask → perfect clip) |
| `.avlib .illus-frame` | Carbon C-hex backplate (`assets/_bg-bordered.png`) + illustration clipped to hex polygon |
| `.illus-frame.borderless` | swaps to `assets/_bg-borderless.png` |
| `.portrait.is-missing` + `data-initials` | initials on `--gradient-global` fallback |

Both frames scale via width; aspect ratios are intrinsic (photo 294/331, illus 1/1).

## Library app
`avatar-library-preview.html` + `avatar-library.js`:
- Search (⌘K), filters (All / Photos / Illustrated / Pairs), sort (A→Z / Z→A / By group), card-size slider, border toggle
- Card click → detail dialog: file path, paired asset jump, Download PNG, Copy path, Copy `<img>` tag
- Full roster (60 photos + 85 avatars) is manifest-driven; people without local files render as initials fallbacks labeled "not synced"

## Synced assets
7 complete pairs ship with the DS: NahidHasan, AmyMorales, CarsonButcher, DarrenArbuckle, EdwinPecato, HeatherGray, JackKubicek. To sync the rest, export `avatars/` and `photos-cutout/` from the claude.ai/design project (ID `019dd5b4-6d10-738a-b80d-b09f27922901`) into this component folder — the app picks them up automatically.

## Rules
- Photos: `background-size: 110% auto; background-position: center bottom` inside the mask — matches the source cropping
- Illustrations: `cover` + hex `clip-path` so shoulders don't poke past the plate
- Never use a raw `<img>` with square corners for people — always one of the hex frames
- Interactions: cards lift + frame scales 1.03 on hover (250ms); dialog uses native `<dialog>`
- JetBrains Mono for file paths/meta, Raleway for names, Montserrat for stat numbers
