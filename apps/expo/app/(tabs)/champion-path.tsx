import { View } from 'react-native';
import { Text } from '@yoyo/ui';

export default function ChampionPathScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text variant="heading">Champion Path</Text>
      <Text variant="body" style={{ marginTop: 8 }}>
        Trick database and progression — coming soon.
      </Text>
    </View>
  );
}
