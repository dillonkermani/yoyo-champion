import React from 'react';
import { Input } from 'tamagui';
import { NEU } from '../tamagui.config';

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChangeText, placeholder = 'Search tricks...' }: SearchInputProps) {
  return (
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      borderRadius={14}
      borderWidth={0}
      backgroundColor="$neuSurfacePressed"
      paddingHorizontal={16}
      size="$4"
      color="#2d3436"
      placeholderTextColor="#a0a8b0"
      // Inset shadow for recessed look
      {...NEU.inset}
    />
  );
}
