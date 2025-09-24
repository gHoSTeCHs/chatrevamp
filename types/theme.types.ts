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