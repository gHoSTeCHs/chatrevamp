import React from 'react';
import { View, Image, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface AvatarProps {
  source?: string;
  name: string;
  size?: 'small' | 'medium' | 'large';
  showOnlineStatus?: boolean;
  isOnline?: boolean;
}

export function Avatar({ 
  source, 
  name, 
  size = 'medium', 
  showOnlineStatus = false, 
  isOnline = false 
}: AvatarProps) {
  const { colors } = useTheme();

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-lg',
  };

  const statusSizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View className="relative">
      <View 
        className={`${sizeClasses[size]} rounded-full overflow-hidden items-center justify-center`}
        style={{ backgroundColor: colors.surfaceSecondary }}
      >
        {source ? (
          <Image 
            source={{ uri: source }} 
            className={`${sizeClasses[size]} rounded-full`}
            resizeMode="cover"
          />
        ) : (
          <Text 
            className={`${textSizeClasses[size]} font-semibold`}
            style={{ color: colors.textSecondary }}
          >
            {getInitials(name)}
          </Text>
        )}
      </View>
      
      {showOnlineStatus && (
        <View 
          className={`${statusSizeClasses[size]} rounded-full absolute -bottom-0.5 -right-0.5 border-2`}
          style={{ 
            backgroundColor: isOnline ? colors.online : colors.offline,
            borderColor: colors.background 
          }}
        />
      )}
    </View>
  );
}