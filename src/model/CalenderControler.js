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
    let endOrder = 0;
    const DAY_WORKER_DUP = [];
    const END_WORKER_DUP = [];

    DAY_CALENDAR.forEach((string, number) => {
      if (!number) return;
      //평일
      if (!this.isWeekEnd(string, number, MONTH)) {
        if (
          DAY_WORKER_DUP[0] &&
          BLANK_CALENDAR[number - 1] !== DAY_WORKER_DUP[0]
        ) {
          BLANK_CALENDAR[number] = DAY_WORKER_DUP.shift();
          return;
        }
        if (BLANK_CALENDAR[number - 1] !== this.#dayWorkers[dayOrder]) {
          BLANK_CALENDAR[number] = this.#dayWorkers[dayOrder];
          dayOrder = this.upDayOrder(dayOrder);
        }
        if (BLANK_CALENDAR[number - 1] === this.#dayWorkers) {
          DAY_WORKER_DUP.push(this.#dayWorkers[dayOrder]);
          dayOrder = this.upDayOrder(dayOrder);
          BLANK_CALENDAR[number] = this.#dayWorkers[dayOrder];
          dayOrder = this.upDayOrder(dayOrder);
        }
      }
      //주말
      if (this.isWeekEnd(string, number, MONTH)) {
        if (
          END_WORKER_DUP[0] &&
          BLANK_CALENDAR[number - 1] !== END_WORKER_DUP[0]
        ) {
          BLANK_CALENDAR[number] = END_WORKER_DUP.shift();
          return;
        }
        if (BLANK_CALENDAR[number - 1] !== this.#endWorkers[endOrder]) {
          BLANK_CALENDAR[number] = this.#endWorkers[endOrder];
          endOrder = this.upEndOrder(endOrder);
        }
        if (BLANK_CALENDAR[number - 1] === this.#endWorkers[endOrder]) {
          END_WORKER_DUP.push(this.#endWorkers[endOrder]);
          endOrder = this.upEndOrder(endOrder);
          BLANK_CALENDAR[number] = this.#endWorkers[endOrder];
          endOrder = this.upEndOrder(endOrder);
        }
      }
    });

    this.#workerCalendar = [...BLANK_CALENDAR];
    console.log(this.#workerCalendar);
  }

  upDayOrder(order) {
    if (order === this.#dayWorkers.length - 1) {
      return 0;
    }
    return order + 1;
  }

  upEndOrder(order) {
    if (order === this.#endWorkers.length - 1) {
      return 0;
    }
    return order + 1;
  }

  isWeekEnd(string, number, month) {
    return (
      WEEK_END.includes(string) ||
      (HOLIDAYS[month] && HOLIDAYS[month].includes(number))
    );
  }

  getDayCalendar() {
    return [...this.#calendar.getDayCalendar()];
  }

  getWorkerCalendar() {
    return [...this.#workerCalendar];
  }

  getHoliday() {
    const MONTH = this.#calendar.getMonth();
    return HOLIDAYS[MONTH];
  }

  getMonth() {
    return this.#calendar.getMonth();
  }
}

export default CalendarControler;
