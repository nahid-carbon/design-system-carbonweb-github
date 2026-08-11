---
component: faq-section
variants: [light, dark, wedge-top, wedge-bottom, wedge-both]
states: [default]
depends_on: [colors, typography, radii, spacing, accordion]
version: 1.0.0
last_updated: 2026-08-06
---

## When to use

- **Page-level FAQ:** The standard bottom-of-page FAQ block on marketing and service pages.
- **Section transition:** The wedge modifiers double as the page's light↔dark transition, so no separate `section-divider` is needed on the edges the wedge covers.

## Structure

```
.faq-section [--dark] [--wedge-top|--wedge-bottom|--wedge-both]
  .faq-section__ambience     — decorative blur washes (dark only, aria-hidden)
  .faq-section__inner
    .faq-section__header
      .faq-section__title
      .faq-section__subtitle
    .accordion.accordion--faq [.accordion--dark]   ← from components/accordion/
```

## Figma node map

| Figma | Node | Implementation |
|-------|------|----------------|
| Accordion/FAQ Section Light | `99:20113` | `.faq-section.faq-section--wedge-bottom` |
| Accordion/FAQ Section Dark | `99:20114` | `.faq-section--dark.faq-section--wedge-both` + `__ambience` |
| FAQ card | `842:13274` | `.accordion--faq` (see accordion rules) |

## Specification notes

- Source frame is 1440 wide: 143px side inset, 210px top padding, 800px header column, 1111px card column, 20px gap between cards, 90px wedges.
- Dark surface is **System Black `#000000`**, not `--color-ink` — the white-10% cards are calibrated against pure black. This is the one documented exception to the ink rule; it is written as a literal with a comment in the CSS.
- Wedges are a `clip-path` on the section itself, so the page background behind shows through as the diagonal. Top wedge cuts the top-right corner, bottom wedge the bottom-left — the same notch motif as `section-divider`, at page scale.
- Ambience is two 490px radial washes (green left, teal right) at 160px blur, matching the Figma `blur` frame. It is purely decorative and hidden under `prefers-reduced-motion`.
- Cards come from the accordion component — this section owns layout and surface only.

## Do

- Put the FAQ accordion in `data-single="true"` mode; one answer at a time is the intended behaviour.
- Pair `--dark` with `--wedge-both` and the ambience div to match Figma's dark section exactly.
- Keep the header to a title plus one sentence; the column is capped at 800px.
- Give the ambience div `aria-hidden="true"`.

## Don't

- Don't stack a `section-divider` against a wedge edge — you'll get two notches.
- Don't put the ambience div on the light variant; Figma's light section has no blur layer.
- Don't hardcode colors other than the documented `#000000` dark surface.

## Markup reference

```html
<section class="faq-section faq-section--dark faq-section--wedge-both">
  <div class="faq-section__ambience" aria-hidden="true"></div>
  <div class="faq-section__inner">
    <div class="faq-section__header">
      <h2 class="faq-section__title">Frequently Asked Questions</h2>
      <p class="faq-section__subtitle">Get the answers you need…</p>
    </div>
    <div class="accordion accordion--faq accordion--dark" data-single="true"
         role="region" aria-label="Frequently asked questions">
      <!-- .accordion__item per question -->
    </div>
  </div>
</section>
<script src="../accordion/accordion.js"></script>
```
