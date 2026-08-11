---
component: tooltip
variants: [top, bottom, left, right]
positions: [top, bottom, left, right]
states: [default, open, hover]
depends_on: [tokens/colors.css, tokens/typography.css]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **Hotspot:** Clickable dot overlaid on images or diagrams to reveal contextual information. Used on the About page with 3 hotspot widgets.
- **Simple Tooltip:** Hover-triggered label for abbreviations, jargon, or supplementary info inline with text.

## Do / Don't

- Do use hotspots sparingly -- max 5 per view to avoid clutter.
- Do choose the position variant that avoids viewport overflow.
- Don't put interactive elements (links, buttons) inside tooltips -- use a hotspot popover instead.
- Don't hardcode hex values -- all colors come from tokens.

## Accessibility

- Hotspot dot must be a `<button>` with `aria-expanded` toggled on open/close.
- Hotspot dot must include `aria-label` describing what info it reveals.
- Popover should have `role="tooltip"`.
- Close on `Escape` key press.
- Simple tooltips must also work with keyboard focus (focus/blur on trigger).
- Tooltip trigger should use `cursor: help` to indicate supplementary info.

## Markup reference

```html
<!-- Hotspot (top position) -->
<div class="hotspot hotspot--top">
  <button class="hotspot__dot" aria-expanded="false" aria-label="More info">
    <span class="hotspot__dot-icon">+</span>
  </button>
  <div class="hotspot__popover" role="tooltip">
    <div class="hotspot__title">Title</div>
    <div class="hotspot__text">Description text goes here.</div>
  </div>
</div>

<!-- Simple tooltip -->
<span class="tooltip">
  <span class="tooltip__trigger">Term</span>
  <span class="tooltip__content" role="tooltip">Definition</span>
</span>
```
