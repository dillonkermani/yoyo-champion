import { View } from 'react-native';
import { Text } from '@yoyo/ui';

export default function ShopScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text variant="heading">Shop</Text>
      <Text variant="body" style={{ marginTop: 8 }}>
        Yo-yo store — coming soon.
      </Text>
    </View>
  );
}
