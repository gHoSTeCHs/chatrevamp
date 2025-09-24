import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { Avatar } from '../ui/Avatar';
import { ChatMessage as ChatMessageType, ChatUser } from '../../types/chat.types';

interface ChatMessageProps {
  message: ChatMessageType;
  isCurrentUser: boolean;
  showAvatar?: boolean;
  user?: ChatUser;
}

const { width: screenWidth } = Dimensions.get('window');
const maxMessageWidth = screenWidth * 0.75;

export function ChatMessage({ 
  message, 
  isCurrentUser, 
  showAvatar = false, 
  user 
}: ChatMessageProps) {
  const { colors } = useTheme();

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getStatusIcon = () => {
    if (!isCurrentUser) return null;
    
    switch (message.status) {
      case 'sending':
        return <Ionicons name="time-outline" size={14} color={colors.textSecondary} />;
      case 'sent':
        return <Ionicons name="checkmark" size={14} color={colors.textSecondary} />;
      case 'delivered':
        return <Ionicons name="checkmark-done" size={14} color={colors.textSecondary} />;
      case 'read':
        return <Ionicons name="checkmark-done" size={14} color={colors.primary} />;
      default:
        return null;
    }
  };

  const renderAttachments = () => {
    if (!message.attachments || message.attachments.length === 0) return null;

    return (
      <View style={styles.attachmentsContainer}>
        {message.attachments.map((attachment) => (
          <TouchableOpacity
            key={attachment.id}
            style={[
              styles.attachmentItem,
              { backgroundColor: colors.surface, borderColor: colors.border }
            ]}
          >
            {attachment.type === 'image' ? (
              <Image
                source={{ uri: attachment.url }}
                style={styles.attachmentImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.fileAttachment}>
                <Ionicons name="document" size={24} color={colors.primary} />
                <Text
                  style={[styles.fileName, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {attachment.name}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={[
      styles.container,
      isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
    ]}>
      {/* Avatar for other users */}
      {!isCurrentUser && (
        <View style={styles.avatarContainer}>
          {showAvatar && user ? (
            <Avatar
              source={user.avatar}
              name={user.name}
              size={'small'}
              isOnline={false}
            />
          ) : (
            <View style={styles.avatarPlaceholder} />
          )}
        </View>
      )}

      {/* Message bubble */}
      <View style={[
        styles.messageBubble,
        {
          backgroundColor: isCurrentUser ? colors.primary : colors.surface,
          maxWidth: maxMessageWidth,
        },
        isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
      ]}>
        {/* Attachments */}
        {renderAttachments()}

        {/* Text message */}
        {message.text ? (
          <Text style={[
            styles.messageText,
            { color: isCurrentUser ? '#FFFFFF' : colors.text }
          ]}>
            {message.text}
          </Text>
        ) : null}

        {/* Message footer with time and status */}
        <View style={styles.messageFooter}>
          <Text style={[
            styles.messageTime,
            { color: isCurrentUser ? 'rgba(255, 255, 255, 0.7)' : colors.textSecondary }
          ]}>
            {formatTime(message.timestamp)}
          </Text>
          {getStatusIcon()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 2,
    paddingHorizontal: 16,
  },
  currentUserContainer: {
    justifyContent: 'flex-end',
  },
  otherUserContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
  },
  messageBubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 2,
  },
  currentUserBubble: {
    borderBottomRightRadius: 4,
  },
  otherUserBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 4,
  },
  messageTime: {
    fontSize: 12,
  },
  attachmentsContainer: {
    marginBottom: 8,
  },
  attachmentItem: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 4,
    borderWidth: 1,
  },
  attachmentImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  fileAttachment: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
});