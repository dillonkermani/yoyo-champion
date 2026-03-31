import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      'react-native': '@tamagui/fake-react-native',
    },
  },
});
