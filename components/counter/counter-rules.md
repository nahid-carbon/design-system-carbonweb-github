---
component: counter
variants: [default, teal, green]
states: [idle, animating, complete]
depends_on: [colors, typography]
version: 1.0.0
last_updated: 2026-07-21
---

# Counter / Stat

Animated count-up number with an optional prefix, suffix, and descriptive title. Used for key metrics and statistics sections.

## Usage

### Basic counter

```html
<div class="counter">
  <div class="counter__value">
    <span class="counter__number" data-to="250">0</span>
  </div>
  <p class="counter__title">Projects Completed</p>
</div>
```

### With prefix and suffix

```html
<div class="counter">
  <div class="counter__value">
    <span class="counter__prefix">$</span>
    <span class="counter__number" data-to="5">0</span>
    <span class="counter__suffix">M+</span>
  </div>
  <p class="counter__title">Revenue Generated</p>
</div>
```

### Color variant

Add `.counter--teal` or `.counter--green` to the root `.counter` element. The modifier applies color to the number, prefix, and suffix.

```html
<div class="counter counter--teal">
  <div class="counter__value">
    <span class="counter__number" data-to="98">0</span>
    <span class="counter__suffix">%</span>
  </div>
  <p class="counter__title">Client Satisfaction</p>
</div>
```

### Counter group

Wrap multiple `.counter` elements in `.counter-group` for a horizontal row layout. Add `.counter-group--dividers` for vertical separator lines between items.

```html
<div class="counter-group counter-group--dividers">
  <div class="counter counter--teal">...</div>
  <div class="counter counter--teal">...</div>
  <div class="counter counter--teal">...</div>
</div>
```

## Variants

| Modifier | Number color |
|----------|-------------|
| (none) | `var(--color-ink)` |
| `.counter--teal` | `var(--color-teal-500)` |
| `.counter--green` | `var(--color-green-500)` |

## Animation behavior

- Animation is triggered by `IntersectionObserver` when the counter scrolls into view (30% threshold).
- Each counter animates only once.
- Default duration: 2000ms. Override with `data-duration` attribute (value in milliseconds).
- Easing: ease-out cubic for a natural deceleration feel.
- The counter animates from `0` to the integer value in `data-to`.
- If `IntersectionObserver` is not supported, counters animate immediately on page load.

### Data attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `data-to` | Yes | Target integer value |
| `data-duration` | No | Animation duration in ms (default: 2000) |

### States

| State | Description |
|-------|-------------|
| `idle` | Initial state. Number displays `0`. Waiting for scroll trigger. |
| `animating` | Counter is actively counting up. `data-animating="true"` is set. |
| `complete` | Final value reached. `data-complete="true"` is set. |

## Accessibility

- The `.counter` root element receives `aria-live="polite"` when animation starts, so screen readers announce the final value without interrupting the user.
- Use descriptive `.counter__title` text so the number has context.
- Prefix and suffix elements are inline with the number, so screen readers read them in natural order (e.g., "$5M+").
- The animation is non-essential decoration. The final value is always present in the DOM via `data-to`, and the text content updates to the final number on completion.

## Rules

- Never hardcode hex colors. Always use `var(--color-*)` tokens.
- The number font is always Display 1 weight (Black / 900) at 48px.
- The title font is always Body Normal Medium (500) at 16px.
- Prefix and suffix inherit the same size and weight as the number.
- Use integer values only for `data-to`. Decimal animation is not supported.
- In a `.counter-group`, keep counters to 3 or 4 items maximum for visual balance.
- Include `counter.js` at the end of the body or after the counter markup to initialize the scroll observer.
