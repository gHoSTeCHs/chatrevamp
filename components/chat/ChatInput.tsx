import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onAttachmentPress?: () => void;
  onVoicePress?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({
  onSendMessage,
  onAttachmentPress,
  onVoicePress,
  placeholder = "Type a message...",
  disabled = false,
}: ChatInputProps) {
  const { colors } = useTheme();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const inputRef = useRef<TextInput>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleAttachment = () => {
    if (onAttachmentPress) {
      onAttachmentPress();
    } else {
      Alert.alert(
        'Attachments',
        'Choose an option',
        [
          { text: 'Camera', onPress: () => console.log('Camera pressed') },
          { text: 'Gallery', onPress: () => console.log('Gallery pressed') },
          { text: 'Document', onPress: () => console.log('Document pressed') },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  const handleVoicePress = () => {
    if (onVoicePress) {
      onVoicePress();
    } else {
      setIsRecording(!isRecording);
      
      // Animate the voice button
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Simulate recording toggle
      setTimeout(() => {
        setIsRecording(false);
      }, 2000);
    }
  };

  const showSendButton = message.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
      <View style={[styles.inputContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
        {/* Attachment button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleAttachment}
          disabled={disabled}
        >
          <Ionicons 
            name="add" 
            size={24} 
            color={disabled ? colors.textSecondary : colors.primary} 
          />
        </TouchableOpacity>

        {/* Text input */}
        <TextInput
          ref={inputRef}
          style={[
            styles.textInput,
            { 
              color: colors.text,
              backgroundColor: 'transparent',
            }
          ]}
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          multiline
          maxLength={1000}
          editable={!disabled}
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
        />

        {/* Send or Voice button */}
        {showSendButton ? (
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: colors.primary }]}
            onPress={handleSend}
            disabled={disabled}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                isRecording && { backgroundColor: colors.error + '20' }
              ]}
              onPress={handleVoicePress}
              disabled={disabled}
            >
              <Ionicons 
                name={isRecording ? "stop" : "mic"} 
                size={24} 
                color={isRecording ? colors.error : (disabled ? colors.textSecondary : colors.primary)} 
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    ...Platform.select({
      ios: {
        paddingBottom: 34, // Account for home indicator on iOS
      },
      android: {
        paddingBottom: 12,
      },
    }),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 4,
    minHeight: 48,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    maxHeight: 120,
    textAlignVertical: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
});