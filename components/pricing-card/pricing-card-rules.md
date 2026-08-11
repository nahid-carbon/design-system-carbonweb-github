---
component: pricing-card
variants: [default, featured, dark]
states: [default, hover, focus-visible]
depends_on: [colors, typography, radii, shadows, spacing]
version: 1.0.0
last_updated: 2026-08-04
---

## When to use

- **Default:** White bordered card for standard service packages.
- **Featured:** 2px teal border, light teal tint, and subtle glow. Use for the recommended package — at most one per grid.
- **Dark:** Ink background version for contrast or premium tiers.

## Do / Don't

- Do wrap cards in `.pricing-grid` (3 columns) so heights stay equal.
- Do keep descriptions to 1-2 sentences — `flex-grow` aligns prices across the row.
- Do use Montserrat for the price (automatic via `--font-family-numeric`).
- Don't feature more than one card per grid.
- Don't hardcode colors — use `var(--color-*)` tokens.

## Structure

```
.pricing-grid
  .pricing-card              (modifiers: --featured / --dark)
    .pricing-card__name
    .pricing-card__desc
    .pricing-card__price
      .pricing-card__price-unit   ("/hr")
    .pricing-card__price-caption  ("Scoped in discovery")
    .pricing-card__cta
```

## States & behavior

- **Hover (card):** lifts 2px with `--shadow-lg`; featured card intensifies its teal glow.
- **Hover (CTA):** background shifts to `--color-teal-hover`.
- **Focus:** CTA shows a teal `:focus-visible` outline.
- All transitions 200ms.

## Accessibility

- CTA is a real `<a>` (or `<button>`), keyboard reachable with visible focus ring.
- Dark variant text colors maintain contrast on ink background.

## Markup reference

```html
<div class="pricing-grid">
  <div class="pricing-card pricing-card--featured">
    <p class="pricing-card__name">Workflow Development</p>
    <p class="pricing-card__desc">End-to-end build of custom boards and automations.</p>
    <p class="pricing-card__price">$215<span class="pricing-card__price-unit">/hr</span></p>
    <p class="pricing-card__price-caption">Scoped in discovery</p>
    <a class="pricing-card__cta" href="#">Book a discovery call</a>
  </div>
  <!-- more .pricing-card -->
</div>
```
