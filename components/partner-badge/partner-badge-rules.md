---
component: partner-badge
variants: [platinum, platinum-bordered, advanced-delivery, solutions, channel, sm, md, lg, row]
states: [default, hover, active, focus-visible]
depends_on: [colors, radii, spacing]
version: 2.0.0
last_updated: 2026-08-06
---

## When to use

- **Credential proof:** Above a hero headline, in the footer, on an about or partner page — anywhere the monday.com partner tier needs to be shown.
- **Link to the monday.com partner directory:** Wrap in an `<a>` when the badge should be clickable.

Use one badge per tier. Don't stack every credential the company holds into one row unless the page is specifically about partnerships.

## Structure

```
<a|span class="partner-badge [--sm|--md|--lg]">
  <img class="partner-badge__img" src="assets/badge-*.svg" alt="…" />
</a>

.partner-badge-row   — flex wrapper, 16px gap, wraps
```

## Figma node map

| Badge | Figma | Node | Asset |
|-------|-------|------|-------|
| Platinum Partner (borderless) | Partner Badge/Platinum 2026 | `439:101` | `badge-platinum-partner.svg` |
| Platinum Partner (bordered) | Partner Badge/Platinum 2026 | `527:6235` | `badge-platinum-partner-bordered.svg` |
| Advanced Delivery Partner | Partner Badge/Advanced Delivery 2026 | `439:100` | `badge-advanced-delivery-partner.svg` |
| Solutions Partner | Partner Badge/Solutions | `395:6827` | `badge-solutions-partner.svg` |
| Channel Partner | Partner Badge/Channel | `395:6826` | `badge-channel-partner.svg` |

Parent variant set for the Platinum pair is `527:6239`.

## Specification notes

- **The artwork is fixed.** These are monday.com-issued marks. Do not recolour, re-typeset, crop, add effects, or rebuild them in CSS — the component styles only size, alignment and interaction. This is why the badges ship as flat SVG rather than as composed markup; the previous version approximated them with a card and three coloured dots, which was not a real monday.com badge.
- **Size by height.** The five badges have different aspect ratios (176×59, 233×87, 239×87, 225×84), so `--partner-badge-height` drives the wrapper and the image fills it with `width: auto`. Never set a width.
- Exports were taken at the Figma symbol bounds and had their `#F5F5F5` page-background rect stripped, so each badge is transparent and sits on any surface.
- The badges carry their own white/indigo surface, so they need no treatment on dark sections. On light-grey surfaces where the white lockup would disappear, use the bordered Platinum variant.
- Hover/active/focus styles apply only to `a.partner-badge` / `button.partner-badge`; a plain `<span>` stays inert.

## Known source defect

`Partner Badge/Solutions` (`395:6827`) and `Partner Badge/Channel` (`395:6826`) are 176px-wide symbols whose medal graphic extends to 207px, so the circular mark is clipped at the right edge — in Figma and therefore in the exports. Widening both symbols to ~208px (matching the 2026 badges) and re-exporting fixes it. Until then the two exports are faithful to the source but visually incomplete.

## Accessibility

- `alt` must name the credential in full — "monday.com Platinum Partner", not "badge" or "logo".
- When the badge is decorative alongside text that already states the tier, use `alt=""`.
- Linked badges get a 2px teal focus ring at 4px offset.

## Do

- Use `--sm` (40px) in dense contexts like a hero eyebrow row, `--md` (56px) as the default, `--lg` (72px) as a page-level credential.
- Reuse `.partner-badge-row` for pairs; it wraps on narrow viewports.
- Point links at the monday.com partner directory with `target="_blank" rel="noopener"`.

## Don't

- Don't recolour, outline or shadow the artwork itself.
- Don't set a width, or the lockups will distort.
- Don't rebuild a badge in HTML/CSS to "match brand" — use the issued SVG.
- Don't put the Solutions or Channel badge in a prominent slot until the source clipping is fixed.
