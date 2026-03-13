import React, { useState } from 'react';
import { YStack, XStack, Input } from 'tamagui';
import { Text } from '../Text';
import { Button } from '../Button';
import { NEU } from '../tamagui.config';

export interface AuthScreenProps {
  mode: 'login' | 'signup';
  onSubmit: (fields: { name?: string; email: string; password: string }) => void;
  onToggleMode: () => void;
  isLoading?: boolean;
  error?: string | null;
  paddingTop?: number;
  /** When true, shows funnel-oriented copy (post-onboarding context). */
  funnelMode?: boolean;
}

export function AuthScreen({ mode, onSubmit, onToggleMode, isLoading = false, error, paddingTop = 0, funnelMode = false }: AuthScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ name: mode === 'signup' ? name : undefined, email, password });
  };

  const canSubmit = mode === 'signup'
    ? name.length > 0 && email.length > 0 && password.length >= 6
    : email.length > 0 && password.length >= 6;

  return (
    <YStack flex={1} backgroundColor="$neuSurface" padding={28} paddingTop={paddingTop + 28} justifyContent="center" gap={28}>
      {/* Logo / Header */}
      <YStack alignItems="center" gap={8}>
        {!funnelMode && <Text fontSize={48}>🪀</Text>}
        <Text fontSize={28} fontWeight="800" color="#2d3436" letterSpacing={-0.5}>
          {funnelMode ? "You're all set!" : 'YoYo Champion'}
        </Text>
        <Text fontSize={15} color="#636e72">
          {funnelMode
            ? 'Create your account to save your progress'
            : mode === 'login'
            ? 'Welcome back!'
            : 'Start your yo-yo journey'}
        </Text>
      </YStack>

      {/* Form */}
      <YStack gap={14}>
        {mode === 'signup' && (
          <Input
            backgroundColor="$neuSurfaceLight"
            borderRadius={14}
            padding={14}
            fontSize={15}
            placeholder="Display name"
            placeholderTextColor="#a0a8b0"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            {...NEU.inset}
          />
        )}
        <Input
          backgroundColor="$neuSurfaceLight"
          borderRadius={14}
          padding={14}
          fontSize={15}
          placeholder="Email"
          placeholderTextColor="#a0a8b0"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          {...NEU.inset}
        />
        <Input
          backgroundColor="$neuSurfaceLight"
          borderRadius={14}
          padding={14}
          fontSize={15}
          placeholder="Password"
          placeholderTextColor="#a0a8b0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          {...NEU.inset}
        />

        {error && (
          <Text fontSize={13} color="$streakRed" textAlign="center">{error}</Text>
        )}

        <Button
          onPress={handleSubmit}
          disabled={!canSubmit || isLoading}
          opacity={canSubmit && !isLoading ? 1 : 0.5}
          marginTop={4}
        >
          {isLoading ? 'Loading...' : mode === 'login' ? 'Log In' : 'Create Account'}
        </Button>
      </YStack>

      {/* Toggle */}
      <XStack justifyContent="center" gap={4}>
        <Text fontSize={14} color="#636e72">
          {funnelMode
            ? (mode === 'login' ? 'New here? Create an account' : 'Already have an account?')
            : (mode === 'login' ? "Don't have an account?" : 'Already have an account?')}
        </Text>
        <Text
          fontSize={14}
          fontWeight="700"
          color="$brandAqua"
          onPress={onToggleMode}
          cursor="pointer"
          animation="quick"
          pressStyle={{ opacity: 0.7 }}
        >
          {mode === 'login' ? 'Sign Up' : 'Log In'}
        </Text>
      </XStack>

      {/* Skip for now */}
      <Text
        fontSize={13}
        color="#a0a8b0"
        textAlign="center"
        onPress={() => onSubmit({ email: 'guest@yoyochampion.app', password: 'guest123' })}
        cursor="pointer"
        animation="quick"
        pressStyle={{ opacity: 0.7 }}
      >
        Skip for now (continue as guest)
      </Text>
    </YStack>
  );
}
