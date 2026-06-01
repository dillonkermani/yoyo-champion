import { useState } from 'react';
import { YStack, XStack } from 'tamagui';
import { Text } from '../../Text';
import { NEU } from '../../tamagui.config';

export interface BrowseTrickTileProps {
  name: string;
  level: 'beginner' | 'unresponsive';
  durationSec: number;
  thumbnails: { hq: string; sd: string; max: string; default: string };
  onPress?: (() => void) | undefined;
  width?: string | number;
}

const LEVEL_LABEL: Record<BrowseTrickTileProps['level'], string> = {
  beginner: 'Beginner',
  unresponsive: 'Unresponsive',
};

const LEVEL_BG: Record<BrowseTrickTileProps['level'], string> = {
  beginner: '#9bedff',
  unresponsive: '#CE82FF',
};

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function BrowseTrickTile({
  name,
  level,
  durationSec,
  thumbnails,
  onPress,
  width = '100%',
}: BrowseTrickTileProps) {
  // YouTube's maxresdefault may 404 for older videos; fall back to hq on error.
  const [src, setSrc] = useState<string>(thumbnails.max);

  return (
    <YStack
      width={width as any}
      backgroundColor="white"
      borderRadius={16}
      overflow="hidden"
      onPress={onPress}
      animation="quick"
      pressStyle={{ opacity: 0.92, scale: 0.98 }}
      cursor={onPress ? 'pointer' : undefined}
      {...NEU.card}
    >
      <YStack width="100%" aspectRatio={16 / 9} backgroundColor="#0F1419" position="relative" overflow="hidden">
        {/* Tamagui's Image proxies react-native-web Image, which can't size with a
            percentage source. Native <img> is fine on web; the Expo build will need
            a Platform.OS branch later. */}
        <img
          src={src}
          alt={name}
          loading="lazy"
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
        {/* Level pill (top-left) */}
        <XStack
          position="absolute"
          top={8}
          left={8}
          backgroundColor={LEVEL_BG[level]}
          paddingHorizontal={8}
          paddingVertical={3}
          borderRadius={100}
        >
          <Text fontSize={10} fontWeight="800" color="#0F1419" textTransform="uppercase" letterSpacing={0.4}>
            {LEVEL_LABEL[level]}
          </Text>
        </XStack>
        {/* Duration pill (bottom-right) */}
        <XStack
          position="absolute"
          bottom={8}
          right={8}
          backgroundColor="rgba(0,0,0,0.65)"
          paddingHorizontal={8}
          paddingVertical={3}
          borderRadius={6}
        >
          <Text fontSize={11} fontWeight="700" color="white">
            {formatDuration(durationSec)}
          </Text>
        </XStack>
        {/* Centered play button */}
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
            width={48}
            height={48}
            borderRadius={24}
            backgroundColor="rgba(255,255,255,0.92)"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={20} color="#0F1419" marginLeft={3}>▶</Text>
          </YStack>
        </YStack>
      </YStack>
      <YStack padding={10} gap={2}>
        <Text fontSize={14} fontWeight="700" color="#0F1419" numberOfLines={2}>
          {name}
        </Text>
      </YStack>
    </YStack>
  );
}
