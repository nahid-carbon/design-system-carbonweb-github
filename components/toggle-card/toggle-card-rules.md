---
component: toggle-card
variants: [default]
modifiers: [single-open]
states: [default, open]
depends_on: [colors, typography]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **FAQ sections:** Present questions and answers in a compact, scannable format.
- **Service descriptions:** Let users expand service details without overwhelming the page.
- **Settings panels:** Group related options behind expandable headers.

## Behavior

- Clicking the header toggles the body open/closed with a smooth `max-height` transition.
- The chevron rotates 180 degrees when open.
- **Single-open mode:** Add `data-single` to the parent container. Opening one card automatically closes any other open card in the same group.
- **Multi-open mode:** Omit `data-single`. Each card toggles independently.

## Accessibility

- Use a `<button>` for the header element to ensure keyboard accessibility.
- Set `aria-expanded="false"` on the header button. The JS toggles this attribute.

## Do

- Keep titles concise (2-5 words).
- Use subtitles to provide additional context when the title alone is not descriptive enough.
- Group related toggle cards together in a container.
- Use single-open mode when content is mutually exclusive or when you want to reduce cognitive load.

## Don't

- Don't hardcode hex colors -- always use `var(--color-*)` tokens.
- Don't nest toggle cards inside other toggle cards.
- Don't use toggle cards for critical information that users must see without interaction.
- Don't place more than 8 toggle cards in a single group.

## Markup reference

```html
<!-- Single-open group -->
<div data-single>
  <div class="toggle-card">
    <button class="toggle-card__header" aria-expanded="false">
      <div class="toggle-card__header-text">
        <div class="toggle-card__title">Title</div>
        <div class="toggle-card__subtitle">Subtitle</div>
      </div>
      <svg class="toggle-card__chevron" viewBox="0 0 20 20" fill="none">
        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="toggle-card__body">
      <div class="toggle-card__content">Body content here.</div>
    </div>
  </div>
</div>
```

## JavaScript

Include `toggle-card.js` after the markup. It auto-initializes on `DOMContentLoaded`. For dynamically inserted cards, call `window.initToggleCards(containerElement)`.
