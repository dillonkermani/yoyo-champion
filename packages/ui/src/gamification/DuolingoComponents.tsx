import { styled, Stack, type StackProps } from '@tamagui/core'
import { YStack, XStack, Text } from 'tamagui'
import { NEU } from '../tamagui.config' // kept for reference only

// ---------------------------------------------------------------------------
// 1. Encouraging messages
// ---------------------------------------------------------------------------

export const ENCOURAGING_MESSAGES = {
  greeting: ['Hey champion!', 'Welcome back!', 'Ready to throw?', 'Let\'s go!', 'Time to level up!'],
  progress: ['Keep it up!', 'You\'re on fire!', 'Crushing it!', 'Making progress!', 'Almost there!'],
  streak: ['Don\'t break the chain!', 'Streak master!', 'Consistency is key!', 'Another day, another win!'],
  selection: ['Great choice!', 'Nice pick!', 'Solid selection!', 'You\'ve got taste!'],
  mastery: ['You nailed it!', 'Trick mastered!', 'Legend status!', 'Perfection!', 'Absolute pro!'],
} as const

export type MessageCategory = keyof typeof ENCOURAGING_MESSAGES

export function getRandomMessage(category: MessageCategory): string {
  const msgs = ENCOURAGING_MESSAGES[category]
  return msgs[Math.floor(Math.random() * msgs.length)]
}

// ---------------------------------------------------------------------------
// 2. StreakFire
// ---------------------------------------------------------------------------

const SIZE_MAP = { sm: 28, md: 40, lg: 56 } as const
const FONT_MAP = { sm: 11, md: 14, lg: 18 } as const
const EMOJI_MAP = { sm: 14, md: 20, lg: 28 } as const

export type GamificationSize = 'sm' | 'md' | 'lg'

function streakColor(count: number): string {
  if (count >= 30) return '#FF4B4B'
  if (count >= 7) return '#FF9600'
  return '#FFC800'
}

export interface StreakFireProps {
  count: number
  size?: GamificationSize
  showLabel?: boolean
}

export function StreakFire({ count, size = 'md', showLabel = false }: StreakFireProps) {
  const dim = SIZE_MAP[size]
  const bg = streakColor(count)
  return (
    <YStack alignItems="center" gap={4}>
      <Stack
        width={dim}
        height={dim}
        borderRadius={dim / 2}
        backgroundColor={bg}
        alignItems="center"
        justifyContent="center"
        animation="quick"
        enterStyle={{ scale: 0.5, opacity: 0 }}
      >
        <Text fontSize={EMOJI_MAP[size]} textAlign="center">🔥</Text>
      </Stack>
      {showLabel && (
        <YStack alignItems="center">
          <Text fontSize={FONT_MAP[size]} fontWeight="800" color="$color">
            {count}
          </Text>
          <Text fontSize={FONT_MAP[size] - 2} color="$colorSubtle" opacity={0.7}>
            Days
          </Text>
        </YStack>
      )}
    </YStack>
  )
}

// ---------------------------------------------------------------------------
// 3. XPBadge
// ---------------------------------------------------------------------------

export interface XPBadgeProps {
  amount: number
  size?: GamificationSize
  showPlus?: boolean
}

const PILL_H = { sm: 22, md: 28, lg: 36 } as const
const PILL_PX = { sm: 8, md: 10, lg: 14 } as const

export function XPBadge({ amount, size = 'md', showPlus = true }: XPBadgeProps) {
  return (
    <XStack
      backgroundColor="$xpGold"
      height={PILL_H[size]}
      paddingHorizontal={PILL_PX[size]}
      borderRadius={PILL_H[size] / 2}
      alignItems="center"
      gap={3}
      animation="bouncy"
      enterStyle={{ scale: 0 }}
    >
      <Text fontSize={FONT_MAP[size]}>⭐</Text>
      <Text fontSize={FONT_MAP[size]} fontWeight="700" color="#7A5C00">
        {showPlus ? '+' : ''}{amount} XP
      </Text>
    </XStack>
  )
}

// ---------------------------------------------------------------------------
// 4. DailyGoal
// ---------------------------------------------------------------------------

const GOAL_ICONS = { target: '🎯', fire: '🔥', star: '⭐', trophy: '🏆' } as const

export interface DailyGoalProps {
  current: number
  target: number
  icon?: keyof typeof GOAL_ICONS
  label?: string
}

export function DailyGoal({ current, target, icon = 'target', label = 'Daily Goal' }: DailyGoalProps) {
  const pct = Math.min(current / target, 1)
  const done = current >= target
  return (
    <YStack gap={6} animation="quick" enterStyle={{ opacity: 0, y: 10 }}>
      <XStack alignItems="center" gap={6}>
        <Text fontSize={18}>{GOAL_ICONS[icon]}</Text>
        <Text fontSize={14} fontWeight="700" color="$color" flex={1}>{label}</Text>
        <Text fontSize={13} fontWeight="600" color={done ? '$xpGold' : '$colorSubtle'}>
          {current}/{target}
        </Text>
      </XStack>
      <Stack height={8} borderRadius={4} backgroundColor="#EEF0F3" overflow="hidden">
        <Stack
          height={8}
          borderRadius={4}
          backgroundColor={done ? '$xpGold' : '$brandAqua'}
          width={`${pct * 100}%` as any}
          animation="quick"
        />
      </Stack>
      {done && (
        <Text fontSize={12} fontWeight="700" color="$xpGold" textAlign="center" animation="bouncy" enterStyle={{ scale: 0 }}>
          Goal Complete!
        </Text>
      )}
    </YStack>
  )
}

