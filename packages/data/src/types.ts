// YoYo Champion Platform - Type Definitions

export type YoYoStyle = '1A' | '2A' | '3A' | '4A' | '5A';
export type TrickDifficulty = 1 | 2 | 3 | 4 | 5;
export type TrickGenre = 'basics' | 'string' | 'slack' | 'tech' | 'flow' | 'horizontal' | 'speed' | 'grinds' | 'regens' | 'hops';
export type VideoAngle = 'front' | 'side' | 'overhead' | 'pov';
export type ProgressStatus = 'not_started' | 'watching' | 'practicing' | 'mastered';
export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type ChallengeType = 'daily' | 'weekly' | 'community' | 'special';

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar: string | null;
  level: number;
  xp: number;
  currentStreak: number;
  longestStreak: number;
  completedTricks: string[];
  activePaths: string[];
  badges: string[];
  createdAt: Date;
}

export interface TrickVideo {
  id: string;
  angle: VideoAngle;
  url: string;
  duration: number;
  thumbnailUrl: string;
}

export interface TrickStep {
  id: string;
  order: number;
  title: string;
  description: string;
  timestamp: number;
  duration: number;
  tipText?: string;
}

export interface Trick {
  id: string;
  slug: string;
  name: string;
  description: string;
  difficulty: TrickDifficulty;
  style: YoYoStyle;
  genre: TrickGenre;
  xpReward: number;
  thumbnailUrl: string;
  previewGif: string;
  videos: TrickVideo[];
  steps: TrickStep[];
  prerequisites: string[];
  commonMistakes: string[];
  tips: string[];
  estimatedMinutes: number;
}

export interface PathModule {
  id: string;
  title: string;
  description: string;
  tricks: string[];
  unlockRequirements?: {
    tricksRequired?: string[];
    xpRequired?: number;
    previousModuleId?: string;
  } | undefined;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  difficulty: TrickDifficulty;
  estimatedDays: number;
  totalXp: number;
  modules: PathModule[];
  isFeatured: boolean;
  instructor: {
    name: string;
    avatar: string;
    title: string;
  };
}

export interface UserProgress {
  userId: string;
  trickId: string;
  status: ProgressStatus;
  watchedAt?: Date;
  masteredAt?: Date;
  watchTime: number;
  notes?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  unlockedAt?: Date;
}

export interface ChallengeSubmission {
  userId: string;
  videoUrl: string;
  submittedAt: Date;
  likes: number;
  isVerified: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  xpReward: number;
  deadline?: Date;
  submissions: ChallengeSubmission[];
  requiredTrick?: string;
  requirements?: string[];
}

// User-uploaded video
export interface UserVideo {
  id: string;
  userId: string;
  trickId: string;
  videoUrl: string;
  thumbnailUrl: string;
  likes: number;
  comments: number;
  tags: string[];
  createdAt: Date;
  isApproved: boolean;
  usesYoyoChampionYoyo: boolean;
}

// News/announcement item
export interface NewsItem {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  type: 'update' | 'announcement' | 'new_video';
  createdAt: Date;
}

// Extended user fields (social/profile)
export type Handedness = 'left' | 'right';
export type TrainerStatus = 'none' | 'beginner_trainer' | 'intermediate_trainer' | 'master_trainer';
export type CollectorLevel = 'starter' | 'collector' | 'enthusiast' | 'connoisseur' | 'legend';

export interface UserSocialProfile {
  followersCount: number;
  followingCount: number;
  uploadReputation: number;
  trainerStatus: TrainerStatus;
  collectorLevel: CollectorLevel;
  handedness: Handedness;
}

// Utility types for API responses
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Level calculation helpers
export const XP_PER_LEVEL = 500;
export const calculateLevel = (xp: number): number => Math.floor(xp / XP_PER_LEVEL) + 1;
export const xpForNextLevel = (currentXp: number): number => {
  const currentLevel = calculateLevel(currentXp);
  return currentLevel * XP_PER_LEVEL - currentXp;
};
export const levelProgress = (xp: number): number => {
  const currentLevel = calculateLevel(xp);
  const prevLevelXp = (currentLevel - 1) * XP_PER_LEVEL;
  return ((xp - prevLevelXp) / XP_PER_LEVEL) * 100;
};
