import { View } from 'react-native';
import { Text } from '@yoyo/ui';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text variant="heading">Profile</Text>
      <Text variant="body" style={{ marginTop: 8 }}>
        Stats, avatar, and uploads — coming soon.
      </Text>
    </View>
  );
}
