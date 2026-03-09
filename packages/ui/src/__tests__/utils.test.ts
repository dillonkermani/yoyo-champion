import { describe, it, expect } from 'vitest';
import {
  getDifficultyLabel,
  getDifficultyColor,
  formatXP,
  DIFFICULTY_LABELS,
  DIFFICULTY_COLORS,
} from '../utils';

describe('getDifficultyLabel', () => {
  it('returns correct label for each difficulty level', () => {
    expect(getDifficultyLabel(1)).toBe('Beginner');
    expect(getDifficultyLabel(2)).toBe('Easy');
    expect(getDifficultyLabel(3)).toBe('Intermediate');
    expect(getDifficultyLabel(4)).toBe('Advanced');
    expect(getDifficultyLabel(5)).toBe('Master');
  });

  it('returns Unknown for out-of-range difficulty', () => {
    expect(getDifficultyLabel(0)).toBe('Unknown');
    expect(getDifficultyLabel(6)).toBe('Unknown');
  });
});

describe('getDifficultyColor', () => {
  it('returns correct color for each difficulty', () => {
    expect(getDifficultyColor(1)).toBe('#1CB0F6');
    expect(getDifficultyColor(2)).toBe('#58CC02');
    expect(getDifficultyColor(3)).toBe('#FF9600');
    expect(getDifficultyColor(4)).toBe('#CE82FF');
    expect(getDifficultyColor(5)).toBe('#FF4B4B');
  });

  it('returns fallback color for unknown difficulty', () => {
    expect(getDifficultyColor(99)).toBe('#999');
    expect(getDifficultyColor(0)).toBe('#999');
  });
});

describe('formatXP', () => {
  it('formats XP under 1000 as plain number string', () => {
    expect(formatXP(0)).toBe('0');
    expect(formatXP(500)).toBe('500');
    expect(formatXP(999)).toBe('999');
  });

  it('formats XP 1000 and above with k suffix', () => {
    expect(formatXP(1000)).toBe('1.0k');
    expect(formatXP(1500)).toBe('1.5k');
    expect(formatXP(2500)).toBe('2.5k');
    expect(formatXP(10000)).toBe('10.0k');
  });
});

describe('DIFFICULTY_LABELS constant', () => {
  it('covers all 5 difficulty levels', () => {
    expect(Object.keys(DIFFICULTY_LABELS)).toHaveLength(5);
  });

  it('maps numeric keys to string labels', () => {
    Object.values(DIFFICULTY_LABELS).forEach((label) => {
      expect(typeof label).toBe('string');
      expect(label.length).toBeGreaterThan(0);
    });
  });
});

describe('DIFFICULTY_COLORS constant', () => {
  it('covers all 5 difficulty levels', () => {
    expect(Object.keys(DIFFICULTY_COLORS)).toHaveLength(5);
  });

  it('all colors are valid hex strings', () => {
    Object.values(DIFFICULTY_COLORS).forEach((color) => {
      expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});
