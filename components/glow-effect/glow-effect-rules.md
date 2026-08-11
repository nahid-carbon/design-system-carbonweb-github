---
component: glow-effect
variants: [teal, green, yellow, pink, animated]
states: [static, animated]
depends_on: [colors]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **Hero sections:** Add depth and visual warmth behind headlines and CTAs.
- **Feature sections:** Subtle background glow to draw attention to key content areas.
- **Brand moments:** Use teal+green glows for Global brand contexts, yellow+pink for LATAM.

## Placement rules

- Always place glows inside a `.glow-container` element. The container sets `position: relative` and `overflow: hidden` to prevent glows from bleeding into adjacent sections.
- Keep opacity subtle -- the default 0.15 works for most cases. Only adjust if the section background demands it (stay within 0.1-0.2 range).
- Do not use more than 2-3 glows per section. More than that creates visual noise instead of depth.

## Size guidance

| Modifier | Size | Use for |
|----------|------|---------|
| (default) | Varies by color (300-400px) | Standard sections |
| `--sm` | 200px | Tight spaces, card backgrounds |
| `--lg` | 500px | Wide hero sections |
| `--xl` | 700px | Full-width immersive backgrounds |

## Animation

- Use `.glow--animated` sparingly -- animated glows draw attention. One animated glow per viewport is enough.
- The float animation translates 20px and scales 0.9-1.1 over 6 seconds. This is subtle and looping.
- Avoid animated glows in content-heavy sections where they distract from reading.

## Brand pairing

| Brand | Recommended glow combination |
|-------|------------------------------|
| Global | teal + green |
| LATAM | yellow + pink |
| Mixed | teal + yellow (use cautiously) |

## Do

- Use glows to add depth and warmth to flat sections.
- Pair complementary glow colors from the same brand palette.
- Position glows at edges or corners so they peek in from off-screen.
- Ensure content above glows has sufficient contrast (glows sit at z-index 0).

## Don't

- Don't place glows without a `.glow-container` -- they will overflow and break layout.
- Don't hardcode hex colors -- always use `var(--color-*)` tokens.
- Don't use more than 3 glows in a single section.
- Don't set opacity above 0.2 -- glows should be atmospheric, not dominant.
- Don't use animated glows in every section -- reserve animation for hero or key moments.

## Markup reference

```html
<section class="glow-container">
  <div class="glow glow--teal glow--top-left"></div>
  <div class="glow glow--green glow--bottom-right glow--animated"></div>
  <!-- Section content here (z-index above 0) -->
</section>
```
