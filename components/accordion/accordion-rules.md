---
component: accordion
variants: [default, bordered, faq, faq-dark, service, eyebrow]
states: [collapsed, expanded]
depends_on: [colors, typography, radii, spacing, button]
version: 1.1.0
last_updated: 2026-08-06
---

## When to use

- **Default:** Progressive disclosure of content under section dividers. Ideal for service descriptions, feature lists, or step-by-step breakdowns.
- **Bordered:** Each item visually contained with a border. Use when items need stronger visual separation (e.g., service tiers, settings panels).
- **FAQ:** Frequently asked questions as 20px-radius cards. Use on landing pages and support sections; wrap in `faq-section` for the full page block.
- **Service:** Priced service packages where each open row needs a price and a CTA.


## Figma node map

| Figma | Node | Implementation |
|-------|------|----------------|
| Accordion/Item | `882:9057` | `.accordion--service` (Collapsed / Expanded) |
| Accordion/FAQ | `842:13274` | `.accordion--faq` × `.accordion--dark` (all 4 symbols) |
| Container (priced services) | `918:47005` | `.accordion__eyebrow` + `.accordion--service` |
| Accordion/FAQ Section | `99:20113` / `99:20114` | `components/faq-section/` |

## Variant specs

**`--faq`** — 20px-radius card, 32px padding, 20px gap between cards, chevron in a
40px puck (`white 20%`, as Figma has it in both themes). Question is Heading 5 (SB)
20/1.3; answer is Body Large 20/1.7, 16px below the header.

**`--dark`** — Theme=Dark for any accordion. On `--faq` the card fill becomes
`white 10%`, calibrated for the black FAQ section surface.

**`--service`** — Collapsed rows are flat white, 20/18 padding, with a Gray 200
hairline; title is Heading 5 Bold 20/1.3 and the subtitle Body Normal 16/1.7 in
Gray 700. The open row gains a 1.5px teal-500 border, 12px radius and a teal wash
(Figma `#F3FCFD`, written as a teal-100 `color-mix` over white), its title turns
teal-500, and the panel lays out a Body Medium description beside a CTA rail:

```
.accordion__content
  .accordion__desc            — 18/1.7 body copy
  .accordion__cta
    .accordion__price         — Montserrat Bold 35px, teal-500
      .accordion__price-note  — Body Small, Gray 700
    .btn                      — pill CTA
```

**`.accordion__eyebrow`** — the small teal pill that labels a service group
(Container `918:47005`). Sits above the accordion, not inside it.

**Icons** — the base accordion keeps its rotating plus. Figma uses a chevron, so
FAQ and service markup use `.accordion__icon--chevron`, which rotates 180° on open.

## Do / Don't

- Do use `button` elements for triggers to ensure keyboard accessibility.
- Do set `aria-expanded` and `aria-controls` on every trigger.
- Do give each panel a unique `id` and a corresponding `aria-labelledby`.
- Do use `data-single="true"` on the container when only one item should be open at a time (typical for FAQ).
- Don't hardcode hex colors -- use `var(--color-*)` tokens.
- Don't nest accordions inside accordions.
- Don't use the plus icon on `--faq` or `--service`; Figma specifies a chevron for both.
- Don't put `.accordion__eyebrow` inside `.accordion` — it labels the group from outside.
- Don't use accordions to hide critical information that users must see.

## States & behavior

- **Collapsed (default):** Panel has `max-height: 0` with `overflow: hidden`. Trigger icon (plus) is upright.
- **Expanded:** Item gains `.accordion__item--open`. Panel `max-height` is set to `scrollHeight` via JS. Icon rotates 45 degrees to form an X shape.
- **Hover:** Trigger text color transitions to `var(--color-teal-500)`.
- **Focus-visible:** 2px teal outline with 2px offset on the trigger button.
- **Single-open mode:** Opening one item automatically closes any other open item in the same accordion.

## Accessibility

- Triggers are `<button>` elements (natively keyboard-focusable and activatable with Enter/Space).
- Each trigger has `aria-expanded="false"` (toggled to `"true"` on open) and `aria-controls` pointing to the panel `id`.
- Each panel has `role="region"` and `aria-labelledby` pointing back to its trigger `id`.
- The plus icon uses `aria-hidden="true"` since it is decorative.
- The accordion container uses `role="region"` with an `aria-label` describing its purpose.

## Markup structure

```html
<div class="accordion [accordion--bordered|accordion--faq]" [data-single="true"]
     role="region" aria-label="...">
  <div class="accordion__item">
    <button class="accordion__trigger"
            aria-expanded="false"
            aria-controls="panel-id"
            id="trigger-id">
      <span>Question or title</span>
      <svg class="accordion__icon" ...><!-- plus icon --></svg>
    </button>
    <div class="accordion__panel" id="panel-id"
         role="region" aria-labelledby="trigger-id">
      <div class="accordion__content">
        Answer or body text.
      </div>
    </div>
  </div>
</div>
```

## CSS classes

| Class | Purpose |
|-------|---------|
| `.accordion` | Base container, top border |
| `.accordion--bordered` | Bordered variant with rounded items |
| `.accordion--faq` | FAQ variant with tinted open-item background |
| `.accordion__item` | Single collapsible item, bottom border |
| `.accordion__item--open` | Applied by JS when expanded |
| `.accordion__trigger` | Full-width button, flex layout |
| `.accordion__icon` | 24px plus icon, rotates on open |
| `.accordion__panel` | Animated container, max-height transition |
| `.accordion__content` | Inner padding and text styling |

## JavaScript API

The script auto-initializes all `.accordion` elements on `DOMContentLoaded`. No manual setup required.

| Attribute | On | Effect |
|-----------|----|--------|
| `data-single="true"` | `.accordion` | Only one item open at a time |
