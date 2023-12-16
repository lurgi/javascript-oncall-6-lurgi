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
    console.log(DAY_CALENDAR);
    const BLANK_CALENDAR = this.#calendar.getBlankCalendar();
    /**
     * 순회를 같이 돌면서 일단 Blank 달력에 인원을 우선적으로 배치하자.
     */
    // DAY_CALENDAR.forEach((day,)=>)
  }
}

export default CalendarControler;
