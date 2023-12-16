import { Console } from "@woowacourse/mission-utils";

const OUTPUT_MESSAGES = {
  result: ({ month, day, dayString, isholiday, name }) =>
    `${month}월 ${day}일 ${dayString}${isholiday ? "(휴일)" : ""} ${name}`,
};

const OutputView = Object.freeze({
  print(string) {
    Console.print(string);
  },

  printResults({ dayCalendar, workerCalendar, holidays, month }) {
    Console.print(dayCalendar);
    Console.print(workerCalendar);
    Console.print(holidays);
    for (let day = 1; day < dayCalendar.length; day += 1) {
      Console.print(
        OUTPUT_MESSAGES.result({
          month,
          day,
          dayString: dayCalendar[day],
          isholiday: holidays && holidays.includes(day),
          name: workerCalendar[day],
        })
      );
    }
  },
});

export default OutputView;
