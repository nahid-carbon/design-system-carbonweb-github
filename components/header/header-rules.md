---
component: header
variants: [default, sticky, transparent]
states: [default, scrolled, mobile-open]
depends_on: [colors, typography, radii, shadows, button]
version: 1.0.0
last_updated: 2026-07-21
---

# Header

Sticky site header for CarbonWeb. Logo left, navigation center, CTA buttons right. Used across all pages for both Global and LATAM brands.

## Structure

```
header.header
  div.header__container
    a.header__logo
      div.header__logo-icon        (gradient icon)
      span.header__logo-text       ("CarbonWeb")
    nav.header__nav
      a.header__nav-link * 5       (Products, Services, Resources, Company, Contact)
    div.header__actions
      button.header__lang          (EN + chevron)
      a.header__cta (secondary)    ("Get Started")
      a.header__cta (primary)      ("Book a Demo")
    button.header__mobile-toggle   (hamburger, hidden on desktop)
  div.header__mobile-nav           (duplicate nav for mobile slide-down)
```

## Variants

| Variant | Class | Trigger |
|---------|-------|---------|
| Default | `.header` | Page load, scrollY <= 10 |
| Scrolled | `.header--scrolled` | scrollY > 10, adds box-shadow |
| Mobile Open | `.header--mobile-open` | Hamburger toggle on viewports < 768px |

## Tokens Used

### Colors
- `--color-ink` — logo text, nav links, hamburger lines
- `--color-muted` — language switcher text
- `--color-teal-100` — nav link hover background (at 30% opacity)
- `--color-teal-300` — language switcher hover border
- `--color-teal-500` — nav link hover/active text, CTA buttons
- `--color-teal-700` — preview note text
- `--gradient-global` — logo icon background

### Typography
- `--font-family` — Raleway on all text
- `--font-bold` (700) — logo text
- `--font-medium` (500) — nav links
- 15px nav link size, 13px language switcher, 18px logo text

### Spacing
- `--space-10` (40px) — container horizontal padding
- `--space-6` (24px) — tablet padding, mobile nav padding
- `--space-4` (16px) — mobile padding
- `--space-2` (8px) — logo gap, nav gap

### Radii
- `--radius-md` (8px) — logo icon, nav link hover, mobile toggle
- 6px — language switcher border-radius

### Shadows
- Scroll shadow: `0 2px 20px rgba(0, 0, 0, 0.06)` — applied via `header--scrolled`

## Dimensions

| Property | Value |
|----------|-------|
| Container max-width | 1440px |
| Header height | 72px |
| Logo icon | 32x32px |
| Hamburger line width | 20px |

## Behavior

### Scroll Detection
- JavaScript adds `header--scrolled` when `window.scrollY > 10`.
- Uses `requestAnimationFrame` for scroll performance.
- Passive scroll listener to avoid blocking.

### Mobile Menu
- Hamburger appears below 768px viewport width.
- Click toggles `header--mobile-open` on the header element.
- Hamburger animates to X (three lines rotate/fade).
- Mobile nav slides down with `max-height` + `opacity` transition.
- Pressing Escape closes the mobile menu and returns focus to toggle.
- Menu auto-closes when viewport resizes past 768px breakpoint.

### Active Link
- `header__nav-link--active` is applied based on `window.location.pathname`.
- Links carry `data-path` attributes for matching.
- Re-evaluated on `popstate` for SPA back/forward navigation.

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| > 1024px | Full desktop layout |
| 769px-1024px | Reduced nav padding, smaller font |
| < 768px | Desktop nav hidden, mobile toggle + panel shown |

## Accessibility

- Mobile toggle uses `aria-expanded` (true/false).
- Language switcher has `aria-label="Switch language"`.
- Mobile toggle has `aria-label="Toggle menu"`.
- Escape key closes mobile menu and restores focus.
- All interactive elements are keyboard-accessible.

## CTA Buttons

The header uses the Button component for its two CTAs:
- "Get Started" — `.btn--secondary.btn--teal.btn--sm`
- "Book a Demo" — `.btn--primary.btn--teal.btn--sm`

## File Manifest

| File | Purpose |
|------|---------|
| `header.css` | All styles, BEM naming, token references |
| `header.html` | Standalone markup fragment |
| `header.js` | Scroll detection, mobile toggle, active link |
| `header-preview.html` | Self-contained demo with scrollable content |
| `header-rules.md` | This documentation |
