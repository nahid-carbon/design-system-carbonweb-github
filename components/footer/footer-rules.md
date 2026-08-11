---
component: footer
variants: [default]
states: [default]
depends_on: [tokens/colors.css, tokens/spacing.css, tokens/typography.css, tokens/radii.css, components/button/button.css, components/text-field/text-field.css]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- Full-width site footer for every CarbonWeb page. Desktop only (1440–1920px).

## Structure

1. **CTA Card** — `#D1F1F4` bg, heading, description, primary Button, rocket illustration.
2. **Link Columns** — Row A: CarbonWeb + CarbonApps + newsletter. Row B: 4 remaining columns.
3. **Bottom Bar** — Wordmark, contacts (US + LATAM), email, socials, divider, legal + copyright.

## Do / Don't

- Do edit link content in `tokens/footer.ts` (React) or directly in footer.html (vanilla).
- Don't duplicate button or input styles — use the existing components.
- Don't modify layout widths without design review.

## Content

| Column | Links |
|--------|-------|
| CarbonWeb | About, How we work, Careers, Partnerships, Emergency Response Team, Monday.com Partnership, Newsroom |
| CarbonApps | About, Our Apps, Support, Explore marketplace |
| monday.com | Platform, monday CRM, monday Work Management, monday Service, monday Dev, Solutions |
| monday.com Services | Consultation, Workflow development, Training, Custom work |
| Creative Services | Explore, Web Design, Evolution Plan |
| Resources | Newsletter, Blogs, Contact Us, monday Free trial |

## Styling

- Footer bg: white. Content max-width: 1288px.
- Column title: 20px medium, ink. Column links: 16px regular, slate, hover → ink.
- Newsletter: `#F5F7FB` bg, rounded-lg, 30px padding.
- Bottom bar contact: teal-600 region label, slate-light values.
- Divider: 1px, slate/30. Copyright: 18px, slate-light.

## Accessibility

- Social links need `aria-label` for icon-only links.
- Email input has `type="email"`.
