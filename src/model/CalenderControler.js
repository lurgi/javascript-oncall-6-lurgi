import Calendar from "./Calender";

class CalendarControler {
  #calendar;

  setCalendar(month, startDay) {
    this.#calendar = new Calendar(month, startDay);
  }
}

export default CalendarControler;
