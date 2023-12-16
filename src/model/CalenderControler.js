import Calendar from "./Calender";

const HOLIDAYS = Object.freeze([
  undefined,
  [1],
  undefined,
  [1],
  undefined,
  [5],
  [6],
  undefined,
  [15],
  undefined,
  [3, 9],
  undefined,
  [25],
]);

const WEEK_DAY = Object.freeze(["월", "화", "수", "목", "금"]);
const WEEK_END = Object.freeze(["토", "일"]);

const ERROR_MESSAGES = Object.freeze({
  cnt: "[ERROR] 최소 5명 최대 35명 까지만 입력해주세요.",
  duplication: "[ERROR] 중복된 이름이 있습니다.",
  wrong: "[ERROR] 잘못 입력하셨습니다.",
  over5: "[ERROR] 닉네임은 5자 이하여야 합니다.",
});

class CalendarControler {
  #calendar;
  #dayWorkers;
  #endWorkers;
  #workerCalendar;

  setCalendar(month, startDay) {
    this.#calendar = new Calendar(month, startDay);
  }

  setDayWorkers(dayWorker) {
    this.#validWorker(dayWorker);
    this.#dayWorkers = dayWorker;
  }

  setEndWorkers(endWorker) {
    this.#validWorker(endWorker);
    this.#endWorkers = endWorker;
  }

  #validWorker(workers) {
    if (workers.length < 5 || workers.length > 35) {
      throw new Error(ERROR_MESSAGES.cnt);
    }
    if (workers.length !== new Set(workers).size) {
      throw new Error(ERROR_MESSAGES.duplication);
    }
    workers.forEach((worker) => {
      if (!worker) {
        throw new Error(ERROR_MESSAGES.wrong);
      }
      if (worker.length > 5) {
        throw new Error(ERROR_MESSAGES.over5);
      }
    });
  }

  setWorkerCalendar() {
    const DAY_CALENDAR = this.#calendar.getDayCalendar();
    const MONTH = this.#calendar.getMonth();
    const BLANK_CALENDAR = this.#calendar.getBlankCalendar();

    let dayOrder = 0;
    let weekOrder = 0;

    DAY_CALENDAR.forEach((string, number) => {
      if (!number) return;
      //평일인 경우
      if (
        WEEK_DAY.includes(string) &&
        (!HOLIDAYS[MONTH] || !HOLIDAYS[MONTH].includes(number))
      ) {
        const WORKER = this.#dayWorkers[dayOrder];
        BLANK_CALENDAR[number] = WORKER;
        if (dayOrder === this.#dayWorkers.length - 1) {
          dayOrder = 0;
          return;
        }
        dayOrder += 1;
      }
      //주말인 경우
      if (
        WEEK_END.includes(string) ||
        (HOLIDAYS[MONTH] && HOLIDAYS[MONTH].includes(number))
      ) {
        const WORKER = this.#endWorkers[weekOrder];
        BLANK_CALENDAR[number] = WORKER;
        if (weekOrder === this.#endWorkers.length - 1) {
          weekOrder = 0;
          return;
        }
        weekOrder += 1;
      }
    });

    this.#workerCalendar = [...BLANK_CALENDAR];
  }

  handleException() {}
}

export default CalendarControler;
