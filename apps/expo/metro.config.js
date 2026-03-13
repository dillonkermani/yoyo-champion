const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

// Resolve modules: app first, then workspace root.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Force singleton modules — intercepts ALL resolution (including transitive
// deps inside .pnpm store) to prevent duplicate React/Tamagui instances.
const SINGLETON_PACKAGES = [
  'react',
  'react-native',
  'tamagui',
  '@tamagui/core',
  '@tamagui/config',
  '@tamagui/web',
  'zustand',
];

const singletonPaths = {};
for (const pkg of SINGLETON_PACKAGES) {
  try {
    // Resolve from the expo app's node_modules (definitive copy)
    singletonPaths[pkg] = path.dirname(
      require.resolve(pkg + '/package.json', { paths: [projectRoot] })
    );
  } catch {
    // Package not installed — skip
  }
}

const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Check if this is a singleton package (exact match or scoped subpath)
  for (const [pkg, pkgPath] of Object.entries(singletonPaths)) {
    if (moduleName === pkg || moduleName.startsWith(pkg + '/')) {
      // Rewrite the origin to resolve from the app's node_modules
      const newContext = {
        ...context,
        originModulePath: path.join(projectRoot, 'package.json'),
      };
      if (originalResolveRequest) {
        return originalResolveRequest(newContext, moduleName, platform);
      }
      return context.resolveRequest(newContext, moduleName, platform);
    }
  }

  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
