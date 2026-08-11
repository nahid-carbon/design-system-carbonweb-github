/* CarbonWeb Booking Calendar
   Renders current month grid, marks demo-available weekdays,
   day click reveals time slots. */

(function () {
  document.querySelectorAll('.booking-calendar').forEach(function (cal) {
    var grid = cal.querySelector('.booking-calendar__grid');
    var monthLabel = cal.querySelector('.booking-calendar__month-label');
    var slots = cal.querySelector('.booking-calendar__slots');
    if (!grid || !monthLabel) return;

    var view = new Date();
    view.setDate(1);

    function render() {
      grid.querySelectorAll('.booking-calendar__day').forEach(function (d) { d.remove(); });
      monthLabel.textContent = view.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

      var firstDow = view.getDay();
      var daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      var today = new Date();

      for (var i = 0; i < firstDow; i++) {
        var pad = document.createElement('span');
        pad.className = 'booking-calendar__day';
        grid.appendChild(pad);
      }
      for (var d = 1; d <= daysInMonth; d++) {
        var date = new Date(view.getFullYear(), view.getMonth(), d);
        var el = document.createElement('button');
        el.type = 'button';
        el.className = 'booking-calendar__day';
        el.textContent = d;
        var isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var isWeekend = date.getDay() === 0 || date.getDay() === 6;
        if (!isPast && !isWeekend) {
          el.classList.add('booking-calendar__day--available');
          el.addEventListener('click', function (e) {
            grid.querySelectorAll('.booking-calendar__day--selected').forEach(function (s) {
              s.classList.remove('booking-calendar__day--selected');
            });
            e.currentTarget.classList.add('booking-calendar__day--selected');
            if (slots) slots.classList.add('is-visible');
          });
        }
        if (date.toDateString() === today.toDateString()) el.classList.add('booking-calendar__day--today');
        grid.appendChild(el);
      }
    }

    cal.querySelectorAll('.booking-calendar__nav').forEach(function (btn) {
      btn.addEventListener('click', function () {
        view.setMonth(view.getMonth() + (btn.dataset.dir === 'prev' ? -1 : 1));
        if (slots) slots.classList.remove('is-visible');
        render();
      });
    });

    if (slots) {
      slots.querySelectorAll('.booking-calendar__slot').forEach(function (s) {
        s.addEventListener('click', function () {
          slots.querySelectorAll('.is-selected').forEach(function (x) { x.classList.remove('is-selected'); });
          s.classList.add('is-selected');
        });
      });
    }

    render();
  });
})();
