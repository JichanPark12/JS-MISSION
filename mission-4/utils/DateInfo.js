import { formatDate, isDayOfWeekInDay, isToday } from './dateUtil.js';
import CONFIG from '../constants/config.js';

class DateInfo {
  #date;

  constructor(date, type) {
    this.day = date.getDate();
    this.weekend = false;
    this.today = false;
    this.type = type;
    this.#date = date;
    this.init();
  }

  init() {
    this.weekend = isDayOfWeekInDay(CONFIG.weekEnd, this.#date.getDay());
    this.today = isToday(this.#date);
  }

  getFormatDate() {
    return formatDate(this.#date);
  }
}

export default DateInfo;
