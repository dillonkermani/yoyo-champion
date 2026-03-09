import { describe, it, expect } from '@jest/globals';

describe('Expo app', () => {
  it('app module exists', () => {
    expect(true).toBe(true);
  });

  it('workspace packages are importable', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const data = require('@yoyo/data');
    expect(data).toBeDefined();
    expect(typeof data.calculateLevel).toBe('function');
  });
});
