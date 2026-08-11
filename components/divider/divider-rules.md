---
component: divider
variants: [default, thick, teal, gradient, text]
states: [default]
depends_on: [colors, typography]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **Section separation:** Visually break content into distinct sections on a page.
- **List separation:** Separate items in a vertical list or settings panel.
- **Form sections:** Divide form groups or steps.
- **Inline alternatives:** Use the text variant to present alternate actions (e.g., "Or continue with").

## Variant guidance

| Variant | Typical use |
|---------|-------------|
| `default` | General-purpose content separation, subtle and unobtrusive |
| `thick` | Stronger visual break between major page sections |
| `teal` | Brand-accented separation, use sparingly for emphasis |
| `gradient` | Hero or featured section boundaries, brand-heavy contexts |
| `text` | Inline alternative prompts ("Or continue with"), section labels |

## Do

- Use the default variant for most content separation needs.
- Reserve gradient and teal variants for branded or high-emphasis contexts.
- Keep text divider labels short (2-4 words).
- Use consistent divider variants within the same page section.

## Don't

- Don't hardcode hex colors -- always use `var(--color-*)` tokens.
- Don't stack multiple dividers without content between them.
- Don't use gradient dividers in form layouts -- they are too visually heavy.
- Don't use text dividers for long sentences.

## Markup reference

```html
<!-- Default -->
<hr class="divider" />

<!-- Thick -->
<hr class="divider divider--thick" />

<!-- Teal -->
<hr class="divider divider--teal" />

<!-- Gradient -->
<hr class="divider divider--gradient" />

<!-- With text -->
<div class="divider divider--text">
  <span class="divider__text">Or continue with</span>
</div>
```
