import React from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../../Text';
import { SearchInput } from '../../primitives/SearchInput';
import { SectionHeader } from '../../primitives/SectionHeader';
import { TrickCard } from '../../TrickCard';
import { NEU } from '../../tamagui.config';

export interface BrowseCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  trickCount: number;
}

export interface BrowseTrick {
  id: string;
  name: string;
  difficulty: number;
  genre: string;
  xpReward: number;
}

export interface BrowseTricksSectionProps {
  categories: BrowseCategory[];
  tricks: BrowseTrick[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategoryId: string | null;
  onCategoryPress: (categoryId: string) => void;
  onTrickPress: (trickId: string) => void;
  onViewAllTricks?: () => void;
}

const ICON_EMOJI: Record<string, string> = {
  Target: '🎯',
  Sparkles: '✨',
  Zap: '⚡',
  Cpu: '🔧',
  Wind: '🌀',
  RotateCcw: '🔄',
  Rocket: '🚀',
  Hand: '🤚',
};

const COLOR_HEX: Record<string, string> = {
  teal: '#14B8A6',
  blue: '#9bedff',
  purple: '#CE82FF',
  cyan: '#00D9FF',
  pink: '#FF86D0',
  yellow: '#FFC800',
  orange: '#FF9600',
  red: '#FF4B4B',
};

const PREVIEW_COUNT = 3;

function CategoryCell({
  category,
  selected,
  onPress,
}: {
  category: BrowseCategory;
  selected: boolean;
  onPress: () => void;
}) {
  const hex = COLOR_HEX[category.color] ?? '#9bedff';
  const emoji = ICON_EMOJI[category.icon] ?? '🎯';

  return (
    <YStack
      width="48%"
      backgroundColor={selected ? `${hex}15` : 'white'}
      borderRadius={14}
      padding={12}
      marginBottom={10}
      borderWidth={2}
      borderColor={selected ? hex : 'transparent'}
      onPress={onPress}
      pressStyle={{ opacity: 0.85 }}
      cursor="pointer"
      {...NEU.card}
    >
      <XStack alignItems="center" gap={10}>
        <YStack
          width={36}
          height={36}
          borderRadius={10}
          backgroundColor={`${hex}20`}
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={18}>{emoji}</Text>
        </YStack>
        <YStack flex={1}>
          <Text fontSize={13} fontWeight="700" color="#0F1419" numberOfLines={1}>
            {category.name}
          </Text>
          <Text fontSize={11} color="#8899A6">
            {category.trickCount} tricks
          </Text>
        </YStack>
      </XStack>
    </YStack>
  );
}

export function BrowseTricksSection({
  categories,
  tricks,
  searchQuery,
  onSearchChange,
  selectedCategoryId,
  onCategoryPress,
  onTrickPress,
  onViewAllTricks,
}: BrowseTricksSectionProps) {
  const previewTricks = tricks.slice(0, PREVIEW_COUNT);
  const hasMore = tricks.length > PREVIEW_COUNT;

  return (
    <YStack paddingHorizontal={20}>
      <SectionHeader title="Browse Tricks" />
      <YStack marginBottom={16}>
        <SearchInput value={searchQuery} onChangeText={onSearchChange} placeholder="Search tricks by name..." />
      </YStack>

      <XStack flexWrap="wrap" justifyContent="space-between">
        {categories.map((cat) => (
          <CategoryCell
            key={cat.id}
            category={cat}
            selected={selectedCategoryId === cat.id}
            onPress={() => onCategoryPress(cat.id)}
          />
        ))}
      </XStack>

      {previewTricks.length > 0 ? (
        <YStack marginTop={8}>
          {previewTricks.map((trick) => (
            <TrickCard
              key={trick.id}
              name={trick.name}
              difficulty={trick.difficulty}
              genre={trick.genre}
              xpReward={trick.xpReward}
              onPress={() => onTrickPress(trick.id)}
            />
          ))}
          {(hasMore || onViewAllTricks) && (
            <YStack
              backgroundColor="white"
              borderRadius={14}
              padding={14}
              alignItems="center"
              onPress={onViewAllTricks}
              pressStyle={{ opacity: 0.7 }}
              cursor="pointer"
              shadowColor="#000"
              shadowOffset={{ width: 0, height: 2 }}
              shadowRadius={8}
              shadowOpacity={0.08}
              elevation={3}
            >
              <Text fontSize={14} fontWeight="700" color="$brandAqua">
                View All{tricks.length > PREVIEW_COUNT ? ` (${tricks.length})` : ''}
              </Text>
            </YStack>
          )}
        </YStack>
      ) : searchQuery.trim() ? (
        <YStack alignItems="center" paddingVertical={24}>
          <Text fontSize={14} color="#8899A6">No tricks found for &ldquo;{searchQuery}&rdquo;</Text>
        </YStack>
      ) : null}
    </YStack>
  );
}
