import { StreamChat } from 'stream-chat';
import { STREAM_API_KEY } from './stream';

export const streamChatClient = StreamChat.getInstance(STREAM_API_KEY);

export const connectUser = async (
	userId: string,
	userToken: string,
	userData: any
) => {
	try {
		await streamChatClient.connectUser(
			{
				id: userId,
				name: userData.name,
			},
			userToken
		);
	} catch (error) {
		console.error('Failed to connect user to Stream Chat:', error);
		throw error;
	}
};

export const disconnectUser = async () => {
	try {
		await streamChatClient.disconnectUser();
	} catch (error) {
		console.error('Failed to disconnect user from Stream Chat:', error);
	}
};
