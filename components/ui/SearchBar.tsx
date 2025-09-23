import React from 'react';
import { View, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  editable?: boolean;
  style?: ViewStyle;
}

export function SearchBar({ 
  placeholder = "Search chats...", 
  value, 
  onChangeText, 
  onPress,
  editable = true,
  style 
}: SearchBarProps) {
  const { colors } = useTheme();

  const content = (
    <View 
      className="flex-row items-center px-4 py-3 rounded-xl mx-4"
      style={[{ backgroundColor: colors.surface }, style]}
    >
      <Ionicons 
        name="search" 
        size={20} 
        color={colors.textTertiary} 
        className="mr-3"
      />
      <TextInput
        className="flex-1 text-base"
        style={{ color: colors.text }}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
    </View>
  );

  if (onPress && !editable) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}