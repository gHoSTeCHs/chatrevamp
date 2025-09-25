import { useStreamChat } from '@/contexts/StreamChatContext';
import { useTheme } from '@/contexts/ThemeContext';

import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Channel, MessageList } from 'stream-chat-expo';
import type { Channel as ChannelType } from 'stream-chat';
// import { Avatar } from '@/components/ui/Avatar';
import { CustomMessage } from '@/components/stream/CustomMessage';

export default function ChatScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const { colors, isDark } = useTheme();
	const { client, isConnected } = useStreamChat();
	const [channel, setChannel] = useState<ChannelType | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);



	useEffect(() => {
		if (!isConnected || !id) return;

		const initializeChannel = async () => {
			try {
				setLoading(true);
				const channelInstance = client.channel('messaging', id);
				await channelInstance.watch();
				setChannel(channelInstance);
			} catch (err) {
				console.error('Failed to initialize channel:', err);
				setError('Failed to load chat');
			} finally {
				setLoading(false);
			}
		};

		initializeChannel();
	}, [isConnected, id, client]);

	const handleGoBack = () => {
		router.back();
	};

	// const handleVideoCall = () => {
	//   console.log('Starting video call with:', otherUser?.name);
	// };

	// const handleVoiceCall = () => {
	//   console.log('Starting voice call with:', otherUser?.name);
	// };

	// const handleMoreOptions = () => {
	//   console.log('More options for:', otherUser?.name);
	// };

	if (loading) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}>
				<StatusBar
					barStyle={isDark ? 'light-content' : 'dark-content'}
					backgroundColor={colors.background}
				/>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color={colors.primary} />
					<Text style={[styles.loadingText, { color: colors.text }]}>
						Loading chat...
					</Text>
				</View>
			</SafeAreaView>
		);
	}

	if (error || !channel) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}>
				<StatusBar
					barStyle={isDark ? 'light-content' : 'dark-content'}
					backgroundColor={colors.background}
				/>
				<View style={styles.errorContainer}>
					<Text style={[styles.errorText, { color: colors.text }]}>
						{error || 'Chat not found'}
					</Text>
					<TouchableOpacity
						style={[styles.backButton, { backgroundColor: colors.primary }]}
						onPress={handleGoBack}>
						<Text style={[styles.backButtonText, { color: colors.surface }]}>
							Go Back
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}>
			<StatusBar
				barStyle={isDark ? 'light-content' : 'dark-content'}
				backgroundColor={colors.background}
			/>

			<View style={[styles.header, { backgroundColor: colors.primary }]}>
				<TouchableOpacity
					onPress={handleGoBack}
					style={styles.backButtonHeader}>
					<Ionicons name="arrow-back" size={24} color="#FFFFFF" />
				</TouchableOpacity>

				<View style={styles.headerContent}>
					<Text style={styles.headerTitle}>Chat</Text>
				</View>

				<TouchableOpacity style={styles.headerAction}>
					<Ionicons name="call" size={24} color="#FFFFFF" />
				</TouchableOpacity>
			</View>

			<Channel
				channel={channel}
				Message={CustomMessage}>
				<View style={styles.chatContainer}>
					<MessageList />
				</View>
			</Channel>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 32,
	},
	loadingText: {
		fontSize: 16,
		marginTop: 16,
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 32,
	},
	errorText: {
		fontSize: 18,
		textAlign: 'center',
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
	backButtonHeader: {
		padding: 8,
	},
	headerContent: {
		flex: 1,
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#FFFFFF',
	},
	headerAction: {
		padding: 8,
	},
	chatContainer: {
		flex: 1,
	},
});
