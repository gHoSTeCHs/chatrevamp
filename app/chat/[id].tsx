import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { ChatMessage as ChatMessageComponent } from '../../components/chat/ChatMessage';
import { ChatInput } from '../../components/chat/ChatInput';
import { Avatar } from '../../components/ui/Avatar';
import { ChatConversation, ChatMessage, ChatUser } from '../../types/chat.types';
import { mockConversations } from '../../constants/mockData';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const flatListRef = useRef<FlatList>(null);
  
  // Find the conversation by ID
  const conversation = mockConversations.find(conv => conv.id === id);
  const otherUser = conversation?.participants.find(p => p.id !== 'currentUser');
  
  const [messages, setMessages] = useState<ChatMessage[]>(conversation?.messages || []);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isRead: false,
      senderId: 'currentUser',
      type: 'text',
      status: 'sent',
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleVideoCall = () => {
    console.log('Starting video call with:', otherUser?.name);
  };

  const handleVoiceCall = () => {
    console.log('Starting voice call with:', otherUser?.name);
  };

  const handleMoreOptions = () => {
    console.log('More options for:', otherUser?.name);
  };

  if (!conversation || !otherUser) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            Chat not found
          </Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.primary }]}
            onPress={handleGoBack}
          >
            <Text style={[styles.backButtonText, { color: colors.surface }]}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderMessage = ({ item, index }: { item: ChatMessage; index: number }) => {
    const isCurrentUser = item.senderId === 'currentUser';
    const showAvatar = !isCurrentUser && (
      index === messages.length - 1 || 
      messages[index + 1]?.senderId !== item.senderId
    );

    return (
      <ChatMessageComponent
        message={item}
        isCurrentUser={isCurrentUser}
        showAvatar={showAvatar}
        user={isCurrentUser ? undefined : otherUser}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colors.background === '#FFFFFF' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.surface}
      />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleGoBack}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Avatar
            source={otherUser.avatar}
            name={otherUser.name}
            size={'small'}
            isOnline={otherUser.isOnline}
          />
          <View style={styles.headerText}>
            <Text style={[styles.headerName, { color: colors.text }]}>
              {otherUser.name}
            </Text>
            <Text style={[styles.headerStatus, { color: colors.textSecondary }]}>
              {otherUser.isOnline ? 'Online' : 'Last seen recently'}
            </Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleVoiceCall}
          >
            <Ionicons name="call" size={22} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleVideoCall}
          >
            <Ionicons name="videocam" size={22} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleMoreOptions}
          >
            <Ionicons name="ellipsis-vertical" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View style={[styles.typingContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.typingText, { color: colors.textSecondary }]}>
              {otherUser.name} is typing...
            </Text>
          </View>
        )}

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerStatus: {
    fontSize: 14,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});