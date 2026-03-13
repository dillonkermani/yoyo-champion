import React from 'react';
import { YStack, XStack } from 'tamagui';
import { TrickCard } from '../TrickCard';
import { SearchInput } from '../primitives/SearchInput';
import { FilterChip } from '../primitives/FilterChip';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { Text } from '../Text';
import { NEU } from '../tamagui.config';

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
  onBack?: () => void;
  categoryId?: string;
  categoryName?: string;
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
  onBack,
  categoryName,
  paddingTop = 0,
}: LearnScreenProps) {
  const title = categoryName ?? 'Trick Library';

  return (
    <ScreenContainer scrollable paddingTop={paddingTop}>
      <YStack padding={20} gap={12}>
        {onBack ? (
          <XStack alignItems="center" gap={10}>
            <XStack
              onPress={onBack}
              backgroundColor="$neuSurface"
              borderRadius={12}
              width={36}
              height={36}
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              animation="quick"
              pressStyle={{ opacity: 0.7, ...NEU.pressed }}
              {...NEU.button}
            >
              <Text fontSize={18} color="#2d3436">{'<'}</Text>
            </XStack>
            <Text fontSize={22} fontWeight="800" letterSpacing={-0.5} color="#2d3436">{title}</Text>
          </XStack>
        ) : (
          <Text fontSize={22} fontWeight="800" letterSpacing={-0.5} color="#2d3436">{title}</Text>
        )}
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
        <Text fontSize={12} letterSpacing={0.3} color="#636e72">{tricks.length} tricks</Text>
      </YStack>
      <YStack padding={20} paddingTop={0}>
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
