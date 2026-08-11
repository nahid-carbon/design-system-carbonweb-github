---
name: Solution Grid
description: Grid layout component for displaying solution and service cards with icon, title, and description. Supports 2-col, 3-col, and 4-col variants with hover lift effect.
version: 1.0.0
status: ready
component: solution-grid
variants: [2-col, 3-col, 4-col]
states: [default, hover]
depends_on: [tokens/colors.css, tokens/typography.css, tokens/spacing.css, tokens/radii.css, tokens/shadows.css]
last_updated: 2026-07-21
---

## Usage

Use the solution grid to present a set of services, solutions, or feature categories as visually distinct cards in a grid layout. Each card contains an icon area, title, and description.

- **3-Column (default):** Standard layout for core service offerings. Works well with 3 or 6 items.
- **2-Column:** Wider cards for fewer, more prominent items that need longer descriptions.
- **4-Column:** Compact layout for overview sections with shorter descriptions and more items.

## Variants

| Variant | Class | Columns |
|---------|-------|---------|
| 3-Column (default) | `.solution-grid` | 3 |
| 2-Column | `.solution-grid--2-col` | 2 |
| 4-Column | `.solution-grid--4-col` | 4 |

### Icon color variants

| Color | Class | Background | Icon color |
|-------|-------|-----------|------------|
| Teal (default) | `.solution-grid__icon` | teal-100 | teal-700 |
| Green | `.solution-grid__icon--green` | green-100 | green-700 |
| Yellow | `.solution-grid__icon--yellow` | yellow-100 | yellow-700 |
| Pink | `.solution-grid__icon--pink` | pink-100 | pink-700 |

## States

| State | Behavior |
|-------|----------|
| Default | Card with subtle border, no shadow |
| Hover | Card lifts 4px (`translateY(-4px)`) with `shadow-lg` |

## Responsive behavior

| Breakpoint | 4-col | 3-col | 2-col |
|-----------|-------|-------|-------|
| > 1024px | 4 columns | 3 columns | 2 columns |
| 769px - 1024px | 3 columns | 3 columns | 2 columns |
| 481px - 768px | 2 columns | 2 columns | 2 columns |
| <= 480px | 1 column | 1 column | 1 column |

## Do

- Use inline SVG icons that inherit `currentColor` from the icon container.
- Keep card descriptions to 1-2 sentences for scannability.
- Use icon color variants to visually differentiate service categories.
- Maintain consistent card content length within a single grid for even row heights.

## Don't

- Don't hardcode hex color values. All colors come from CSS custom property tokens.
- Don't mix column variants within a single grid instance.
- Don't use more than 8 items in a single grid. Split into multiple grids with section headings instead.
- Don't place interactive elements (buttons, links) inside cards without adding proper focus management.
- Don't use this component for content that requires rich media or complex layouts within each card.

## Accessibility

- Use semantic heading elements (`h3`, `h4`) for card titles at the appropriate document level.
- SVG icons are decorative and inherit `currentColor`. They do not require `aria-label` attributes.
- The hover lift animation is purely visual enhancement and does not affect content accessibility.
- If cards are clickable, wrap the card content in an `<a>` tag or apply `role="link"` with `tabindex="0"` and keyboard event handling.

## Structure

- `.solution-grid` -- grid container (`display: grid`)
- `.solution-grid__item` -- individual card with border, padding, and hover effect
- `.solution-grid__icon` -- 48x48 icon container with colored background and rounded corners
- `.solution-grid__title` -- card heading (semibold, 18px)
- `.solution-grid__description` -- card body text (regular, 16px, muted color)

## Markup reference

```html
<div class="solution-grid">
  <div class="solution-grid__item">
    <div class="solution-grid__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <!-- icon path -->
      </svg>
    </div>
    <h3 class="solution-grid__title">Service Title</h3>
    <p class="solution-grid__description">Brief description of the service or solution.</p>
  </div>
  <!-- more items -->
</div>

<!-- 2-Column -->
<div class="solution-grid solution-grid--2-col">...</div>

<!-- 4-Column -->
<div class="solution-grid solution-grid--4-col">...</div>

<!-- Icon color variant -->
<div class="solution-grid__icon solution-grid__icon--green">...</div>
```
