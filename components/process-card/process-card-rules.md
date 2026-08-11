---
component: process-card
variants: [horizontal, vertical]
states: [default, active]
depends_on: [colors, typography, radii]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **Horizontal (default):** Display a sequential process as a row of numbered step cards with connecting lines. Best for wide layouts where all steps are visible at once.
- **Vertical:** Stack steps top-to-bottom with vertical connectors. Use in narrower containers or mobile views.

## Do / Don't

- Do use the `process-card--active` modifier to highlight the current or first step.
- Do use the `process-card__pill` element sparingly to call out a step attribute (e.g. "Free").
- Don't hardcode colors — use token variables from `colors.css`.
- Don't exceed 5–7 steps; longer processes should be broken into phases.

## States & behavior

- **Default:** Teal numbered circle, muted description text.
- **Active:** Adds a teal ring (`box-shadow`) around the step number to indicate the current step.
- **Hover:** Step number scales up slightly (`scale(1.1)`) and darkens to `--color-teal-hover`.

## Structure

- `.process-cards` — flex container for all cards.
- `.process-cards--vertical` — modifier for vertical layout.
- `.process-card` — individual step card.
- `.process-card__connector` — line connecting adjacent steps.
- `.process-card__number` — numbered circle.
- `.process-card__pill` — optional label badge.
- `.process-card__title` — step heading.
- `.process-card__description` — step body text.
- `.process-card__content` — wrapper for title + description in vertical variant.

## Accessibility

- Use `h3` elements for step titles to maintain heading hierarchy.
- The numbered circles are decorative; screen readers will read them as text content.
- Connector lines are purely visual and do not carry semantic meaning.

## Markup reference

```html
<div class="process-cards">
  <div class="process-card process-card--active">
    <div class="process-card__connector"></div>
    <div class="process-card__number">1</div>
    <div class="process-card__pill">Free</div>
    <h3 class="process-card__title">Discovery Call</h3>
    <p class="process-card__description">Description text.</p>
  </div>
  <!-- more steps... -->
</div>
```
