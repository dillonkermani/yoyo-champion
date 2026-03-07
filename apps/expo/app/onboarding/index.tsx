import { View } from 'react-native';
import { Button, Text } from '@yoyo/ui';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' }}>
      <Text variant="heading">Welcome to YoYo Champion</Text>
      <Text variant="body" style={{ marginTop: 12, textAlign: 'center' }}>
        Let's personalize your learning experience.
      </Text>
      <View style={{ marginTop: 32, width: '100%' }}>
        <Button variant="primary" onPress={() => router.replace('/(tabs)')}>
          Get Started
        </Button>
      </View>
    </View>
  );
}
