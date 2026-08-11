---
component: timeline
variants: [vertical, process]
states: [default, active-step]
depends_on: [colors, typography, radii]
version: 1.0.0
last_updated: 2026-07-21
---

# Timeline

Vertical and horizontal timeline for history milestones and numbered process steps.

## Variants

### Vertical (default)

Use for chronological history, company milestones, or any sequential content that reads top-to-bottom.

- Root class: `.timeline`
- Track: `.timeline__track` runs vertically along the left edge.
- Each entry is a `.timeline__item` containing a `.timeline__dot`, `.timeline__year`, `.timeline__title`, and `.timeline__description`.
- The last item drops its bottom padding automatically via `:last-child`.

### Process (`timeline--process`)

Use for numbered step flows (e.g., Discovery > Scoping > Kickoff > Build > Deployment).

- Add `.timeline--process` to the root `.timeline` element.
- The track switches to horizontal, running across the top.
- Dots are centered above each item and display the step number inside.
- Each item contains a `.timeline__card` with `.timeline__card-number`, `.timeline__card-title`, and `.timeline__card-desc`.

## States

### Default

- Active dots use `var(--color-teal-500)` background.
- Track uses `var(--color-teal-200)`.

### Inactive step

- Apply `.timeline__dot--inactive` to switch the dot to `var(--color-grey-base)`.
- Use this for future/upcoming steps that are not yet reached.

## Anatomy

```
.timeline
  .timeline__track
  .timeline__item
    .timeline__dot
    .timeline__year          (vertical only)
    .timeline__title         (vertical only)
    .timeline__description   (vertical only)
    .timeline__card          (process only)
      .timeline__card-number
      .timeline__card-title
      .timeline__card-desc
```

## Token dependencies

| Token | Source | Usage |
|-------|--------|-------|
| `--color-teal-200` | colors.css | Track line |
| `--color-teal-500` | colors.css | Active dot, year text, card number |
| `--color-grey-base` | colors.css | Inactive dot |
| `--color-ink` | colors.css | Title text |
| `--color-muted` | colors.css | Description text |
| `--radius-lg` | radii.css | Card border-radius |
| `--font-family` | typography.css | Dot step number font |

## Usage notes

- Never hardcode hex colors. All color values come from `var(--color-*)` tokens.
- The vertical variant works at any width. The process variant assumes enough horizontal space for all steps side by side (typically 5 columns at desktop width).
- Dot borders are white (`#ffffff`) to create the "cutout" effect against the track. This is intentional and matches the white page background.
- Cards in the process variant have a subtle border (`rgba(0,0,0,0.06)`) for depth without heavy shadows.
