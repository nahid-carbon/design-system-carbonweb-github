---
component: logo-marquee
variants: [default, reverse, pause-on-hover]
states: [scrolling, paused]
depends_on: [colors, typography]
version: 1.0.0
last_updated: 2026-07-21
---

# Logo Marquee

Continuously scrolling horizontal strip of logos. Used for trust signals, client logos, and partner logos.

## Usage

- **Trust signals** — show client or partner logos on landing pages and home pages to build credibility.
- **Client logos** — display recognized brands that use the product or service.
- **Partner logos** — highlight integrations, partnerships, or certifications.

## Variants

| Variant | Class | Behavior |
|---------|-------|----------|
| Default | `.logo-marquee` | Scrolls left continuously |
| Reverse | `.logo-marquee--reverse` | Scrolls right continuously |
| Pause on hover | `.logo-marquee--paused` | Pauses animation when the user hovers over the marquee |

Variants can be combined: `.logo-marquee .logo-marquee--reverse .logo-marquee--paused`.

## States

| State | Description |
|-------|-------------|
| Scrolling | Default — track moves continuously via `marquee-scroll` keyframe animation |
| Paused | Track animation stops (triggered by hover on `--paused` variant) |

## Rules

1. **Always duplicate items** — the track must contain two identical sets of logos so the `translateX(-50%)` animation loops seamlessly with no visible gap.
2. **Grayscale by default** — logos render in `grayscale(100%) opacity(0.5)` and transition to full color on hover. This keeps the strip visually quiet and prevents individual logos from dominating.
3. **Minimum 6 logos** — fewer than 6 creates visible gaps in the loop. If fewer are available, repeat the set to reach at least 6 unique-looking items before duplicating.
4. **Fade masks** — the left and right edges use 80px gradient masks (white to transparent) to soften the entry/exit. The mask color defaults to white (`#fff`) via `var(--color-surface)` and should match the section background.
5. **No hardcoded colors** — all color values must reference `var(--color-*)` tokens from the design system.
6. **Image sizing** — logo images should have `max-height: 32px` with auto width. Do not distort aspect ratios.
7. **Animation speed** — default duration is 30s. Adjust based on the number of items; more items may need a longer duration to maintain readable pacing.
8. **Accessibility** — the marquee is decorative. Users who prefer reduced motion should see a static row. Consider adding `@media (prefers-reduced-motion: reduce)` to pause the animation.

## Structure

```
.logo-marquee              — overflow-hidden container with fade masks
  .logo-marquee__track      — flex row, animated with marquee-scroll
    .logo-marquee__item     — individual logo wrapper (flex, centered, 40px tall)
      img                   — logo image (max-height 32px, grayscale filter)
      — or —
      .logo-marquee__placeholder — text-based fallback when no image is available
```

## Dependencies

- `colors.css` — neutral and interaction color tokens
- `typography.css` — font family and weight tokens (used by placeholder variant)
