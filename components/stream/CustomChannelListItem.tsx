import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChannelPreviewMessengerProps } from 'stream-chat-expo';
import { useTheme } from '../../contexts/ThemeContext';
import { Avatar } from '../ui/Avatar';

export function CustomChannelListItem(props: ChannelPreviewMessengerProps) {
	const { colors } = useTheme();
	const { channel, onSelect } = props;

	const latestMessage =
		channel?.state?.messages?.[channel.state.messages.length - 1];
	const unread = channel?.state?.unreadCount || 0;

	const formatTime = (timestamp: Date | string) => {
		const date =
			typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
		const now = new Date();
		const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

		if (diffInHours < 24) {
			return date.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			});
		} else if (diffInHours < 168) {
			return date.toLocaleDateString([], { weekday: 'short' });
		} else {
			return date.toLocaleDateString([], {
				month: 'short',
				day: 'numeric',
			});
		}
	};

	const truncateMessage = (text: string, maxLength: number = 50) => {
		if (!text) return '';
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + '...';
	};

	const getChannelName = () => {
		if (channel.data?.name) {
			return channel.data.name;
		}

		const members = Object.values(channel.state.members || {});
		const otherMembers = members.filter(
			(member) => member.user?.id !== channel._client.userID
		);

		if (otherMembers.length === 1) {
			return (
				otherMembers[0].user?.name || otherMembers[0].user?.id || 'Unknown User'
			);
		} else if (otherMembers.length > 1) {
			return otherMembers
				.map((member) => member.user?.name || member.user?.id)
				.join(', ');
		}

		return 'Chat';
	};

	const getChannelAvatar = (): string | undefined => {
		if (channel.data?.image) {
			return channel.data.image;
		}

		const members = Object.values(channel.state.members || {});
		const otherMembers = members.filter(
			(member) => member.user?.id !== channel._client.userID
		);

		if (otherMembers.length === 1 && otherMembers[0].user?.image) {
			return otherMembers[0].user.image;
		}

		return undefined;
	};

	const isUserOnline = () => {
		const members = Object.values(channel.state.members || {});
		const otherMembers = members.filter(
			(member) => member.user?.id !== channel._client.userID
		);

		if (otherMembers.length === 1) {
			return otherMembers[0].user?.online || false;
		}

		return false;
	};

	const getLastMessageText = () => {
		if (!latestMessage) return 'No messages yet';

		if (latestMessage.text) {
			return latestMessage.text;
		} else if (
			latestMessage.attachments &&
			latestMessage.attachments.length > 0
		) {
			const attachment = latestMessage.attachments[0];
			if (attachment.type === 'image') {
				return '📷 Photo';
			} else if (attachment.type === 'file') {
				return '📎 File';
			}
		}

		return 'Message';
	};

	const isMessageRead = () => {
		return (unread || 0) === 0;
	};

	return (
		<TouchableOpacity
			onPress={() => onSelect?.(channel)}
			className="flex-row items-center px-4 py-3 border-b"
			style={{
				backgroundColor: colors.background,
				borderBottomColor: colors.border,
			}}
			activeOpacity={0.6}>
			<Avatar
				source={getChannelAvatar() || undefined}
				name={getChannelName()}
				size="medium"
				showOnlineStatus={true}
				isOnline={isUserOnline()}
			/>

			<View className="flex-1 ml-3">
				<View className="flex-row items-center justify-between mb-1">
					<Text
						className="text-base font-semibold flex-1"
						style={{ color: colors.text }}
						numberOfLines={1}>
						{getChannelName()}
					</Text>
					<Text className="text-xs ml-2" style={{ color: colors.textTertiary }}>
						{latestMessage ? formatTime(latestMessage.created_at) : ''}
					</Text>
				</View>

				<View className="flex-row items-center justify-between">
					<Text
						className="text-sm flex-1"
						style={{
							color: isMessageRead() ? colors.textSecondary : colors.text,
							fontWeight: isMessageRead() ? 'normal' : '500',
						}}
						numberOfLines={1}>
						{truncateMessage(getLastMessageText())}
					</Text>

					{(unread || 0) > 0 && (
						<View
							className="ml-2 min-w-[20px] h-5 rounded-full items-center justify-center px-1.5"
							style={{ backgroundColor: colors.primary }}>
							<Text className="text-xs font-bold text-white">
								{(unread || 0) > 99 ? '99+' : unread || 0}
							</Text>
						</View>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
}
