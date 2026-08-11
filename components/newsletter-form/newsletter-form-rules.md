---
name: Newsletter Form
description: Email subscription form with inline validation, success/error states, and shake animation. Supports inline, stacked, and dark variants.
version: 1.0.0
status: ready
component: newsletter-form
variants: [inline, stacked, dark]
states: [default, focus, error, success]
depends_on: [tokens/colors.css, tokens/typography.css, tokens/spacing.css, tokens/radii.css, tokens/shadows.css]
last_updated: 2026-07-21
---

## Usage

Use the newsletter form for single-field email subscription capture. It is designed for footer signups, landing page CTAs, and standalone subscription sections.

- **Inline (default):** Input and button sit side by side in a connected pill shape. Best for footer newsletter areas where horizontal space is available.
- **Stacked:** Input and button stack vertically, each full-width with pill corners. Use in standalone signup sections (e.g. Digital Directive page) or narrower containers.
- **Dark:** Adapts colors for dark background sections. Combines with either inline or stacked layout.

## Variants

| Variant | Class | Description |
|---------|-------|-------------|
| Inline (default) | `.newsletter-form` | Horizontal pill — input left, button right |
| Stacked | `.newsletter-form--stacked` | Vertical layout — full-width input above full-width button |
| Dark | `.newsletter-form--dark` | Dark background mode — white text, translucent input |

Modifiers can be combined: `.newsletter-form--stacked.newsletter-form--dark` produces a stacked layout on dark backgrounds.

## States

| State | Trigger | Behavior |
|-------|---------|----------|
| Default | Page load | Form visible, input empty |
| Focus | Input focused | Border changes to teal-500 (teal-300 in dark mode) |
| Error | Invalid submit | Shake animation, red border, error message shown below input |
| Success | Valid submit | Form fields hidden, success message with checkmark displayed |

## Do

- Use `novalidate` on the `<form>` element and handle validation in JavaScript for consistent cross-browser UX.
- Always include `aria-label="Email address"` on the input.
- Use `type="email"` for mobile keyboard optimization.
- Show a clear success message that replaces the form after valid submission.
- Keep heading and subtext concise — one line each.

## Don't

- Don't hardcode hex color values — all colors must come from token variables.
- Don't use this component for multi-field forms. It is single-input (email) only.
- Don't remove the error shake animation — it provides important feedback for invalid submissions.
- Don't place the inline variant in containers narrower than 300px; use stacked instead.
- Don't use the dark variant on light backgrounds — it requires a dark container.

## Accessibility

- Input must have `aria-label="Email address"` since there is no visible `<label>` element.
- Use `type="email"` to trigger the appropriate mobile keyboard.
- Error messages are visible text positioned near the input for easy association.
- Success message includes a checkmark icon for visual reinforcement alongside the text.
- The shake animation on error provides motion feedback; it is brief (0.4s) and non-repeating.
- Button text ("Subscribe") clearly communicates the action.

## Validation

- Email pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Invalid submission triggers the shake animation and displays the error message.
- Error state clears automatically when the user starts typing.
- Valid submission shows the success state, hiding the input and displaying a confirmation message.

## Markup reference

```html
<!-- Inline (default) -->
<form class="newsletter-form" novalidate>
  <div class="newsletter-form__heading">Stay in the loop</div>
  <div class="newsletter-form__subtext">Get the latest CarbonWeb updates delivered to your inbox.</div>
  <div class="newsletter-form__field">
    <input class="newsletter-form__input" type="email" placeholder="Enter your email" aria-label="Email address" required />
    <button class="newsletter-form__button" type="submit">Subscribe</button>
  </div>
  <div class="newsletter-form__error">Please enter a valid email address.</div>
  <div class="newsletter-form__success">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.2"/><path d="M5 8l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    You're subscribed! Check your inbox for confirmation.
  </div>
</form>

<!-- Stacked -->
<form class="newsletter-form newsletter-form--stacked" novalidate>
  <!-- Same inner structure -->
</form>

<!-- Dark -->
<form class="newsletter-form newsletter-form--dark" novalidate>
  <!-- Same inner structure; place inside a dark-background container -->
</form>

<!-- Dark + Stacked combined -->
<form class="newsletter-form newsletter-form--stacked newsletter-form--dark" novalidate>
  <!-- Same inner structure -->
</form>
```
