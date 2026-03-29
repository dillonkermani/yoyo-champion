import { describe, it, expect } from 'vitest';

describe('Home tab sub-components', () => {
  it('exports HeroHeader', async () => {
    const mod = await import('../HeroHeader');
    expect(mod.HeroHeader).toBeDefined();
  });

  it('exports IntroVideo', async () => {
    const mod = await import('../IntroVideo');
    expect(mod.IntroVideo).toBeDefined();
  });

  it('exports BrowseTricksSection', async () => {
    const mod = await import('../BrowseTricksSection');
    expect(mod.BrowseTricksSection).toBeDefined();
  });

  it('exports AdvancedComingSoon', async () => {
    const mod = await import('../AdvancedComingSoon');
    expect(mod.AdvancedComingSoon).toBeDefined();
  });

  it('exports NewsSection', async () => {
    const mod = await import('../NewsSection');
    expect(mod.NewsSection).toBeDefined();
  });
});

describe('NewsCard', () => {
  it('exports NewsCard', async () => {
    const mod = await import('../../../cards/NewsCard');
    expect(mod.NewsCard).toBeDefined();
  });
});

describe('HomeScreen orchestrator', () => {
  it('exports HomeScreen', async () => {
    const mod = await import('../../HomeScreen');
    expect(mod.HomeScreen).toBeDefined();
  });
});
