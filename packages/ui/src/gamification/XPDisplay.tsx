import React from 'react';
import { styled, Stack, XStack, YStack, Text } from 'tamagui';
import { NEU } from '../tamagui.config';

/* ------------------------------------------------------------------ */
/*  LevelBadge                                                        */
/* ------------------------------------------------------------------ */

const BADGE_SIZES = { sm: 36, md: 52, lg: 72 } as const;
const FONT_SIZES = { sm: 14, md: 20, lg: 30 } as const;
const CROWN_SIZES = { sm: 10, md: 14, lg: 20 } as const;

export interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
}

const BadgeCircle = styled(Stack, {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$xpGold',
  borderWidth: 2,
  borderColor: '$xpGoldDark',
  animation: 'bouncy',
  enterStyle: { scale: 0 },
  variants: {
    badge: {
      sm: { width: 36, height: 36, borderRadius: 18 },
      md: { width: 52, height: 52, borderRadius: 26 },
      lg: { width: 72, height: 72, borderRadius: 36 },
    },
  } as const,
  defaultVariants: { badge: 'md' },
});

export function LevelBadge({ level, size = 'md' }: LevelBadgeProps) {
  return (
    <YStack alignItems="center">
      <Text fontSize={CROWN_SIZES[size]} lineHeight={CROWN_SIZES[size] + 4} marginBottom={-4}>
        {'👑'}
      </Text>
      <BadgeCircle badge={size} {...NEU.glowGold}>
        <Text color="white" fontWeight="800" fontSize={FONT_SIZES[size]}>
          {level}
        </Text>
      </BadgeCircle>
    </YStack>
  );
}

/* ------------------------------------------------------------------ */
/*  XPProgressBar                                                     */
/* ------------------------------------------------------------------ */

export interface XPProgressBarProps {
  current: number;
  required: number;
  animated?: boolean;
  height?: number;
}

export function XPProgressBar({
  current,
  required,
  animated = true,
  height = 12,
}: XPProgressBarProps) {
  const pct = required > 0 ? Math.min(100, Math.round((current / required) * 100)) : 100;

  return (
    <YStack gap={4}>
      <XStack
        height={height}
        backgroundColor="#dde1e7"
        borderRadius={height / 2}
        overflow="hidden"
        {...NEU.inset}
      >
        <YStack
          height={height}
          width={`${pct}%`}
          backgroundColor="$xpGold"
          borderRadius={height / 2}
          position="relative"
          overflow="hidden"
          {...(animated ? { animation: 'quick' } : {})}
        >
          {/* Glass highlight strip */}
          <YStack
            position="absolute"
            top={0}
            left={0}
            right={0}
            height="40%"
            backgroundColor="rgba(255,255,255,0.35)"
            borderTopLeftRadius={height / 2}
            borderTopRightRadius={height / 2}
          />
        </YStack>
      </XStack>

      <XStack justifyContent="space-between">
        <Text fontSize={11} color="$xpGoldDark" fontWeight="600">
          {current.toLocaleString()} / {required.toLocaleString()} XP
        </Text>
        <Text fontSize={11} color="$xpGoldDark" fontWeight="600">
          {pct}%
        </Text>
      </XStack>
    </YStack>
  );
}

/* ------------------------------------------------------------------ */
/*  XPDisplay                                                         */
/* ------------------------------------------------------------------ */

export interface XPDisplayProps {
  level: number;
  lifetimeXp: number;
  levelProgress: {
    current: number;
    required: number;
    isMaxLevel?: boolean;
  };
  variant?: 'compact' | 'full';
  onPress?: () => void;
}

const XPCard = styled(YStack, {
  borderRadius: 16,
  padding: '$4',
  backgroundColor: '#FFF8E1',
  borderWidth: 1,
  borderColor: '$xpGoldLight',
  animation: 'quick',
  enterStyle: { opacity: 0, y: 20 },
  pressStyle: { scale: 0.98, opacity: 0.9 },
});

function CompactVariant({ level, lifetimeXp, levelProgress }: Omit<XPDisplayProps, 'variant' | 'onPress'>) {
  const pct =
    levelProgress.required > 0
      ? Math.min(100, Math.round((levelProgress.current / levelProgress.required) * 100))
      : 100;

  return (
    <XStack alignItems="center" gap={10}>
      <LevelBadge level={level} size="sm" />

      <YStack flex={1} gap={2}>
        <XStack
          height={6}
          backgroundColor="#dde1e7"
          borderRadius={3}
          overflow="hidden"
        >
          <YStack
            height={6}
            width={`${pct}%`}
            backgroundColor="$xpGold"
            borderRadius={3}
            animation="quick"
          />
        </XStack>
        <Text fontSize={10} color="$xpGoldDark" fontWeight="600">
          {lifetimeXp.toLocaleString()} XP
        </Text>
      </YStack>
    </XStack>
  );
}

function FullVariant({ level, lifetimeXp, levelProgress }: Omit<XPDisplayProps, 'variant' | 'onPress'>) {
  return (
    <YStack gap={16} alignItems="center">
      <LevelBadge level={level} size="lg" />

      {/* XP count pill */}
      <XStack
        backgroundColor="$xpGold"
        paddingHorizontal={14}
        paddingVertical={6}
        borderRadius={20}
        alignItems="center"
        gap={6}
        {...NEU.glowGold}
      >
        <Text fontSize={14}>{'⭐'}</Text>
        <Text color="white" fontWeight="700" fontSize={15}>
          {lifetimeXp.toLocaleString()} XP
        </Text>
      </XStack>

      {/* Progress bar */}
      {!levelProgress.isMaxLevel && (
        <YStack width="100%" gap={6}>
          <XPProgressBar current={levelProgress.current} required={levelProgress.required} />
          <Text fontSize={12} color="$xpGoldDark" fontWeight="600" textAlign="center">
            Next: Level {level + 1}
          </Text>
        </YStack>
      )}

      {levelProgress.isMaxLevel && (
        <Text fontSize={13} color="$xpGold" fontWeight="700" textAlign="center">
          MAX LEVEL
        </Text>
      )}
    </YStack>
  );
}

export function XPDisplay({ level, lifetimeXp, levelProgress, variant = 'full', onPress }: XPDisplayProps) {
  if (variant === 'compact') {
    return (
      <XStack onPress={onPress} cursor={onPress ? 'pointer' : undefined}>
        <CompactVariant level={level} lifetimeXp={lifetimeXp} levelProgress={levelProgress} />
      </XStack>
    );
  }

  return (
    <XPCard onPress={onPress} cursor={onPress ? 'pointer' : undefined} {...NEU.card}>
      <FullVariant level={level} lifetimeXp={lifetimeXp} levelProgress={levelProgress} />
    </XPCard>
  );
}
