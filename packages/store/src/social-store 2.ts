import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getStorage } from './storage';

export interface SocialState {
  followedUserIds: string[];
  likedVideoIds: string[];
  uploadReputation: number;
  trainerStatus: 'none' | 'beginner_trainer' | 'intermediate_trainer' | 'master_trainer';
  approvedVideoCount: number;
}

export interface SocialActions {
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  isFollowing: (userId: string) => boolean;
  likeVideo: (videoId: string) => void;
  unlikeVideo: (videoId: string) => void;
  isVideoLiked: (videoId: string) => boolean;
  addApprovedUpload: (usesYoyoChampionYoyo: boolean) => void;
  reset: () => void;
}

export type SocialStore = SocialState & SocialActions;

const calculateTrainerStatus = (approvedCount: number): SocialState['trainerStatus'] => {
  if (approvedCount >= 25) return 'master_trainer';
  if (approvedCount >= 10) return 'intermediate_trainer';
  if (approvedCount >= 3) return 'beginner_trainer';
  return 'none';
};

const initialState: SocialState = {
  followedUserIds: [],
  likedVideoIds: [],
  uploadReputation: 0,
  trainerStatus: 'none',
  approvedVideoCount: 0,
};

export const useSocialStore = create<SocialStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      followUser: (userId: string) => {
        const state = get();
        if (state.followedUserIds.includes(userId)) return;
        set({ followedUserIds: [...state.followedUserIds, userId] });
      },

      unfollowUser: (userId: string) => {
        const state = get();
        set({ followedUserIds: state.followedUserIds.filter((id) => id !== userId) });
      },

      isFollowing: (userId: string) => get().followedUserIds.includes(userId),

      likeVideo: (videoId: string) => {
        const state = get();
        if (state.likedVideoIds.includes(videoId)) return;
        set({ likedVideoIds: [...state.likedVideoIds, videoId] });
      },

      unlikeVideo: (videoId: string) => {
        const state = get();
        set({ likedVideoIds: state.likedVideoIds.filter((id) => id !== videoId) });
      },

      isVideoLiked: (videoId: string) => get().likedVideoIds.includes(videoId),

      addApprovedUpload: (usesYoyoChampionYoyo: boolean) => {
        const state = get();
        const repGain = usesYoyoChampionYoyo ? 5 : 1;
        const newCount = state.approvedVideoCount + 1;
        set({
          uploadReputation: state.uploadReputation + repGain,
          approvedVideoCount: newCount,
          trainerStatus: calculateTrainerStatus(newCount),
        });
      },

      reset: () => { set(initialState); },
    }),
    {
      name: 'yoyo-social-storage',
      storage: createJSONStorage(() => getStorage()),
      partialize: (state) => ({
        followedUserIds: state.followedUserIds,
        likedVideoIds: state.likedVideoIds,
        uploadReputation: state.uploadReputation,
        trainerStatus: state.trainerStatus,
        approvedVideoCount: state.approvedVideoCount,
      }),
      skipHydration: true,
    }
  )
);

// Selectors
export const selectFollowedUserIds = (state: SocialStore) => state.followedUserIds;
export const selectLikedVideoIds = (state: SocialStore) => state.likedVideoIds;
export const selectUploadReputation = (state: SocialStore) => state.uploadReputation;
export const selectTrainerStatus = (state: SocialStore) => state.trainerStatus;
export const selectApprovedVideoCount = (state: SocialStore) => state.approvedVideoCount;
export const selectFollowerCount = (state: SocialStore) => state.followedUserIds.length;

export const hydrateSocialStore = () => {
  useSocialStore.persist.rehydrate();
};
