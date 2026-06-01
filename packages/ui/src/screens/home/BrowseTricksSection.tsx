import { YStack, XStack } from 'tamagui';
import { Text } from '../../Text';
import { SearchInput } from '../../primitives/SearchInput';
import { SectionHeader } from '../../primitives/SectionHeader';
import { BrowseTrickTile } from './BrowseTrickTile';
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
  level: 'beginner' | 'unresponsive';
  durationSec: number;
  thumbnails: { default: string; hq: string; sd: string; max: string };
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

const PREVIEW_COUNT = 6;

function CategoryCellDisabled({ category }: { category: BrowseCategory }) {
  const hex = COLOR_HEX[category.color] ?? '#9bedff';
  const emoji = ICON_EMOJI[category.icon] ?? '🎯';
  return (
    <YStack
      width="48%"
      backgroundColor="white"
      borderRadius={14}
      padding={12}
      marginBottom={10}
      opacity={0.5}
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
          <Text fontSize={11} color="#8899A6">Coming soon</Text>
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

      {/* Category strip — kept as scaffolding, greyed out until we have manual tagging */}
      <YStack marginBottom={8}>
        <Text fontSize={11} color="#8899A6" marginBottom={6}>
          Categories — coming soon
        </Text>
        <XStack flexWrap="wrap" justifyContent="space-between">
          {categories.map((cat) => (
            <CategoryCellDisabled key={cat.id} category={cat} />
          ))}
        </XStack>
      </YStack>

      {previewTricks.length > 0 ? (
        <YStack marginTop={8} gap={12}>
          <XStack flexWrap="wrap" justifyContent="space-between" rowGap={12}>
            {previewTricks.map((trick) => (
              <YStack key={trick.id} width="48%">
                <BrowseTrickTile
                  name={trick.name}
                  level={trick.level}
                  durationSec={trick.durationSec}
                  thumbnails={trick.thumbnails}
                  onPress={() => onTrickPress(trick.id)}
                />
              </YStack>
            ))}
          </XStack>
          {(hasMore || onViewAllTricks) && (
            <YStack
              backgroundColor="white"
              borderRadius={14}
              padding={14}
              alignItems="center"
              onPress={onViewAllTricks}
              pressStyle={{ opacity: 0.7 }}
              cursor="pointer"
              {...NEU.card}
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
