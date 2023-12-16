import CalendarControler from '../../src/model/CalendarControler';

/* eslint-disable */
describe('CalendarControler 테스트', () => {
  test.each([
    [['수아', '루루', '글로', '솔로스타']],
    [['수아', '루루', '글로', '솔로스타', '솔로스타']],
    [[Array.from({ length: 36 }, (_, index) => index).map(String)]],
  ])('setWorkers 에러', (workers) => {
    const CONTROLER = new CalendarControler(12, '월');
    expect(() => CONTROLER.setDayWorkers(workers)).toThrow('[ERROR]');
    expect(() => CONTROLER.setEndWorkers(workers)).toThrow('[ERROR]');
  });
});
