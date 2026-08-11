---
component: text-link
variants: [default, teal, ink]
states: [default, hover, active, focus-visible]
depends_on: [colors, typography, radii]
version: 1.0.0
last_updated: 2026-08-04
---

## When to use

- **Secondary CTAs:** "Learn more", "Explore", "Read the case study" links under cards or sections.
- **Inline navigation:** Links inside body copy that should stay lightweight (no button chrome).

## Structure

- `.text-link` — the anchor. 16px medium Raleway, inline-flex with 6px gap.
- `.text-link__arrow` — optional trailing 16px arrow span; slides 4px right on hover via `transform`.

## Variant guidance

| Variant | Typical use |
|---------|-------------|
| default | Ink text → teal-500 on hover |
| `--teal` | Always teal; hover darkens to teal-600 and adds underline |
| `--ink` | Explicit ink → teal (alias of default for clarity in mixed contexts) |

## Interaction

- 200ms ease on color and arrow transform.
- Hover: teal-500 (or underline for `--teal`), arrow translates 4px right.
- Active: teal-700. Focus: 2px teal-500 outline with small radius.

## Do

- Keep link text short and action-oriented (2–4 words).
- Put the arrow inside `.text-link__arrow` so the slide animation works.
- Use `--teal` when the link sits in slate/muted body copy and needs to stand out.

## Don't

- Don't hardcode hex colors — use `var(--color-*)` tokens.
- Don't animate the whole link's position; only the arrow moves.
- Don't use text links for primary CTAs — use the Button component.

## Markup reference

```html
<a class="text-link" href="#">
  Learn more
  <span class="text-link__arrow">
    <svg viewBox="0 0 16 16" fill="none">
      <path d="M3.333 8h9.334M9.333 4.667L12.667 8l-3.334 3.333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
</a>

<a class="text-link text-link--teal" href="#">Explore services</a>
```
