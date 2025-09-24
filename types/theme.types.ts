export type ThemeMode = 'light' | 'dark' | 'system';

export interface ChatColors {
  // Background colors
  background: string;
  surface: string;
  surfaceSecondary: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Status colors
  online: string;
  offline: string;
  away: string;
  error: string;
  
  // UI elements
  border: string;
  separator: string;
  shadow: string;
  
  // Tab colors
  tabActive: string;
  tabInactive: string;
  tabBackground: string;
}

export interface ThemeContextType {
  mode: ThemeMode;
  colors: ChatColors;
  isDark: boolean;
  setTheme: (mode: ThemeMode) => void;
}

export interface ThemeOption {
  id: ThemeMode;
  title: string;
  description: string;
  icon: string;
  preview: {
    background: string;
    surface: string;
    text: string;
    primary: string;
  };
}

export interface ThemeSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  currentTheme: ThemeMode;
  onThemeSelect: (theme: ThemeMode) => void;
}