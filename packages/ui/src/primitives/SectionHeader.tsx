import { XStack } from 'tamagui';
import { Text } from '../Text';

export interface SectionHeaderProps {
  title: string;
  onSeeAll?: (() => void) | undefined;
}

export function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <XStack justifyContent="space-between" alignItems="center" marginBottom={16}>
      <Text fontSize={18} fontWeight="800" letterSpacing={-0.3} color="#0F1419">{title}</Text>
      {onSeeAll && (
        <Text fontSize={13} fontWeight="600" color="$brandAqua" onPress={onSeeAll} cursor="pointer">
          See all
        </Text>
      )}
    </XStack>
  );
}
