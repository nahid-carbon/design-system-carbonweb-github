---
component: breadcrumb
variants: [default, with-icon]
states: [default, hover]
depends_on: [colors, typography]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **Page hierarchy:** Show the user where they are within a multi-level site structure.
- **Navigation aid:** Let users move back to parent sections without relying on the browser back button.
- **Context clarity:** Reinforce the relationship between the current page and its parent categories (e.g. Home > Services > Workflow Development).

## Variants

| Variant | Usage |
|---------|-------|
| `default` | Standard light-background pages. Links are slate-light, current item is ink. |
| `dark` | Dark-background sections (hero banners, footers). Links are white at 60% opacity, current item is full white. |

## Structure and accessibility

- Wrap in a `<nav>` element with `aria-label="Breadcrumb"`.
- Use an `<ol>` for the list since breadcrumbs represent an ordered path.
- Each level is an `<li class="breadcrumb__item">`.
- Intermediate levels use `<a class="breadcrumb__link">`.
- The final (current) level uses `<span class="breadcrumb__current">` with `aria-current="page"`.
- Separators use `aria-hidden="true"` so screen readers skip them and announce the list structure naturally.

## Home icon

- Use `.breadcrumb__home-icon` on the first item to replace the "Home" text with a house icon.
- When using the icon-only home link, add `aria-label="Home"` to the anchor for screen reader access.
- The home icon is 14px and inherits `currentColor` from its parent link.

## Separator

- The default separator is a chevron-right SVG (12px).
- Separators are placed inside each `breadcrumb__item` (except the first) before the link or current text.
- A "/" character may be used as an alternative, but the chevron is preferred for visual consistency.

## Do

- Keep breadcrumb labels short -- mirror the page or section title.
- Always include "Home" (or the home icon) as the first breadcrumb.
- Use the `dark` variant when the breadcrumb sits on a dark background (ink, teal-900, hero gradients).
- Limit depth to 4 levels where possible. Deeper hierarchies may indicate a navigation structure issue.

## Don't

- Don't use breadcrumbs on the homepage itself -- there is no hierarchy to show.
- Don't make the current (last) item a link -- it represents the page the user is already on.
- Don't hardcode hex colors -- always use `var(--color-*)` tokens.
- Don't use breadcrumbs as a replacement for primary navigation (nav bar, sidebar).
- Don't truncate breadcrumb labels with ellipsis -- shorten the label text instead.

## Markup reference

```html
<!-- Default 3-level -->
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb__item">
      <a href="#" class="breadcrumb__link">Home</a>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__separator" aria-hidden="true"><!-- chevron SVG --></span>
      <a href="#" class="breadcrumb__link">Services</a>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__separator" aria-hidden="true"><!-- chevron SVG --></span>
      <span class="breadcrumb__current" aria-current="page">Workflow Development</span>
    </li>
  </ol>
</nav>

<!-- With home icon -->
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb__item">
      <a href="#" class="breadcrumb__link" aria-label="Home">
        <span class="breadcrumb__home-icon"><!-- 14px house SVG --></span>
      </a>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__separator" aria-hidden="true"><!-- chevron SVG --></span>
      <span class="breadcrumb__current" aria-current="page">About</span>
    </li>
  </ol>
</nav>

<!-- Dark variant -->
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb breadcrumb--dark">
    <!-- same structure, dark modifier on the ol -->
  </ol>
</nav>
```
