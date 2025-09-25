import { DeepPartial, Theme } from 'stream-chat-expo';

export const createStreamTheme = (isDark: boolean): DeepPartial<Theme> => {
	const colors = {
		light: {
			accent_blue: '#007AFF',
			accent_green: '#34C759',
			accent_red: '#FF3B30',
			bg_gradient_end: '#F2F2F7',
			bg_gradient_start: '#FFFFFF',
			black: '#000000',
			blue_alice: '#F0F8FF',
			border: '#E5E5EA',
			grey: '#8E8E93',
			grey_gainsboro: '#D1D1D6',
			grey_whisper: '#F2F2F7',
			icon: '#8E8E93',
			modal_shadow: '#000000',
			overlay: 'rgba(0, 0, 0, 0.2)',
			shadow_icon: '#00000080',
			targetedMessageBackground: '#FFF2CC',
			text: '#000000',
			white: '#FFFFFF',
			white_smoke: '#F2F2F7',
			white_snow: '#FCFCFC',
		},
		dark: {
			accent_blue: '#0A84FF',
			accent_green: '#30D158',
			accent_red: '#FF453A',
			bg_gradient_end: '#1C1C1E',
			bg_gradient_start: '#000000',
			black: '#FFFFFF',
			blue_alice: '#1C1C1E',
			border: '#38383A',
			grey: '#8E8E93',
			grey_gainsboro: '#48484A',
			grey_whisper: '#1C1C1E',
			icon: '#8E8E93',
			modal_shadow: '#000000',
			overlay: 'rgba(0, 0, 0, 0.6)',
			shadow_icon: '#00000080',
			targetedMessageBackground: '#2C2C2E',
			text: '#FFFFFF',
			white: '#000000',
			white_smoke: '#1C1C1E',
			white_snow: '#1C1C1E',
		},
	};

	const currentColors = isDark ? colors.dark : colors.light;

	return {
		colors: currentColors,
		messageSimple: {
			content: {
				containerInner: {
					backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
					borderRadius: 16,
				},
				textContainer: {
					backgroundColor: 'transparent',
				},
			},
		},
		messageInput: {
			container: {
				backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
				borderTopColor: isDark ? '#38383A' : '#E5E5EA',
			},
			inputBox: {
				backgroundColor: isDark ? '#2C2C2E' : '#F2F2F7',
				borderColor: isDark ? '#38383A' : '#E5E5EA',
				borderRadius: 20,
			},
		},
		channel: {
			selectChannel: {
				backgroundColor: isDark ? '#000000' : '#FFFFFF',
			},
		},
		channelListMessenger: {
			flatList: {
				backgroundColor: isDark ? '#000000' : '#FFFFFF',
			},
		},
		channelPreview: {
			container: {
				backgroundColor: isDark ? '#000000' : '#FFFFFF',
				borderBottomColor: isDark ? '#38383A' : '#E5E5EA',
			},
		},
	};
};
