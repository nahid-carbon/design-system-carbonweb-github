---
component: badge
variants: [teal, green, yellow, pink, ink, outline]
states: [default]
depends_on: [colors, typography]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **Status indicators:** Show the current state of an item (active, complete, pending, error, archived).
- **Labels:** Categorize or tag content with short descriptive text.
- **Announcements:** Flag new features, beta status, or version numbers.
- **Counts:** Display notification counts or item quantities alongside headings or nav items.

## Variant guidance

| Variant | Typical use |
|---------|-------------|
| `teal` | Active state, primary category, informational |
| `green` | Success, complete, approved |
| `yellow` | Pending, in progress, warning |
| `pink` | Error, alert, urgent attention |
| `ink` | Neutral/archived, high contrast |
| `outline` | Lower-emphasis alternative to any solid variant |

## Sizing

- Badges use a single size: `12px` font, `4px 12px` padding.
- Do not resize badges arbitrarily. The compact size is intentional for inline use alongside body text and headings.

## Dot and icon slots

- Use `.badge__dot` for a quick visual status indicator when the badge label alone is insufficient.
- Use `.badge__icon` (14px) for small inline icons that reinforce meaning (checkmark, warning, close).
- Never combine both a dot and an icon in the same badge.

## Do

- Keep badge text short (1-2 words).
- Use the color variant that semantically matches the status or category.
- Pair outline badges with solid badges when you need a visual hierarchy between primary and secondary labels.
- Place badges inline next to the element they describe (heading, table cell, list item).

## Don't

- Don't use badges for long sentences or descriptions.
- Don't hardcode hex colors -- always use `var(--color-*)` tokens.
- Don't use badges as interactive elements (they are not buttons or links).
- Don't stack more than 3 badges next to the same element.
- Don't mix solid and outline variants of the same color side by side -- pick one style per context.

## Markup reference

```html
<!-- Solid -->
<span class="badge badge--teal">Active</span>

<!-- Outline -->
<span class="badge badge--outline badge--green">Complete</span>

<!-- With dot -->
<span class="badge badge--pink"><span class="badge__dot"></span>Error</span>

<!-- With icon -->
<span class="badge badge--teal">
  <span class="badge__icon"><!-- 14px SVG --></span>
  Verified
</span>
```
