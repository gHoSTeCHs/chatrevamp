import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Avatar } from '../ui/Avatar';
import { Chat } from '../../types/chat.types';

interface ChatListItemProps {
  chat: Chat;
  onPress?: () => void;
}

export function ChatListItem({ chat, onPress }: ChatListItemProps) {
  const { colors } = useTheme();

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: false 
      });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const truncateMessage = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center px-4 py-3 border-b"
      style={{
        backgroundColor: colors.background,
        borderBottomColor: colors.separator,
      }}
      activeOpacity={0.6}
    >
      <Avatar
        source={chat.user.avatar}
        name={chat.user.name}
        size="medium"
        showOnlineStatus={true}
        isOnline={chat.user.isOnline}
      />
      
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between mb-1">
          <Text 
            className="text-base font-semibold flex-1"
            style={{ color: colors.text }}
            numberOfLines={1}
          >
            {chat.user.name}
          </Text>
          <Text 
            className="text-xs ml-2"
            style={{ color: colors.textTertiary }}
          >
            {formatTime(chat.lastMessage.timestamp)}
          </Text>
        </View>
        
        <View className="flex-row items-center justify-between">
          <Text 
            className="text-sm flex-1"
            style={{ 
              color: chat.lastMessage.isRead ? colors.textSecondary : colors.text,
              fontWeight: chat.lastMessage.isRead ? 'normal' : '500'
            }}
            numberOfLines={1}
          >
            {truncateMessage(chat.lastMessage.text)}
          </Text>
          
          {chat.unreadCount > 0 && (
            <View 
              className="ml-2 min-w-[20px] h-5 rounded-full items-center justify-center px-1.5"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-xs font-bold text-white">
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}