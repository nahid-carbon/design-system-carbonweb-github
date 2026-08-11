/* CarbonWeb Announcement Banner — close button + sessionStorage */

(function () {
  'use strict';

  function initAnnouncementBanners(container) {
    var root = container || document;
    var buttons = root.querySelectorAll('.announcement-banner__close');

    buttons.forEach(function (btn) {
      var banner = btn.closest('.announcement-banner');
      if (!banner) return;

      var bannerId = banner.getAttribute('data-banner-id');

      // If previously dismissed in this session, hide immediately
      if (bannerId && sessionStorage.getItem('banner-dismissed-' + bannerId) === '1') {
        banner.classList.add('announcement-banner--dismissed');
      }

      btn.addEventListener('click', function () {
        banner.classList.add('announcement-banner--dismissed');

        if (bannerId) {
          sessionStorage.setItem('banner-dismissed-' + bannerId, '1');
        }
      });
    });
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initAnnouncementBanners(); });
  } else {
    initAnnouncementBanners();
  }

  // Expose for manual init
  window.initAnnouncementBanners = initAnnouncementBanners;
})();
