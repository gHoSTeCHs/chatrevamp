import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { ThemeMode } from '../../types/theme.types';
import '../global.css';



export default function SettingsScreen() {
  const { colors, mode, setTheme } = useTheme();

  const settingsOptions = [
    {
      id: 'theme',
      title: 'Theme',
      subtitle: 'Choose your preferred theme',
      icon: 'color-palette-outline',
      type: 'theme' as const,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      icon: 'notifications-outline',
      type: 'toggle' as const,
      value: true,
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'Control your privacy settings',
      icon: 'shield-checkmark-outline',
      type: 'navigation' as const,
    },
    {
      id: 'storage',
      title: 'Storage & Data',
      subtitle: 'Manage app storage',
      icon: 'server-outline',
      type: 'navigation' as const,
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'App version and information',
      icon: 'information-circle-outline',
      type: 'navigation' as const,
    },
  ];

  const handleSettingPress = (setting: any) => {
    if (setting.type === 'theme') {
      // Theme selection will be handled by the theme picker
      return;
    }
    console.log('Setting pressed:', setting.title);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="px-6 py-4">
        <Text 
          className="text-2xl font-bold mb-2"
          style={{ color: colors.text }}
        >
          Settings
        </Text>
        <Text 
          className="text-base opacity-70"
          style={{ color: colors.textSecondary }}
        >
          Customize your app experience
        </Text>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6">
          {settingsOptions.map((setting) => (
            <TouchableOpacity
              key={setting.id}
              onPress={() => handleSettingPress(setting)}
              className="flex-row items-center justify-between p-4 mb-2 rounded-xl"
              style={{ backgroundColor: colors.surface }}
            >
              <View className="flex-row items-center flex-1">
                <Ionicons 
                  name={setting.icon as keyof typeof Ionicons.glyphMap} 
                  size={24} 
                  color={colors.textSecondary} 
                />
                <View className="ml-3 flex-1">
                  <Text 
                    className="text-base font-medium"
                    style={{ color: colors.text }}
                  >
                    {setting.title}
                  </Text>
                  <Text 
                    className="text-sm opacity-70 mt-1"
                    style={{ color: colors.textSecondary }}
                  >
                    {setting.subtitle}
                  </Text>
                </View>
              </View>
              
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={colors.textSecondary} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <View className="px-6 py-8">
          <View 
            className="p-4 rounded-xl"
            style={{ backgroundColor: colors.surface }}
          >
            <Text 
              className="text-sm font-medium mb-1"
              style={{ color: colors.text }}
            >
              ChatRevamp
            </Text>
            <Text 
              className="text-xs opacity-60"
              style={{ color: colors.textSecondary }}
            >
              Version 1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
