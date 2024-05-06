import CalendarView from './view/CalendarView.js';

const $datePickers = document.querySelectorAll('.date-picker');

$datePickers.forEach(($datePicker) => {
  const calendar = new CalendarView($datePicker);
});
