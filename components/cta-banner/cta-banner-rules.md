---
component: cta-banner
variants: [base, light, split, centered, subscribe, glow, glow-avatar, quiz, quiz-highlight, vertical, products, blog-s, blog-m, blog-l]
states: [default, hover, focus-within]
depends_on: [colors, typography, radii, button]
version: 1.1.0
last_updated: 2026-08-04
---

## When to use

- **Section closers:** End a content section or page with a clear conversion moment.
- **Mid-page conversion:** Break up long pages with a single focused CTA.
- **Pre-footer:** Place directly above the site footer as the last conversion prompt.

## Structure

```
.cta-banner[--light|--split|--centered]
  .cta-banner__content
    .cta-banner__title        — H2 bold; wrap 1–2 words in span.cta-banner__accent
    .cta-banner__description  — 18px supporting copy
    .cta-banner__actions      — DS buttons (primary + optional tertiary)
  .cta-banner__media          — media slot (--split only)
```

## Variant guidance

| Variant | Look | Use |
|---------|------|-----|
| base | Dark ink→teal-950 gradient, radial teal glow, white text | Default, high contrast |
| `--light` | 18% teal tint bg, ink text | Softer sections, light pages |
| `--split` | 2-col grid, media slot right | When an illustration/screenshot supports the ask |
| `--centered` | Centered content + actions | Standalone bands, short copy |

`--split` and `--centered` are layout modifiers and combine with `--light`.

## Content rules

- One primary CTA per banner. Optional second action must be tertiary.
- On the dark base, tertiary links use `btn--white`; on `--light` use `btn--teal`.
- Title max ~6 words; wrap only 1–2 words in `.cta-banner__accent` (teal-400 dark / teal-700 light).
- Description: 1–2 sentences.

## Interaction

- Card hover: radial glow opacity 0.7 → 1 plus soft teal shadow (200ms).
- CTA button lifts 2px on hover (on top of DS button hover).
- Links inside get teal `:focus-visible` outlines.

## Do

- Reuse the DS Button component — never restyle buttons locally.
- Keep max-width 1288px to align with the site grid.

## Don't

- Don't hardcode hex colors — use `var(--color-*)` and `color-mix` on tokens.
- Don't place forms inside the banner — use the Hero `--form` variant instead.
- Don't stack two dark banners back-to-back.

---

## Figma-derived variants (page "4. Sections / CTA Banner")

| Variant | Figma source | Look | Use |
|---------|-------------|------|-----|
| `--subscribe` | CTA Banner/Subscribe (809:16949) | Ink bg, teal/green corner glow, pill email form + inline Subscribe button, envelope illustration right | Newsletter capture bands |
| `--glow` (+ `--split`) | Glow Split (664:11243) | Charcoal card, green corner glow, teal accent; right column of glass info cards (`__info-stack` > `__info-card`) | Discovery-call CTAs with proof points |
| `--glow --split --glow-avatar` | Glow Avatar (871:31313, 918:46587) | Same charcoal card with hexagon avatar cluster image right | Team/consultation CTAs |
| `--quiz` | Quiz Card (871:31698, 918:45805) + Highlight (871:31697, 918:45807) | Pale-teal card, ink heading with teal accent, white answer panel (`__panel` > `__panel-item`); `__panel-item--vibe` / `--agent` add pastel gradient highlight rows | Engagement-scoping / quiz-result CTAs |
| `--vertical` | Vertical (170:28850) | No card bg; centered eyebrow + heading + desc + square button, media collage below | Section intro with product collage |
| `--products` | Products (242:31614, 94:15608, 94:14974) | Centered header + stacked tinted product rows (`__product--tint-grey/teal/pink/green/yellow`), each with logo, desc, small pill button, media slot | Product-suite discovery sections |
| `--blog-s` | Blog Small set (170:26327) | Compact teal-950 horizontal bar: title/desc, optional `__checks`, small button right | Inline blog CTAs |
| `--blog-m` | Blog Medium set (170:26453) | Teal-950 card, text + large button left, square graphic right | Blog sidebar/mid-article CTAs |
| `--blog-l` | Blog Large set (170:26395) | Teal-950 card: `__logo`, title, desc, 2-col `__checks`, button; graphic right | Blog lead-magnet CTAs |

### New elements

- `__eyebrow` — letterspaced uppercase teal kicker (`--vertical`).
- `__fine-print` — italic 12px muted footnote under actions.
- `__form` / `__input` — pill email capture; teal border, focus-within ring; submit is a DS `btn--sm`.
- `__info-stack`, `__info-card`, `__info-icon`, `__info-title`, `__info-desc` — glass cards on `--glow`.
- `__panel`, `__panel-title`, `__panel-item` (+ `--vibe`, `--agent`) — white answer panel on `--quiz`.
- `__checks` / `__check` — teal check bullets (blog + glow banners), 2-col grid.
- `__graphic` — token-gradient placeholder slot when no asset is supplied (never ship broken img tags).
- `__product`, `__product-logo`, `__product-desc`, `__product-media` — rows inside `--products`.
- `__logo` — small white product wordmark line on blog cards.

### Assets

- `assets/subscribe-envelope@2x.png` — display at 246px (exported @2x from node 809:16947).
- `assets/glow-avatar-cluster@2x.png` — display at 454px (exported @2x from node 871:31107).

### Interaction (new variants)

- All hovers 200ms: cards lift 1–3px, glow layers intensify, product rows gain soft ink shadow.
- `__form:focus-within` — teal-300 border + 4px teal ring.
- Inputs/buttons get teal `:focus-visible` outlines.

### Figma nodes intentionally not given new variants

- 170:26825 (Columns Centered XL), 170:29082 (Lets Get Started), 170:40804 (Columns Fullwidth) — covered by base/`--light` + `--split` with a media asset.
- 871:31639 (Quiz set), 918:45805/45807 — same design as `--quiz`.
- 94:14974 — mobile stacking of `--products` (handled by the responsive rules).
