import CONFIG from '../constants/config.js';
import CalendarViewModel from '../viewModels/CalendarViewModel.js';

class CalendarView {
  #$datePicker;

  #calendarViewModel;

  #$calendar;

  constructor($datePicker) {
    this.#calendarViewModel = new CalendarViewModel();
    this.#calendarViewModel.addObserver(this);
    this.#$datePicker = $datePicker;
    this.initRender();
    this.bindClickHandlers();
  }

  update(data) {
    data.actions === 'monthChanges' &&
      this.calendarRender(this.#calendarViewModel.getCalendarData());
    data.actions === 'selectedDateChanges' &&
      this.selectedRender(this.#calendarViewModel.getSelectedDate());
  }

  initRender() {
    const template = `
    <div class="calendar-container">
    <h1 class="title">DatePicker</h1>
    <input class="date-input" type="text" readonly value="Select date" />
    <div class="calendar hidden">
      <div class="calendar-nav">
        <div class="before-btn"></div>
        <div class="year-month-container">
          <div class="month"></div>
          <div class="year"></div>
        </div>
        <div class="after-btn"></div>
      </div>
      <div class="calendar-grid">
        <ul class="day-of-week-container">
          ${CONFIG.dayOfWeek
            .map((day) => `<div class="day-of-week">${day}</div>`)
            .join('')}
        </ul>
        <ul class="days-container"></ul>
      </div>
    </div>
    </div>
    `;
    this.#$datePicker.innerHTML = template;
    this.#$calendar = this.#$datePicker.querySelector('.calendar');

    this.#calendarViewModel.changeMonth();
  }

  calendarRender(data) {
    this.yearRender(data);
    this.monthRender(data);
    this.daysRender(data);
  }

  yearRender({ year }) {
    const $year = this.#$datePicker.querySelector('.year');
    $year.textContent = year;
  }

  monthRender({ month }) {
    const $month = this.#$datePicker.querySelector('.month');
    $month.textContent = CONFIG.months[month];
  }

  daysRender({ dayInfoList }) {
    const $daysContainer = this.#$datePicker.querySelector('.days-container');

    const FRAGMENT = document.createDocumentFragment();

    dayInfoList.forEach((dayInfo) => {
      const newDiv = document.createElement('li');

      const FORMAT_DATE = dayInfo.getFormatDate();
      const SELECTED_DATE = this.#calendarViewModel.getSelectedDate();

      if (SELECTED_DATE) {
        FORMAT_DATE === SELECTED_DATE.dataset.date &&
          newDiv.classList.add('selected');
      }

      newDiv.textContent = dayInfo.day;
      newDiv.classList.add('day');
      newDiv.setAttribute('data-date', FORMAT_DATE);

      if (dayInfo.type === CONFIG.currentMonth && dayInfo.weekend) {
        newDiv.classList.add('weekEnd');
      }

      dayInfo.today && newDiv.classList.add('today');

      dayInfo.type !== CONFIG.currentMonth &&
        newDiv.classList.add('not-current-month');

      FRAGMENT.appendChild(newDiv);
    });
    $daysContainer.innerHTML = '';
    $daysContainer.appendChild(FRAGMENT);
  }

  selectedRender(data) {
    console.log(data);
    const $selectedDate = this.#$datePicker.querySelector('.selected');
    const $dateInput = this.#$datePicker.querySelector('.date-input');
    $dateInput.value = data.dataset.date;
    $selectedDate && $selectedDate.classList.remove('selected');
    data.classList.add('selected');
  }

  bindClickHandlers() {
    this.#$datePicker.addEventListener('click', (e) => {
      switch (true) {
        case e.target.classList.contains('before-btn'):
          this.onClickBeforeBtn();
          return;
        case e.target.classList.contains('after-btn'):
          this.onClickAfterBtn();
          return;
        case e.target.classList.contains('date-input'):
          this.onClickDateInput();
          return;
        case e.target.classList.contains('day'):
          this.onClickDay(e);
          return;
        case !!e.target.closest('.calendar-container'):
          return;
        default:
          this.calenderHidden();
      }
    });
    window.addEventListener('click', (e) => {
      console.log();
      switch (true) {
        case !!e.target.closest('.calendar-container'):
          return;
        default: {
          this.calenderHidden();
        }
      }
    });
  }

  onClickBeforeBtn() {
    this.#calendarViewModel.beforeMonth();
  }

  onClickAfterBtn() {
    this.#calendarViewModel.afterMonth();
  }

  onClickDay(e) {
    this.toggleCalendarHidden();
    this.#calendarViewModel.changeSelectedDate(e.target);
  }

  onClickDateInput() {
    this.toggleCalendarHidden();
  }

  toggleCalendarHidden() {
    this.#$calendar.classList.toggle('hidden');
  }

  calenderHidden() {
    this.#$calendar.classList.add('hidden');
  }
}

export default CalendarView;
