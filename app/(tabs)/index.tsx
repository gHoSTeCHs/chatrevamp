import { ChatHeader } from '@/components/chat/ChatHeader';
import HospitalMembersModal from '@/components/modals/HospitalMembersModal';
import { CustomChannelListItem } from '@/components/stream/CustomChannelListItem';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { SearchBar } from '@/components/ui/SearchBar';
import { useStreamChat } from '@/contexts/StreamChatContext';
import { useTheme } from '@/contexts/ThemeContext';
import { HospitalMember } from '@/types/hospital.types';

import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
	ActivityIndicator,
	StatusBar,
	Text,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChannelList } from 'stream-chat-expo';
import '../global.css';

export default function ChatHomeScreen() {
	const { colors, isDark } = useTheme();
	const { client, isConnected } = useStreamChat();
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);


	const filters = useMemo(() => {
		if (!client?.userID) return {};
		
		const baseFilters = {
			type: 'messaging',
			members: { $in: [client.userID] },
		};

		if (searchQuery.trim()) {
			return {
				...baseFilters,
				name: { $autocomplete: searchQuery },
			};
		}

		return baseFilters;
	}, [client?.userID, searchQuery]);

	const sort = { last_message_at: -1 as const };

	const handleNewChat = (): void => {
		setIsModalVisible(true);
	};

	const handleChannelSelect = (channel: any) => {
		router.push(`/chat/${channel.id}`);
	};

	const handleStartConversation = async (
		member: HospitalMember
	): Promise<void> => {
		if (!client) return;

		try {
			const channel = client.channel('messaging', {
				members: [client.userID!, member.id],
				name: member.name,
			});

			await channel.create();
			setIsModalVisible(false);
			router.push(`/chat/${channel.id}`);
		} catch (error) {
			console.error('Error creating channel:', error);
		}
	};

	if (!isConnected || !client) {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
				<StatusBar
					barStyle={isDark ? 'light-content' : 'dark-content'}
					backgroundColor={colors.background}
				/>
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size="large" color={colors.primary} />
					<Text
						className="text-lg font-medium mt-4"
						style={{ color: colors.text }}>
						Connecting to chat...
					</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
			<StatusBar
				barStyle={isDark ? 'light-content' : 'dark-content'}
				backgroundColor={colors.background}
			/>

			<ChatHeader />

			<View style={{ flex: 1 }}>
				<SearchBar
					value={searchQuery}
					onChangeText={setSearchQuery}
					placeholder="Search conversations..."
				/>

				<ChannelList
					filters={filters}
					sort={sort}
					onSelect={handleChannelSelect}
					Preview={CustomChannelListItem}
					EmptyStateIndicator={() => (
						<View className="flex-1 items-center justify-center py-20">
							<Text className="text-gray-500 text-center">
								No conversations yet.{'\n'}Start a new chat to get started!
							</Text>
						</View>
					)}
				/>
			</View>

			<FloatingActionButton onPress={handleNewChat} />

			<HospitalMembersModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onStartConversation={handleStartConversation}
			/>
		</SafeAreaView>
	);
}
