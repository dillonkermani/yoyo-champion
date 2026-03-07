import { View, ScrollView } from 'react-native';
import { Button, Text } from '@yoyo/ui';

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 24 }}>
        <Text variant="heading">Welcome to YoYo Champion</Text>
        <Text variant="body" style={{ marginTop: 8 }}>
          Browse tricks, follow learning paths, and track your progress.
        </Text>
        <View style={{ marginTop: 24 }}>
          <Button variant="primary" onPress={() => {}}>
            Start Learning
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
