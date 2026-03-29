import { useState } from 'react';
import { AuthScreen } from '@yoyo/ui';
import { useUserStore, useOnboardingStore } from '@yoyo/store';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AuthIndex() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { loginWithCredentials, isLoading } = useUserStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async ({ email, password }: { name?: string; email: string; password: string }) => {
    setError(null);
    const success = await loginWithCredentials(email, password);

    if (success) {
      router.replace('/(tabs)' as never);
    } else {
      setError('Invalid email or password');
    }
  };

  const handleToggleMode = () => {
    useOnboardingStore.getState().resetOnboarding();
    router.push('/onboarding');
  };

  return (
    <AuthScreen
      mode="login"
      onSubmit={handleSubmit}
      onToggleMode={handleToggleMode}
      isLoading={isLoading}
      error={error}
      paddingTop={insets.top}
    />
  );
}
