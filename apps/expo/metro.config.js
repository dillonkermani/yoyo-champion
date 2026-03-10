const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

// Resolve modules: workspace root first (hoisted singletons), then app.
// public-hoist-pattern in .npmrc ensures tamagui/react/zustand land in
// workspaceRoot/node_modules as single instances.
config.resolver.nodeModulesPaths = [
  path.resolve(workspaceRoot, 'node_modules'),
  path.resolve(projectRoot, 'node_modules'),
];

// Force singleton modules to the hoisted workspace-root copies.
// This prevents "Cannot read property 'useId' of null" crashes caused by
// pnpm installing separate compiled instances per package.
const workspaceModules = path.resolve(workspaceRoot, 'node_modules');
config.resolver.extraNodeModules = {
  'react': path.resolve(workspaceModules, 'react'),
  'react-native': path.resolve(workspaceModules, 'react-native'),
  'tamagui': path.resolve(workspaceModules, 'tamagui'),
  '@tamagui/core': path.resolve(workspaceModules, '@tamagui/core'),
  '@tamagui/config': path.resolve(workspaceModules, '@tamagui/config'),
  'zustand': path.resolve(workspaceModules, 'zustand'),
};

module.exports = config;
