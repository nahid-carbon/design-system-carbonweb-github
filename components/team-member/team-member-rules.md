---
component: team-member
variants: [left, right]
states: [default, hover]
depends_on: [colors, typography, radii, shadows, spacing]
version: 1.0.0
last_updated: 2026-08-04
---

## When to use

- Team/about pages showing individual people with name, role, and a personality note.
- **Left:** avatar on the left (default reading order).
- **Right:** avatar on the right, text right-aligned — alternate rows for visual rhythm.

## Do / Don't

- Do wrap cards in `.team-grid` for a responsive auto-fill grid.
- Do keep fun facts to one short sentence.
- Do use a real photo `<img>` inside the avatar when available; the gradient + initials is the placeholder.
- Don't hardcode colors — the avatar gradient uses `var(--color-teal-500)` → `var(--color-green-500)`.
- Don't mix left and right variants in the same grid row arbitrarily — alternate deliberately.

## Structure

```
.team-grid
  .team-member            (modifiers: --left / --right)
    .team-member__avatar
      .team-member__initials   (or img)
    .team-member__info
      .team-member__name
      .team-member__title
      .team-member__fact
```

## States & behavior

- **Hover:** card lifts 2px with `--shadow-lg`; avatar scales to 1.05. Both 200ms.

## Accessibility

- Photo `<img>` must have `alt` set to the person's name.
- Initials placeholder is decorative text; the name below carries the information.

## Markup reference

```html
<div class="team-grid">
  <div class="team-member team-member--left">
    <div class="team-member__avatar"><span class="team-member__initials">JK</span></div>
    <div class="team-member__info">
      <p class="team-member__name">Jesse Klein</p>
      <p class="team-member__title">Head of Delivery</p>
      <p class="team-member__fact">Once automated his own coffee order.</p>
    </div>
  </div>
</div>
```
