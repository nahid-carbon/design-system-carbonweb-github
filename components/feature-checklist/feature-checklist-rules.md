---
component: feature-checklist
variants: [light, dark]
states: [default, visible]
depends_on: [colors, typography, radii, spacing]
version: 1.0.0
last_updated: 2026-08-04
---

## When to use

- **Light:** Two-column checkmark list on white sections — feature inclusions, plan contents.
- **Dark:** Ink-background section (e.g. "Unlock the CarbonWorkflow Portal") with centered heading + description above the list. Rounded 2xl corners, generous padding.

## Do / Don't

- Do keep items short — a single line at 15px each.
- Do use an even number of items so the two columns balance.
- Do include the optional `__header` only on the dark section variant (or when the list is a standalone section).
- Don't hardcode colors — icon uses `var(--color-teal-500)` (teal-300 on dark).
- Don't nest links inside items.

## Structure

```
.feature-checklist[data-feature-checklist]   (modifiers: --light / --dark)
  .feature-checklist__header                 (optional)
    .feature-checklist__heading
    .feature-checklist__desc
  ul.feature-checklist__grid
    li.feature-checklist__item               (×n)
      svg.feature-checklist__icon
      span
```

## States & behavior

- Items stagger-fade-in (80ms apart, 400ms each, 8px rise) when the list scrolls into view (IntersectionObserver, 25% threshold).
- With `prefers-reduced-motion: reduce`, items render fully visible with no animation (CSS and JS both guard).
- Without JS, CSS keeps items hidden only when `data-feature-checklist` is present — omit the attribute for a static list.

## Accessibility

- Use `<ul>`/`<li>` semantics for the grid.
- Icons are `aria-hidden="true"` — the text carries the meaning.
- Reduced-motion users see the list immediately.

## Markup reference

```html
<section class="feature-checklist feature-checklist--dark" data-feature-checklist>
  <div class="feature-checklist__header">
    <h2 class="feature-checklist__heading">Unlock the CarbonWorkflow Portal</h2>
    <p class="feature-checklist__desc">Everything your team needs in one place.</p>
  </div>
  <ul class="feature-checklist__grid">
    <li class="feature-checklist__item">
      <svg class="feature-checklist__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.5 2.5 4.5-5.5"/></svg>
      <span>Feature text</span>
    </li>
  </ul>
</section>
<script src="feature-checklist.js"></script>
```

## JavaScript

Include `feature-checklist.js` after the markup. Auto-initializes all `[data-feature-checklist]` containers. No configuration needed.
