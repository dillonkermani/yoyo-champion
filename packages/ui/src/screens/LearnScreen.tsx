import React from 'react';
import { YStack, XStack } from 'tamagui';
import { TrickCard } from '../TrickCard';
import { SearchInput } from '../primitives/SearchInput';
import { FilterChip } from '../primitives/FilterChip';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { Text } from '../Text';

export interface LearnTrick {
  id: string;
  name: string;
  difficulty: number;
  genre: string;
  xpReward: number;
}

export interface LearnScreenProps {
  tricks: LearnTrick[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onTrickPress?: (id: string) => void;
  paddingTop?: number;
}

const FILTERS = ['All', 'Beginner', 'Easy', 'Intermediate', 'Advanced', 'Master'];

export function LearnScreen({
  tricks,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  onTrickPress,
  paddingTop = 0,
}: LearnScreenProps) {
  return (
    <ScreenContainer scrollable paddingTop={paddingTop} backgroundColor="$backgroundStrong">
      <YStack padding={16} gap={12}>
        <Text fontSize={22} fontWeight="900" color="$color">Trick Library</Text>
        <SearchInput value={searchQuery} onChangeText={onSearchChange} placeholder="Search tricks..." />
        <XStack gap={8} flexWrap="wrap">
          {FILTERS.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              selected={activeFilter === filter}
              onPress={() => onFilterChange(filter)}
            />
          ))}
        </XStack>
        <Text fontSize={13} color="$colorSubtitle">{tricks.length} tricks</Text>
      </YStack>
      <YStack padding={16} paddingTop={0}>
        {tricks.map((trick) => (
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
      <YStack height={100} />
    </ScreenContainer>
  );
}
