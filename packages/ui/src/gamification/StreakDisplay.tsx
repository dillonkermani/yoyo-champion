import React from 'react';
import { styled, Stack } from '@tamagui/core';
import { XStack, YStack, Text } from 'tamagui';
import { NEU } from '../tamagui.config'; // kept for glow effects only

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FlameSize = 'sm' | 'md' | 'lg';

interface AnimatedFlameProps {
  streak: number;
  size?: FlameSize;
}

interface StreakDisplayProps {
  streakCount: number;
  longestStreak: number;
  lastActivity: string; // ISO date string
  variant?: 'compact' | 'full';
  onPress?: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FLAME_SIZES: Record<FlameSize, { emoji: number; circle: number }> = {
  sm: { emoji: 18, circle: 32 },
  md: { emoji: 28, circle: 48 },
  lg: { emoji: 40, circle: 68 },
};

function getFlameBackground(streak: number): string {
  if (streak >= 30) return '#FF4B4B';
  if (streak >= 7) return '#FF9600';
  return '#FFC800';
}

function isToday(isoDate: string): boolean {
  const d = new Date(isoDate);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function getMilestone(streak: number): string | null {
  if (streak >= 365) return 'Legendary! One full year!';
  if (streak >= 100) return 'Triple digits — incredible!';
  if (streak >= 60) return 'Two months strong!';
  if (streak >= 30) return 'One month milestone!';
  if (streak >= 14) return 'Two weeks — keep it up!';
  if (streak >= 7) return 'One week streak!';
  return null;
}

function getDayLabels(): string[] {
  const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date().getDay();
  // Reorder so the row ends on today
  return [...labels.slice(today + 1), ...labels.slice(0, today + 1)];
}

function getActiveDays(streak: number): boolean[] {
  // Last 7 days, rightmost = today
  const days: boolean[] = [];
  const capped = Math.min(streak, 7);
  for (let i = 0; i < 7; i++) {
    days.push(i >= 7 - capped);
  }
  return days;
}

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const FlameCircle = styled(Stack, {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 1000,
  animation: 'quick',

  pressStyle: {
    scale: 1.15,
  },

  variants: {
    flameSize: {
      sm: { width: 32, height: 32 },
      md: { width: 48, height: 48 },
      lg: { width: 68, height: 68 },
    },
  } as const,

  defaultVariants: {
    flameSize: 'md',
  },
});

const Card = styled(YStack, {
  borderRadius: 18,
  padding: 16,
  borderWidth: 1,
  borderColor: 'rgba(255,150,0,0.2)',
  animation: 'quick',

  hoverStyle: {
    scale: 1.01,
  },

  pressStyle: {
    scale: 0.98,
    opacity: 0.9,
  },

  enterStyle: {
    opacity: 0,
    scale: 0.95,
  },
});

const DayDot = styled(Stack, {
  width: 28,
  height: 28,
  borderRadius: 14,
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'quick',

  enterStyle: {
    scale: 0,
    opacity: 0,
  },
});

// ---------------------------------------------------------------------------
// AnimatedFlame
// ---------------------------------------------------------------------------

export function AnimatedFlame({ streak, size = 'md' }: AnimatedFlameProps) {
  const dims = FLAME_SIZES[size];
  const bg = getFlameBackground(streak);

  return (
    <FlameCircle
      flameSize={size}
      backgroundColor={bg}
      {...(size === 'lg' ? NEU.glowRed : {})}
    >
      <Text fontSize={dims.emoji} lineHeight={dims.emoji + 4}>
        {'\uD83D\uDD25'}
      </Text>
    </FlameCircle>
  );
}

// ---------------------------------------------------------------------------
// StreakDisplay
// ---------------------------------------------------------------------------

export function StreakDisplay({
  streakCount,
  longestStreak,
  lastActivity,
  variant = 'full',
  onPress,
}: StreakDisplayProps) {
  const atRisk = !isToday(lastActivity);
  const milestone = getMilestone(streakCount);

  if (variant === 'compact') {
    return (
      <XStack
        alignItems="center"
        gap={8}
        onPress={onPress}
        {...(onPress ? { cursor: 'pointer' as const, pressStyle: { scale: 0.96, opacity: 0.85 } } : {})}
        animation="quick"
      >
        <AnimatedFlame streak={streakCount} size="sm" />
        <Text fontSize={18} fontWeight="700" color="$streakRed">
          {streakCount}
        </Text>
        <Text fontSize={13} color="#536471" marginTop={1}>
          days
        </Text>
      </XStack>
    );
  }

  const dayLabels = getDayLabels();
  const activeDays = getActiveDays(streakCount);

  return (
    <Card
      backgroundColor="rgba(255,150,0,0.06)"
      onPress={onPress}
      cursor={onPress ? 'pointer' : undefined}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowRadius={8}
      shadowOpacity={0.08}
      elevation={3}
    >
      {/* Header row */}
      <XStack alignItems="center" gap={12}>
        <AnimatedFlame streak={streakCount} size="lg" />
        <YStack flex={1}>
          <XStack alignItems="baseline" gap={6}>
            <Text fontSize={32} fontWeight="800" color="$streakRed">
              {streakCount}
            </Text>
            <Text fontSize={15} fontWeight="600" color="#536471">
              day streak
            </Text>
          </XStack>

          {/* Longest streak */}
          <XStack alignItems="center" gap={4} marginTop={2}>
            <Text fontSize={13}>{'\uD83C\uDFC6'}</Text>
            <Text fontSize={12} color="#536471">
              Longest: {longestStreak} days
            </Text>
          </XStack>
        </YStack>
      </XStack>

      {/* Milestone message */}
      {milestone && (
        <XStack
          marginTop={12}
          backgroundColor="rgba(255,200,0,0.15)"
          paddingVertical={6}
          paddingHorizontal={12}
          borderRadius={10}
          alignItems="center"
          gap={6}
        >
          <Text fontSize={14}>{'\u2B50'}</Text>
          <Text fontSize={13} fontWeight="600" color="$xpGold">
            {milestone}
          </Text>
        </XStack>
      )}

      {/* Streak at risk warning */}
      {atRisk && (
        <XStack
          marginTop={10}
          backgroundColor="rgba(255,75,75,0.12)"
          paddingVertical={6}
          paddingHorizontal={12}
          borderRadius={10}
          alignItems="center"
          gap={6}
        >
          <Text fontSize={14}>{'\u26A0\uFE0F'}</Text>
          <Text fontSize={13} fontWeight="600" color="$streakRed">
            Streak at risk — practice today!
          </Text>
        </XStack>
      )}

      {/* 7-day calendar */}
      <XStack marginTop={14} justifyContent="space-between" paddingHorizontal={4}>
        {dayLabels.map((label, i) => {
          const active = activeDays[i];
          return (
            <YStack key={i} alignItems="center" gap={4}>
              <Text fontSize={10} color="#536471" fontWeight="500">
                {label}
              </Text>
              <DayDot
                backgroundColor={active ? '$brandOrange' : '#EEF0F3'}
                {...(active ? NEU.glowGold : {})}
              >
                {active && (
                  <Text fontSize={12} color="white" fontWeight="700">
                    {'\u2713'}
                  </Text>
                )}
              </DayDot>
            </YStack>
          );
        })}
      </XStack>
    </Card>
  );
}
