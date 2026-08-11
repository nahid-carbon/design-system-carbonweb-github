---
component: typography
variants: [display, heading, heading-sb, paragraph, body, ui]
states: [default]
depends_on: [tokens/colors.css, tokens/typography.css]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

Typography styles apply globally. Use semantic HTML (`h1`–`h6`, `p`) for structure, and utility classes from `tokens/typography.css` (`.display-1`, `.heading-2-sb`, `.body-large`, etc.) when you need a specific style that differs from the semantic default.

## Scale

| Style | Weight | Size | Line Height |
|-------|--------|------|-------------|
| Display 1 | 900 (Black) | 48px | 1.3 |
| Display 2 | 300 (Light) | 40px | 1.3 |
| Heading 1 | 700 (Bold) | 44px | 1.3 |
| Heading 2 | 700 | 32px | 1.3 |
| Heading 3 | 700 | 28px | 1.3 |
| Heading 4 | 700 | 24px | 1.3 |
| Heading 5 | 700 | 20px | 1.3 |
| Heading 6 | 700 | 16px | 1.3 |
| Lead Paragraph | 400 | 22px | 1.5 |
| Body Large | 400 | 20px | 1.7 |
| Body Medium | 400 | 18px | 1.7 |
| Body Normal | 400 | 16px | 1.7 |
| Body Small | 400 | 14px | 1.7 |
| Button | 500 (Medium) | 16px | 1.5 |

## Do / Don't

- Do use Raleway for everything. Never substitute another font.
- Do use Display 1 for page titles, Heading 2–6 for section headings.
- Don't mix heading levels for visual sizing — use the SemiBold variants instead.
- Don't hardcode font sizes — use token classes or CSS variables.

## Text colors

- Primary text: `--color-ink` (#0A0A0A)
- Secondary/meta: `--color-muted` (#7F8081)
- Links / footer body: `--color-slate` (#5E6075)
- Meta (phone, email, legal): `--color-slate-light` (#A3A5B5)

## Markup reference

```html
<h1 class="display-1">Page Title</h1>
<h2 class="heading-2">Section Heading</h2>
<h3 class="heading-3-sb">SemiBold Heading</h3>
<p class="lead-paragraph">Introductory paragraph text.</p>
<p class="body-normal">Standard body copy.</p>
<p class="body-small text-muted">Caption or meta text.</p>
```
