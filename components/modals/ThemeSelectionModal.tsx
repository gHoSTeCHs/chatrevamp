import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeSelectionModalProps, ThemeOption, ThemeMode } from '../../types/theme.types';
import { ChatTheme } from '../../constants/theme';

const { height: screenHeight } = Dimensions.get('window');

export default function ThemeSelectionModal({
  visible,
  onClose,
  currentTheme,
  onThemeSelect,
}: ThemeSelectionModalProps) {
  const { colors } = useTheme();
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const themeOptions: ThemeOption[] = [
    {
      id: 'light',
      title: 'Light',
      description: 'Clean and bright interface',
      icon: 'sunny',
      preview: {
        background: ChatTheme.light.background,
        surface: ChatTheme.light.surface,
        text: ChatTheme.light.text,
        primary: ChatTheme.light.primary,
      },
    },
    {
      id: 'dark',
      title: 'Dark',
      description: 'Easy on the eyes in low light',
      icon: 'moon',
      preview: {
        background: ChatTheme.dark.background,
        surface: ChatTheme.dark.surface,
        text: ChatTheme.dark.text,
        primary: ChatTheme.dark.primary,
      },
    },
    {
      id: 'system',
      title: 'System',
      description: 'Follows your device settings',
      icon: 'phone-portrait',
      preview: {
        background: colors.background,
        surface: colors.surface,
        text: colors.text,
        primary: colors.primary,
      },
    },
  ];

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenHeight,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleThemePress = (theme: ThemeMode) => {
    onThemeSelect(theme);
    onClose();
  };

  const handleBackdropPress = () => {
    onClose();
  };

  const renderThemePreview = (option: ThemeOption) => (
    <View className="flex-row items-center space-x-3 ml-4">
      <View className="w-8 h-8 rounded-lg overflow-hidden border border-opacity-20" style={{ borderColor: colors.border }}>
        <View className="flex-1 flex-row">
          <View className="flex-1" style={{ backgroundColor: option.preview.background }} />
          <View className="flex-1" style={{ backgroundColor: option.preview.surface }} />
        </View>
        <View className="h-1" style={{ backgroundColor: option.preview.primary }} />
      </View>
      <View className="w-6 h-6 rounded-full border-2" style={{ 
        backgroundColor: option.preview.text,
        borderColor: option.preview.surface,
      }} />
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
        <View className="flex-1">
          <Animated.View
            className="absolute inset-0 bg-black"
            style={{
              opacity: backdropOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            }}
          >
            <TouchableOpacity
              className="flex-1"
              activeOpacity={1}
              onPress={handleBackdropPress}
            />
          </Animated.View>

          <Animated.View
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl overflow-hidden"
            style={{
              backgroundColor: colors.background,
              transform: [{ translateY: slideAnim }],
              maxHeight: screenHeight * 0.7,
            }}
          >
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mt-3 mb-4" />

            <View className="px-6 pb-4">
              <View className="flex-row items-center justify-between mb-6">
                <View>
                  <Text className="text-xl font-bold" style={{ color: colors.text }}>
                    Choose Theme
                  </Text>
                  <Text className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                    Select your preferred appearance
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  className="w-8 h-8 rounded-full items-center justify-center"
                  style={{ backgroundColor: colors.surface }}
                >
                  <Ionicons name="close" size={18} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View className="space-y-3">
                {themeOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => handleThemePress(option.id)}
                    className="flex-row items-center justify-between p-4 rounded-xl border"
                    style={{
                      backgroundColor: currentTheme === option.id ? colors.primary + '15' : colors.surface,
                      borderColor: currentTheme === option.id ? colors.primary : 'transparent',
                      borderWidth: currentTheme === option.id ? 1 : 0,
                    }}
                  >
                    <View className="flex-row items-center flex-1">
                      <View
                        className="w-10 h-10 rounded-full items-center justify-center mr-3"
                        style={{
                          backgroundColor: currentTheme === option.id ? colors.primary : colors.surfaceSecondary,
                        }}
                      >
                        <Ionicons
                          name={option.icon as keyof typeof Ionicons.glyphMap}
                          size={20}
                          color={currentTheme === option.id ? '#FFFFFF' : colors.textSecondary}
                        />
                      </View>
                      <View className="flex-1">
                        <Text
                          className="text-base font-medium"
                          style={{ color: colors.text }}
                        >
                          {option.title}
                        </Text>
                        <Text
                          className="text-sm mt-1"
                          style={{ color: colors.textSecondary }}
                        >
                          {option.description}
                        </Text>
                      </View>
                    </View>

                    {renderThemePreview(option)}

                    {currentTheme === option.id && (
                      <View className="ml-3">
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color={colors.primary}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <View className="mt-6 pt-4 border-t" style={{ borderTopColor: colors.separator }}>
                <Text className="text-xs text-center" style={{ color: colors.textTertiary }}>
                  Theme changes apply immediately
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
    </Modal>
  );
}