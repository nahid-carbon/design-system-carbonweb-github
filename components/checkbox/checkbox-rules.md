---
component: checkbox
variants: [default, checked, disabled, group]
states: [default, hover, checked, focus-visible, disabled]
depends_on: [tokens/colors.css, tokens/spacing.css, tokens/radii.css, tokens/typography.css]
version: 1.0.0
last_updated: 2026-08-04
status: stable
---

## When to use

- **Default:** Binary choice inside forms or filter lists.
- **Group (`.checkbox-group`):** Vertical stack of related checkboxes, 12px gap — filter lists, multi-select options.
- **Disabled:** Option not currently available.

## Structure

Hidden native `<input type="checkbox">` (visually hidden but focusable) followed by a styled `.checkbox__box` (20px, radius-sm, slate/40 border) containing the `.checkbox__check` SVG, then the 16px Raleway label.

## States & behavior

- Default: white box, 1.5px slate/40 border.
- Hover: teal-500 border + subtle teal tint background.
- Checked: teal-500 background, white checkmark scales in + path draws in (150ms ease).
- Checked hover: teal-600; active: teal-700.
- Focus-visible: 2px teal-500 outline ring, 2px offset.
- Disabled: 40% opacity, cursor not-allowed, no pointer events.

## Do / Don't

- Do wrap input + box + label in a single `<label class="checkbox">` — the whole row is clickable.
- Do keep the native input in the DOM (accessibility, forms) — never `display: none` it.
- Don't hardcode colors — use token variables.
- Don't resize the box; 20px is fixed.

## Accessibility

- Native input receives focus and keyboard toggling (Space) for free.
- Group lists use `role="group"` + `aria-labelledby` pointing at the group title.
- Disabled uses the native `disabled` attribute plus `.checkbox--disabled` on the label.

## Markup reference

```html
<label class="checkbox">
  <input class="checkbox__input" type="checkbox" />
  <span class="checkbox__box">
    <svg class="checkbox__check" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6.5L4.7 9L10 3.5" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="checkbox__label">Label</span>
</label>
```
