import { View } from 'react-native';
import { Text } from '@yoyo/ui';

export default function ForYouScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text variant="heading">For You</Text>
      <Text variant="body" style={{ marginTop: 8 }}>
        TikTok-style video feed — coming soon.
      </Text>
    </View>
  );
}
