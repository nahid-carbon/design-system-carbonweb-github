---
component: avatar
variants: [xs, sm, md, lg, xl, 2xl, group]
states: [default, hover, online, offline, busy]
depends_on: [colors, typography]
version: 1.0.0
last_updated: 2026-07-21
---

## When to use

- **Testimonials:** Display customer or team member photos alongside quotes.
- **Team sections:** Show team members in grids or lists.
- **Comment threads:** Identify authors in discussion or feedback UIs.
- **User menus:** Show the logged-in user's avatar in navigation or profile areas.

## Sizes

| Modifier | Size | Typical use |
|----------|------|-------------|
| `--xs` | 24px | Inline mentions, compact lists |
| `--sm` | 32px | Comment threads, table rows |
| `--md` | 40px | Default size, nav bars, cards |
| `--lg` | 48px | Team grids, sidebar profiles |
| `--xl` | 64px | Testimonials, featured profiles |
| `--2xl` | 80px | Hero profiles, about pages |

## Initials fallback

- When no image is available, display 1-2 character initials inside the avatar circle.
- Use the first letter of the first and last name (e.g., "JD" for Jane Doe).
- Single-initial avatars are acceptable for compact sizes (xs, sm).

## Avatar groups

- Use `.avatar-group` to stack avatars with a -8px overlap.
- Keep groups to 3-5 avatars. For more, add a `.avatar-group__count` element showing the remaining count (e.g., "+3").
- Avatars in groups automatically get a white border for visual separation.

## Status indicators

- Use `.avatar__status` with a status modifier (`--online`, `--offline`, `--busy`) to show presence.
- Status indicators only make sense on `--md` size and above -- they are too small to read on xs/sm.
- The avatar must have `position: relative` (already set in the base class) for status positioning.

## Color variants

| Variant | Typical use |
|---------|-------------|
| (default/teal) | Primary, general purpose |
| `--green` | Success context, verified users |
| `--yellow` | LATAM brand context, pending |
| `--pink` | LATAM brand context, alerts |
| `--ink` | High contrast, admin users |

## Do

- Always provide `alt` text on avatar images for accessibility.
- Use `aria-label` on initials-only avatars to convey the full name to screen readers.
- Use the `--bordered` modifier when placing avatars on colored backgrounds for visual separation.
- Match avatar color variant to the surrounding brand context (Global vs LATAM).

## Don't

- Don't hardcode hex colors -- always use `var(--color-*)` tokens.
- Don't use status indicators on xs or sm avatars -- they are unreadable at those sizes.
- Don't exceed 5 avatars in a group without a count indicator.
- Don't stretch or distort avatar images -- `object-fit: cover` handles this automatically.
- Don't use avatars as interactive buttons without wrapping them in a proper button or link element.

## Markup reference

```html
<!-- With image -->
<div class="avatar avatar--lg">
  <img src="photo.jpg" alt="Jane Doe" />
</div>

<!-- With initials -->
<div class="avatar avatar--md avatar--green" aria-label="Jane Doe">JD</div>

<!-- With status -->
<div class="avatar avatar--lg">
  <img src="photo.jpg" alt="Jane Doe" />
  <span class="avatar__status avatar__status--online"></span>
</div>

<!-- Group -->
<div class="avatar-group">
  <div class="avatar avatar--md"><img src="a.jpg" alt="User A" /></div>
  <div class="avatar avatar--md"><img src="b.jpg" alt="User B" /></div>
  <div class="avatar avatar--md"><img src="c.jpg" alt="User C" /></div>
  <div class="avatar-group__count avatar--md">+3</div>
</div>
```
