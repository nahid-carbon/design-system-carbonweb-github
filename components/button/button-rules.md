---
component: button
variants: [primary, secondary, tertiary, square]
colors: [teal, green, white, grey]
sizes: [sm, lg]
shapes: [label-only, leading-icon, trailing-icon, icon-only, processing]
states: [default, hover, focus, active, disabled, loading]
depends_on: [tokens/colors.css, tokens/spacing.css, tokens/radii.css, tokens/typography.css]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **Primary:** Single main action per screen/section (e.g. "Get Started"). Pill shape, solid fill.
- **Secondary:** Supporting action alongside a primary (e.g. "Learn more"). Pill shape, outlined with 2px border.
- **Tertiary:** Low-emphasis actions (e.g. "Cancel", inline text). No fill, no border; hover adds underline.
- **Square:** Fixed-width block (300px lg / 150px sm). Rounded rect, solid fill. Hover inverts to outline.

## Do / Don't

- Do use only one primary button per view.
- Don't place two primary buttons side by side.
- Don't override colors inline — swap the variant/color class instead.
- Don't hardcode hex values — all colors come from tokens.

## States & behavior

- Hover: background shifts per color theme, 150ms ease transition.
- Focus: visible `:focus-visible` ring, 2px, `--color-teal-300`.
- Disabled: 40% opacity, no pointer events.
- Loading: spinner replaces icon, button disabled, `aria-busy="true"`.

## Accessibility

- Minimum 44×44px hit area (lg size meets this).
- Must be a real `<button>` or `<a role="button">`, never a styled `<div>`.
- Icon-only buttons must include `aria-label`.

## Markup reference

```html
<!-- Primary teal, large -->
<button class="btn btn--primary btn--teal btn--lg">Get Started</button>

<!-- Secondary green, small -->
<button class="btn btn--secondary btn--green btn--sm">Learn More</button>

<!-- Tertiary -->
<button class="btn btn--tertiary btn--teal">Cancel</button>

<!-- Square -->
<button class="btn btn--square btn--teal btn--lg">Submit</button>

<!-- With trailing icon -->
<button class="btn btn--primary btn--teal btn--lg btn--icon-right">
  Get Started
  <span class="btn__icon"><!-- ArrowRight SVG --></span>
</button>

<!-- Icon only -->
<button class="btn btn--primary btn--teal btn--lg btn--icon-only" aria-label="Next">
  <span class="btn__icon"><!-- ArrowRight SVG --></span>
</button>
```
