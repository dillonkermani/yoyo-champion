import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { TrickCard } from '../TrickCard';
import { StatsBar } from '../StatsBar';
import { ProgressBar } from '../primitives/ProgressBar';
import { SectionHeader } from '../primitives/SectionHeader';
import { PathCard } from '../cards/PathCard';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { NEU } from '../tamagui.config';

export interface FeaturedTrick {
  id: string;
  name: string;
  difficulty: number;
  genre: string;
  xpReward: number;
}

export interface ActivePath {
  id: string;
  title: string;
  difficulty: number;
  progressPercent: number;
  totalXp: number;
}

export interface HomeScreenProps {
  displayName: string;
  xp: number;
  level: number;
  streak: number;
  xpProgressPercent: number;
  featuredTricks: FeaturedTrick[];
  activePaths: ActivePath[];
  onTrickPress?: (id: string) => void;
  onPathPress?: (id: string) => void;
  onSeeAllTricks?: () => void;
  paddingTop?: number;
}

export function HomeScreen({
  displayName,
  xp,
  level,
  streak,
  xpProgressPercent,
  featuredTricks,
  activePaths,
  onTrickPress,
  onPathPress,
  onSeeAllTricks,
  paddingTop = 0,
}: HomeScreenProps) {
  return (
    <ScreenContainer scrollable paddingTop={paddingTop}>
      {/* Header — raised neumorphic panel */}
      <YStack backgroundColor="$neuSurfaceLight" padding={20} paddingTop={16} {...NEU.card}>
        <Text fontSize={22} fontWeight="800" color="$brandAqua" marginBottom={4}>YoYo Champion</Text>
        <Text fontSize={15} color="#636e72">Welcome back, {displayName}</Text>
      </YStack>

      {/* Stats */}
      <YStack padding={20}>
        <StatsBar stats={[
          { label: 'Level', value: String(level) },
          { label: 'XP', value: String(xp) },
          { label: 'Streak', value: `${streak}d` },
        ]} />
        <YStack marginTop={12} gap={4}>
          <XStack justifyContent="space-between">
            <Text fontSize={12} color="#636e72">XP Progress to next level</Text>
            <Text fontSize={12} fontWeight="700" color="$brandAqua">{Math.round(xpProgressPercent)}%</Text>
          </XStack>
          <ProgressBar value={xpProgressPercent} color="#1CB0F6" />
        </YStack>
      </YStack>

      {/* Featured Tricks */}
      <YStack padding={20} paddingTop={0}>
        <SectionHeader title="Featured Tricks" onSeeAll={onSeeAllTricks} />
        {featuredTricks.map((trick) => (
          <TrickCard
            key={trick.id}
            name={trick.name}
            difficulty={trick.difficulty}
            genre={trick.genre}
            xpReward={trick.xpReward}
            onPress={onTrickPress ? () => onTrickPress(trick.id) : undefined}
          />
        ))}
      </YStack>

      {/* Active Paths */}
      {activePaths.length > 0 && (
        <YStack padding={20} paddingTop={0}>
          <SectionHeader title="Your Paths" />
          {activePaths.map((path) => (
            <PathCard
              key={path.id}
              title={path.title}
              difficulty={path.difficulty}
              progressPercent={path.progressPercent}
              totalXp={path.totalXp}
              onPress={onPathPress ? () => onPathPress(path.id) : undefined}
            />
          ))}
        </YStack>
      )}

      <YStack height={100} />
    </ScreenContainer>
  );
}
