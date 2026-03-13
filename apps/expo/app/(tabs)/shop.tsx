import React from 'react';
import { Linking, Platform } from 'react-native';
import { ShopScreen } from '@yoyo/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from 'tamagui';

const SHOP_URL = 'https://gentrystein.com/collections/shop-all';

// Safely attempt to load react-native-webview
let WebViewComponent: React.ComponentType<{ source: { uri: string }; style?: any }> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('react-native-webview');
  WebViewComponent = mod.default ?? mod.WebView ?? null;
} catch {
  // react-native-webview not installed — fallback will be used
}

export default function ShopTab() {
  const insets = useSafeAreaInsets();

  const handleOpenExternal = () => {
    Linking.openURL(SHOP_URL).catch(() => {
      // Silently handle failure
    });
  };

  const renderWebView = (url: string) => {
    if (WebViewComponent) {
      return (
        <WebViewComponent
          source={{ uri: url }}
          style={{ flex: 1 }}
        />
      );
    }
    // Fallback when WebView is not available
    return (
      <Text
        fontSize={14}
        color="$brandAqua"
        textAlign="center"
        padding={20}
        onPress={() => Linking.openURL(url).catch(() => {})}
      >
        Tap to open shop in browser
      </Text>
    );
  };

  return (
    <ShopScreen
      shopUrl={SHOP_URL}
      onOpenExternal={handleOpenExternal}
      renderWebView={renderWebView}
      paddingTop={insets.top}
    />
  );
}
