// Mascot component and variants
export {
  Mascot,
  HappyMascot,
  ExcitedMascot,
  SadMascot,
  CelebratingMascot,
  ThinkingMascot,
  EncouragingMascot,
  type MascotProps,
  type MascotState,
} from "./mascot";

// Confetti effects
export {
  Confetti,
  SuccessConfetti,
  LevelUpConfetti,
  AchievementConfetti,
  type ConfettiProps,
  type ConfettiPiece,
} from "./confetti";

// Particle effects
export {
  Particles,
  SparkleParticles,
  FireParticles,
  StarParticles,
  XPSparkles,
  StreakFire as ParticleStreakFire,
  AchievementStars,
  type ParticlesProps,
  type ParticleConfig,
  type ParticleType,
} from "./particles";

// Celebration components
export {
  Celebration,
  TrickMasteryCelebration,
  PathCompletionCelebration,
  AchievementCelebration,
  LevelUpCelebration,
  StreakCelebration,
  type CelebrationProps,
  type CelebrationLevel,
} from "./celebration";

// Animated numbers
export {
  AnimatedNumber,
  AnimatedXP,
  AnimatedScore,
  AnimatedPercentage,
  AnimatedLevel,
  AnimatedStreak,
  CountUp,
  type AnimatedNumberProps,
} from "./animated-number";

// Reward popups
export {
  RewardPopup,
  XPRewardPopup,
  StreakRewardPopup,
  MultiRewardPopup,
  useRewardPopup,
  type RewardPopupProps,
  type Reward,
  type RewardType,
} from "./reward-popup";

// Duolingo-style components
export {
  // Messages
  ENCOURAGING_MESSAGES,
  getRandomMessage,
  type MessageCategory,
  // Visual components
  StreakFire,
  XPBadge,
  LevelProgress,
  DailyGoal,
  AchievementBadge,
  StatCard,
  BounceCard,
  ConfettiBurst,
  StarRating,
  NewBadge,
  MasteredBadge,
  // Types
  type StreakFireProps,
  type XPBadgeProps,
  type LevelProgressProps,
  type DailyGoalProps,
  type AchievementBadgeProps,
  type StatCardProps,
  type BounceCardProps,
  type ConfettiBurstProps,
  type StarRatingProps,
  type NewBadgeProps,
  type MasteredBadgeProps,
} from "./duolingo-components";
