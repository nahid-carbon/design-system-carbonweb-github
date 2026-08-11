---
component: announcement-banner
variants: [teal, yellow, ink, gradient]
states: [default, dismissed]
depends_on: [colors, typography]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **Promotions:** Announce sales, events, or limited-time offers at the top of a page.
- **Product updates:** Notify users of new features, releases, or important changes.
- **System status:** Communicate scheduled maintenance, outages, or service updates.
- **Partnership announcements:** Highlight certifications, awards, or partner milestones.

## Variant guidance

| Variant | Typical use |
|---------|-------------|
| `teal` (default) | General announcements, product updates, informational |
| `yellow` | Events, time-sensitive promotions, attention-grabbing |
| `ink` | High-contrast professional announcements, partnerships |
| `gradient` | Brand-heavy promotions, premium or celebratory messaging |

## Behavior

- The close button hides the banner and stores the dismissed state in `sessionStorage` using the `data-banner-id` attribute as the key.
- Dismissed banners remain hidden for the duration of the browser session.
- Always provide a unique `data-banner-id` so dismiss state is tracked per banner.

## Accessibility

- The close button must include `aria-label="Dismiss banner"`.
- Links inside the banner use `inherit` color with underline for visibility.

## Placement

- Always place announcement banners at the very top of the page, above the navigation.
- Only show one banner at a time in production. The preview shows all variants for reference.

## Do

- Keep banner text to a single line (under 80 characters including the link).
- Include a call-to-action link when the announcement leads to more information.
- Use `data-banner-id` to enable per-banner dismiss tracking.
- Use the yellow variant for LATAM-branded announcements.

## Don't

- Don't hardcode hex colors -- always use `var(--color-*)` tokens.
- Don't show more than one announcement banner simultaneously in production.
- Don't use banners for critical errors -- use inline alerts instead.
- Don't make the entire banner clickable. Use the explicit link element.

## Markup reference

```html
<div class="announcement-banner" data-banner-id="unique-id">
  <span class="announcement-banner__text">
    Announcement text.
    <a href="#" class="announcement-banner__link">Call to action</a>
  </span>
  <button class="announcement-banner__close" aria-label="Dismiss banner">
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
      <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </button>
</div>
```

## JavaScript

Include `announcement-banner.js` after the markup. It auto-initializes on `DOMContentLoaded`. For dynamically inserted banners, call `window.initAnnouncementBanners(containerElement)`.
