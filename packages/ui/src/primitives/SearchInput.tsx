import React from 'react';
import { Input } from 'tamagui';

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
      borderRadius={12}
      borderColor="$borderColor"
      backgroundColor="$background"
      paddingHorizontal={14}
      size="$4"
    />
  );
}
