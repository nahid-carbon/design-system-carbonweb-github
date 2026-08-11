---
component: product-tag
variants: [light, hover, static, row]
states: [default, hover, active, focus-visible]
depends_on: [colors, typography, radii, spacing]
version: 1.0.0
last_updated: 2026-08-06
---

## When to use

- **Product filters:** A row of monday.com products the user can filter a directory or blog index by.
- **Product attribution:** Show which monday product a case study, app or article belongs to, where the logo needs to be legible.

Use the pill Chip (`.chip--tag.chip--product-*`) instead when the tag sits inline in card metadata and a 14px logo is enough.

## Structure

- `.product-tag` — the tag itself. Use `<a>` for filters/links, `<span>` for labels.
- `.product-tag__logo` — 24px-tall brand logo slot, natural width.
- `.product-tag__label` — the product name.
- `.product-tag-row` — flex wrapper, 8px gap, wraps.

## Variant guidance

| Variant | Typical use |
|---------|-------------|
| default | State=Light — white surface, hairline border, Gray 900 label |
| `:hover` / `--hover` | State=Hover — Gray 900 fill, white label. The modifier pins it for docs |
| `--static` | Non-interactive label; suppresses the hover fill |

## Figma node map

| Figma | Node | Implementation |
|-------|------|----------------|
| Chip/Products | `848:61721` | `.product-tag-row` |
| State=Light | `170:40805` | `.product-tag` |
| State=Hover | `848:61719` | `.product-tag:hover` / `.product-tag--hover` |

Logos exported from the Figma tag frames: `93:66260` (monday), `93:66268` (Work Management), `93:66285` (CRM), `93:66296` (Dev), `93:66305` (Service) → `assets/tag-*.svg`.

## Specification notes

- 32px tall: 4px vertical padding, 20px line-height, 1px border.
- Asymmetric padding — 8px leading (logo side), 10px trailing.
- 4px radius (`--radius-sm`), **not** a pill. This is the one tag in the system that isn't pill-shaped.
- Border stays `--color-border-light` in both states; only the fill and label colour change.
- Label is Raleway Medium 14px/20px — matches the Figma source exactly.
- The source row is 244px wide and wraps five tags to three lines.

## Interaction

- 200ms ease colour transition; no lift or shadow.
- `:active` deepens to ink. `:focus-visible` = 2px teal-500 outline, 2px offset.
- `prefers-reduced-motion` disables the transition.

## Do

- Keep the logo at 24px and let the width be natural — the CRM and Dev marks are wider than square.
- Give logo images an empty `alt`; the label already names the product.
- Use `--static` when the tag isn't clickable, so it doesn't advertise a hover it can't honour.

## Don't

- Don't recolour the logo per state — Figma keeps the full-colour mark on the dark fill.
- Don't make it a pill; the 4px radius is what distinguishes it from every chip.
- Don't hardcode hex colors — use `var(--color-*)` tokens.

## Markup reference

```html
<div class="product-tag-row">
  <a class="product-tag" href="#">
    <span class="product-tag__logo"><img src="assets/tag-monday.svg" alt="" /></span>
    <span class="product-tag__label">All</span>
  </a>
  <a class="product-tag" href="#">
    <span class="product-tag__logo"><img src="assets/tag-work-management.svg" alt="" /></span>
    <span class="product-tag__label">Work Management</span>
  </a>
</div>

<!-- Pinned hover, for documentation -->
<span class="product-tag product-tag--hover">
  <span class="product-tag__logo"><img src="assets/tag-crm.svg" alt="" /></span>
  <span class="product-tag__label">CRM</span>
</span>
```
