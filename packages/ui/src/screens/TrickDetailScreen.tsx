import { useState } from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../Text';
import { ScreenContainer } from '../primitives/ScreenContainer';
import { NEU } from '../tamagui.config';

// Kept for backward compatibility — old consumers re-export this type from index.ts.
export interface TrickStep {
  id: string;
  order: number;
  title: string;
  description: string;
}

export interface TrickDetailScreenProps {
  name: string;
  level: 'beginner' | 'unresponsive';
  durationSec: number;
  thumbnails: { default: string; hq: string; sd: string; max: string };
  ytId?: string;
  completed?: boolean;
  paddingTop?: number;
}

const LEVEL_LABEL: Record<TrickDetailScreenProps['level'], string> = {
  beginner: 'Beginner',
  unresponsive: 'Unresponsive',
};

const LEVEL_BG: Record<TrickDetailScreenProps['level'], string> = {
  beginner: '#9bedff',
  unresponsive: '#CE82FF',
};

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function TrickDetailScreen({
  name,
  level,
  durationSec,
  thumbnails,
  completed = false,
  paddingTop = 0,
}: TrickDetailScreenProps) {
  const [src, setSrc] = useState<string>(thumbnails.max);

  return (
    <ScreenContainer scrollable paddingTop={paddingTop}>
      {/* Hero — native <img> on web; will need a Platform.OS branch for Expo. */}
      <YStack width="100%" aspectRatio={16 / 9} backgroundColor="#0F1419" position="relative" overflow="hidden">
        <img
          src={src}
          alt={name}
          onError={() => {
            if (src !== thumbnails.hq) setSrc(thumbnails.hq);
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <YStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          alignItems="center"
          justifyContent="center"
          pointerEvents="none"
        >
          <YStack
            width={64}
            height={64}
            borderRadius={32}
            backgroundColor="rgba(255,255,255,0.92)"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={26} color="#0F1419" marginLeft={4}>▶</Text>
          </YStack>
        </YStack>
      </YStack>

      <YStack padding={20} gap={14}>
        <Text fontSize={26} fontWeight="800" letterSpacing={-0.5} color="#0F1419">{name}</Text>
        <XStack gap={8} alignItems="center" flexWrap="wrap">
          <XStack backgroundColor={LEVEL_BG[level]} borderRadius={100} paddingHorizontal={10} paddingVertical={4}>
            <Text fontSize={11} fontWeight="800" color="#0F1419" textTransform="uppercase" letterSpacing={0.4}>
              {LEVEL_LABEL[level]}
            </Text>
          </XStack>
          <XStack backgroundColor="#F7F8FA" borderRadius={100} paddingHorizontal={10} paddingVertical={4}>
            <Text fontSize={11} fontWeight="700" color="#536471">{formatDuration(durationSec)}</Text>
          </XStack>
          {completed && (
            <XStack backgroundColor="#e6f5e8" borderRadius={100} paddingHorizontal={10} paddingVertical={4}>
              <Text fontSize={11} fontWeight="700" color="#58CC02">Mastered ✓</Text>
            </XStack>
          )}
        </XStack>

        <YStack
          backgroundColor="white"
          borderRadius={16}
          padding={16}
          gap={6}
          {...NEU.card}
        >
          <Text fontSize={15} fontWeight="700" color="#0F1419">Tutorial video coming soon</Text>
          <Text fontSize={13} color="#536471" lineHeight={20}>
            We&rsquo;re wiring up the in-app video player for Gentry Stein&rsquo;s tutorials.
            Until it ships, the thumbnail above links you to the official YouTube version
            so you can keep learning.
          </Text>
        </YStack>
      </YStack>

      <YStack height={100} />
    </ScreenContainer>
  );
}
