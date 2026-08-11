---
component: site-footer
variants: [default, v2, v3-liquid-glass, dark, v2-dark, v3-dark]
states: [default]
depends_on: [colors, typography, radii, spacing, button]
version: 1.0.0
last_updated: 2026-07-22
---

# Site Footer — Rules

## Overview
Faithful recreation of the live carbonweb.co footer. Four sections: clickable CTA card, two rows of link columns with newsletter, contact bottom bar, legal row. All hover interactions match the live site.

## Structure
- `.site-footer` — white bg wrapper
- `.site-footer__inner` — max-width 1288px, centered
- `.site-footer__cta` — clickable `<a>` card (whole card links to /demo/)
  - `__cta-title`, `__cta-description`, `__cta-button` (span, not a nested link), `__cta-art` (rocket SVG)
  - CTA button uses the DS Button component: `btn btn--primary btn--teal btn--lg` + `site-footer__cta-button` override (220px fixed width, no side padding, card-wide hover flips it green). Requires `components/button/button.css`.
- `.site-footer__row--a` — CarbonWeb links / CarbonApps links / newsletter card (1fr 1fr 2fr)
- `.site-footer__row--b` — monday.com / Services / Creative / Resources (4 × 1fr)
- `.site-footer__bottom` — wordmark + contacts (US, LATAM, email, socials)
- `.site-footer__divider` + `.site-footer__legal` — legal links + copyright

## Variants
| Class | Effect |
|-------|--------|
| (base) | Faithful live-site recreation |
| `site-footer--v2` | Creative animated version — see below |
| `site-footer--v3` | Liquid glass surfaces (DS liquid-glass-cards recipe); composes with `--v2` |
| `site-footer--dark` | Ink background recolor; composes with base, `--v2`, or `--v3` |

## V2 Animations & Interactions
- **Gradient hairline**: 3px animated teal→green→teal top border (`background-position` flow, 8s loop)
- **Scroll reveal**: CTA, columns, bottom bar, legal fade+rise in with 90ms sibling stagger (IntersectionObserver in `site-footer.js`; falls back to instant-visible without IO or with reduced motion)
- **Link hover**: `→` arrow slides in before the label, link shifts 2px right (replaces base underline)
- **Column title hover**: hovering a column paints its title with `--gradient-global` text
- **CTA light sweep**: diagonal white streak sweeps the card every 7s
- **Rocket float**: gentle 8px bob (5s); hover nudge preserved via separate `transform`/`translate` channels
- Reveal selectors need element+class specificity (`.site-footer__row > div.is-revealed`) to beat the hidden-state rule

## V3 Liquid Glass
- Same glass contract as `liquid-glass-cards`: `--c-glass/--c-light/--c-dark`, `--glass-reflex-light/dark`, `--saturation`
- Glass surfaces: CTA card (24px radius), newsletter card (20px), hiring badge, icon links (32px glass chips)
- Recipe: `color-mix(in srgb, var(--c-glass) 12%, transparent)` bg + `backdrop-filter: blur(8px) url(#liquidGlassLens) saturate(150%)` + 10-layer inset specular box-shadow stack
- Footer bg: vibrant teal/green/teal-300 radial washes — glass needs color behind it
- CTA hover: glass tint deepens to 18% + teal outer glow (replaces base teal-tint hover)
- Newsletter `focus-within`: teal 40% inset ring in the glass stack
- **Requires the `#liquidGlassLens` SVG filter once per page** (same filter as liquid-glass-cards)
- `--v3.--dark`: reflex flip (light 0.35 / dark 2), 8% tint, ink gradient with teal/green/pink washes
- Compose `site-footer--v2 site-footer--v3 [site-footer--dark]` for glass + animations

## Dark Variant
- Background `--color-ink`; titles/CTA heading white; descriptions white 50–60% mix
- Links slate-light → hover **teal-300** (lighter step for dark bg), active teal-400
- Newsletter: white 6% glass card, white 8% input
- Badge: teal-100/300/500 gradient text, teal-300 icon
- Wordmark: `filter: invert(1) hue-rotate(180deg)` (ink parts turn white, teal survives)
- Rocket gets teal drop-shadow glow
- Contact region labels teal-400

## Token Usage
- All colors reference `tokens/colors.css`: teal/green scales, `--color-ink`, `--color-slate`, `--color-slate-light`, `--color-teal-hover`
- Translucent tints via `color-mix(in srgb, var(--color-*) N%, transparent)` — no raw rgba
- Badge megaphone icon: `currentColor` strokes + `color: var(--color-teal-600)`
- Exceptions (documented in CSS): `#F5F7FB` newsletter bg (spec value, no neutral token), success/error panel colors (no semantic tokens in DS yet)

## Interactions
| Element | Hover | Active |
|---------|-------|--------|
| CTA card (anywhere) | Button flips teal-500 → **green-500** + shadow + 1px lift; card bg deepens, lifts 2px + teal shadow; rocket nudges up-right (springy) | Button green-600, scales 0.97 |
| Column links | slate → teal-500 + underline slides in from left | teal-700 |
| Careers row | Badge lifts 1px + bg brightens | — |
| Legal links | slate-light → teal-500 | teal-700 |
| Contact links | slate-light → teal-500 | teal-700 |
| Contact/social icons | teal-500 + lift 2px + scale 1.15 (springy cubic-bezier) | teal-700, settles |
| Wordmark | opacity 0.75 + 1px lift | — |
| Newsletter input | hover: teal 50% border; focus: teal border + soft ring; card gets teal glow on focus-within | — |
| Newsletter button | teal-hover `#005F69` + shadow + 1px lift | teal-700, scales 0.97 |
| Keyboard | `:focus-visible` teal outline on CTA card, newsletter button, icon links | — |

## "We're hiring!" Badge
- Sits next to Careers link
- `rgba(0,176,194,0.1)` bg, `0.4px solid #0FBECF` border, 4px radius, 22px height
- Text: 10px/700, animated gradient (`background-clip: text`, `shine` keyframe, 1.5s linear infinite)
- Megaphone SVG stays static teal `#11ABBB`

## Newsletter (JS)
- `site-footer.js` validates email on submit (regex), shows success or error message
- Success: green panel "Subscribed! Welcome to the Digital Directive!"
- Error: red panel "Your subscription could not be saved. Please try again."
- Typing clears messages
- Production: swap the submit handler for the real Brevo POST

## Key Values
- CTA card: `rgba(0,176,194,0.18)` bg, 12px radius, 438px text column
- CTA button: 220px wide pill (radius 100px), 16px/700 white
- Column titles: 20px/500 black; links: 16px/300 slate `#5E6075`
- Newsletter card: `#F5F7FB`, 8px radius, 30px padding; title 20px/700 `#3C4858`
- Contact region labels: teal-600; values slate-light `#A3A5B5`, underlined
- Copyright/legal: 16px slate-light
- Rocket art: absolute, right 24px, bottom 0, 295×230 (hidden ≤1024px)

## Assets
- `assets/footer-lets-get-started-footer-banner.svg` — rocket illustration
- `assets/General-Horizontal-1.svg` — CarbonWeb wordmark (177×41)

## Responsive
- ≤1024px: CTA single column (art hidden), link rows 2-col
- ≤640px: rows 1-col, newsletter stacks, bottom bar stacks

## Rules
- CTA button is a `<span>` inside the card `<a>` — never nest links
- Icon-only links require `aria-label`
- Icons use `currentColor` so hover color cascades
- Do not modify the existing `footer` component — this is the live-site recreation; `footer` is the design-system spec version
