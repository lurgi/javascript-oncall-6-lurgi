const LAST_DAY = Object.freeze([undefined, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);

const DAY_STRING = Object.freeze(['월', '화', '수', '목', '금', '토', '일']);

const MONTH_NUMBER = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

const ERROR_MESSAGE = '[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.';

class Calendar {
  #month;

  #dayStringArr;

  constructor(month, startDay) {
    this.#validMonth(month);
    this.#validStartDay(startDay);

    this.#month = month;
    this.#dayStringArr = Array.from({ length: LAST_DAY[month] + 1 }, () => null);
    this.#setWeek(startDay);
  }

  #setWeek(startDay) {
    const DAY_INDEX = DAY_STRING.findIndex((value) => startDay === value);
    let curIndex = DAY_INDEX;
    this.#dayStringArr.forEach((_, index) => {
      if (!index) return;
      this.#dayStringArr[index] = DAY_STRING[curIndex];
      if (curIndex === 6) {
        curIndex = 0;
        return;
      }
      curIndex += 1;
    });
  }

  #validMonth(month) {
    if (Number.isNaN(month)) {
      throw new Error(ERROR_MESSAGE);
    }
    if (!MONTH_NUMBER.includes(month)) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  #validStartDay(startDay) {
    if (!DAY_STRING.includes(startDay)) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  getMonth() {
    return this.#month;
  }

  getDayCalendar() {
    return [...this.#dayStringArr];
  }

  getBlankCalendar() {
    return Array.from({ length: LAST_DAY[this.#month] + 1 }, () => null);
  }
}

export default Calendar;
