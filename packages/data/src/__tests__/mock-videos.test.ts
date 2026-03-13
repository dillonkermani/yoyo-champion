import { describe, it, expect } from 'vitest';
import {
  mockVideos,
  getVideoById,
  getVideosByUserId,
  getVideosByTrickId,
  getApprovedVideos,
  getVideosByTag,
  getTopVideos,
  getRecentVideos,
} from '../mock-videos';

describe('mockVideos', () => {
  it('contains at least 15 videos', () => {
    expect(mockVideos.length).toBeGreaterThanOrEqual(15);
  });

  it('every video has required fields', () => {
    for (const video of mockVideos) {
      expect(video.id).toBeTruthy();
      expect(video.userId).toBeTruthy();
      expect(video.trickId).toBeTruthy();
      expect(video.videoUrl).toBeTruthy();
      expect(video.thumbnailUrl).toBeTruthy();
      expect(typeof video.likes).toBe('number');
      expect(typeof video.comments).toBe('number');
      expect(Array.isArray(video.tags)).toBe(true);
      expect(video.createdAt).toBeInstanceOf(Date);
      expect(typeof video.isApproved).toBe('boolean');
      expect(typeof video.usesYoyoChampionYoyo).toBe('boolean');
    }
  });
});

describe('getVideoById', () => {
  it('returns video for valid id', () => {
    const video = getVideoById('video-001');
    expect(video).toBeDefined();
    expect(video!.id).toBe('video-001');
  });

  it('returns undefined for invalid id', () => {
    expect(getVideoById('nonexistent')).toBeUndefined();
  });
});

describe('getVideosByUserId', () => {
  it('returns videos for user-001', () => {
    const videos = getVideosByUserId('user-001');
    expect(videos.length).toBeGreaterThan(0);
    expect(videos.every((v) => v.userId === 'user-001')).toBe(true);
  });
});

describe('getVideosByTrickId', () => {
  it('returns videos for trick-006', () => {
    const videos = getVideosByTrickId('trick-006');
    expect(videos.length).toBeGreaterThan(0);
    expect(videos.every((v) => v.trickId === 'trick-006')).toBe(true);
  });
});

describe('getApprovedVideos', () => {
  it('returns only approved videos', () => {
    const approved = getApprovedVideos();
    expect(approved.every((v) => v.isApproved)).toBe(true);
    expect(approved.length).toBeLessThan(mockVideos.length);
  });
});

describe('getVideosByTag', () => {
  it('returns videos matching a tag', () => {
    const tagged = getVideosByTag('horizontal');
    expect(tagged.length).toBeGreaterThan(0);
    expect(tagged.every((v) => v.tags.includes('horizontal'))).toBe(true);
  });
});

describe('getTopVideos', () => {
  it('returns videos sorted by likes descending', () => {
    const top = getTopVideos(5);
    expect(top.length).toBeLessThanOrEqual(5);
    for (let i = 1; i < top.length; i++) {
      expect(top[i - 1]!.likes).toBeGreaterThanOrEqual(top[i]!.likes);
    }
  });
});

describe('getRecentVideos', () => {
  it('returns videos sorted by date descending', () => {
    const recent = getRecentVideos(5);
    expect(recent.length).toBeLessThanOrEqual(5);
    for (let i = 1; i < recent.length; i++) {
      expect(recent[i - 1]!.createdAt.getTime()).toBeGreaterThanOrEqual(recent[i]!.createdAt.getTime());
    }
  });
});
