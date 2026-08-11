---
component: feature-list
variants: [arrow, check, two-col, numbered, compact]
states: [default, hover]
depends_on: [colors, typography]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **Arrow (default):** List service features, capabilities, or benefits with teal arrow icons.
- **Check:** Confirm credentials, guarantees, or included items with green checkmarks.
- **Two-column:** Present a broader set of features in a side-by-side grid layout.
- **Numbered:** Show sequential steps, onboarding flows, or getting-started guides.
- **Compact:** A denser version of any variant with smaller gap and font size.

## Do / Don't

- Do keep list items to a single line or short phrase for scannability.
- Do combine modifiers when needed (e.g. `feature-list--check feature-list--compact`).
- Don't hardcode colors — use token variables from `colors.css`.
- Don't nest feature lists inside each other.

## States & behavior

- **Default:** Static list with icon and text.
- **Hover:** Each item shifts right by 4px (`translateX(4px)`) for subtle interactivity feedback.

## Structure

- `.feature-list` — `<ul>` container, flex column with 12px gap.
- `.feature-list__item` — `<li>` row, flex with icon and text.
- `.feature-list__icon` — icon container (20x20 default, 16x16 compact, 24x24 numbered).
- Modifier classes: `--check`, `--two-col`, `--numbered`, `--compact`.

## Accessibility

- Use semantic `<ul>` and `<li>` elements.
- SVG icons are decorative; they inherit `currentColor` and do not need `aria-label`.
- Numbered variant uses text content inside the icon span, which is read by screen readers.

## Markup reference

```html
<ul class="feature-list">
  <li class="feature-list__item">
    <span class="feature-list__icon">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10h10M11 6l4 4-4 4"/></svg>
    </span>
    Feature text here
  </li>
</ul>
```
