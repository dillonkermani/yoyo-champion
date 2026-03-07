module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui', '@yoyo/ui'],
          config: '../../packages/ui/src/tamagui.config.ts',
          logTimings: true,
        },
      ],
      require.resolve('expo-router/babel'),
    ],
  };
};
