import { describe, it, expect } from 'vitest';
import { parseSpecs, hasDimensions } from '../store/specs';

describe('parseSpecs', () => {
  it('reads colon, pipe and dash separated spec lines', () => {
    expect(parseSpecs('Specs:\nDiameter: 56mm\nWidth: 56mm\nWeight: 69g\nBearing: Concave')).toEqual({
      diameterMm: 56,
      widthMm: 56,
      weightG: 69,
      bearing: 'Concave',
    });
    expect(parseSpecs('Weight | 65.5g\nDiameter | 56mm\nGap Width | 4.7mm')).toMatchObject({
      weightG: 65.5,
      diameterMm: 56,
      gapMm: 4.7,
    });
    expect(parseSpecs('Weight - 66.8 grams\nWidth - 49mm\nDiameter - 56 ')).toEqual({
      weightG: 66.8,
      widthMm: 49,
      diameterMm: 56,
    });
  });

  it('ignores spec words used in prose', () => {
    const prose = 'The replay pro gives a much longer spin time because of its design and weight.';
    expect(parseSpecs(prose)).toEqual({});
  });

  it('converts inch gaps to millimetres', () => {
    expect(parseSpecs('in gap : 0.17"').gapMm).toBe(4.3);
  });

  it('keeps the first value when a key repeats', () => {
    expect(parseSpecs('Diameter: 54mm\nDiameter: 99mm').diameterMm).toBe(54);
  });

  it('hasDimensions needs both diameter and width', () => {
    expect(hasDimensions({ diameterMm: 56 })).toBe(false);
    expect(hasDimensions({ diameterMm: 56, widthMm: 44 })).toBe(true);
  });
});
