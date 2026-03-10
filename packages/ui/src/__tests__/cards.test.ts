import { describe, it, expect } from 'vitest';

describe('cards exports', () => {
  it('exports PathCard', async () => {
    const mod = await import('../cards/PathCard');
    expect(mod.PathCard).toBeDefined();
  });
  it('exports TrickDetailHero', async () => {
    const mod = await import('../cards/TrickDetailHero');
    expect(mod.TrickDetailHero).toBeDefined();
  });
});
