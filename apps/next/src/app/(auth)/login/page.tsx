"use client";
import { useState } from 'react';
import { AuthScreen } from '@yoyo/ui';
import { useUserStore } from '@yoyo/store';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
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
      router.replace('/onboarding');
    } else {
      setError(mode === 'login' ? 'Invalid email or password' : 'Could not create account');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', minHeight: '100vh' }}>
    <AuthScreen
      mode={mode}
      onSubmit={handleSubmit}
      onToggleMode={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); }}
      isLoading={isLoading}
      error={error}
    />
    </div>
  );
}
