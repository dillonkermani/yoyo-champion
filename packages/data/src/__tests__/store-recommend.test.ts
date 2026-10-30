import { describe, it, expect } from 'vitest';
import { recommend, sizeOf } from '../store/recommend';
import { storeProducts } from '../store/catalog';

describe('recommend', () => {
  it('only offers responsive yo-yos or packs to a first-time thrower', () => {
    const out = recommend({ level: 'first-throw', focus: 'basics', budget: 'any', size: 'no-preference' }, storeProducts);
    expect(out.length).toBeGreaterThan(0);
    for (const r of out) {
      expect(r.product.meta.responsive).toBe(true);
      expect(r.product.available).toBe(true);
      expect(r.reasons.length).toBeGreaterThan(0);
    }
  });

  it('never offers a responsive yo-yo to a player who can bind', () => {
    const out = recommend({ level: 'can-bind', focus: 'string-tricks', budget: 'any', size: 'no-preference' }, storeProducts);
    expect(out.every((r) => r.product.meta.responsive !== true)).toBe(true);
  });

  it('respects the budget cap', () => {
    const out = recommend({ level: 'can-bind', focus: 'speed', budget: 'under-70', size: 'no-preference' }, storeProducts);
    expect(out.every((r) => r.product.priceFrom <= 70)).toBe(true);
  });

  it('puts a DNA yo-yo first for a DNA-focused player', () => {
    const out = recommend({ level: 'can-bind', focus: 'dna', budget: 'any', size: 'no-preference' }, storeProducts);
    expect(out[0]!.product.meta.focus).toContain('dna');
  });

  it('rewards a matching width when a size feel is given', () => {
    const wide = recommend({ level: 'competitor', focus: 'string-tricks', budget: 'any', size: 'wide' }, storeProducts);
    expect(wide[0]!.reasons.some((r) => r.includes('wide'))).toBe(true);
  });

  it('never returns hidden or unavailable products', () => {
    const out = recommend({ level: 'competitor', focus: 'collector', budget: 'any', size: 'no-preference' }, storeProducts, 50);
    expect(out.every((r) => !r.product.meta.hidden && r.product.available)).toBe(true);
  });

  it('sizeOf buckets by width', () => {
    expect(sizeOf(38.3)).toBe('compact');
    expect(sizeOf(50)).toBe('standard');
    expect(sizeOf(56)).toBe('wide');
  });
});
