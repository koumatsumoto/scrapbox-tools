import { Movement } from '../movement/classify-movement';
import { contain, simplifyMovements } from './util';

describe('simplifyMovements', () => {
  const v = (rate: Movement['rate'], direction: Movement['direction']): Movement => ({
    rate,
    direction,
    orientation: 'up',
    align: true,
  });

  it('should work', () => {
    expect(simplifyMovements([v(1, 'up'), v(1, 'down')])).toEqual([
      {
        rate: 1,
        align: true,
      },
      {
        rate: -1,
        align: true,
      },
    ]);
    expect(simplifyMovements([v(0, 'up'), v(0, 'down')])).toEqual([
      {
        rate: 0,
        align: true,
      },
      {
        rate: 0,
        align: true,
      },
    ]);
    expect(simplifyMovements([v(0, 'up'), v(0, 'down'), v(1, 'up')])).toEqual([
      {
        align: true,
        rate: 0,
      },
      {
        align: true,
        rate: 0,
      },
      {
        align: true,
        rate: 1,
      },
    ]);
  });
});

describe('contain', () => {
  it('should work', () => {
    const source = [0, 1, 2, 3, 4];
    expect(contain(source, [0, 1, 2])).toBe(true);
    expect(contain(source, [2, 3, 4])).toBe(true);
    expect(contain(source, [0, 1, 3])).toBe(false);
    expect(contain(source, [3, 4, 5])).toBe(false);
  });
});
