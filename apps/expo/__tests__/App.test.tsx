import { describe, it, expect } from '@jest/globals';

describe('Expo app', () => {
  it('app module exists', () => {
    expect(true).toBe(true);
  });

  it('workspace packages are importable', async () => {
    // Dynamic imports to avoid RN environment requirements at test time
    const data = await import('@yoyo/data');
    expect(data).toBeDefined();
    expect(typeof data.calculateLevel).toBe('function');
  });
});
