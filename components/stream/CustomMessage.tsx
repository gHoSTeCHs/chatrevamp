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
import {  MessageSimpleProps } from 'stream-chat-expo';
import { useTheme } from '@/contexts/ThemeContext';
import { Avatar } from '@/components/ui/Avatar';

const { width: screenWidth } = Dimensions.get('window');
const maxMessageWidth = screenWidth * 0.75;

export function CustomMessage(props: MessageSimpleProps) {
  const { colors } = useTheme();
  const { message, isMyMessage } = props;
  
  // Early return if no message
  if (!message) return null;

  const formatTime = (timestamp: Date | string) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getStatusIcon = () => {
    if (!isMyMessage) return null;
    
    const status = message.status;
    switch (status) {
      case 'sending':
        return <Ionicons name="time-outline" size={14} color="rgba(255, 255, 255, 0.7)" />;
      case 'received':
        return <Ionicons name="checkmark" size={14} color="rgba(255, 255, 255, 0.7)" />;
      case 'read':
        return <Ionicons name="checkmark-done" size={14} color="rgba(255, 255, 255, 0.9)" />;
      default:
        return <Ionicons name="checkmark" size={14} color="rgba(255, 255, 255, 0.7)" />;
    }
  };

  const renderAttachments = () => {
    if (!message.attachments || message.attachments.length === 0) return null;

    return (
      <View style={styles.attachmentsContainer}>
        {message.attachments.map((attachment, index) => (
          <TouchableOpacity
            key={attachment.asset_url || index}
            style={[
              styles.attachmentItem,
              { backgroundColor: colors.surface, borderColor: colors.border }
            ]}
          >
            {attachment.type === 'image' ? (
              <Image
                source={{ uri: attachment.image_url || attachment.asset_url }}
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
                  {attachment.title || 'File'}
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
      isMyMessage ? styles.currentUserContainer : styles.otherUserContainer
    ]}>
      {!isMyMessage && (
        <View style={styles.avatarContainer}>
          {message.user ? (
            <Avatar
              source={message.user.image}
              name={message.user.name || message.user.id}
              size={'small'}
              isOnline={false}
            />
          ) : (
            <View style={styles.avatarPlaceholder} />
          )}
        </View>
      )}

      <View style={[
        styles.messageBubble,
        {
          backgroundColor: isMyMessage ? colors.primary : colors.surface,
          maxWidth: maxMessageWidth,
        },
        isMyMessage ? styles.currentUserBubble : styles.otherUserBubble,
      ]}>
        {renderAttachments()}

        {message.text ? (
          <Text style={[
            styles.messageText,
            { color: isMyMessage ? '#FFFFFF' : colors.text }
          ]}>
            {message.text}
          </Text>
        ) : null}

        <View style={styles.messageFooter}>
          <Text style={[
            styles.messageTime,
            { color: isMyMessage ? 'rgba(255, 255, 255, 0.7)' : colors.textSecondary }
          ]}>
            {formatTime(message.created_at)}
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