import { View } from 'react-native';
import { Text } from '@yoyo/ui';
import { useLocalSearchParams } from 'expo-router';

export default function TrickDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' }}>
      <Text variant="heading">{slug}</Text>
      <Text variant="body" style={{ marginTop: 8 }}>
        Trick detail — coming soon.
      </Text>
    </View>
  );
}
