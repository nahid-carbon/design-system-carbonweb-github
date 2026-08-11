---
component: section-divider
variants: [top-left, top-right, top-center, bottom-left, bottom-right, bottom-center]
states: [default]
depends_on: [colors]
version: 1.0.0
last_updated: 2026-08-04
---

## When to use

- **Section transitions:** Bridge a light section into a dark one (and back) with the carbonweb.co angled-notch motif.
- **Page rhythm:** Alternate tab positions (left → right → center) down a long page to keep visual movement.

## How it works

A full-width 48px strip (36px mobile) painted in the divider color, clipped by
`clip-path: polygon(...)` into an angled tab. The rest of the strip is
transparent, so the section edge stays straight with one protruding notch.

## Placement

| Variant group | Place | Effect |
|---------------|-------|--------|
| `--top-left` / `--top-right` / `--top-center` | Immediately **before** a dark section | Tab rises into the light section above |
| `--bottom-left` / `--bottom-right` / `--bottom-center` | Immediately **after** a dark section | Tab descends into the light section below |

Top variants carry `margin-bottom: -1px` (bottom variants `margin-top: -1px`)
to prevent sub-pixel seams against the adjacent section.

## Color

- Default: `--divider-color` custom property, falling back to `var(--color-ink)`.
- Override inline or on a wrapper: `style="--divider-color: var(--color-teal-950)"`.
- Or add `--current` to inherit the parent's text color (`background: currentColor`).
- The divider color must exactly match the background of the section it bridges into.

## Do

- Always add `aria-hidden="true"` — the divider is purely decorative.
- Match `--divider-color` to the adjacent section's background token.
- Alternate notch positions between consecutive dark sections.

## Don't

- Don't hardcode hex values — pass tokens into `--divider-color`.
- Don't put content inside the divider (it has `pointer-events: none`).
- Don't use two notches on the same edge of one section.
- Don't stretch the height beyond ~60px; the notch should feel like a tab, not a wedge.
