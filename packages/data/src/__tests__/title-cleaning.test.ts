import { describe, it, expect } from 'vitest';
import { cleanTitle, parseEpisode, slugify, isSkippableTitle } from '../title-cleaning';

describe('cleanTitle', () => {
  it('strips bracketed marketing suffixes, episode tag, and "Learn How to" prefix', () => {
    expect(
      cleanTitle('Learn How to Forward Pass [Yoyo Tricks With The World Champion] - Episode 3'),
    ).toBe('Forward Pass');
  });

  it('strips "Learn Around The World" → "Around The World"', () => {
    expect(
      cleanTitle('Learn Around The World [How to do Yoyo Tricks With The World Champion] - Episode 4'),
    ).toBe('Around The World');
  });

  it('strips "do Yoyo" residual', () => {
    expect(cleanTitle('How to do Yoyo Grinds - (With World Yoyo Champion Gentry Stein)')).toBe(
      'Grinds',
    );
  });

  it('strips trailing Episode N', () => {
    expect(cleanTitle('How to Trapeze [Learn Yoyo Tricks With The World Champion] - Episode 13')).toBe(
      'Trapeze',
    );
  });

  it('strips "How to" prefix', () => {
    expect(cleanTitle('How to Braintwister [Learn to Yoyo With The World Champion] - Episode 11')).toBe(
      'Braintwister',
    );
  });

  it('strips suffix "(With World Champion ...)"', () => {
    expect(
      cleanTitle("How to Buddha's Revenge Yoyo Trick - (With World Champion Gentry Stein)"),
    ).toBe("Buddha's Revenge");
  });

  it('strips "Yoyo Trick" / "Yoyo Tutorial" anywhere', () => {
    expect(cleanTitle('Robinhood Yoyo Trick! [Learn to Yoyo With The World Champion] - Episode 5')).toBe(
      'Robinhood',
    );
  });

  it('handles the Ep. 18 form', () => {
    expect(
      cleanTitle('Trapeze and Brother - (Learn Yoyo Tricks With World Champion Gentry Stein) Ep. 18'),
    ).toBe('Trapeze and Brother');
  });

  it('collapses extra whitespace', () => {
    expect(cleanTitle('  Sleeper   ')).toBe('Sleeper');
  });
});

describe('parseEpisode', () => {
  it('parses "Episode 3"', () => {
    expect(parseEpisode('Forward Pass - Episode 3')).toBe(3);
  });
  it('parses "Ep. 18"', () => {
    expect(parseEpisode('Trapeze and Brother Ep. 18')).toBe(18);
  });
  it('returns undefined when missing', () => {
    expect(parseEpisode('Sleeper')).toBeUndefined();
  });
});

describe('slugify', () => {
  it('kebab-cases ASCII names', () => {
    expect(slugify('Forward Pass')).toBe('forward-pass');
  });
  it('strips apostrophes', () => {
    expect(slugify("Buddha's Revenge")).toBe('buddhas-revenge');
  });
  it('handles ampersands and punctuation', () => {
    expect(slugify('Speed & Hops!')).toBe('speed-hops');
  });
  it('trims leading/trailing dashes', () => {
    expect(slugify('-- foo --')).toBe('foo');
  });
});

describe('isSkippableTitle', () => {
  it('skips PewDiePie video', () => {
    expect(isSkippableTitle('PewDiePie Needs a Better Yoyo - Guide')).toBe(true);
  });
  it('skips maintenance / setup', () => {
    expect(isSkippableTitle('How to Maintain Your Yoyo and Clean Bearing Easy')).toBe(true);
    expect(isSkippableTitle('How to Setup Your Yoyo')).toBe(true);
  });
  it('skips wind tutorial', () => {
    expect(isSkippableTitle('Super Fast Yoyo Wind')).toBe(true);
  });
  it('keeps actual tricks', () => {
    expect(isSkippableTitle('How to Trapeze')).toBe(false);
    expect(isSkippableTitle('How To Bind An Unresponsive Yoyo')).toBe(false);
  });
});
