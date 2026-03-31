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
      borderRadius={14}
      borderWidth={1.5}
      borderColor="#E1E8ED"
      backgroundColor="white"
      paddingHorizontal={16}
      size="$4"
      color="#0F1419"
      placeholderTextColor="#8899A6"
      focusStyle={{ borderColor: '#9bedff', borderWidth: 2 }}
    />
  );
}
