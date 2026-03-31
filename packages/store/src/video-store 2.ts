import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getStorage } from './storage';

export type FeedTab = 'new' | 'for_you';

export interface VideoUpload {
  id: string;
  trickId: string;
  videoUri: string;
  tags: string[];
  usesYoyoChampionYoyo: boolean;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface VideoState {
  feedTab: FeedTab;
  myUploads: VideoUpload[];
  isFeedLoading: boolean;
}

export interface VideoActions {
  setFeedTab: (tab: FeedTab) => void;
  addUpload: (upload: Omit<VideoUpload, 'id' | 'uploadedAt' | 'status'>) => void;
  removeUpload: (id: string) => void;
  approveUpload: (id: string) => void;
  rejectUpload: (id: string) => void;
  setFeedLoading: (loading: boolean) => void;
  reset: () => void;
}

export type VideoStore = VideoState & VideoActions;

const initialState: VideoState = {
  feedTab: 'for_you',
  myUploads: [],
  isFeedLoading: false,
};

export const useVideoStore = create<VideoStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setFeedTab: (tab: FeedTab) => { set({ feedTab: tab }); },

      addUpload: (upload) => {
        const newUpload: VideoUpload = {
          ...upload,
          id: `upload_${Date.now()}`,
          uploadedAt: new Date().toISOString(),
          status: 'pending',
        };
        set({ myUploads: [newUpload, ...get().myUploads] });
      },

      removeUpload: (id: string) => {
        set({ myUploads: get().myUploads.filter((u) => u.id !== id) });
      },

      approveUpload: (id: string) => {
        set({
          myUploads: get().myUploads.map((u) =>
            u.id === id ? { ...u, status: 'approved' as const } : u
          ),
        });
      },

      rejectUpload: (id: string) => {
        set({
          myUploads: get().myUploads.map((u) =>
            u.id === id ? { ...u, status: 'rejected' as const } : u
          ),
        });
      },

      setFeedLoading: (loading: boolean) => { set({ isFeedLoading: loading }); },

      reset: () => { set(initialState); },
    }),
    {
      name: 'yoyo-video-storage',
      storage: createJSONStorage(() => getStorage()),
      partialize: (state) => ({
        feedTab: state.feedTab,
        myUploads: state.myUploads,
      }),
      skipHydration: true,
    }
  )
);

// Selectors
export const selectFeedTab = (state: VideoStore) => state.feedTab;
export const selectMyUploads = (state: VideoStore) => state.myUploads;
export const selectIsFeedLoading = (state: VideoStore) => state.isFeedLoading;
export const selectApprovedUploads = (state: VideoStore) =>
  state.myUploads.filter((u) => u.status === 'approved');
export const selectPendingUploads = (state: VideoStore) =>
  state.myUploads.filter((u) => u.status === 'pending');
export const selectUploadCount = (state: VideoStore) => state.myUploads.length;

export const hydrateVideoStore = () => {
  useVideoStore.persist.rehydrate();
};
