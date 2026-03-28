import { Stack, Text, XStack, YStack } from 'tamagui';

export type MascotMood = 'happy' | 'excited' | 'sad' | 'celebrating' | 'thinking' | 'encouraging';

export interface MascotProps {
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

const SIZE_MAP = { sm: 48, md: 80, lg: 120, xl: 160 } as const;

const MOOD_CONFIG: Record<MascotMood, { face: string; decor: string[]; label: string }> = {
  happy:        { face: '😊', decor: [],             label: 'Feeling good!' },
  excited:      { face: '🤩', decor: ['✨', '⭐'],   label: 'So excited!' },
  sad:          { face: '😢', decor: [],             label: "Don't give up!" },
  celebrating:  { face: '🎉', decor: ['🎊', '🥳'],   label: 'You did it!' },
  thinking:     { face: '🤔', decor: ['💭'],         label: 'Hmm...' },
  encouraging:  { face: '💪', decor: ['⭐', '🌟'],   label: 'You got this!' },
};

function DecoEmoji({ emoji, size, index }: { emoji: string; size: number; index: number }) {
  const offset = size * 0.42;
  // Position decorations around the circle at evenly spaced angles
  const angle = (index * 120 - 30) * (Math.PI / 180);
  const x = Math.cos(angle) * offset;
  const y = Math.sin(angle) * offset;

  return (
    <Text
      position="absolute"
      fontSize={size * 0.18}
      style={{ transform: [{ translateX: x }, { translateY: y }] }}
    >
      {emoji}
    </Text>
  );
}

function ThoughtBubbles({ size }: { size: number }) {
  return (
    <>
      <Stack
        position="absolute"
        width={size * 0.08}
        height={size * 0.08}
        borderRadius={size * 0.04}
        backgroundColor="$gray8"
        opacity={0.5}
        top={-size * 0.05}
        right={size * 0.05}
      />
      <Stack
        position="absolute"
        width={size * 0.05}
        height={size * 0.05}
        borderRadius={size * 0.025}
        backgroundColor="$gray8"
        opacity={0.35}
        top={-size * 0.12}
        right={-size * 0.02}
      />
    </>
  );
}

function BlushDots({ size }: { size: number }) {
  const dotSize = size * 0.07;
  return (
    <>
      <Stack
        position="absolute"
        width={dotSize}
        height={dotSize}
        borderRadius={dotSize / 2}
        backgroundColor="#FFB6C1"
        opacity={0.7}
        bottom={size * 0.18}
        left={size * 0.12}
      />
      <Stack
        position="absolute"
        width={dotSize}
        height={dotSize}
        borderRadius={dotSize / 2}
        backgroundColor="#FFB6C1"
        opacity={0.7}
        bottom={size * 0.18}
        right={size * 0.12}
      />
    </>
  );
}

export function Mascot({ mood = 'happy', size = 'md', showLabel = false }: MascotProps) {
  const px = SIZE_MAP[size];
  const config = MOOD_CONFIG[mood];
  const emojiSize = px * 0.32;

  return (
    <YStack alignItems="center" gap={px * 0.08}>
      <Stack
        width={px}
        height={px}
        borderRadius={px / 2}
        backgroundColor="#1CB0F6"
        alignItems="center"
        justifyContent="center"
        animation="quick"
        enterStyle={{ scale: 0, opacity: 0 }}
        {...(mood === 'celebrating' && { scale: 1.05 })}
      >
        {/* Yo-yo emoji */}
        <Text fontSize={emojiSize} lineHeight={emojiSize * 1.2}>🪀</Text>

        {/* Face overlay */}
        <Text
          position="absolute"
          fontSize={emojiSize * 0.7}
          bottom={px * 0.1}
          right={px * 0.1}
        >
          {config.face}
        </Text>

        {/* Mood-specific decorations */}
        {mood === 'happy' && <BlushDots size={px} />}
        {mood === 'thinking' && <ThoughtBubbles size={px} />}
        {config.decor.map((emoji, i) => (
          <DecoEmoji key={i} emoji={emoji} size={px} index={i} />
        ))}
      </Stack>

      {showLabel && (
        <Text fontSize={px * 0.14} color="$gray11" fontWeight="600">
          {config.label}
        </Text>
      )}
    </YStack>
  );
}

/* Preset variants */
export function HappyMascot(props: Omit<MascotProps, 'mood'>) { return <Mascot mood="happy" {...props} />; }
export function ExcitedMascot(props: Omit<MascotProps, 'mood'>) { return <Mascot mood="excited" {...props} />; }
export function SadMascot(props: Omit<MascotProps, 'mood'>) { return <Mascot mood="sad" {...props} />; }
export function CelebratingMascot(props: Omit<MascotProps, 'mood'>) { return <Mascot mood="celebrating" {...props} />; }
export function ThinkingMascot(props: Omit<MascotProps, 'mood'>) { return <Mascot mood="thinking" {...props} />; }
export function EncouragingMascot(props: Omit<MascotProps, 'mood'>) { return <Mascot mood="encouraging" {...props} />; }
