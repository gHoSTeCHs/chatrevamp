import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MessageInput, MessageInputProps } from 'stream-chat-expo';

export function CustomMessageInput(props: MessageInputProps) {
	const { colors } = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<MessageInput
				{...props}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderTopWidth: 1,
		borderTopColor: 'rgba(0, 0, 0, 0.1)',
	},
	inputContainer: {
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	inputBox: {
		borderRadius: 20,
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 12,
		fontSize: 16,
		maxHeight: 100,
	},
	sendButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginLeft: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	attachButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
