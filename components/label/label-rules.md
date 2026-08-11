---
component: label
variants: [eyebrow, eyebrow-slate, eyebrow-gradient, pill]
states: [default, hover, active, focus-visible]
depends_on: [colors, typography, radii]
version: 1.0.0
last_updated: 2026-08-04
---

## When to use

- **Eyebrow (`.label-eyebrow`):** Small uppercase kicker above a section heading — categorizes the section ("Our Services", "Case Studies").
- **Pill label (`.label-pill`):** Lightweight bordered link for category navigation or related-topic tags.

## Structure

- `.label-eyebrow` — 13px semibold uppercase, 0.08em letter-spacing, leading 6px dot rendered via `::before` (inherits `currentColor`).
- `.label-pill` — 1px teal-500 border pill, transparent bg, teal text; use `<a>` (or `<button>`).

## Variant guidance

| Variant | Typical use |
|---------|-------------|
| eyebrow (default) | Teal-600 — standard section kicker |
| `--slate` | Neutral contexts, secondary sections |
| `--gradient` | Hero/featured sections — global gradient text clip (dot stays teal-500) |
| `.label-pill` | Interactive category link |

## Interaction (pill only)

- 200ms ease transitions; hover: soft teal tint fill (`--color-latam-teal-100`) + 1px lift; active: teal-700; focus: 2px teal-500 outline.
- Eyebrows are static text — no hover states.

## Do

- Place eyebrows directly above headings with tight spacing.
- Keep eyebrow text to 1–3 words.
- Use pill labels in rows for related categories.

## Don't

- Don't hardcode hex colors — use `var(--color-*)` tokens (gradient via `var(--gradient-global)`).
- Don't make eyebrows clickable — use `.label-pill` or text-link for links.
- Don't combine `--gradient` with `--slate`.

## Markup reference

```html
<span class="label-eyebrow">Our Services</span>
<span class="label-eyebrow label-eyebrow--slate">Case Studies</span>
<span class="label-eyebrow label-eyebrow--gradient">Featured Work</span>

<a class="label-pill" href="#">monday.com Services</a>
```
