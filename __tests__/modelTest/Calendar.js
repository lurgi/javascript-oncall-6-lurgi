import Calendar from '../../src/model/Calender';

describe('Calendar 테스트', () => {
  test.each([
    [13, '월'],
    [12, ''],
    [3, '월화'],
  ])('Calendar 생성 에러', (month, startDay) => {
    expect(() => new Calendar(month, startDay)).toThrow('[ERROR]');
  });
});
