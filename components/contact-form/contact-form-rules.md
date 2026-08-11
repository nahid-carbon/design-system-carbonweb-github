---
component: contact-form
variants: [default, error, success]
states: [default, hover, focus, error, success]
depends_on: [tokens/colors.css, tokens/spacing.css, tokens/radii.css, tokens/typography.css, components/button/button.css]
version: 1.0.0
last_updated: 2026-08-04
status: stable
---

## When to use

"Get in Touch" contact card — landing pages, contact page, footer CTA sections. Collects name, email, company, message, and the visitor's monday.com URL.

## Structure

- `.contact-form` — white rounded-xl card with soft shadow, max-width 560px.
- Heading uses Heading 3 style (bold 28px): "Get in Touch"; sub copy in muted 16px.
- `.contact-form__fields` — vertical stack (20px gap) of `.contact-form__field` (label + input + hidden error message).
- Inputs/textarea: 1px slate/25 border, radius-md; hover teal border; focus teal border + soft teal ring (200ms ease).
- Submit reuses the Button component: `btn btn--primary btn--teal btn--lg` (link `components/button/button.css`).

## Behavior (contact-form.js)

- Submit is intercepted; validates required Name (non-empty) and Email (non-empty + regex).
- Failures add `.contact-form__field--error` → pink-700 border + inline small red error text (`aria-invalid` set).
- Typing in a field clears its error.
- On success: `.contact-form--success` on the form reveals the green confirmation row and the form resets.

## Do / Don't

- Do keep `novalidate` on the form — validation is handled by the script for consistent styling.
- Do keep `aria-live="polite"` on error messages and `role="status"` on the success row.
- Don't hardcode colors — use token variables.
- Don't build a bespoke submit button — reuse `.btn` classes.

## Markup reference

See `contact-form.html`. Load `contact-form.js` after the markup.
