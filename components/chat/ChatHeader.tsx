import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

interface ChatHeaderProps {
  title?: string;
  onSearchPress?: () => void;
  showSearch?: boolean;
}

export function ChatHeader({ 
  title = "Recent Chats", 
  onSearchPress,
  showSearch = true 
}: ChatHeaderProps) {
  const { colors } = useTheme();

  return (
    <View 
      className="flex-row items-center justify-between px-4 py-4"
      style={{ backgroundColor: colors.background }}
    >
      <Text 
        className="text-2xl font-bold"
        style={{ color: colors.text }}
      >
        {title}
      </Text>
      
      {showSearch && (
        <TouchableOpacity
          onPress={onSearchPress}
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.surface }}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="search" 
            size={20} 
            color={colors.textSecondary} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}