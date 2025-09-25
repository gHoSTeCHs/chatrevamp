import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { ThemeMode } from '../../types/theme.types';
import ThemeSelectionModal from '../../components/modals/ThemeSelectionModal';
import '../global.css';



export default function SettingsScreen() {
  const { colors, mode, setTheme, isDark } = useTheme();
  const router = useRouter();
  const [isThemeModalVisible, setIsThemeModalVisible] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

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
    {
      id: 'logout',
      title: 'Logout',
      subtitle: 'Sign out of your account',
      icon: 'log-out-outline',
      type: 'logout' as const,
    },
  ];

  const handleSettingPress = (setting: any) => {
    if (setting.type === 'theme') {
      setIsThemeModalVisible(true);
      return;
    }
    if (setting.type === 'logout') {
      handleLogout();
      return;
    }
    console.log('Setting pressed:', setting.title);
  };

  const handleThemeSelect = (newTheme: ThemeMode): void => {
    setTheme(newTheme);
  };

  const handleCloseThemeModal = (): void => {
    setIsThemeModalVisible(false);
  };

  const handleLogout = (): void => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              // Simulate logout process
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // Clear any stored authentication data here
              // await AsyncStorage.removeItem('authToken');
              // await AsyncStorage.removeItem('userData');
              
              // Navigate to login screen or reset navigation stack
              // router.replace('/auth/login');
              console.log('User logged out successfully');
              
              Alert.alert('Success', 'You have been logged out successfully.');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <View className="px-6 py-4 border-b" style={{ borderBottomColor: colors.border }}>
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          Settings
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4">
          {settingsOptions.map((setting) => (
            <TouchableOpacity
              key={setting.id}
              className={`flex-row items-center py-4 border-b ${
                setting.type === 'logout' ? 'opacity-90' : ''
              }`}
              style={{ 
                borderBottomColor: colors.border,
                opacity: setting.type === 'logout' && isLoggingOut ? 0.6 : 1
              }}
              onPress={() => handleSettingPress(setting)}
              disabled={setting.type === 'logout' && isLoggingOut}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-4"
                style={{ 
                  backgroundColor: setting.type === 'logout' 
                    ? colors.error + '20' 
                    : colors.primary + '20' 
                }}
              >
                <Ionicons
                  name={setting.icon as any}
                  size={20}
                  color={setting.type === 'logout' ? colors.error : colors.primary}
                />
              </View>
              <View className="flex-1">
                <Text 
                  className="text-base font-medium" 
                  style={{ 
                    color: setting.type === 'logout' ? colors.error : colors.text 
                  }}
                >
                  {setting.type === 'logout' && isLoggingOut ? 'Logging out...' : setting.title}
                </Text>
                <Text className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                  {setting.subtitle}
                </Text>
              </View>
              {setting.type !== 'logout' && (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textSecondary}
                />
              )}
              {setting.type === 'logout' && isLoggingOut && (
                <View className="w-5 h-5">
                  <Ionicons
                    name="hourglass-outline"
                    size={20}
                    color={colors.error}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View className="px-6 py-8 border-t" style={{ borderTopColor: colors.border }}>
          <Text className="text-center text-sm" style={{ color: colors.textSecondary }}>
            Version 1.0.0
          </Text>
          <Text className="text-center text-xs mt-2" style={{ color: colors.textSecondary }}>
            © 2024 Chat Revamp. All rights reserved.
          </Text>
        </View>
      </ScrollView>

      <ThemeSelectionModal
        visible={isThemeModalVisible}
        onClose={handleCloseThemeModal}
        onThemeSelect={handleThemeSelect}
        currentTheme={mode}
      />
    </SafeAreaView>
  );
}
