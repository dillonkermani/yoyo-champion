import React, { useState } from 'react';
import { YStack, XStack, Input, Stack } from 'tamagui';
import { Text } from '../Text';
import { NEU } from '../tamagui.config';

export interface AuthScreenProps {
  mode: 'login' | 'signup';
  onSubmit: (fields: { name?: string; email: string; password: string }) => void;
  onToggleMode: () => void;
  isLoading?: boolean;
  error?: string | null;
  paddingTop?: number;
  funnelMode?: boolean;
}

const T = {
  bg: '#FFFFFF',
  text: '#1A1A2E',
  textSub: '#6B7280',
  muted: '#9CA3AF',
  border: '#E8ECF1',
  accent: '#1CB0F6',
  accentDark: '#0095DB',
  accentLight: '#E8F7FE',
  accentDisabled: '#B8E4FA',
  white: '#FFFFFF',
  error: '#FF4B4B',
} as const;

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
    <YStack
      flex={1}
      backgroundColor={T.bg}
      padding={28}
      paddingTop={paddingTop + 28}
      justifyContent="center"
      gap={28}
      maxWidth={520}
      alignSelf="center"
      width="100%"
    >
      {/* Logo / Header */}
      <YStack alignItems="center" gap={10}>
        {!funnelMode && (
          <Stack
            width={80}
            height={80}
            borderRadius={40}
            backgroundColor={T.accentLight}
            justifyContent="center"
            alignItems="center"
            marginBottom={8}
            {...NEU.glowAqua}
          >
            <Text fontSize={44}>{'\uD83E\uDE80'}</Text>
          </Stack>
        )}
        <Text fontSize={30} fontWeight="900" color={T.text} letterSpacing={-0.8}>
          {funnelMode ? "You're all set!" : 'YoYo Champion'}
        </Text>
        <Text fontSize={16} color={T.textSub}>
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
            backgroundColor={T.bg}
            borderRadius={16}
            borderWidth={2}
            borderColor={T.border}
            padding={16}
            fontSize={15}
            placeholder="Display name"
            placeholderTextColor={T.muted}
            color={T.text}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            focusStyle={{ borderColor: T.accent }}
          />
        )}
        <Input
          backgroundColor={T.bg}
          borderRadius={16}
          borderWidth={2}
          borderColor={T.border}
          padding={16}
          fontSize={15}
          placeholder="Email"
          placeholderTextColor={T.muted}
          color={T.text}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          focusStyle={{ borderColor: T.accent }}
        />
        <Input
          backgroundColor={T.bg}
          borderRadius={16}
          borderWidth={2}
          borderColor={T.border}
          padding={16}
          fontSize={15}
          placeholder="Password"
          placeholderTextColor={T.muted}
          color={T.text}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          focusStyle={{ borderColor: T.accent }}
        />

        {error && (
          <Text fontSize={13} color={T.error} textAlign="center">{error}</Text>
        )}

        {/* Submit button */}
        <YStack
          backgroundColor={canSubmit && !isLoading ? T.accent : T.accentDisabled}
          borderRadius={18}
          height={58}
          justifyContent="center"
          alignItems="center"
          onPress={canSubmit && !isLoading ? handleSubmit : undefined}
          animation="quick"
          pressStyle={canSubmit && !isLoading ? { scale: 0.97, opacity: 0.9, backgroundColor: T.accentDark } : {}}
          cursor={canSubmit && !isLoading ? 'pointer' : 'default'}
          opacity={canSubmit && !isLoading ? 1 : 0.5}
          marginTop={4}
          {...(canSubmit && !isLoading ? NEU.glowAqua : {})}
        >
          <Text fontSize={18} fontWeight="800" color={T.white} letterSpacing={0.3}>
            {isLoading ? 'Loading...' : mode === 'login' ? 'Log In' : 'Create Account'}
          </Text>
        </YStack>
      </YStack>

      {/* Toggle */}
      <XStack justifyContent="center" gap={4}>
        <Text fontSize={14} color={T.textSub}>
          {funnelMode
            ? (mode === 'login' ? 'New here? Create an account' : 'Already have an account?')
            : (mode === 'login' ? "Don't have an account?" : 'Already have an account?')}
        </Text>
        <Text
          fontSize={14}
          fontWeight="700"
          color={T.accent}
          onPress={onToggleMode}
          cursor="pointer"
          animation="quick"
          pressStyle={{ opacity: 0.7 }}
        >
          {mode === 'login' ? 'Sign Up' : 'Log In'}
        </Text>
      </XStack>

      {/* Skip */}
      <Text
        fontSize={13}
        color={T.muted}
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
