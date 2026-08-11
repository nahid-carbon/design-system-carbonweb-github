/* CarbonWeb Video Embed — click-to-load iframe.
   Auto-initializes all [data-video-embed] blocks.
   The poster button carries data-src with the iframe URL. */
(function () {
  'use strict';

  function init(block) {
    var poster = block.querySelector('.video-embed__poster');
    var frame = block.querySelector('.video-embed__frame');
    if (!poster || !frame) return;

    poster.addEventListener('click', function () {
      var src = poster.getAttribute('data-src');
      if (!src) return;

      var iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = poster.getAttribute('aria-label') || 'Video player';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.setAttribute('allowfullscreen', '');

      frame.replaceChild(iframe, poster);
      iframe.focus();
    });
  }

  document.querySelectorAll('[data-video-embed]').forEach(init);
})();
