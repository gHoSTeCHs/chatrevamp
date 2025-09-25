import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-expo';
import { streamChatClient, connectUser, disconnectUser } from '../config/streamClient';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import { createStreamTheme } from '../utils/streamTheme';

interface StreamChatContextType {
  client: StreamChat;
  isConnected: boolean;
  isConnecting: boolean;
}

const StreamChatContext = createContext<StreamChatContextType | undefined>(undefined);

export function StreamChatProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const streamTheme = useMemo(() => createStreamTheme(isDark), [isDark]);

  useEffect(() => {
    if (isAuthenticated && user && user.stream_token) {
      handleConnect();
    } else {
      handleDisconnect();
    }

    return () => {
      handleDisconnect();
    };
  }, [isAuthenticated, user]);

  const handleConnect = async () => {
    if (!user || !user.stream_token || isConnected || isConnecting) return;

    try {
      setIsConnecting(true);
      await connectUser(user.id.toString(), user.stream_token, user);
      setIsConnected(true);
    } catch (error) {
      console.error('Stream Chat connection failed:', error);
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!isConnected) return;

    try {
      await disconnectUser();
      setIsConnected(false);
    } catch (error) {
      console.error('Stream Chat disconnection failed:', error);
    }
  };

  const value: StreamChatContextType = {
    client: streamChatClient,
    isConnected,
    isConnecting,
  };

  return (
    <StreamChatContext.Provider value={value}>
      <Chat client={streamChatClient} style={streamTheme}>
        {children}
      </Chat>
    </StreamChatContext.Provider>
  );
}

export function useStreamChat(): StreamChatContextType {
  const context = useContext(StreamChatContext);
  if (context === undefined) {
    throw new Error('useStreamChat must be used within a StreamChatProvider');
  }
  return context;
}