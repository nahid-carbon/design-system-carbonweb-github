---
component: text-field
variants: [default, error, disabled, floating]
states: [default, focus, error, disabled]
depends_on: [tokens/colors.css, tokens/spacing.css, tokens/radii.css, tokens/typography.css]
version: 1.0.0
last_updated: 2026-07-21
status: template
---

## When to use

- **Default:** Standard text input with label above. Use for most form fields.
- **Error:** Validation failed — red border, error message below input.
- **Disabled:** Non-interactive field. Greyed out with reduced opacity.
- **Floating:** Label floats above on focus/fill. Use for compact forms.

## Do / Don't

- Do always pair inputs with a visible `<label>`.
- Do use `aria-invalid` and `aria-describedby` for error states.
- Don't hardcode colors — use token variables.
- Don't create custom input styles — extend this component.

## States & behavior

- Default: slate-light border.
- Focus: teal-500 border, no box-shadow.
- Error: pink-700 border, error message in pink-700.
- Disabled: 40% opacity, no pointer events, light grey background.

## Accessibility

- Inputs must have associated `<label>` elements (via `for`/`id`).
- Error messages must be linked via `aria-describedby`.
- Invalid fields must have `aria-invalid="true"`.
- Minimum 44px touch target height (55px default exceeds this).

## Markup reference

```html
<div class="text-field">
  <label class="text-field__label" for="name">Full name</label>
  <input class="text-field__input" type="text" id="name" placeholder="Enter your name" />
</div>

<!-- Error -->
<div class="text-field text-field--error">
  <label class="text-field__label" for="email">Email</label>
  <input class="text-field__input" type="email" id="email" aria-invalid="true" aria-describedby="email-err" />
  <p class="text-field__error-msg" id="email-err">Please enter a valid email.</p>
</div>
```
