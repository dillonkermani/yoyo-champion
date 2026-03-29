import React from 'react';
import { YStack, XStack, Stack, ScrollView } from 'tamagui';
import { Text } from '../Text';
import { ProgressBar } from '../primitives/ProgressBar';

export interface FeaturedTrick {
  id: string;
  name: string;
  difficulty: number;
  genre: string;
  xpReward: number;
  emoji?: string;
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
  level: number;
  xp: number;
  streak: number;
  xpProgressPercent: number;
  featuredTricks: FeaturedTrick[];
  activePaths: ActivePath[];
  onTrickPress?: (id: string) => void;
  onPathPress?: (id: string) => void;
  onSeeAllTricks?: () => void;
  paddingTop?: number;
}

const T = {
  bg: '#F7F8FA',
  cardBg: '#FFFFFF',
  text: '#0F1419',
  textSub: '#536471',
  muted: '#8899A6',
  border: '#E1E8ED',
  accent: '#1CB0F6',
  accentDark: '#0095DB',
  accentLight: '#E8F7FE',
  accentDisabled: '#B8E4FA',
  gold: '#FFC800',
  goldLight: '#FFF8E1',
  purple: '#CE82FF',
  purpleLight: '#F5EEFF',
  orange: '#FF9600',
  orangeLight: '#FFF3E0',
  red: '#FF4B4B',
  green: '#58CC02',
  white: '#FFFFFF',
} as const;

const DIFF_COLORS = ['', T.accent, T.green, T.orange, T.purple, T.red];
const DIFF_LABELS = ['', 'Beginner', 'Easy', 'Intermediate', 'Advanced', 'Master'];
const TRICK_EMOJIS: Record<string, string> = {
  basics: '\uD83C\uDFAF', string: '\uD83E\uDDF6', looping: '\uD83D\uDD04',
  offstring: '\uD83C\uDF1F', tech: '\u2699\uFE0F', slack: '\uD83C\uDF0A',
};

// ── Stat Card ──────────────────────────────────────────────────────────
function StatPill({ emoji, label, value, color }: { emoji: string; label: string; value: string; color: string }) {
  return (
    <YStack
      flex={1}
      backgroundColor={T.cardBg}
      borderRadius={18}
      padding={14}
      alignItems="center"
      gap={6}
      borderWidth={1.5}
      borderColor={T.border}
      animation="quick"
      hoverStyle={{ borderColor: color, scale: 1.02 }}
      pressStyle={{ scale: 0.97 }}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 1 }}
      shadowRadius={4}
      shadowOpacity={0.06}
      elevation={2}
    >
      <Stack
        width={40}
        height={40}
        borderRadius={12}
        backgroundColor={`${color}18`}
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize={20}>{emoji}</Text>
      </Stack>
      <Text fontSize={18} fontWeight="900" color={T.text}>{value}</Text>
      <Text fontSize={11} fontWeight="600" color={T.muted} textTransform="uppercase" letterSpacing={0.5}>{label}</Text>
    </YStack>
  );
}

// ── Trick Card ─────────────────────────────────────────────────────────
function TrickRow({ trick, onPress }: { trick: FeaturedTrick; onPress?: () => void }) {
  const color = DIFF_COLORS[trick.difficulty] || T.accent;
  const label = DIFF_LABELS[trick.difficulty] || 'Beginner';
  const emoji = trick.emoji || TRICK_EMOJIS[trick.genre] || '\uD83E\uDE80';

  return (
    <XStack
      backgroundColor={T.cardBg}
      borderRadius={18}
      padding={16}
      borderWidth={1.5}
      borderColor={T.border}
      gap={14}
      alignItems="center"
      onPress={onPress}
      cursor={onPress ? 'pointer' : 'default'}
      animation="quick"
      pressStyle={onPress ? { scale: 0.98, opacity: 0.9 } : {}}
      hoverStyle={onPress ? { borderColor: color, scale: 1.01 } : {}}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 1 }}
      shadowRadius={4}
      shadowOpacity={0.06}
      elevation={2}
    >
      <Stack
        width={48}
        height={48}
        borderRadius={14}
        backgroundColor={`${color}15`}
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize={24}>{emoji}</Text>
      </Stack>
      <YStack flex={1} gap={4}>
        <Text fontSize={16} fontWeight="700" color={T.text}>{trick.name}</Text>
        <XStack gap={8} alignItems="center">
          <Stack
            backgroundColor={color}
            borderRadius={8}
            paddingHorizontal={8}
            paddingVertical={2}
          >
            <Text fontSize={11} fontWeight="700" color={T.white}>{label}</Text>
          </Stack>
          <Text fontSize={12} color={T.muted}>{trick.genre}</Text>
        </XStack>
      </YStack>
      <XStack
        backgroundColor={T.goldLight}
        borderRadius={10}
        paddingHorizontal={10}
        paddingVertical={5}
        gap={4}
        alignItems="center"
      >
        <Text fontSize={12}>{'\u2B50'}</Text>
        <Text fontSize={13} fontWeight="800" color={T.gold}>+{trick.xpReward}</Text>
      </XStack>
    </XStack>
  );
}

