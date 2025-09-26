import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatTheme } from '../constants/theme';
import { ThemeMode, ThemeContextType } from '../types/theme.types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@chatrevamp_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  console.log('ThemeProvider: Initializing...');
  
  const systemColorScheme = useColorScheme();
  console.log('ThemeProvider: System color scheme:', systemColorScheme);
  
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  // Determine the actual theme based on mode
  const getActualTheme = (mode: ThemeMode) => {
    if (mode === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return mode;
  };

  const actualTheme = getActualTheme(themeMode);
  console.log('ThemeProvider: Actual theme determined:', actualTheme);
  
  const colors = ChatTheme[actualTheme];
  console.log('ThemeProvider: Colors loaded:', !!colors);
  
  const isDark = actualTheme === 'dark';

  // Load saved theme on mount
  useEffect(() => {
    console.log('ThemeProvider: useEffect triggered, loading theme');
    const loadTheme = async () => {
      try {
        console.log('ThemeProvider: Attempting to load saved theme');
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        console.log('ThemeProvider: Saved theme retrieved:', savedTheme);
        
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          console.log('ThemeProvider: Setting theme mode to:', savedTheme);
          setThemeMode(savedTheme as ThemeMode);
        } else {
          console.log('ThemeProvider: No valid saved theme, using default');
        }
      } catch (error) {
        console.warn('ThemeProvider: Failed to load theme preference:', error);
      }
    };
    loadTheme();
  }, []);



  // Save theme when it changes
  const setTheme = async (mode: ThemeMode) => {
    try {
      setThemeMode(mode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  const value: ThemeContextType = {
    mode: themeMode,
    colors,
    isDark,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}