---
component: mega-menu
variants: [default, full-width]
states: [closed, open, hover]
depends_on: [colors, typography, shadows, radii]
version: 1.0.0
last_updated: 2026-07-21
---

# Mega Menu

Full-width dropdown navigation for the CarbonWeb site header. When a top-level nav item is hovered or clicked, a panel drops down with multiple columns of links and an optional CTA card.

## Structure

```
.mega-menu                        ← horizontal nav bar, flex, gap 32px
  .mega-menu__item                ← single nav item wrapper (position relative)
    .mega-menu__trigger           ← button/link that opens the dropdown
      .mega-menu__chevron         ← 12px SVG arrow, rotates 180deg on open
    .mega-menu__dropdown          ← the panel (absolute, centered below trigger)
      .mega-menu__columns         ← CSS grid of link columns
        .mega-menu__column        ← individual column
          .mega-menu__column-title  ← uppercase label (13px, muted)
          .mega-menu__link        ← nav link row (14px, slate)
            .mega-menu__link-icon ← optional 16px leading icon (teal-300)
      .mega-menu__divider         ← optional horizontal rule before CTA
      .mega-menu__cta             ← optional call-to-action card
        .mega-menu__cta-title     ← card heading (15px, semibold)
        .mega-menu__cta-description ← card body text (13px, muted)
        .mega-menu__cta-link      ← action link with arrow icon
          .mega-menu__cta-arrow   ← 14px arrow SVG
```

## States

| State | Class | Description |
|-------|-------|-------------|
| Closed | (default) | Dropdown hidden, chevron pointing down |
| Open | `.mega-menu__item--open` | Dropdown visible, chevron rotated 180deg |
| Hover | `:hover` on trigger/links | Trigger text turns teal-500, links turn teal-500 |

## Behavior

- **Hover intent (mouse):** `mouseenter` opens after a 100ms delay. `mouseleave` closes after a 200ms delay, giving the user time to move the cursor from the trigger into the dropdown panel.
- **Click / touch toggle:** Clicking the trigger toggles the dropdown open/closed. This is the primary interaction on touch devices.
- **Single open:** Only one dropdown can be open at a time. Opening one closes any other.
- **Escape key:** Pressing Escape closes all dropdowns.
- **Outside click:** Clicking anywhere outside the `.mega-menu` container closes all dropdowns.
- **ARIA:** Triggers use `aria-expanded` (true/false) and `aria-haspopup="true"`. Dropdowns use `role="menu"`, links use `role="menuitem"`.

## Animation

The dropdown entrance uses a combined opacity + translateY transition:

- **Closed:** `opacity: 0`, `translateY(8px)`, `visibility: hidden`, `pointer-events: none`
- **Open:** `opacity: 1`, `translateY(0)`, `visibility: visible`, `pointer-events: all`
- **Duration:** 0.25s ease for both opacity and transform
- **Chevron rotation:** 0.2s ease

## Token Usage

| Property | Token |
|----------|-------|
| Trigger text color | `var(--color-ink)` |
| Trigger hover / open color | `var(--color-teal-500)` |
| Column title color | `var(--color-muted)` |
| Link color | `var(--color-slate)` |
| Link hover color | `var(--color-teal-500)` |
| Link icon color | `var(--color-teal-300)` |
| CTA background | `teal-100` at 15% opacity |
| CTA link color | `var(--color-teal-500)` |
| CTA link hover | `var(--color-teal-700)` |
| Dropdown background | white |
| Dropdown border-radius | `var(--radius-xl)` (16px) |
| CTA border-radius | `var(--radius-lg)` (12px) |
| Divider color | `slate-light` at 30% opacity |
| Font family | `var(--font-family)` |

## Layout

- Dropdown panel: `min-width: 600px`, centered below trigger via `left: 50%; transform: translateX(-50%)`
- Columns grid: `repeat(auto-fit, minmax(180px, 1fr))`, gap 32px
- Dropdown padding: 32px
- Dropdown margin-top: 8px (gap between trigger and panel)
- Dropdown shadow: `0 20px 60px rgba(0, 0, 0, 0.12)`

## Accessibility

- All triggers are `<button>` elements with `aria-expanded` and `aria-haspopup`
- Dropdown panels use `role="menu"`, individual links use `role="menuitem"`
- Chevron and link icons use `aria-hidden="true"`
- Escape key closes all open menus
- The entire nav uses `role="navigation"` with `aria-label="Main navigation"`

## Do / Don't

- **Do** use `data-mega-item` attribute on each `.mega-menu__item` for JS binding.
- **Do** keep column titles short and uppercase for visual hierarchy.
- **Do** include the CTA card only where contextually relevant (e.g., Company dropdown).
- **Don't** hardcode hex colors; always use `var(--color-*)` tokens.
- **Don't** nest dropdowns inside dropdowns (single level only).
- **Don't** exceed 3-4 columns per dropdown to maintain readability.
