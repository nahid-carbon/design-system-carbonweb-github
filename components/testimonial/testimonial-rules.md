---
component: testimonial
variants: [default, elevated, with-stat, slider]
states: [default, hover]
depends_on: [colors, typography, radii, shadows]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **Default:** Customer quote card with author attribution. Use for single testimonials on landing pages or case study sections.
- **Elevated:** Shadow-lifted version for featured testimonials or hero placements.
- **With stat:** Pairs a large highlight number (e.g. "100%", "+125%") with the quote. Use when a quantitative result reinforces the testimonial.
- **Slider:** Carousel of multiple testimonials. Use when space is limited but several quotes need to be shown. Auto-advances every 5 seconds.

## Do / Don't

- Do use real customer names and roles for credibility.
- Do keep quotes concise (1-3 sentences).
- Do pair stats with a short label explaining the metric.
- Don't hardcode colors -- use `var(--color-*)` tokens.
- Don't nest interactive elements (buttons, links) inside the quote text.
- Don't use more than one slider per page section.

## Structure

```
.testimonial
  .testimonial__stat          (optional)
  .testimonial__stat-label    (optional, pairs with stat)
  .testimonial__quote
  .testimonial__author
    .testimonial__avatar
      img
    div
      .testimonial__name
      .testimonial__role
```

## States & behavior

- **Default:** Subtle border (`rgba(0,0,0,0.06)`), no shadow.
- **Elevated:** Shadow via `--shadow-lg`, no border.
- **Slider:** Auto-advances every 5 seconds. Pauses on hover. Dot click navigates to slide. Touch swipe navigates forward/back.

## Accessibility

- Use `<p>` for quote text, not `<blockquote>` without a `<cite>`.
- Avatar images should have meaningful `alt` text (the person's name).
- Slider dots use `<button>` elements with `aria-label` describing which testimonial they show.
- Slider pauses on hover and on touch interaction so users can read at their own pace.

## Markup reference

### Single card

```html
<div class="testimonial">
  <p class="testimonial__quote">"Quote text here."</p>
  <div class="testimonial__author">
    <div class="testimonial__avatar">
      <img src="photo.jpg" alt="Name" />
    </div>
    <div>
      <p class="testimonial__name">Name</p>
      <p class="testimonial__role">Role, Company</p>
    </div>
  </div>
</div>
```

### Card with stat

```html
<div class="testimonial testimonial--elevated">
  <p class="testimonial__stat">100%</p>
  <p class="testimonial__stat-label">Metric description</p>
  <p class="testimonial__quote">"Quote text here."</p>
  <div class="testimonial__author">
    <div class="testimonial__avatar">
      <img src="photo.jpg" alt="Name" />
    </div>
    <div>
      <p class="testimonial__name">Name</p>
      <p class="testimonial__role">Role, Company</p>
    </div>
  </div>
</div>
```

### Slider

```html
<div class="testimonial-slider" data-testimonial-slider>
  <div class="testimonial-slider__track">
    <div class="testimonial"><!-- slide 1 --></div>
    <div class="testimonial"><!-- slide 2 --></div>
    <div class="testimonial"><!-- slide 3 --></div>
  </div>
  <div class="testimonial-slider__dots">
    <button class="testimonial-slider__dot testimonial-slider__dot--active" aria-label="Show testimonial 1"></button>
    <button class="testimonial-slider__dot" aria-label="Show testimonial 2"></button>
    <button class="testimonial-slider__dot" aria-label="Show testimonial 3"></button>
  </div>
</div>
<script src="testimonial.js"></script>
```

## JavaScript

Include `testimonial.js` after the markup. The script auto-initializes all elements with `[data-testimonial-slider]`. No configuration needed.
