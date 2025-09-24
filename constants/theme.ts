/**
 * Enhanced theme system for ChatRevamp with comprehensive color tokens
 */

import { Platform } from 'react-native';
import { ChatColors } from '../types/theme.types';

// Chat-specific color palette
const chatPrimary = '#007AFF';
const chatPrimaryLight = '#4DA3FF';
const chatPrimaryDark = '#0056CC';

export const ChatTheme: { light: ChatColors; dark: ChatColors } = {
  light: {
    // Background colors
    background: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceSecondary: '#F1F3F4',
    
    // Text colors
    text: '#1C1C1E',
    textSecondary: '#6C6C70',
    textTertiary: '#8E8E93',
    
    // Primary colors
    primary: chatPrimary,
    primaryLight: chatPrimaryLight,
    primaryDark: chatPrimaryDark,
    
    // Status colors
    online: '#34C759',
    offline: '#8E8E93',
    away: '#FF9500',
    error: '#FF3B30',
    
    // UI elements
    border: '#E5E5EA',
    separator: '#F1F1F1',
    shadow: 'rgba(0, 0, 0, 0.1)',
    
    // Tab colors
    tabActive: chatPrimary,
    tabInactive: '#8E8E93',
    tabBackground: '#FFFFFF',
  },
  dark: {
    // Background colors
    background: '#000000',
    surface: '#1C1C1E',
    surfaceSecondary: '#2C2C2E',
    
    // Text colors
    text: '#FFFFFF',
    textSecondary: '#AEAEB2',
    textTertiary: '#8E8E93',
    
    // Primary colors
    primary: chatPrimary,
    primaryLight: chatPrimaryLight,
    primaryDark: chatPrimaryDark,
    
    // Status colors
    online: '#30D158',
    offline: '#8E8E93',
    away: '#FF9F0A',
    error: '#FF453A',
    
    // UI elements
    border: '#38383A',
    separator: '#2C2C2E',
    shadow: 'rgba(0, 0, 0, 0.3)',
    
    // Tab colors
    tabActive: chatPrimary,
    tabInactive: '#8E8E93',
    tabBackground: '#1C1C1E',
  },
};

// Legacy Colors for backward compatibility
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