// ── Path Card ──────────────────────────────────────────────────────────
function PathRow({ path, onPress }: { path: ActivePath; onPress?: () => void }) {
  const color = DIFF_COLORS[path.difficulty] || T.accent;
  const label = DIFF_LABELS[path.difficulty] || 'Easy';

  return (
    <YStack
      backgroundColor={T.cardBg}
      borderRadius={18}
      padding={18}
      borderWidth={1.5}
      borderColor={T.border}
      gap={12}
      onPress={onPress}
      cursor={onPress ? 'pointer' : 'default'}
      animation="quick"
      pressStyle={onPress ? { scale: 0.98, opacity: 0.9 } : {}}
      hoverStyle={onPress ? { borderColor: color, scale: 1.01 } : {}}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 1 }}
      shadowRadius={4}
      shadowOpacity={0.06}
      elevation={2}
    >
      <XStack justifyContent="space-between" alignItems="flex-start">
        <YStack flex={1} gap={4}>
          <Text fontSize={16} fontWeight="700" color={T.text}>{path.title}</Text>
          <XStack gap={8} alignItems="center">
            <Stack backgroundColor={color} borderRadius={8} paddingHorizontal={8} paddingVertical={2}>
              <Text fontSize={11} fontWeight="700" color={T.white}>{label}</Text>
            </Stack>
            <Text fontSize={12} color={T.muted}>{path.progressPercent}% complete</Text>
          </XStack>
        </YStack>
        <XStack backgroundColor={T.goldLight} borderRadius={10} paddingHorizontal={10} paddingVertical={5} gap={4} alignItems="center">
          <Text fontSize={12}>{'\u2B50'}</Text>
          <Text fontSize={13} fontWeight="800" color={T.gold}>+{path.totalXp}</Text>
        </XStack>
      </XStack>
      <ProgressBar value={path.progressPercent} color={color} height={8} />
    </YStack>
  );
}

// ── Section Header ─────────────────────────────────────────────────────
function Section({ title, actionText, onAction, children }: { title: string; actionText?: string; onAction?: () => void; children: React.ReactNode }) {
  return (
    <YStack gap={14}>
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={22} fontWeight="900" color={T.text} letterSpacing={-0.5}>{title}</Text>
        {actionText && onAction && (
          <Text
            fontSize={14}
            fontWeight="700"
            color={T.accent}
            onPress={onAction}
            cursor="pointer"
            animation="quick"
            pressStyle={{ opacity: 0.6 }}
          >
            {actionText}
          </Text>
        )}
      </XStack>
      {children}
    </YStack>
  );
}

// ── Main Component ─────────────────────────────────────────────────────
export function HomeScreen({
  displayName,
  level,
  xp,
  streak,
  xpProgressPercent,
  featuredTricks,
  activePaths,
  onTrickPress,
  onPathPress,
  onSeeAllTricks,
  paddingTop = 0,
}: HomeScreenProps) {
  const xpPercent = typeof xpProgressPercent === 'object'
    ? ((xpProgressPercent as { current: number; required: number }).current / (xpProgressPercent as { current: number; required: number }).required) * 100
    : xpProgressPercent;

  return (
    <ScrollView
      flex={1}
      backgroundColor={T.bg}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <YStack
        maxWidth={640}
        alignSelf="center"
        width="100%"
        paddingHorizontal={20}
        paddingTop={paddingTop + 20}
        gap={28}
      >
        {/* ── Hero Header ─────────────────────────────────── */}
        <YStack gap={16}>
          <XStack justifyContent="space-between" alignItems="flex-start">
            <YStack gap={4}>
              <Text fontSize={14} color={T.muted} fontWeight="600">Welcome back</Text>
              <Text fontSize={28} fontWeight="900" color={T.text} letterSpacing={-0.8}>
                {displayName} {'\uD83D\uDC4B'}
              </Text>
            </YStack>
            {/* Level badge */}
            <Stack
              width={48}
              height={48}
              borderRadius={24}
              backgroundColor={T.gold}
              justifyContent="center"
              alignItems="center"
              shadowColor="#FFC800"
              shadowOffset={{ width: 0, height: 2 }}
              shadowRadius={12}
              shadowOpacity={0.4}
              elevation={3}
            >
              <Text fontSize={10} fontWeight="700" color={T.white} marginTop={-2}>{'\uD83D\uDC51'}</Text>
              <Text fontSize={16} fontWeight="900" color={T.white} marginTop={-4}>{level}</Text>
            </Stack>
          </XStack>

          {/* XP Progress */}
          <YStack gap={6}>
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize={13} fontWeight="600" color={T.textSub}>Level {level} Progress</Text>
              <Text fontSize={13} fontWeight="700" color={T.gold}>{Math.round(xpPercent)}%</Text>
            </XStack>
            <ProgressBar value={xpPercent} color={T.gold} height={10} />
          </YStack>
        </YStack>

        {/* ── Stats Row ───────────────────────────────────── */}
        <XStack gap={10}>
          <StatPill emoji={'\uD83D\uDD25'} label="Streak" value={`${streak}d`} color={T.red} />
          <StatPill emoji={'\u2B50'} label="Total XP" value={String(xp)} color={T.gold} />
          <StatPill emoji={'\uD83C\uDFC6'} label="Level" value={String(level)} color={T.accent} />
        </XStack>

        {/* ── Featured Tricks ─────────────────────────────── */}
        <Section title="Featured Tricks" actionText="See all" onAction={onSeeAllTricks}>
          <YStack gap={10}>
            {featuredTricks.map((trick) => (
              <TrickRow
                key={trick.id}
                trick={trick}
                onPress={onTrickPress ? () => onTrickPress(trick.id) : undefined}
              />
            ))}
          </YStack>
        </Section>

        {/* ── Your Paths ──────────────────────────────────── */}
        {activePaths.length > 0 && (
          <Section title="Your Paths">
            <YStack gap={10}>
              {activePaths.map((path) => (
                <PathRow
                  key={path.id}
                  path={path}
                  onPress={onPathPress ? () => onPathPress(path.id) : undefined}
                />
              ))}
            </YStack>
          </Section>
        )}
      </YStack>
    </ScrollView>
  );
}
