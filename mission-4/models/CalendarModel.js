import { getStartDayOfWeek, getLastDay } from '../utils/dateUtil.js';
import DateInfo from '../utils/DateInfo.js';
import CONFIG from '../constants/config.js';
import { CorrectCalendarSize } from '../utils/calendarUtil.js';

class CalendarModel {
  static getCalendarMatrix(year, month) {
    const currentMonthStartDayOfWeek = getStartDayOfWeek(year, month);
    const currentMonthLastDay = getLastDay(year, month);

    const lastDaysOfBeforeMonth = CalendarModel.generateLastDaysOfBeforeMonth(
      year,
      month,
      currentMonthStartDayOfWeek
    );

    const daysOfCurrentMonth = CalendarModel.generateDaysOfCurrentMonth(
      year,
      month,
      currentMonthLastDay
    );

    const startDaysOfAfterMonth = CalendarModel.generateStartDaysOfAfterMonth(
      year,
      month,
      currentMonthLastDay,
      currentMonthStartDayOfWeek
    );
    return {
      year,
      month,
      dayInfoList: [
        ...lastDaysOfBeforeMonth,
        ...daysOfCurrentMonth,
        ...startDaysOfAfterMonth,
      ],
    };
  }

  static generateLastDaysOfBeforeMonth(year, month, startDayOfWeek) {
    const beforeMonthLastDay = getLastDay(year, month - 1, 0);
    return Array.from({ length: startDayOfWeek }, (_, i) => {
      const date = new Date(year, month - 1, beforeMonthLastDay - i);
      return new DateInfo(date, CONFIG.beforeMonth);
    }).reverse();
  }

  static generateDaysOfCurrentMonth(year, month, lastDay) {
    return Array.from({ length: lastDay }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return new DateInfo(date, CONFIG.currentMonth);
    });
  }

  static generateStartDaysOfAfterMonth(year, month, lastDay, startDayOfWeek) {
    const correctCalendarSize = CorrectCalendarSize(startDayOfWeek, lastDay);

    return Array.from(
      { length: correctCalendarSize - lastDay - startDayOfWeek },
      (_, i) => {
        const date = new Date(year, month + 1, i + 1);
        return new DateInfo(date, CONFIG.afterMonth);
      }
    );
  }
}

export default CalendarModel;
