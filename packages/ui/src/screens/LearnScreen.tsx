import { YStack, XStack } from 'tamagui';
import { BrowseTrickTile } from './home/BrowseTrickTile';
import { SearchInput } from '../primitives/SearchInput';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { Text } from '../Text';
import { NEU } from '../tamagui.config';

export interface LearnTrick {
  id: string;
  name: string;
  level: 'beginner' | 'unresponsive';
  durationSec: number;
  thumbnails: { default: string; hq: string; sd: string; max: string };
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
              backgroundColor="white"
              borderRadius={12}
              width={36}
              height={36}
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              animation="quick"
              pressStyle={{ opacity: 0.9, scale: 0.97 }}
              {...NEU.button}
            >
              <Text fontSize={18} color="#0F1419">{'<'}</Text>
            </XStack>
            <Text fontSize={22} fontWeight="800" letterSpacing={-0.5} color="#0F1419">{title}</Text>
          </XStack>
        ) : (
          <Text fontSize={22} fontWeight="800" letterSpacing={-0.5} color="#0F1419">{title}</Text>
        )}
        <SearchInput value={searchQuery} onChangeText={onSearchChange} placeholder="Search tricks..." />
        {/* Difficulty chips kept as scaffolding while we collect manual tagging. */}
        <YStack gap={4} opacity={0.45} pointerEvents="none">
          <XStack gap={8} flexWrap="wrap">
            {FILTERS.map((filter) => (
              <XStack
                key={filter}
                backgroundColor="white"
                borderRadius={100}
                paddingHorizontal={12}
                paddingVertical={6}
                {...NEU.button}
              >
                <Text fontSize={12} fontWeight="700" color="#536471">{filter}</Text>
              </XStack>
            ))}
          </XStack>
          <Text fontSize={11} color="#8899A6">Difficulty filters — coming soon</Text>
        </YStack>
        <Text fontSize={12} letterSpacing={0.3} color="#536471">{tricks.length} tricks</Text>
      </YStack>
      <YStack padding={20} paddingTop={0}>
        <XStack flexWrap="wrap" justifyContent="space-between" rowGap={12}>
          {tricks.map((trick) => (
            <YStack key={trick.id} width="48%">
              <BrowseTrickTile
                name={trick.name}
                level={trick.level}
                durationSec={trick.durationSec}
                thumbnails={trick.thumbnails}
                onPress={onTrickPress ? () => onTrickPress(trick.id) : undefined}
              />
            </YStack>
          ))}
        </XStack>
      </YStack>
      <YStack height={100} />
    </ScreenContainer>
  );
}
