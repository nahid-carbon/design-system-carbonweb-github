---
component: search-bar
variants: [light, dark, square, wide]
states: [default, hover, focus, disabled]
depends_on: [tokens/colors.css, tokens/spacing.css, tokens/radii.css, tokens/typography.css]
version: 1.0.0
last_updated: 2026-08-04
status: stable
---

## When to use

- **Light (default):** Standard site search on white/light backgrounds. Pill shape, slate/25 border.
- **Dark:** Search on ink/dark surfaces (headers, dark heroes). Ink background, white text, teal glow border.
- **Square:** When the surrounding UI uses rectangular inputs — radius-md instead of pill.
- **Wide (`--wide`):** Article/blog search — full-width up to 560px, 55px height.

## Structure

`.search-bar` wrapper (relative) containing a `type="search"` input and an absolutely positioned trailing magnifier SVG (`.search-bar__icon`, currentColor).

## States & behavior

- Hover: teal-500 border.
- Focus: teal-500 border + soft teal ring (3px, 15% teal), icon turns teal-500.
- Focus-visible (keyboard): 2px teal outline ring.
- Dark focus: stronger teal ring + glow.
- Disabled: 40% opacity, no pointer events.
- All transitions 200ms ease.

## Do / Don't

- Do use `type="search"` and an `aria-label` (or visible label) on the input.
- Do keep the placeholder "Search".
- Don't put the icon inside the input; it sits absolutely in the wrapper so it never intercepts clicks (`pointer-events: none`).
- Don't hardcode colors — use token variables.
- Don't place `--dark` on light backgrounds or `--light` on dark ones.

## Markup reference

```html
<div class="search-bar" role="search">
  <input class="search-bar__input" type="search" placeholder="Search" aria-label="Search" />
  <svg class="search-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
    <path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>
</div>
```

Add `search-bar--dark`, `search-bar--square`, or `search-bar--wide` to the wrapper as needed.
