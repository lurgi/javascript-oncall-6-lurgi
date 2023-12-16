import Calendar from '../../src/model/Calendar';

/* eslint-disable */
describe('Calendar 테스트', () => {
  test.each([
    [13, '월'],
    [12, ''],
    [3, '월화'],
  ])('Calendar 생성 에러', (month, startDay) => {
    expect(() => new Calendar(month, startDay)).toThrow('[ERROR]');
  });

  test.each([
    [1, '월', 31],
    [2, '화', 28],
    [12, '토', 31],
  ])('getDayCalendar, getBlankCalendar', (month, startDay, expectDay) => {
    const CALENDAR = new Calendar(month, startDay);
    expect(CALENDAR.getDayCalendar().length).toStrictEqual(expectDay + 1);
    expect(CALENDAR.getBlankCalendar().length).toStrictEqual(expectDay + 1);
  });
});
