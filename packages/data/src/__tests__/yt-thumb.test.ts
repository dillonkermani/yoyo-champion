import { describe, it, expect } from 'vitest';
import { ytThumb, ytThumbSet } from '../yt-thumb';

const ID = 'dQw4w9WgXcQ';

describe('ytThumb', () => {
  it('builds the hq URL by default', () => {
    expect(ytThumb(ID)).toBe(`https://i.ytimg.com/vi/${ID}/hqdefault.jpg`);
  });
  it('builds each named size', () => {
    expect(ytThumb(ID, 'default')).toBe(`https://i.ytimg.com/vi/${ID}/default.jpg`);
    expect(ytThumb(ID, 'sd')).toBe(`https://i.ytimg.com/vi/${ID}/sddefault.jpg`);
    expect(ytThumb(ID, 'max')).toBe(`https://i.ytimg.com/vi/${ID}/maxresdefault.jpg`);
  });
});

describe('ytThumbSet', () => {
  it('returns all four sizes', () => {
    const set = ytThumbSet(ID);
    expect(set.default).toContain('/default.jpg');
    expect(set.hq).toContain('/hqdefault.jpg');
    expect(set.sd).toContain('/sddefault.jpg');
    expect(set.max).toContain('/maxresdefault.jpg');
  });
});
