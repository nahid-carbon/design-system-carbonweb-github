/**
 * CarbonWeb Testimonial Slider
 * Auto-advances every 5s, dot navigation, touch swipe support.
 * Init: add [data-testimonial-slider] to the .testimonial-slider container.
 */

(function () {
  'use strict';

  function initSlider(slider) {
    var track = slider.querySelector('.testimonial-slider__track');
    var dots = slider.querySelectorAll('.testimonial-slider__dot');
    var slides = track.querySelectorAll('.testimonial');
    var count = slides.length;
    var current = 0;
    var autoInterval = null;
    var touchStartX = 0;
    var touchEndX = 0;
    var SWIPE_THRESHOLD = 50;

    function goTo(index) {
      if (index < 0) index = count - 1;
      if (index >= count) index = 0;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('testimonial-slider__dot--active', i === current);
      });
    }

    function startAuto() {
      stopAuto();
      autoInterval = setInterval(function () {
        goTo(current + 1);
      }, 5000);
    }

    function stopAuto() {
      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
      }
    }

    /* Dot click navigation */
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        startAuto();
      });
    });

    /* Touch swipe support */
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
      stopAuto();
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0) {
          goTo(current + 1);
        } else {
          goTo(current - 1);
        }
      }
      startAuto();
    }, { passive: true });

    /* Pause on hover */
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    /* Initialize */
    goTo(0);
    startAuto();
  }

  function init() {
    var sliders = document.querySelectorAll('[data-testimonial-slider]');
    sliders.forEach(initSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
