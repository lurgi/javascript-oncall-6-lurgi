import { Console } from "@woowacourse/mission-utils";

const INPUT_MESSAGES = Object.freeze({
  month: "비상 근무를 배정할 월과 시작 요일을 입력하세요>",
  dayWorker: "평일 비상 근무 순번대로 사원 닉네임을 입력하세요>",
  endWorker: "휴일 비상 근무 순번대로 사원 닉네임을 입력하세요>",
});

const InputView = Object.freeze({
  async readMonth() {
    const INPUT = await Console.readLineAsync(INPUT_MESSAGES.month);
    const [MONTH, START_DAY] = INPUT.split(",");
    return [Number(MONTH), START_DAY];
  },

  async readDayWorker() {
    const INPUT = await Console.readLineAsync(INPUT_MESSAGES.dayWorker);
    return INPUT.split(",");
  },

  async readEndWorker() {
    const INPUT = await Console.readLineAsync(INPUT_MESSAGES.endWorker);
    return INPUT.split(",");
  },
});

export default InputView;
