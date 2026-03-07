import { describe, it, expect } from 'vitest';
import { calculateLevel, xpForNextLevel, levelProgress, XP_PER_LEVEL } from '../types';

describe('calculateLevel', () => {
  it('returns level 1 for 0 XP', () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it('returns level 2 after XP_PER_LEVEL XP', () => {
    expect(calculateLevel(XP_PER_LEVEL)).toBe(2);
  });

  it('returns level 3 after 2 * XP_PER_LEVEL XP', () => {
    expect(calculateLevel(2 * XP_PER_LEVEL)).toBe(3);
  });
});

describe('xpForNextLevel', () => {
  it('returns XP_PER_LEVEL for 0 current XP (level 1)', () => {
    expect(xpForNextLevel(0)).toBe(XP_PER_LEVEL);
  });

  it('returns remaining XP correctly', () => {
    const partialXp = 200;
    expect(xpForNextLevel(partialXp)).toBe(XP_PER_LEVEL - partialXp);
  });
});

describe('levelProgress', () => {
  it('returns 0 for 0 XP', () => {
    expect(levelProgress(0)).toBe(0);
  });

  it('returns 50 for halfway through a level', () => {
    expect(levelProgress(XP_PER_LEVEL / 2)).toBe(50);
  });

  it('returns 100 for exactly at level threshold', () => {
    expect(levelProgress(XP_PER_LEVEL)).toBe(0); // at start of level 2
  });
});
