/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import {
	connectUser,
	disconnectUser,
	streamChatClient,
} from '../config/streamClient';
import { createStreamTheme } from '../utils/streamTheme';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';

interface StreamChatContextType {
	client: StreamChat;
	isConnected: boolean;
	isConnecting: boolean;
}

const StreamChatContext = createContext<StreamChatContextType | undefined>(
	undefined
);

export function StreamChatProvider({
	children,
}: {
	children: React.ReactNode;
}) {
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
			<OverlayProvider>
				<Chat client={streamChatClient} style={streamTheme}>
					{children}
				</Chat>
			</OverlayProvider>
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
