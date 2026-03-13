import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { TrickCard } from '../TrickCard';
import { StatsBar } from '../StatsBar';
import { SectionHeader } from '../primitives/SectionHeader';
import { PathCard } from '../cards/PathCard';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { UploadsGrid, type UploadThumbnail } from '../UploadsGrid';
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
  trickProgress: number;
  uploadReputation: number;
  trainerStatus: string;
  collectorLevel: string;
  followersCount: number;
  uploads: UploadThumbnail[];
  featuredTricks: FeaturedTrick[];
  activePaths: ActivePath[];
  onTrickPress?: (id: string) => void;
  onPathPress?: (id: string) => void;
  onSeeAllTricks?: () => void;
  onUploadPress?: (id: string) => void;
  paddingTop?: number;
}

export function HomeScreen({
  displayName,
  trickProgress,
  uploadReputation,
  trainerStatus,
  collectorLevel,
  followersCount,
  uploads,
  featuredTricks,
  activePaths,
  onTrickPress,
  onPathPress,
  onSeeAllTricks,
  onUploadPress,
  paddingTop = 0,
}: HomeScreenProps) {
  return (
    <ScreenContainer scrollable paddingTop={paddingTop}>
      {/* Header — raised neumorphic panel */}
      <YStack backgroundColor="$neuSurfaceLight" padding={20} paddingTop={16} {...NEU.card}>
        <Text fontSize={22} fontWeight="800" color="$brandAqua" marginBottom={4}>YoYo Champion</Text>
        <Text fontSize={15} color="#636e72">Welcome back, {displayName}</Text>
        <XStack marginTop={8} alignItems="center" gap={6}>
          <Text fontSize={13} fontWeight="600" color="$brandPurple">{followersCount}</Text>
          <Text fontSize={12} color="#636e72">followers</Text>
        </XStack>
      </YStack>

      {/* Stats — 4-stat layout */}
      <YStack padding={20}>
        <StatsBar stats={[
          { label: 'Trick Progress', value: String(trickProgress), color: '#1CB0F6' },
          { label: 'Upload Rep', value: String(uploadReputation), color: '#CE82FF' },
          { label: 'Trainer', value: formatTrainerStatus(trainerStatus), color: '#FF9600' },
          { label: 'Collector', value: collectorLevel, color: '#FFC800' },
        ]} />
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

      {/* All Uploads */}
      <YStack padding={20} paddingTop={0}>
        <SectionHeader title="All Uploads" />
        <UploadsGrid uploads={uploads} onUploadPress={onUploadPress} />
      </YStack>

      <YStack height={100} />
    </ScreenContainer>
  );
}

function formatTrainerStatus(status: string): string {
  switch (status) {
    case 'master_trainer': return 'Master';
    case 'intermediate_trainer': return 'Inter.';
    case 'beginner_trainer': return 'Beginner';
    default: return 'None';
  }
}
