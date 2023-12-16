import CalendarControler from "./model/CalenderControler";
import InputView from "./view/InputView";

class App {
  #calenderControler;

  async run() {
    this.#calenderControler = new CalendarControler();
    // TODO 입력 월과 시작 요일
    await this.handleDate();
    // TODO 평일 근무자와, 휴일 근무자
    // TODO 출력
  }

  async handleDate() {
    const [MONTH, START_DAY] = await InputView.readMonth();
    this.#calenderControler.setCalendar(MONTH, START_DAY);
  }
}

export default App;
