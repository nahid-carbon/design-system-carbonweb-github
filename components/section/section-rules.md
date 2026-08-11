---
component: section
variants: [hero, feature-grid, cta-band]
states: [default]
depends_on: [tokens/colors.css, tokens/spacing.css, tokens/typography.css, components/button/button.css, components/card/card.css]
version: 1.0.0
last_updated: 2026-07-21
status: template
---

## When to use

- **Hero:** Top-of-page introduction. Large heading (Display 1), description, CTA buttons.
- **Feature Grid:** 3-column card grid for service/feature overviews.
- **CTA Band:** Full-width call-to-action with gradient background. White text + white button.

## Do / Don't

- Do compose sections with existing components (Button, Card, typography).
- Do use the global gradient (`--gradient-global`) for CTA bands.
- Don't create one-off section styles — extend this component with new variants.
- Don't hardcode widths — use `--space-footer-max` (1288px) for content max-width.

## Structure

- `section` — full-width wrapper, sets background.
- `section__container` — max-width centered content area.
- `section__content` — flex column for text + actions.
- `section__header` — heading + subheading group.
- `section__grid` — CSS grid for card layouts.
- `section__actions` — button row.

## Accessibility

- Use semantic `<section>` elements.
- Hero should contain the page's `<h1>`.
- CTA band text must meet contrast requirements on gradient backgrounds.

## Markup reference

```html
<!-- Hero -->
<section class="section section--hero">
  <div class="section__container">
    <div class="section__content">
      <h1 class="display-1">Headline</h1>
      <p class="lead-paragraph">Subheading.</p>
      <div class="section__actions">
        <button class="btn btn--primary btn--teal btn--lg">CTA</button>
      </div>
    </div>
  </div>
</section>

<!-- CTA Band -->
<section class="section section--cta-band">
  <div class="section__container">
    <div class="section__content">
      <h2 class="heading-2">Ready?</h2>
      <button class="btn btn--primary btn--white btn--lg">Start</button>
    </div>
  </div>
</section>
```
