import { styled } from '@tamagui/core';
import { Stack, XStack, YStack, Text } from 'tamagui';
import { NEU } from '../tamagui.config';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type BadgeCategory = 'streak' | 'mastery' | 'explorer' | 'social' | 'milestone' | 'special';

export interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  category: BadgeCategory;
  unlockedAt: string;
}

export interface BadgeCardProps {
  badge: BadgeData;
  isLocked?: boolean;
  lockedDescription?: string;
  isNew?: boolean;
  showDetails?: boolean;
  onPress?: () => void;
}

export interface MiniBadgeProps {
  badge: Pick<BadgeData, 'icon' | 'name' | 'rarity'>;
  onPress?: () => void;
}

// ---------------------------------------------------------------------------
// Rarity mappings
// ---------------------------------------------------------------------------

const RARITY_BG: Record<BadgeRarity, string> = {
  common: '#f3f4f6',
  uncommon: '#e0f2fe',
  rare: '#dbeafe',
  epic: '#f3e8ff',
  legendary: '#fef3c7',
};

const RARITY_BORDER: Record<BadgeRarity, string> = {
  common: '#d1d5db',
  uncommon: '#7dd3fc',
  rare: '#93c5fd',
  epic: '#c084fc',
  legendary: '#fbbf24',
};

const RARITY_GLOW: Record<BadgeRarity, typeof NEU.card> = {
  common: NEU.card,
  uncommon: NEU.glowAqua,
  rare: NEU.glowRare,
  epic: NEU.glowEpic,
  legendary: NEU.glowLegendary,
};

const RARITY_LABEL: Record<BadgeRarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

const CATEGORY_EMOJI: Record<BadgeCategory, string> = {
  streak: '🔥',
  mastery: '⭐',
  explorer: '🧭',
  social: '👥',
  milestone: '🏆',
  special: '✨',
};

// ---------------------------------------------------------------------------
// Styled base card
// ---------------------------------------------------------------------------

const CardFrame = styled(YStack, {
  name: 'BadgeCard',
  borderRadius: 16,
  padding: 16,
  borderWidth: 1.5,
  overflow: 'hidden',
  animation: 'quick',
  cursor: 'pointer',
  hoverStyle: { scale: 1.03, y: -5 },
  pressStyle: { scale: 0.98, ...NEU.pressed },
});

// ---------------------------------------------------------------------------
// BadgeCard
// ---------------------------------------------------------------------------

export function BadgeCard({
  badge,
  isLocked = false,
  lockedDescription,
  isNew = false,
  showDetails = true,
  onPress,
}: BadgeCardProps) {
  const rarity = badge.rarity;
  const glowStyle = isLocked ? NEU.card : RARITY_GLOW[rarity];
  const displayIcon = isLocked ? '❓' : badge.icon;
  const displayName = isLocked ? '???' : badge.name;
  const displayDesc = isLocked
    ? lockedDescription ?? 'Keep playing to unlock this badge!'
    : badge.description;

  const formattedDate = isLocked
    ? undefined
    : new Date(badge.unlockedAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

  return (
    <CardFrame
      backgroundColor={isLocked ? '#f0f0f0' : RARITY_BG[rarity]}
      borderColor={isLocked ? '#aaa' : RARITY_BORDER[rarity]}
      borderStyle={isLocked ? 'dashed' : 'solid'}
      opacity={isLocked ? 0.7 : 1}
      {...glowStyle}
      {...(isNew
        ? {
            animation: 'bouncy' as const,
            enterStyle: { scale: 0, opacity: 0 },
          }
        : {})}
      onPress={onPress}
    >
      {/* Rarity label — top-right corner */}
      {!isLocked && (
        <XStack
          position="absolute"
          top={8}
          right={8}
          backgroundColor={`$rarity${rarity.charAt(0).toUpperCase()}${rarity.slice(1)}` as any}
          paddingHorizontal={8}
          paddingVertical={3}
          borderRadius={8}
        >
          <Text fontSize={10} fontWeight="700" color="white">
            {RARITY_LABEL[rarity]}
          </Text>
        </XStack>
      )}

      {/* Lock indicator for locked badges */}
      {isLocked && (
        <XStack position="absolute" top={8} right={8}>
          <Text fontSize={14}>🔒</Text>
        </XStack>
      )}

      {/* Icon circle */}
      <Stack
        alignSelf="center"
        width={56}
        height={56}
        borderRadius={28}
        backgroundColor={isLocked ? '#ddd' : RARITY_BORDER[rarity]}
        alignItems="center"
        justifyContent="center"
        marginBottom={10}
        {...(rarity === 'legendary' && !isLocked
          ? {
              animation: 'quick',
              hoverStyle: { scale: 1.1 },
              ...NEU.glowLegendary,
            }
          : {})}
      >
        <Text fontSize={28} textAlign="center">
          {displayIcon}
        </Text>
      </Stack>

      {/* Name */}
      <Text
        fontSize={15}
        fontWeight="700"
        textAlign="center"
        color={isLocked ? '#999' : '#1a1a2e'}
        marginBottom={4}
        numberOfLines={1}
      >
        {displayName}
      </Text>

      {/* Details section */}
      {showDetails && (
        <YStack gap={4} marginTop={4}>
          <Text
            fontSize={12}
            color={isLocked ? '#aaa' : '#555'}
            textAlign="center"
            numberOfLines={2}
          >
            {displayDesc}
          </Text>

          {!isLocked && (
            <XStack justifyContent="center" alignItems="center" gap={6} marginTop={4}>
              <Text fontSize={11} color="$rarityCommon">
                {CATEGORY_EMOJI[badge.category]} {badge.category}
              </Text>
              {formattedDate && (
                <Text fontSize={11} color="$rarityCommon">
                  · {formattedDate}
                </Text>
              )}
            </XStack>
          )}
        </YStack>
      )}
    </CardFrame>
  );
}

// ---------------------------------------------------------------------------
// MiniBadge — compact pill display
// ---------------------------------------------------------------------------

const PillFrame = styled(XStack, {
  name: 'MiniBadge',
  alignItems: 'center',
  gap: 5,
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 20,
  borderWidth: 1,
  animation: 'quick',
  cursor: 'pointer',
  hoverStyle: { scale: 1.05 },
  pressStyle: { scale: 0.97, ...NEU.pressed },
});

export function MiniBadge({ badge, onPress }: MiniBadgeProps) {
  return (
    <PillFrame
      backgroundColor={RARITY_BG[badge.rarity]}
      borderColor={RARITY_BORDER[badge.rarity]}
      onPress={onPress}
    >
      <Text fontSize={16}>{badge.icon}</Text>
      <Text fontSize={12} fontWeight="600" color="#1a1a2e" numberOfLines={1}>
        {badge.name}
      </Text>
    </PillFrame>
  );
}
