import { YStack } from 'tamagui';
import { Text } from './Text';

export interface VideoPlayerProps {
  uri: string;
  posterUri?: string;
  isActive?: boolean;
  isMuted?: boolean;
  mirrorVideo?: boolean;
  onToggleMute?: () => void;
  onPress?: () => void;
}

export function VideoPlayer({
  uri,
  posterUri: _posterUri,
  isActive: _isActive,
  isMuted,
  mirrorVideo,
  onToggleMute: _onToggleMute,
  onPress,
}: VideoPlayerProps) {
  // Placeholder — actual video playback implemented per-platform
  return (
    <YStack
      flex={1}
      backgroundColor="#000"
      alignItems="center"
      justifyContent="center"
      onPress={onPress}
      style={mirrorVideo ? { transform: [{ scaleX: -1 }] } : undefined}
    >
      <Text color="rgba(255,255,255,0.5)" fontSize={14}>
        Video: {uri.split('/').pop()}
      </Text>
      {isMuted && (
        <Text color="rgba(255,255,255,0.4)" fontSize={12}>
          Muted
        </Text>
      )}
    </YStack>
  );
}
