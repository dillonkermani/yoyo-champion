import { ShopScreen } from '@yoyo/ui';
import { getYoyos, getFeaturedProducts } from '@yoyo/data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const YOYOS = getYoyos().slice(0, 6).map((p) => ({
  id: p.id, name: p.name, brand: p.brand, price: p.price,
}));
const FEATURED = getFeaturedProducts().slice(0, 4).map((p) => ({
  id: p.id, name: p.name, brand: p.brand, price: p.price,
}));

export default function ShopTab() {
  const insets = useSafeAreaInsets();
  return <ShopScreen yoyos={YOYOS} featured={FEATURED} paddingTop={insets.top} />;
}
