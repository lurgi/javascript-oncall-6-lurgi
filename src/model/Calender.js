const LAST_DAY = Object.freeze([
  undefined,
  31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
]);

const HOLIDAYS = [
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
];

const DAY_STRING = ["월", "화", "수", "목", "금", "토", "일"];

const MONTH_NUMBER = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

const ERROR_MESSAGE =
  "[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.";

class Calendar {
  #month;
  #dayStringArr;

  constructor(month, startDay) {
    this.#validMonth(month);
    this.#validStartDay(startDay);

    this.#month = month;
    this.#dayStringArr = Array.from(
      { length: LAST_DAY[month] + 1 },
      () => null
    );
    this.#setWeek(startDay);
  }

  #setWeek(startDay) {
    const DAY_INDEX = DAY_STRING.findIndex((value) => startDay === value);
    let curIndex = DAY_INDEX;
    console.log(curIndex);
    this.#dayStringArr.forEach((_, index) => {
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
    if (month > 12 || month < 1) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  #validStartDay(startDay) {
    if (!DAY_STRING.includes(startDay)) {
      throw new Error(ERROR_MESSAGE);
    }
  }
}

export default Calendar;
