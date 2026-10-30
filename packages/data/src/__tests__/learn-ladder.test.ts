import { describe, it, expect } from 'vitest';
import {
  TRICK_LADDER,
  LADDER_REWARD_HANDLE,
  ladderReward,
  UNRESPONSIVE_UPSELL_HANDLE,
  unresponsiveUpsell,
  nextRungIndex,
  isLadderComplete,
} from '../learn/ladder';
import { getTrickBySlug } from '../mock-tricks';
import { productUrl } from '../store/catalog';

describe('TRICK_LADDER', () => {
  it('is five rungs, sleeper first and trapeze last', () => {
    expect(TRICK_LADDER.map((r) => r.slug)).toEqual([
      'sleeper',
      'forward-pass',
      'around-the-world',
      'rock-the-baby',
      'trapeze',
    ]);
  });

  it('takes video ids from the scraped playlist for every rung that has one', () => {
    for (const r of TRICK_LADDER.slice(1)) {
      expect(r.ytId).toBe(getTrickBySlug(r.slug)?.ytId);
      expect(r.ytId).toBeTruthy();
    }
  });

  it('gives every rung a tip for players who are stuck', () => {
    for (const r of TRICK_LADDER) expect(r.tip.length).toBeGreaterThan(20);
  });
});

describe('ladderReward', () => {
  it('is the VYRAL DNA Trick Pack from the real catalog, linked to gentrystein.com', () => {
    const p = ladderReward();
    expect(p.handle).toBe(LADDER_REWARD_HANDLE);
    expect(p.images.length).toBeGreaterThan(0);
    expect(productUrl(p)).toBe('https://gentrystein.com/products/vyral-dna-trick-pack');
  });
});

describe('unresponsiveUpsell', () => {
  it('is the Yoyo Master Pack from the real catalog, linked to gentrystein.com', () => {
    const p = unresponsiveUpsell();
    expect(p.handle).toBe(UNRESPONSIVE_UPSELL_HANDLE);
    expect(p.images.length).toBeGreaterThan(0);
    expect(productUrl(p)).toBe('https://gentrystein.com/products/yoyo-master-pack');
  });
});

describe('nextRungIndex / isLadderComplete', () => {
  it('starts at the first rung', () => {
    expect(nextRungIndex([])).toBe(0);
    expect(isLadderComplete([])).toBe(false);
  });

  it('points at the first unapproved rung, even if a later one was approved', () => {
    expect(nextRungIndex(['sleeper', 'around-the-world'])).toBe(1);
  });

  it('is complete only when every rung is approved', () => {
    const all = TRICK_LADDER.map((r) => r.slug);
    expect(nextRungIndex(all)).toBe(TRICK_LADDER.length);
    expect(isLadderComplete(all)).toBe(true);
    expect(isLadderComplete(all.slice(0, 4))).toBe(false);
  });

  it('ignores slugs that are not on the ladder', () => {
    expect(nextRungIndex(['braintwister'])).toBe(0);
  });
});
