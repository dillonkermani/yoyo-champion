import { describe, it, expect, beforeEach } from 'vitest';
import { useVideoStore } from '../video-store';
import { useSocialStore } from '../social-store';

describe('feed integration (video-store + social-store)', () => {
  beforeEach(() => {
    useVideoStore.setState({
      feedTab: 'for_you',
      myUploads: [],
      isFeedLoading: false,
    });
    useSocialStore.setState({
      followedUserIds: [],
      likedVideoIds: [],
      uploadReputation: 0,
      trainerStatus: 'none',
      approvedVideoCount: 0,
    });
  });

  describe('feed tab switching', () => {
    it('defaults to for_you tab', () => {
      expect(useVideoStore.getState().feedTab).toBe('for_you');
    });

    it('switches to new tab', () => {
      useVideoStore.getState().setFeedTab('new');
      expect(useVideoStore.getState().feedTab).toBe('new');
    });

    it('switches back to for_you tab', () => {
      useVideoStore.getState().setFeedTab('new');
      useVideoStore.getState().setFeedTab('for_you');
      expect(useVideoStore.getState().feedTab).toBe('for_you');
    });

    it('persists tab after multiple switches', () => {
      useVideoStore.getState().setFeedTab('new');
      useVideoStore.getState().setFeedTab('for_you');
      useVideoStore.getState().setFeedTab('new');
      expect(useVideoStore.getState().feedTab).toBe('new');
    });
  });

  describe('liking videos while browsing feed', () => {
    it('liking a video adds to likedVideoIds', () => {
      useSocialStore.getState().likeVideo('video-001');
      expect(useSocialStore.getState().likedVideoIds).toContain('video-001');
    });

    it('liking multiple videos accumulates', () => {
      useSocialStore.getState().likeVideo('video-001');
      useSocialStore.getState().likeVideo('video-002');
      useSocialStore.getState().likeVideo('video-003');
      expect(useSocialStore.getState().likedVideoIds).toHaveLength(3);
      expect(useSocialStore.getState().likedVideoIds).toEqual([
        'video-001',
        'video-002',
        'video-003',
      ]);
    });

    it('unliking a video removes from likedVideoIds', () => {
      useSocialStore.getState().likeVideo('video-001');
      useSocialStore.getState().likeVideo('video-002');
      useSocialStore.getState().unlikeVideo('video-001');
      expect(useSocialStore.getState().likedVideoIds).not.toContain('video-001');
      expect(useSocialStore.getState().likedVideoIds).toContain('video-002');
    });

    it('isVideoLiked reflects current state', () => {
      useSocialStore.getState().likeVideo('video-005');
      expect(useSocialStore.getState().isVideoLiked('video-005')).toBe(true);
      expect(useSocialStore.getState().isVideoLiked('video-006')).toBe(false);
    });
  });

  describe('cross-store: tab switch does not affect likes', () => {
    it('likes persist across feed tab changes', () => {
      // Like on for_you tab
      useSocialStore.getState().likeVideo('video-001');
      expect(useSocialStore.getState().isVideoLiked('video-001')).toBe(true);

      // Switch to new tab
      useVideoStore.getState().setFeedTab('new');
      expect(useVideoStore.getState().feedTab).toBe('new');

      // Likes still present
      expect(useSocialStore.getState().isVideoLiked('video-001')).toBe(true);
      expect(useSocialStore.getState().likedVideoIds).toHaveLength(1);

      // Like another on new tab
      useSocialStore.getState().likeVideo('video-010');
      expect(useSocialStore.getState().likedVideoIds).toHaveLength(2);

      // Switch back — both likes still present
      useVideoStore.getState().setFeedTab('for_you');
      expect(useSocialStore.getState().isVideoLiked('video-001')).toBe(true);
      expect(useSocialStore.getState().isVideoLiked('video-010')).toBe(true);
    });
  });

  describe('reset behavior', () => {
    it('resetting video store does not affect social likes', () => {
      useSocialStore.getState().likeVideo('video-001');
      useVideoStore.getState().setFeedTab('new');
      useVideoStore.getState().reset();

      // Video store resets
      expect(useVideoStore.getState().feedTab).toBe('for_you');

      // Social store unaffected
      expect(useSocialStore.getState().isVideoLiked('video-001')).toBe(true);
    });

    it('resetting social store does not affect feed tab', () => {
      useVideoStore.getState().setFeedTab('new');
      useSocialStore.getState().likeVideo('video-001');
      useSocialStore.getState().reset();

      // Social store resets
      expect(useSocialStore.getState().likedVideoIds).toEqual([]);

      // Video store unaffected
      expect(useVideoStore.getState().feedTab).toBe('new');
    });
  });
});
