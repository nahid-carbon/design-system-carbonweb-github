---
component: nav
variants: [sidebar]
states: [default, active, collapsed, coming-soon]
depends_on: [tokens/colors.css, tokens/spacing.css, tokens/radii.css, tokens/typography.css]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- Sidebar navigation for the CarbonWeb design system catalogue app.
- Width: 256px, fixed left, full viewport height, sticky.

## Structure

- **Header:** CarbonWeb icon + "CarbonWeb" bold label + "Design System" subtitle.
- **Menu:** Collapsible groups with `▶` toggle, direct links, "coming soon" items.
- **Footer:** "Raleway · Global & LATAM brands" tagline.

## States

- **Default:** `#525252` text, transparent bg.
- **Hover:** `#fafafa` bg, ink text.
- **Active:** teal-100 bg, teal-700 text.
- **Coming soon:** 45% opacity, non-interactive, "soon" badge.

## Do / Don't

- Do add new pages by adding nav items and creating routes.
- Don't modify sidebar width (256px) without design review.
- Don't nest groups more than 3 levels deep.

## Markup reference

```html
<a href="/page" class="nav__link">Page Name</a>
<a href="/page" class="nav__link nav__link--active">Active Page</a>

<div class="nav__group nav__group--open">
  <button class="nav__group-toggle">
    Group Name
    <span class="nav__toggle-icon">&#9654;</span>
  </button>
  <div class="nav__group-items">
    <a href="/page" class="nav__link">Child</a>
  </div>
</div>
```
