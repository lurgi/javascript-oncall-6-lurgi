import CalendarControler from "./model/CalenderControler";
import InputView from "./view/InputView";
import OutputView from "./view/OutputView";

class App {
  #calenderControler;

  async run() {
    this.#calenderControler = new CalendarControler();

    await this.handleDate();
    await this.handleWorker();
    // TODO 출력
  }

  async handleDate() {
    try {
      const [MONTH, START_DAY] = await InputView.readMonth();
      this.#calenderControler.setCalendar(MONTH, START_DAY);
    } catch (error) {
      OutputView.print(error.message);
      await this.handleDate();
    }
  }

  async handleWorker() {
    try {
      const DAY_WORKER = await InputView.readDayWorker();
      this.#calenderControler.setDayWorkers(DAY_WORKER);
      const END_WORKER = await InputView.readEndWorker();
      this.#calenderControler.setEndWorkers(END_WORKER);
    } catch (error) {
      OutputView.print(error.message);
      await this.handleWorker();
    }
  }
}

export default App;
