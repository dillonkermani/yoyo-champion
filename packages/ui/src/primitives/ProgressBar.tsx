import { XStack, YStack } from 'tamagui';

export interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  height?: number;
  backgroundColor?: string;
}

export function ProgressBar({ value, color = '#9bedff', height = 10, backgroundColor = '#EEF0F3' }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  return (
    <XStack
      height={height}
      backgroundColor={backgroundColor}
      borderRadius={height / 2}
      overflow="hidden"
    >
      <YStack
        height={height}
        width={`${clampedValue}%`}
        backgroundColor={color}
        borderRadius={height / 2}
        position="relative"
        overflow="hidden"
      >
        {/* Inner glass highlight strip */}
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
  );
}
