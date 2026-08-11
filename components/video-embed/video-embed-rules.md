---
component: video-embed
variants: [default]
states: [default, hover, focus-visible, playing]
depends_on: [colors, typography, radii, spacing]
version: 1.0.0
last_updated: 2026-08-04
---

## When to use

- Product walkthroughs, explainer videos, or webinar recordings on landing pages.
- The iframe loads only on click (facade pattern) — no third-party scripts until the user opts in, keeping pages fast.

## Do / Don't

- Do set `data-src` on the poster button to the embed URL (add `autoplay=1` so playback starts on click).
- Do give the poster button an `aria-label` naming the video.
- Do keep the caption to one short line (13px slate).
- Don't place a raw iframe in markup — always use the poster + `data-src`.
- Don't hardcode colors — poster gradient uses `var(--color-teal-500)` → `var(--color-green-500)`.

## Structure

```
.video-embed[data-video-embed]
  .video-embed__heading
  .video-embed__desc
  .video-embed__frame            (16:9, rounded-lg, overflow hidden)
    button.video-embed__poster[data-src][aria-label]
      .video-embed__play
        .video-embed__play-triangle
  .video-embed__caption
```

## States & behavior

- **Hover/focus (play button):** scales 1.1, background goes white-70% → teal-500, triangle goes ink → white. 200ms.
- **Click:** `video-embed.js` builds an iframe from `data-src`, swaps it in place of the poster, and moves focus to it.
- Poster is a plain brand-gradient placeholder — no image downloads required.

## Accessibility

- The poster is a real `<button>` with `aria-label` — keyboard operable, visible teal focus ring.
- The injected iframe receives a `title` (from the button's `aria-label`) and `allowfullscreen`.

## Markup reference

```html
<div class="video-embed" data-video-embed>
  <h2 class="video-embed__heading">See CarbonWeb in action</h2>
  <p class="video-embed__desc">Short description of the video.</p>
  <div class="video-embed__frame">
    <button class="video-embed__poster" data-src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" aria-label="Play video: See CarbonWeb in action">
      <span class="video-embed__play"><span class="video-embed__play-triangle"></span></span>
    </button>
  </div>
  <p class="video-embed__caption">2 min overview</p>
</div>
<script src="video-embed.js"></script>
```

## JavaScript

Include `video-embed.js` after the markup. Auto-initializes all `[data-video-embed]` blocks. No configuration needed.
