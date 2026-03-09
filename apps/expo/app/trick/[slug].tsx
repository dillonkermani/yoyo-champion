import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function TrickDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827' }}>{slug}</Text>
      <Text style={{ marginTop: 8, fontSize: 15, color: '#6B7280' }}>
        Trick detail — coming soon.
      </Text>
    </View>
  );
}
