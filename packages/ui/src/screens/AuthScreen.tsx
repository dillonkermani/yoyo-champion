import React, { useState } from 'react';
import { YStack, XStack, Input, Stack } from 'tamagui';
import { Text } from '../Text';
import { THEME } from '../tamagui.config';

export interface AuthScreenProps {
  mode: 'login' | 'signup';
  onSubmit: (fields: { name?: string; email: string; password: string }) => void;
  onToggleMode: () => void;
  onForgotPassword?: () => void;
  onDevSkip?: () => void;
  onBack?: () => void;
  isLoading?: boolean;
  error?: string | null;
  paddingTop?: number;
}

const T = {
  bg: '#F7F8FA',
  cardBg: '#FFFFFF',
  text: '#0F1419',
  textSub: '#536471',
  muted: '#8899A6',
  border: '#E1E8ED',
  accent: '#9bedff',
  accentDark: '#7dd9f0',
  accentText: '#1CB0F6',
  accentTextDark: '#0e9ad8',
  error: '#FF4B4B',
  errorBg: 'rgba(255,75,75,0.08)',
  errorBorder: 'rgba(255,75,75,0.2)',
  divider: '#E1E8ED',
  orange: '#FF9600',
} as const;

export function AuthScreen({
  mode,
  onSubmit,
  onToggleMode,
  onForgotPassword,
  onDevSkip,
  onBack,
  isLoading = false,
  error,
  paddingTop = 0,
}: AuthScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      paddingTop={paddingTop + 48}
      paddingBottom={32}
      paddingHorizontal={16}
      justifyContent="center"
      alignItems="center"
    >
      <YStack width="100%" maxWidth={420} gap={24}>
        {/* Header */}
        <YStack alignItems="center" gap={8}>
          <Text fontSize={22} fontWeight="800" color={T.text} letterSpacing={-0.5}>
            YoYo<Text fontSize={22} fontWeight="800" color={T.accent}>Champion</Text>
          </Text>
          <YStack gap={4} alignItems="center" marginTop={8}>
            <Text fontSize={22} fontWeight="800" color={T.text}>
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </Text>
            <Text fontSize={15} color={T.textSub}>
              {mode === 'login'
                ? 'Sign in to continue your yo-yo journey'
                : 'Start your yo-yo journey today'}
            </Text>
          </YStack>
        </YStack>

        {/* Card */}
        <YStack
          backgroundColor={T.cardBg}
          borderRadius={20}
          padding={28}
          borderWidth={1}
          borderColor={T.border}
          {...THEME.shadow.lg}
        >
          {/* Error */}
          {error && (
            <YStack
              backgroundColor={T.errorBg}
              borderRadius={14}
              borderWidth={1}
              borderColor={T.errorBorder}
              paddingHorizontal={16}
              paddingVertical={12}
              marginBottom={16}
            >
              <Text fontSize={13} color={T.error}>{error}</Text>
            </YStack>
          )}

          {/* Form fields */}
          <YStack gap={16}>
            {mode === 'signup' && (
              <YStack gap={6}>
                <Text fontSize={13} fontWeight="600" color={T.text}>Name</Text>
                <Input
                  backgroundColor={T.cardBg}
                  borderRadius={14}
                  borderWidth={1}
                  borderColor={T.border}
                  paddingHorizontal={16}
                  paddingVertical={14}
                  fontSize={14}
                  placeholder="Your name"
                  placeholderTextColor={T.muted}
                  color={T.text}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  focusStyle={{ borderColor: T.accent, borderWidth: 2 }}
                />
              </YStack>
            )}

            <YStack gap={6}>
              <Text fontSize={13} fontWeight="600" color={T.text}>Email</Text>
              <Input
                backgroundColor={T.cardBg}
                borderRadius={14}
                borderWidth={1}
                borderColor={T.border}
                paddingHorizontal={16}
                paddingVertical={14}
                fontSize={14}
                placeholder="you@example.com"
                placeholderTextColor={T.muted}
                color={T.text}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                focusStyle={{ borderColor: T.accent, borderWidth: 2 }}
              />
            </YStack>

            <YStack gap={6}>
              <Text fontSize={13} fontWeight="600" color={T.text}>Password</Text>
              <XStack
                backgroundColor={T.cardBg}
                borderRadius={14}
                borderWidth={1}
                borderColor={T.border}
                alignItems="center"
                focusStyle={{ borderColor: T.accent, borderWidth: 2 }}
              >
                <Input
                  flex={1}
                  backgroundColor="transparent"
                  borderWidth={0}
                  paddingHorizontal={16}
                  paddingVertical={14}
                  fontSize={14}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter your password'}
                  placeholderTextColor={T.muted}
                  color={T.text}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Text
                  paddingRight={14}
                  fontSize={13}
                  fontWeight="600"
                  color={T.muted}
                  onPress={() => setShowPassword(!showPassword)}
                  cursor="pointer"
                  animation="quick"
                  pressStyle={{ opacity: 0.6 }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </XStack>
            </YStack>

            {/* Forgot password (login only) */}
            {mode === 'login' && (
              <XStack justifyContent="flex-end">
                <Text
                  fontSize={13}
                  fontWeight="600"
                  color={T.accentText}
                  onPress={onForgotPassword}
                  cursor="pointer"
                  animation="quick"
                  pressStyle={{ opacity: 0.7 }}
                >
                  Forgot password?
                </Text>
              </XStack>
            )}

            {/* Submit */}
            <YStack
              backgroundColor={canSubmit && !isLoading ? T.accent : '#c5f4ff'}
              borderRadius={14}
              height={50}
              justifyContent="center"
              alignItems="center"
              onPress={canSubmit && !isLoading ? handleSubmit : undefined}
              animation="quick"
              pressStyle={canSubmit && !isLoading ? { scale: 0.98, opacity: 0.9, backgroundColor: T.accentDark } : {}}
              cursor={canSubmit && !isLoading ? 'pointer' : 'default'}
              opacity={canSubmit && !isLoading ? 1 : 0.5}
              marginTop={4}
              {...(canSubmit && !isLoading ? THEME.shadow.sm : {})}
            >
              <Text fontSize={16} fontWeight="700" color={T.text}>
                {isLoading
                  ? (mode === 'login' ? 'Signing in...' : 'Creating account...')
                  : (mode === 'login' ? 'Sign In' : 'Create Account')}
              </Text>
            </YStack>
          </YStack>

          {/* OR divider */}
          <XStack alignItems="center" gap={16} marginVertical={20}>
            <Stack flex={1} height={1} backgroundColor={T.divider} />
            <Text fontSize={12} fontWeight="600" color={T.muted}>OR</Text>
            <Stack flex={1} height={1} backgroundColor={T.divider} />
          </XStack>

          {/* Toggle mode link */}
          <XStack justifyContent="center" gap={4}>
            <Text fontSize={14} color={T.textSub}>
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            </Text>
            <Text
              fontSize={14}
              fontWeight="700"
              color={T.accentText}
              onPress={onToggleMode}
              cursor="pointer"
              animation="quick"
              pressStyle={{ opacity: 0.7 }}
            >
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </Text>
          </XStack>
        </YStack>

        {/* Footer links */}
        <YStack alignItems="center" gap={8} marginTop={4}>
          {onDevSkip && (
            <Text
              fontSize={13}
              fontWeight="600"
              color={T.orange}
              onPress={onDevSkip}
              cursor="pointer"
              animation="quick"
              pressStyle={{ opacity: 0.7 }}
            >
              Skip (dev mode)
            </Text>
          )}
          {onBack && (
            <Text
              fontSize={13}
              color={T.muted}
              onPress={onBack}
              cursor="pointer"
              animation="quick"
              pressStyle={{ opacity: 0.7 }}
            >
              {'<'} Back to home
            </Text>
          )}
        </YStack>
      </YStack>
    </YStack>
  );
}
