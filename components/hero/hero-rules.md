---
component: hero
variants: [base, columns, form, dark, service, partner, compact, search, brief, newsletter, apps, blog-cta, grid, grain, glass, wedge-bottom-left, wedge-bottom-right, wedge-bottom-center, wedge-top-right]
states: [default, load-animation]
depends_on: [colors, typography, radii, spacing, button, badge, chip]
version: 1.1.0
last_updated: 2026-08-06
---

## When to use

- **Page openers:** The first section of any marketing or landing page.
- **Product/feature intros:** Use `--columns` when a screenshot, illustration, or video should sit beside the copy.
- **Lead capture:** Use `--form` when the page's primary goal is a form submission (contact, demo, trial).
- **High-impact statements:** Use `--dark` for enterprise, campaign, or brand-moment pages.

## Structure

```
.hero
  .hero__inner
    .hero__eyebrow      — badge/chip row (slot)
    .hero__title        — Display heading; wrap 1–2 words in span.hero__accent
    .hero__lead         — 20px slate lead paragraph
    .hero__actions      — CTA row (primary btn + tertiary link)
    .hero__media        — media slot (--columns only)
    .hero__form         — white form card slot (--form only)
```

## Variant guidance

| Variant | Layout | Use |
|---------|--------|-----|
| base | Centered, max 880px title | Default page hero |
| `--columns` | 2-col grid, text left / media right | Product screenshots, illustrations |
| `--form` | 2-col grid, text left / white form card right | Lead-gen pages |
| `--dark` | Centered on ink bg, white text | Enterprise / campaign pages |

## Content rules

- Title: one sentence, max ~8 words. Wrap only 1–2 key words in `.hero__accent` (gradient text via `--gradient-global`).
- Lead: 1–2 sentences, max 640px width.
- Actions: exactly one primary button plus at most one tertiary text link. On `--dark`, use `btn--white` colorway.
- Eyebrow: 1–2 badges max. Reuse the DS Badge component.

## Motion

- Content blocks fade + rise in on load with 90ms stagger (eyebrow → title → lead → actions → media/form).
- Fully disabled under `prefers-reduced-motion: reduce`.


## Figma node map

| Figma | Node | Implementation |
|-------|------|----------------|
| Hero/Form | `99:3585` | `.hero--form` |
| Hero (calendar) | `99:3586` | `.hero--form` + `booking-calendar` in the form slot |
| Hero/Small Gap | `170:3391` | `.hero--compact.hero--dark.hero--grid.hero--wedge-bottom-right` |
| Hero/Glass Blog | `229:4182` | `.hero--glass` |
| Hero/Blog CTA | `170:26778` | `.hero--blog-cta` |
| Workflow Development | `918:48355` | `.hero--service` + `assets/hero-workflow-development@2x.png` |
| Consultation | `918:47619` | `.hero--service` + `assets/hero-consultation@2x.png` |
| Training | `918:47089` | `.hero--service` + `assets/hero-training@2x.png` |
| Custom scoped (dark) | `918:49255` | `.hero--service.hero--dark` + `assets/hero-custom-scoped@2x.png` |
| One partner | `918:51481` | `.hero--partner` + `assets/hero-monday-service@2x.png` |
| Illustration/Hero Monday Service | `918:51030` | `assets/hero-monday-service@2x.png` |
| Carbon Blog | `229:4105` | `.hero--search.hero--glass` + `search-bar` in the search slot |
| Carbon Brief | `335:3412` | `.hero--brief.hero--wedge-bottom-center` |
| Newsletter | `767:5176` | `.hero--newsletter` |
| Apps hero | `651:3511` | `.hero--apps` |
| Builder Buddies | `170:3394` | `.hero--columns` + illustration (asset not yet exported) |
| Process Automation | `170:3395` | `.hero--columns` + illustration (asset not yet exported) |
| Experience the difference | `170:3396` | `.hero--dark` + illustration (asset not yet exported) |
| Managed Services | `170:3399` | `.hero--columns.hero--dark.hero--wedge-bottom-left` (asset pending) |
| Solutions Directory | `170:3400` | `.hero--columns.hero--dark` (asset pending) |

## Composable modifiers

These stack onto any variant:

| Modifier | Effect |
|----------|--------|
| `--dark` | Ink surface, white title, muted white lead |
| `--grid` | Faint 64px rule grid, radially masked |
| `--grain` | Low-opacity SVG turbulence texture |
| `--glass` | Diagonal light-streak gradient over ink |
| `--wedge-bottom-left` / `-right` / `-center` | 90px angled corner cut out of the bottom edge |
| `--wedge-top-right` | 90px angled corner cut out of the top edge |

Wedges clip the hero itself, so the page background behind shows through as the
diagonal — the same notch motif as `section-divider`, at page scale. Never put a
`section-divider` against an edge that already carries a wedge.

## Extra slots

- `.hero__partners` — partner badge lockups above the title (`--partner`).
- `.hero__meta` — trailing meta line under the CTA row.
- `.hero__search` — search control slot (`--search`).
- `.hero__logo` / `.hero__date` — logo lockup and issue date (`--brief`).
- `.hero__tiles` > `.hero__tile` — floating app tiles in the margins (`--apps`); hidden below 992px.
- `.hero__byline` (+ `-avatar` / `-name` / `-role` / `-date`), `.hero__cta-card`, `.hero__graphic` — article hero parts (`--blog-cta`). `.hero__graphic` is locked to the Figma 810×490 ratio.
- `.hero__accent--solid` — flat teal accent word, as Figma uses; the default `.hero__accent` is the brand gradient.

## Known asset gaps

Five product-page heroes (`170:3394`, `170:3395`, `170:3396`, `170:3399`, `170:3400`)
have their layout covered but their illustrations are not yet exported from Figma.
Drop the exports into `assets/` at @2x and point `.hero__media img` at them.

## Do

- Reuse DS Button and Badge components inside slots.
- Keep the gradient accent to a single phrase.
- Let the background gradient washes stay subtle — they are ambience, not decoration.

## Don't

- Don't hardcode hex colors — everything references `var(--color-*)` / `var(--gradient-global)`.
- Don't stack more than two CTAs.
- Don't put long paragraphs in `.hero__lead`.
- Don't combine `--columns` and `--form` on the same hero.
