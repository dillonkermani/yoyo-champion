/** @type {import('next').NextConfig} */
const { withTamagui } = require('@tamagui/next-plugin');

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@yoyo/ui",
    "@yoyo/store",
    "@yoyo/data",
    "@yoyo/api",
    "tamagui",
    "@tamagui/core",
    "@tamagui/config",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "avatars.githubusercontent.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "cdn.discordapp.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "*.cloudinary.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", port: "", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["date-fns"],
  },
  poweredByHeader: false,
  compress: true,
};

module.exports = withTamagui({
  config: '../../packages/ui/src/tamagui.config.ts',
  components: ['@yoyo/ui'],
  appDir: true,
})(nextConfig);
