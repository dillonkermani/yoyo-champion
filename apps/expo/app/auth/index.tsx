import { useState } from 'react';
import { AuthScreen } from '@yoyo/ui';
import { useUserStore } from '@yoyo/store';
import { useRouter } from 'expo-router';

export default function AuthIndex() {
  const router = useRouter();
  const { loginWithCredentials, signup, isLoading } = useUserStore();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async ({ name, email, password }: { name?: string; email: string; password: string }) => {
    setError(null);
    const success = mode === 'signup'
      ? await signup(name ?? '', email, password)
      : await loginWithCredentials(email, password);

    if (success) {
      // Auth guard in root layout handles the redirect
      router.replace('/onboarding' as never);
    } else {
      setError(mode === 'login' ? 'Invalid email or password' : 'Could not create account');
    }
  };

  return (
    <AuthScreen
      mode={mode}
      onSubmit={handleSubmit}
      onToggleMode={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}
      isLoading={isLoading}
      error={error}
    />
  );
}
