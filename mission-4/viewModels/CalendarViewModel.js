import CalendarModel from '../models/CalendarModel.js';

class CalendarViewModel {
  #currentYear;

  #currentMonth;

  #selectedDate = null;

  #calendarData;

  #observers = [];

  constructor() {
    const date = new Date();
    this.#currentYear = date.getFullYear();
    this.#currentMonth = date.getMonth();
  }

  changeMonth() {
    this.#calendarData = CalendarModel.getCalendarMatrix(
      this.#currentYear,
      this.#currentMonth
    );
    this.notify({
      actions: 'monthChanges',
    });
  }

  changeSelectedDate(date) {
    console.log(date.dataset.date);
    this.#selectedDate = date;
    this.notify({ actions: 'selectedDateChanges' });
  }

  afterMonth() {
    this.#currentMonth === 11
      ? ((this.#currentYear += 1), (this.#currentMonth = 0))
      : (this.#currentMonth += 1);

    this.changeMonth();
  }

  beforeMonth() {
    this.#currentMonth === 0
      ? ((this.#currentYear -= 1), (this.#currentMonth = 11))
      : (this.#currentMonth -= 1);

    this.changeMonth();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  notify(data) {
    this.#observers.forEach((observer) => {
      observer.update(data);
    });
  }

  getSelectedDate() {
    return this.#selectedDate;
  }

  getCalendarData() {
    return this.#calendarData;
  }
}

export default CalendarViewModel;