// ---------------------------------------------------------------------------
// 5. AchievementBadge
// ---------------------------------------------------------------------------

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

export interface AchievementBadgeProps {
  icon: string
  name: string
  description?: string
  rarity?: Rarity
  unlocked?: boolean
}

const RARITY_BG: Record<Rarity, string> = {
  common: '#536471',
  uncommon: '#9bedff',
  rare: '#3B82F6',
  epic: '#9333EA',
  legendary: '#FBBF24',
}

export function AchievementBadge({
  icon,
  name,
  description,
  rarity = 'common',
  unlocked = true,
}: AchievementBadgeProps) {
  return (
    <YStack
      alignItems="center"
      gap={6}
      padding={12}
      borderRadius={16}
      backgroundColor="#F7F8FA"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowRadius={8}
      shadowOpacity={0.08}
      elevation={3}
      animation="quick"
      hoverStyle={{ scale: 1.05, y: -4 }}
      pressStyle={{ scale: 0.97 }}
      opacity={unlocked ? 1 : 0.45}
    >
      <Stack
        width={52}
        height={52}
        borderRadius={26}
        backgroundColor={RARITY_BG[rarity]}
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={26}>{icon}</Text>
      </Stack>
      <Text fontSize={12} fontWeight="700" color="$color" textAlign="center" numberOfLines={1}>
        {name}
      </Text>
      {description && (
        <Text fontSize={10} color="$colorSubtle" textAlign="center" numberOfLines={2} opacity={0.7}>
          {description}
        </Text>
      )}
      {!unlocked && (
        <Stack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderRadius={16}
          backgroundColor="rgba(0,0,0,0.25)"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={22}>🔒</Text>
        </Stack>
      )}
    </YStack>
  )
}

// ---------------------------------------------------------------------------
// 6. StatCard
// ---------------------------------------------------------------------------

type StatColor = 'primary' | 'xp' | 'streak' | 'accent' | 'purple'

const STAT_COLOR_MAP: Record<StatColor, string> = {
  primary: '#9bedff',
  xp: '#FFC800',
  streak: '#FF4B4B',
  accent: '#FF9600',
  purple: '#CE82FF',
}

export interface StatCardProps {
  icon: string
  label: string
  value: string | number
  color?: StatColor
}

export function StatCard({ icon, label, value, color = 'primary' }: StatCardProps) {
  const bg = STAT_COLOR_MAP[color]
  return (
    <XStack
      alignItems="center"
      gap={10}
      padding={12}
      borderRadius={14}
      backgroundColor="#F7F8FA"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowRadius={8}
      shadowOpacity={0.08}
      elevation={3}
      animation="quick"
      hoverStyle={{ y: -2 }}
    >
      <Stack
        width={36}
        height={36}
        borderRadius={18}
        backgroundColor={bg}
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={18}>{icon}</Text>
      </Stack>
      <YStack flex={1}>
        <Text fontSize={11} color="$colorSubtle" opacity={0.7}>{label}</Text>
        <Text fontSize={18} fontWeight="800" color="$color">{value}</Text>
      </YStack>
    </XStack>
  )
}

// ---------------------------------------------------------------------------
// 7. BounceCard
// ---------------------------------------------------------------------------

export interface BounceCardProps extends StackProps {
  children: React.ReactNode
  delay?: number
}

export function BounceCard({ children, delay = 0, ...rest }: BounceCardProps) {
  return (
    <YStack
      padding={16}
      borderRadius={16}
      backgroundColor="#F7F8FA"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowRadius={8}
      shadowOpacity={0.08}
      elevation={3}
      animation="bouncy"
      enterStyle={{ opacity: 0, y: 20 }}
      hoverStyle={{ y: -4 }}
      pressStyle={{ scale: 0.98 }}
      {...rest}
    >
      {children}
    </YStack>
  )
}

// ---------------------------------------------------------------------------
// 8. StarRating
// ---------------------------------------------------------------------------

export interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: GamificationSize
}

export function StarRating({ rating, maxRating = 5, size = 'md' }: StarRatingProps) {
  const fs = EMOJI_MAP[size]
  return (
    <XStack gap={2}>
      {Array.from({ length: maxRating }, (_, i) => (
        <Text key={i} fontSize={fs}>
          {i < rating ? '⭐' : '☆'}
        </Text>
      ))}
    </XStack>
  )
}

// ---------------------------------------------------------------------------
// 9. NewBadge
// ---------------------------------------------------------------------------

export function NewBadge() {
  return (
    <Stack
      backgroundColor="$brandAqua"
      paddingHorizontal={8}
      paddingVertical={2}
      borderRadius={10}
      animation="bouncy"
      enterStyle={{ scale: 0 }}
    >
      <Text fontSize={10} fontWeight="800" color="#fff">NEW!</Text>
    </Stack>
  )
}

// ---------------------------------------------------------------------------
// 10. MasteredBadge
// ---------------------------------------------------------------------------

export function MasteredBadge() {
  return (
    <Stack
      backgroundColor="$brandAqua"
      paddingHorizontal={8}
      paddingVertical={2}
      borderRadius={10}
      animation="quick"
      enterStyle={{ scale: 0 }}
    >
      <Text fontSize={10} fontWeight="800" color="#fff">✓ Mastered</Text>
    </Stack>
  )
}
