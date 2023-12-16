import Calendar from './Calendar';

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

const WEEK_END = Object.freeze(['토', '일']);
const WORKER_MIN = 5;
const WORKER_MAX = 35;

const ERROR_MESSAGES = Object.freeze({
  cnt: '[ERROR] 최소 5명 최대 35명 까지만 입력해주세요.',
  duplication: '[ERROR] 중복된 이름이 있습니다.',
  wrong: '[ERROR] 잘못 입력하셨습니다.',
  over5: '[ERROR] 닉네임은 5자 이하여야 합니다.',
});

class CalendarControler {
  #calendar;

  #dayWorkers;

  #endWorkers;

  #workerCalendar;

  #dayOrder = 0;

  #endOrder = 0;

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
    if (workers.length < WORKER_MIN || workers.length > WORKER_MAX) {
      throw new Error(ERROR_MESSAGES.cnt);
    }
    if (workers.length !== new Set(workers).size) {
      throw new Error(ERROR_MESSAGES.duplication);
    }
    workers.forEach((worker) => {
      if (!worker) throw new Error(ERROR_MESSAGES.wrong);
      if (worker.length > 5) throw new Error(ERROR_MESSAGES.over5);
    });
  }

  setWorkerCalendar() {
    const DAY_CALENDAR = this.#calendar.getDayCalendar();
    this.#workerCalendar = this.#calendar.getBlankCalendar();

    this.#workerCalendarAll(DAY_CALENDAR);
  }

  #workerCalendarAll(DAY_CALENDAR) {
    const DAY_WORKER_DUP = [];
    const END_WORKER_DUP = [];
    DAY_CALENDAR.forEach((string, number) => {
      if (!number) return;
      this.#workerCalendarDay(string, number, DAY_WORKER_DUP);
      this.#workerCalendarEnd(string, number, END_WORKER_DUP);
    });
  }

  #workerCalendarDay(string, number, DAY_WORKER_DUP) {
    const MONTH = this.#calendar.getMonth();
    if (!this.isWeekEnd(string, number, MONTH)) {
      if (this.#isQueueDayWorker(DAY_WORKER_DUP, number)) {
        this.#workerCalendar[number] = DAY_WORKER_DUP.shift();
        return;
      }
      if (this.#workerCalendar[number - 1] === this.#dayWorkers[this.#dayOrder]) {
        DAY_WORKER_DUP.push(this.#dayWorkers[this.#dayOrder]);
        this.#dayOrder = this.upDayOrder(this.#dayOrder);
      }
      this.#workerCalendar[number] = this.#dayWorkers[this.#dayOrder];
      this.#dayOrder = this.upDayOrder(this.#dayOrder);
    }
  }

  #isQueueDayWorker(DAY_WORKER_DUP, number) {
    return DAY_WORKER_DUP[0] && this.#workerCalendar[number - 1] !== DAY_WORKER_DUP[0];
  }

  #workerCalendarEnd(string, number, END_WORKER_DUP) {
    if (this.isWeekEnd(string, number, this.#calendar.getMonth())) {
      if (this.#isQueueEndWorker(END_WORKER_DUP, number)) {
        this.#workerCalendar[number] = END_WORKER_DUP.shift();
        return;
      }
      if (this.#workerCalendar[number - 1] === this.#endWorkers[this.#endOrder]) {
        END_WORKER_DUP.push(this.#endWorkers[this.#endOrder]);
        this.#endOrder = this.upEndOrder(this.#endOrder);
      }
      this.#workerCalendar[number] = this.#endWorkers[this.#endOrder];
      this.#endOrder = this.upEndOrder(this.#endOrder);
    }
  }

  #isQueueEndWorker(END_WORKER_DUP, number) {
    return END_WORKER_DUP[0] && this.#workerCalendar[number - 1] !== END_WORKER_DUP[0];
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
    return WEEK_END.includes(string) || (HOLIDAYS[month] && HOLIDAYS[month].includes(number));
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
