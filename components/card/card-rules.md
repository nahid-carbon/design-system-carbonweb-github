---
component: card
variants: [default, elevated, icon, borderless, square-graphic, rectangle-graphic, illustration, carousel, blog, blog-tint, blog-wide, note, service-price, price-horizontal, selector, directory]
states: [default, hover, focus-visible, selected, disabled]
depends_on: [tokens/colors.css, tokens/spacing.css, tokens/radii.css, tokens/shadows.css, tokens/typography.css, components/button/button.css, components/chip/chip.css, components/text-link/text-link.css]
version: 2.0.0
last_updated: 2026-08-04
status: built
figma_source: "tA0Y5j2fkTBqjG427Tltn8 — page 3. Content / Cards"
---

## When to use

- **Default:** Content container with subtle border. Grouping related information.
- **Elevated:** Shadow-lifted card for featured content.
- **Icon (`--icon`):** Feature card — 70px teal-100 icon box, title, description. Figma 92:574; grid = `.card-grid--icon` (3 col, 170:49867).
- **Borderless (`--borderless`):** Transparent, centered icon + label. Figma 92:888; grid = `.card-grid--borderless` (4 col, 170:49866).
- **Square Graphic (`--square-graphic`):** `#F5F7FB` card, text top, product graphic below. Figma 170:47705; use in `.card-grid--2col` (170:48779).
- **Rectangle Graphic (`--rectangle-graphic`):** Global-gradient card, white text, white pill button, illustration flush to bottom edge. Figma 170:48849; grid = `.card-grid--rectangle` (3 col, 170:49128).
- **Illustration (`--illustration`):** `#F5F7FB` card with workflow illustration. Illustration is greyscaled by default and shows color on hover (Figma State=Hover). Figma 593:5488; section 593:9366.
- **Carousel (`--carousel`):** Demo card — media top, meta chip (`.card__meta-chip`), title, description, right-aligned text-link. Figma 170:49604; wrapper = `.card-grid--carousel` + `.card-carousel__nav` (dots + arrows, 170:49865).
- **Blog (`--blog`):** Article card — media, chip tags (reuse `.chip`), title, excerpt, secondary "Read more" button. Figma 735:4976 / 735:4763 / 735:4874 / 735:4917. Add `--tint` + `--card-tint-bg: var(--color-*)` for colored versions (use `.chip` solid + `btn--white` inside tinted cards).
- **Blog Wide (`--blog-wide`):** Full-width horizontal feature article, dark ink→teal-950 gradient text side + media side. Figma 738:5501.
- **Note (`--note`):** Full-width callout bar, latam-teal-200 background, centered copy. Figma 796:33721.
- **Service With Price (`--service-price`):** Teal header band, white checklist body, teal footer band with price + white button. Figma 795:33585; grid = `.card-grid--service-price` (918:45088).
- **Price Horizontal (`--price-horizontal`):** Two-panel row — white content with inline checklist + teal price panel. Figma 800:49379 (918:45560).
- **Selector (`--selector`):** Clickable option card (`<button>`) with eyebrow, title, description, and top-right checkbox. States: hover (teal border), `--selected`, `--disabled`. Figma 854:45656.
- **Directory (`--directory`):** App-directory card — board screenshot, title, description, footer with `.card__product-tag` + "Learn more" text-link. Hover: lift + `-2px -2px 22px rgba(46,47,50,0.18)` shadow, learn-more turns teal underlined. Figma 94:4868 / 94:5163.

## Do / Don't

- Do compose cards with existing atoms — `.btn`, `.chip`, `.text-link` — and link their CSS files.
- Do use `.card--hoverable` on any card that is a link (lift 2px + shadow-md, 200ms; media image scales 1.03 inside overflow hidden).
- Do render all numeric/price values in Montserrat (`--font-family-numeric`): `.card__price`, `.card__price-value`.
- Do display `assets/*@2x.png` graphics at half their pixel size.
- Don't hardcode colors — use token variables (`--card-tint-bg` must reference a token).
- Don't leave broken `<img>` tags — if a graphic is missing use `.card__media--placeholder` (token gradient).
- Don't rebuild grids ad hoc — use the `.card-grid--*` wrappers.

## States & behavior

- Hover (interactive cards): `translateY(-2px)` + `--shadow-md`, 200ms ease; media `img` scales to 1.03.
- Illustration cards: greyscale filter removed on hover.
- Selector: hover = teal border + lift; `.card--selected` fills the checkbox teal; `.card--disabled` greys all text and blocks pointer events.
- Focus: interactive cards, carousel dots and arrows get a 2px teal `:focus-visible` outline.
- Carousel nav: active dot teal (`aria-current="true"`), disabled arrow grey.

## Accessibility

- Use semantic heading levels inside cards (`h3`, `h4`).
- Clickable cards are `<a>` (navigation) or `<button>` (selector) — never a `div` with a click handler.
- Selector cards expose state via `aria-pressed`; checkbox visual is `aria-hidden`.
- Placeholder media blocks carry `role="img"` + `aria-label`.
- Carousel arrows need `aria-label`; dots label their slide.

## Assets

`components/card/assets/` (exported from Figma @2x, display at 50%):

| File | Source node | Used by |
|------|-------------|---------|
| `directory-board@2x.png` | 94:4870 | `--directory` |
| `app-collage@2x.png` | 170:45495 | `--square-graphic` |
| `robot-unbox@2x.png` | 170:48790 | `--rectangle-graphic` |
| `google-ads-demo@2x.png` | 170:49475 | `--carousel` |
| `workflow-illustration@2x.png` | 593:2965 | `--illustration` |

## Markup reference

See `card.html` for full snippets of every variant.

```html
<a class="card card--blog card--hoverable" href="#">
  <div class="card__media card__media--placeholder" role="img" aria-label="Article graphic"></div>
  <div class="card__body">
    <div class="card__chips"><span class="chip chip--outline">Integrations</span></div>
    <h3 class="card__title">Title</h3>
    <p class="card__description">Excerpt.</p>
  </div>
  <div class="card__actions"><span class="btn btn--secondary btn--teal btn--sm">Read more</span></div>
</a>
```
