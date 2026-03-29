export { Button } from './Button';
export { Text } from './Text';
export { tamaguiConfig, type TamaguiConfig, NEU } from './tamagui.config';
export { StatsBar } from './StatsBar';
export type { StatItem, StatsBarProps } from './StatsBar';
export { TrickCard } from './TrickCard';
export type { TrickCardProps } from './TrickCard';
export { YoyoCase } from './YoyoCase';
export type { YoyoSlot, YoyoCaseProps } from './YoyoCase';
export { AvatarDisplay } from './AvatarDisplay';
export type { AvatarDisplayProps } from './AvatarDisplay';
export { getDifficultyLabel, getDifficultyColor, formatXP, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from './utils';

// Primitives
export { ScreenContainer } from './primitives/ScreenContainer';
export type { ScreenContainerProps } from './primitives/ScreenContainer';
export { ProgressBar } from './primitives/ProgressBar';
export type { ProgressBarProps } from './primitives/ProgressBar';
export { DifficultyTag } from './primitives/DifficultyTag';
export type { DifficultyTagProps } from './primitives/DifficultyTag';
export { FilterChip } from './primitives/FilterChip';
export type { FilterChipProps } from './primitives/FilterChip';
export { SearchInput } from './primitives/SearchInput';
export type { SearchInputProps } from './primitives/SearchInput';
export { SectionHeader } from './primitives/SectionHeader';
export type { SectionHeaderProps } from './primitives/SectionHeader';

// Cards
export { PathCard } from './cards/PathCard';
export type { PathCardProps } from './cards/PathCard';
export { TrickDetailHero } from './cards/TrickDetailHero';
export type { TrickDetailHeroProps } from './cards/TrickDetailHero';
export { CategoryCard } from './cards/CategoryCard';
export type { CategoryCardProps } from './cards/CategoryCard';

// Screens
export { HomeScreen } from './screens/HomeScreen';
export type { HomeScreenProps, FeaturedTrick, ActivePath } from './screens/HomeScreen';
export { UploadsGrid } from './UploadsGrid';
export type { UploadsGridProps, UploadThumbnail } from './UploadsGrid';
export { LearnScreen } from './screens/LearnScreen';
export type { LearnScreenProps, LearnTrick } from './screens/LearnScreen';
export { TrickDetailScreen } from './screens/TrickDetailScreen';
export type { TrickDetailScreenProps, TrickStep as TrickDetailStep } from './screens/TrickDetailScreen';
export { ProfileScreen } from './screens/ProfileScreen';
export type { ProfileScreenProps, ProfileBadge, ProfileYoyo, ProfileStat, WishlistItem } from './screens/ProfileScreen';
export { OnboardingScreen } from './screens/OnboardingScreen';
export type { OnboardingScreenProps, OnboardingChoice } from './screens/OnboardingScreen';
export { ShopScreen } from './screens/ShopScreen';
export type { ShopScreenProps, ShopProduct } from './screens/ShopScreen';
export { AuthScreen } from './screens/AuthScreen';
export type { AuthScreenProps } from './screens/AuthScreen';
export { CategoryBrowseScreen } from './screens/CategoryBrowseScreen';
export type { CategoryBrowseScreenProps, CategoryItem } from './screens/CategoryBrowseScreen';
export { ForYouScreen } from './screens/ForYouScreen';
export type { ForYouScreenProps, FeedVideo } from './screens/ForYouScreen';
export { VideoPlayer } from './VideoPlayer';
export type { VideoPlayerProps } from './VideoPlayer';
export { UploadScreen } from './screens/UploadScreen';
export type { UploadScreenProps } from './screens/UploadScreen';
export { VideoComments } from './VideoComments';
export type { VideoComment, VideoCommentsProps } from './VideoComments';

// Primitives — new
export { AnimatedTabPicker } from './primitives/AnimatedTabPicker';
export type { TabItem, AnimatedTabPickerProps } from './primitives/AnimatedTabPicker';
export { CustomTabBar, WebTabBar, TAB_ROUTE_NAMES } from './primitives/CustomTabBar';
export type { TabRouteName } from './primitives/CustomTabBar';

// Assets
export { Logo } from './assets/Logo';
export type { LogoProps } from './assets/Logo';
export { Mascot, HappyMascot, ExcitedMascot, SadMascot, CelebratingMascot, ThinkingMascot, EncouragingMascot } from './assets/Mascot';
export type { MascotMood, MascotProps } from './assets/Mascot';

// Screens — new
export { OnboardingWizard } from './screens/OnboardingWizard';
export type { OnboardingWizardProps } from './screens/OnboardingWizard';

// Gamification
export { BadgeCard, MiniBadge } from './gamification/BadgeCard';
export type { BadgeRarity, BadgeCategory, BadgeData, BadgeCardProps, MiniBadgeProps } from './gamification/BadgeCard';
export { StreakDisplay, AnimatedFlame } from './gamification/StreakDisplay';
export { XPDisplay, LevelBadge, XPProgressBar } from './gamification/XPDisplay';
export {
  ENCOURAGING_MESSAGES, getRandomMessage,
  StreakFire, XPBadge, DailyGoal, AchievementBadge,
  StatCard, BounceCard, StarRating, NewBadge, MasteredBadge,
} from './gamification/DuolingoComponents';
export { SkillTree, SkillNode, CheckpointNode, SectionHeader as SkillTreeSectionHeader } from './gamification/SkillTree';
export type { NodeState, SkillTreeCategory, SkillTreeSection, TrickInfo, SkillTreeProps, SkillNodeProps, SectionHeaderProps as SkillTreeSectionHeaderProps, CheckpointNodeProps } from './gamification/SkillTree';
