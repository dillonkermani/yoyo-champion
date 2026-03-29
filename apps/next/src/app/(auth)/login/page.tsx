"use client";
import { useState } from 'react';
import { AuthScreen } from '@yoyo/ui';
import { useUserStore, useOnboardingStore } from '@yoyo/store';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithCredentials, isLoading } = useUserStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async ({ email, password }: { name?: string; email: string; password: string }) => {
    setError(null);
    const success = await loginWithCredentials(email, password);

    if (success) {
      router.replace('/');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleToggleMode = () => {
    useOnboardingStore.getState().resetOnboarding();
    router.push('/onboarding');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', minHeight: '100vh' }}>
    <AuthScreen
      mode="login"
      onSubmit={handleSubmit}
      onToggleMode={handleToggleMode}
      isLoading={isLoading}
      error={error}
    />
    </div>
  );
}
