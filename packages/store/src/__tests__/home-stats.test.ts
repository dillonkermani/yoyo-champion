import { describe, it, expect, beforeEach } from 'vitest';
import { useSocialStore } from '../social-store';
import { useVideoStore } from '../video-store';
import { useProgressStore } from '../progress-store';

describe('home-stats integration', () => {
  beforeEach(() => {
    useSocialStore.setState({
      followedUserIds: [],
      likedVideoIds: [],
      uploadReputation: 0,
      trainerStatus: 'none',
      approvedVideoCount: 0,
    });
    useVideoStore.setState({
      feedTab: 'for_you',
      myUploads: [],
      isFeedLoading: false,
    });
    useProgressStore.setState({
      trickProgress: {},
      pathProgress: {},
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      totalWatchTime: 0,
      totalTricksMastered: 0,
    });
  });

  describe('uploadReputation from social-store', () => {
    it('returns 0 initially', () => {
      expect(useSocialStore.getState().uploadReputation).toBe(0);
    });

    it('increases by 1 after addApprovedUpload with non-champion yoyo', () => {
      useSocialStore.getState().addApprovedUpload(false);
      expect(useSocialStore.getState().uploadReputation).toBe(1);
    });

    it('increases by 5 after addApprovedUpload with champion yoyo', () => {
      useSocialStore.getState().addApprovedUpload(true);
      expect(useSocialStore.getState().uploadReputation).toBe(5);
    });

    it('accumulates reputation across multiple uploads', () => {
      useSocialStore.getState().addApprovedUpload(true);
      useSocialStore.getState().addApprovedUpload(false);
      useSocialStore.getState().addApprovedUpload(true);
      expect(useSocialStore.getState().uploadReputation).toBe(11);
    });
  });

  describe('trainerStatus progression', () => {
    it('starts as none', () => {
      expect(useSocialStore.getState().trainerStatus).toBe('none');
    });

    it('becomes beginner_trainer at 3 approved uploads', () => {
      for (let i = 0; i < 3; i++) useSocialStore.getState().addApprovedUpload(false);
      expect(useSocialStore.getState().trainerStatus).toBe('beginner_trainer');
    });

    it('becomes intermediate_trainer at 10 approved uploads', () => {
      for (let i = 0; i < 10; i++) useSocialStore.getState().addApprovedUpload(false);
      expect(useSocialStore.getState().trainerStatus).toBe('intermediate_trainer');
    });

    it('becomes master_trainer at 25 approved uploads', () => {
      for (let i = 0; i < 25; i++) useSocialStore.getState().addApprovedUpload(false);
      expect(useSocialStore.getState().trainerStatus).toBe('master_trainer');
    });

    it('stays beginner_trainer between 3 and 9 uploads', () => {
      for (let i = 0; i < 7; i++) useSocialStore.getState().addApprovedUpload(false);
      expect(useSocialStore.getState().trainerStatus).toBe('beginner_trainer');
    });
  });

  describe('video-store myUploads to thumbnail mapping', () => {
    it('maps empty uploads to empty thumbnails array', () => {
      const uploads = useVideoStore.getState().myUploads;
      const thumbnails = uploads.map((u) => ({ id: u.id, thumbnailUrl: u.videoUri }));
      expect(thumbnails).toEqual([]);
    });

    it('maps uploads to thumbnail format', () => {
      useVideoStore.getState().addUpload({
        trickId: 'trick-001',
        videoUri: 'file:///video1.mp4',
        tags: ['1a'],
        usesYoyoChampionYoyo: false,
      });
      useVideoStore.getState().addUpload({
        trickId: 'trick-002',
        videoUri: 'file:///video2.mp4',
        tags: ['2a'],
        usesYoyoChampionYoyo: true,
      });

      const uploads = useVideoStore.getState().myUploads;
      const thumbnails = uploads.map((u) => ({ id: u.id, thumbnailUrl: u.videoUri }));

      expect(thumbnails).toHaveLength(2);
      expect(thumbnails[0]).toHaveProperty('id');
      expect(thumbnails[0]).toHaveProperty('thumbnailUrl');
      expect(thumbnails[0]!.thumbnailUrl).toBe('file:///video2.mp4');
      expect(thumbnails[1]!.thumbnailUrl).toBe('file:///video1.mp4');
    });

    it('preserves upload id in thumbnail mapping', () => {
      useVideoStore.getState().addUpload({
        trickId: 'trick-001',
        videoUri: 'file:///video1.mp4',
        tags: [],
        usesYoyoChampionYoyo: false,
      });

      const uploads = useVideoStore.getState().myUploads;
      const thumbnails = uploads.map((u) => ({ id: u.id, thumbnailUrl: u.videoUri }));

      expect(thumbnails[0]!.id).toMatch(/^upload_/);
    });
  });

  describe('progress-store totalTricksMastered for trickProgress stat', () => {
    it('starts at 0', () => {
      expect(useProgressStore.getState().totalTricksMastered).toBe(0);
    });

    it('increments when a trick is mastered', () => {
      useProgressStore.getState().markTrickMastered('trick-001');
      expect(useProgressStore.getState().totalTricksMastered).toBe(1);
    });

    it('does not double count mastering the same trick', () => {
      useProgressStore.getState().markTrickMastered('trick-001');
      useProgressStore.getState().markTrickMastered('trick-001');
      expect(useProgressStore.getState().totalTricksMastered).toBe(1);
    });
  });
});
