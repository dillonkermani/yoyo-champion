export { Button } from './Button';
export { Text } from './Text';
export { tamaguiConfig, type TamaguiConfig } from './tamagui.config';
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

// Screens
export { HomeScreen } from './screens/HomeScreen';
export type { HomeScreenProps, FeaturedTrick, ActivePath } from './screens/HomeScreen';
export { LearnScreen } from './screens/LearnScreen';
export type { LearnScreenProps, LearnTrick } from './screens/LearnScreen';
export { TrickDetailScreen } from './screens/TrickDetailScreen';
export type { TrickDetailScreenProps, TrickStep as TrickDetailStep } from './screens/TrickDetailScreen';
export { ProfileScreen } from './screens/ProfileScreen';
export type { ProfileScreenProps, ProfileBadge, ProfileYoyo, ProfileStat } from './screens/ProfileScreen';
export { OnboardingScreen } from './screens/OnboardingScreen';
export type { OnboardingScreenProps, OnboardingChoice } from './screens/OnboardingScreen';
export { ShopScreen } from './screens/ShopScreen';
export type { ShopScreenProps, ShopProduct } from './screens/ShopScreen';
