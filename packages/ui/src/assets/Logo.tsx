import { Stack, Image } from 'tamagui';

export interface LogoProps {
  size?: number;
}

/**
 * YoYoChampion logo — cross-platform Image component.
 * On web, the bundler resolves the avif import.
 * On native, you may need to pass the asset via require() in the consuming app.
 */
export function Logo({ size = 120 }: LogoProps) {
  return (
    <Stack width={size} height={size} alignItems="center" justifyContent="center">
      <Image
        source={{ uri: require('./logo.avif') }}
        width={size}
        height={size}
        resizeMode="contain"
        alt="YoYoChampion"
      />
    </Stack>
  );
}
