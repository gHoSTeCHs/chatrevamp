import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { ChatCategory } from '../../types/chat.types';

interface CategoryTabsProps {
  activeCategory: ChatCategory;
  onCategoryChange: (category: ChatCategory) => void;
}

const categories: { key: ChatCategory; label: string }[] = [
  { key: 'all', label: 'All chats' },
  { key: 'personal', label: 'Personal' },
  { key: 'work', label: 'Work' },
  { key: 'groups', label: 'Groups' },
];

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const { colors } = useTheme();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="px-4 py-2"
      contentContainerStyle={{ paddingRight: 16 }}
    >
      <View className="flex-row space-x-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.key;
          
          return (
            <TouchableOpacity
              key={category.key}
              onPress={() => onCategoryChange(category.key)}
              className={`px-4 py-2 rounded-full ${
                isActive ? 'shadow-sm' : ''
              }`}
              style={{
                backgroundColor: isActive ? colors.primary : colors.surface,
                borderWidth: isActive ? 0 : 1,
                borderColor: colors.separator,
              }}
              activeOpacity={0.8}
            >
              <Text
                className="text-sm font-medium"
                style={{
                  color: isActive ? '#FFFFFF' : colors.textSecondary,
                }}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}