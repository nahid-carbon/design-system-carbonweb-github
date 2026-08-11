---
component: image-box
variants: [default, rounded, overlay, hover-zoom]
states: [default, hover]
depends_on: [tokens/colors.css, tokens/typography.css]
version: 1.0.0
last_updated: 2026-07-21
status: ready
---

## When to use

- **Default (vertical):** Showcase a solution, template, or feature with an image on top and details below. Best for grid layouts with 3-4 columns.
- **Horizontal:** Side-by-side image and content. Use for featured items or when vertical space is limited.
- **Compact:** Reduced padding and smaller title for denser grid layouts where many items need to be visible at once.

## Do / Don't

- Do use the `image-box__image` element with a real screenshot or illustration to give context.
- Do keep titles short (under 40 characters) and descriptions to 1-2 sentences.
- Do use the `image-box__link` element for a clear call to action.
- Don't hardcode colors -- use token variables (`var(--color-*)`) throughout.
- Don't nest interactive elements (buttons, links) outside of `image-box__body`.
- Don't use the horizontal variant in narrow containers where the image would collapse below 120px wide.

## States & behavior

- **Default:** Subtle border (`rgba(0, 0, 0, 0.06)`), no shadow, no transform.
- **Hover:** Lifts 4px (`translateY(-4px)`), gains a soft shadow (`0 12px 32px rgba(0, 0, 0, 0.1)`), border transitions to `var(--color-teal-200)`.
- The `image-box__link` arrow gap widens from 4px to 8px on hover for a subtle motion cue.
- The entire card uses `cursor: pointer` to indicate interactivity.

## Accessibility

- Use semantic heading levels inside the card (`h3` by default; adjust based on page hierarchy).
- The `image-box__link` should have descriptive text (not just "Learn more") when possible, or pair with `aria-label` for screen readers.
- The arrow entity in `image-box__link` uses `aria-hidden="true"` to prevent screen readers from announcing the symbol.
- If the entire card is clickable, wrap it in an `<a>` tag or add `role="link"` with `tabindex="0"` and keyboard event handlers.
- Ensure sufficient color contrast between `var(--color-muted)` description text and the white background.

## Markup reference

```html
<!-- Default vertical -->
<div class="image-box">
  <div class="image-box__image"></div>
  <div class="image-box__body">
    <h3 class="image-box__title">Title</h3>
    <p class="image-box__description">Description text.</p>
    <a href="#" class="image-box__link">Learn more <span aria-hidden="true">&rarr;</span></a>
  </div>
</div>

<!-- Horizontal -->
<div class="image-box image-box--horizontal">
  <div class="image-box__image"></div>
  <div class="image-box__body">
    <h3 class="image-box__title">Title</h3>
    <p class="image-box__description">Description text.</p>
    <a href="#" class="image-box__link">Learn more <span aria-hidden="true">&rarr;</span></a>
  </div>
</div>

<!-- Compact -->
<div class="image-box image-box--compact">
  <div class="image-box__image"></div>
  <div class="image-box__body">
    <h3 class="image-box__title">Title</h3>
    <p class="image-box__description">Description text.</p>
    <a href="#" class="image-box__link">Learn more <span aria-hidden="true">&rarr;</span></a>
  </div>
</div>
```
