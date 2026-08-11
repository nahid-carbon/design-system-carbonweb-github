---
component: icon-box
variants: [centered, left, bordered]
modifiers: [hover]
states: [default, hover]
depends_on: [colors, typography]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **Feature highlights:** Showcase product capabilities or service benefits with an icon, title, and short description.
- **Process steps:** Illustrate steps in a workflow or onboarding process.
- **Value propositions:** Communicate key selling points on landing pages or marketing sections.

## Variant guidance

| Variant | Typical use |
|---------|-------------|
| `centered` (default) | Feature grids, landing page callouts, equal-weight items in a row |
| `left` | Stacked lists, sidebar features, content where scanning left-to-right is preferred |
| `bordered` | When icon boxes need visual separation from surrounding content |

## Modifiers

| Modifier | Effect |
|----------|--------|
| `--hover` | Adds shadow lift on hover. Combine with `--bordered` for interactive card feel. |

## Icon sizing

- The icon circle is 48px with the SVG icon at 24px inside.
- Always use inline SVG with `stroke="currentColor"` so the icon inherits the teal-500 color from `.icon-box__icon`.

## Do

- Keep titles short (2-4 words).
- Keep descriptions to 1-2 sentences.
- Use a consistent icon style (stroke-based, 24px viewBox) across all icon boxes in a group.
- Place icon boxes in a grid of 3 or 4 columns for balanced layouts.

## Don't

- Don't hardcode hex colors -- always use `var(--color-*)` tokens.
- Don't mix centered and left-aligned variants in the same row.
- Don't use filled icons alongside stroke icons -- keep the style consistent.
- Don't exceed 2 lines of description text.

## Markup reference

```html
<!-- Centered -->
<div class="icon-box">
  <div class="icon-box__icon"><!-- 24px SVG --></div>
  <div class="icon-box__title">Title</div>
  <div class="icon-box__description">Description text.</div>
</div>

<!-- Left-aligned -->
<div class="icon-box icon-box--left">
  <div class="icon-box__icon"><!-- 24px SVG --></div>
  <div>
    <div class="icon-box__title">Title</div>
    <div class="icon-box__description">Description text.</div>
  </div>
</div>

<!-- Bordered with hover -->
<div class="icon-box icon-box--bordered icon-box--hover">
  <div class="icon-box__icon"><!-- 24px SVG --></div>
  <div class="icon-box__title">Title</div>
  <div class="icon-box__description">Description text.</div>
</div>
```
