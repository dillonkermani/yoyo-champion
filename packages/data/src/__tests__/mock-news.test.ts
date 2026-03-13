import { describe, it, expect } from 'vitest';
import { mockNews, getNewsById, getNewsByType, getRecentNews } from '../mock-news';

describe('mockNews', () => {
  it('contains at least 5 news items', () => {
    expect(mockNews.length).toBeGreaterThanOrEqual(5);
  });

  it('every news item has required fields', () => {
    for (const item of mockNews) {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.body).toBeTruthy();
      expect(item.imageUrl).toBeTruthy();
      expect(['update', 'announcement', 'new_video']).toContain(item.type);
      expect(item.createdAt).toBeInstanceOf(Date);
    }
  });
});

describe('getNewsById', () => {
  it('returns news item for valid id', () => {
    const item = getNewsById('news-001');
    expect(item).toBeDefined();
    expect(item!.title).toBeTruthy();
  });

  it('returns undefined for invalid id', () => {
    expect(getNewsById('nonexistent')).toBeUndefined();
  });
});

describe('getNewsByType', () => {
  it('returns only announcement items', () => {
    const announcements = getNewsByType('announcement');
    expect(announcements.length).toBeGreaterThan(0);
    expect(announcements.every((n) => n.type === 'announcement')).toBe(true);
  });

  it('returns only new_video items', () => {
    const videos = getNewsByType('new_video');
    expect(videos.length).toBeGreaterThan(0);
    expect(videos.every((n) => n.type === 'new_video')).toBe(true);
  });
});

describe('getRecentNews', () => {
  it('returns sorted by date descending', () => {
    const recent = getRecentNews(3);
    expect(recent.length).toBeLessThanOrEqual(3);
    for (let i = 1; i < recent.length; i++) {
      expect(recent[i - 1]!.createdAt.getTime()).toBeGreaterThanOrEqual(recent[i]!.createdAt.getTime());
    }
  });
});
