---
component: stats
variants: [centered, left, color, gradient-number]
states: [default]
depends_on: [colors, typography, radii, spacing]
version: 1.0.0
last_updated: 2026-08-04
---

## When to use

- **Centered:** Row of 2-4 stat blocks, centered. Use as a standalone proof section on landing pages.
- **Left:** Adds an intro text column (title + description) before the stat blocks. Use when the numbers need framing context.
- **Color:** Wraps the row in a light teal card background. Use to break up long white sections.
- **Gradient number:** Add `stats__number--gradient` for brand gradient text (teal → green).

## Do / Don't

- Do use 2-4 stat blocks per row — never more.
- Do keep captions to a few words.
- Do use Montserrat for the numbers — handled automatically via `--font-family-numeric`.
- Don't hardcode colors — use `var(--color-*)` tokens.
- Don't mix gradient and plain numbers in one row.

## Structure

```
.stats[data-stats]        (modifiers: --centered / --left / --color)
  .stats__intro           (optional, --left only)
    .stats__intro-title
    .stats__intro-text
  .stats__item            (×2-4)
    .stats__number        (optional modifier: --gradient)
    .stats__caption
```

## States & behavior

- Numbers count up from 0 when the row scrolls into view (IntersectionObserver, 40% threshold, ~1.2s easeOutCubic).
- Thousands separators, decimals, prefixes, and suffixes ("+", "-5") are preserved during animation.
- Animation is skipped entirely when `prefers-reduced-motion: reduce` is set — final values render immediately.

## Accessibility

- Numbers are real text (not canvas), so they remain readable by screen readers at all times.
- Reduced-motion users see static final values.

## Markup reference

```html
<div class="stats stats--centered" data-stats>
  <div class="stats__item">
    <p class="stats__number stats__number--gradient">1,200+</p>
    <p class="stats__caption">Projects delivered</p>
  </div>
  <!-- more .stats__item -->
</div>
<script src="stats.js"></script>
```

## JavaScript

Include `stats.js` after the markup. Auto-initializes all `[data-stats]` containers. No configuration needed.
