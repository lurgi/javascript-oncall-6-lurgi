import { Console } from '@woowacourse/mission-utils';

const INPUT_MESSAGES = Object.freeze({
  month: '비상 근무를 배정할 월과 시작 요일을 입력하세요> ',
  dayWorker: '평일 비상 근무 순번대로 사원 닉네임을 입력하세요> ',
  endWorker: '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> ',
});

const ERROR_MESSAGE = '[ERROR] 입력하지 않으셨습니다.';

const SPERATE_STRING = ',';

const InputView = Object.freeze({
  async readMonth() {
    const INPUT = await Console.readLineAsync(INPUT_MESSAGES.month);
    this.validInput(INPUT);

    const [MONTH, START_DAY] = INPUT.split(SPERATE_STRING);

    return [Number(MONTH), START_DAY];
  },

  async readDayWorker() {
    const INPUT = await Console.readLineAsync(INPUT_MESSAGES.dayWorker);
    this.validInput(INPUT);

    return INPUT.split(SPERATE_STRING);
  },

  async readEndWorker() {
    const INPUT = await Console.readLineAsync(INPUT_MESSAGES.endWorker);
    return INPUT.split(SPERATE_STRING);
  },

  validInput(input) {
    if (!input) {
      throw new Error(ERROR_MESSAGE);
    }
  },
});

export default InputView;
