import { Chat } from '../types/chat.types';

export const mockChats: Chat[] = [
	{
		id: '1',
		user: {
			id: 'user1',
			name: 'Darlene Stewart',
			avatar:
				'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
			isOnline: true,
		},
		lastMessage: {
			id: 'msg1',
			text: 'Pls take a look at the images.',
			timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
			isRead: false,
			senderId: 'user1',
		},
		unreadCount: 5,
		isPinned: false,
		type: 'personal',
	},
	{
		id: '2',
		user: {
			id: 'user2',
			name: 'Lee Williamson',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
			isOnline: true,
		},
		lastMessage: {
			id: 'msg2',
			text: "Yes, that's gonna work, hopefully.",
			timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6 + 1000 * 60 * 12), // 6:12 hours ago
			isRead: true,
			senderId: 'user2',
		},
		unreadCount: 0,
		isPinned: false,
		type: 'work',
	},
	{
		id: '3',
		user: {
			id: 'user3',
			name: 'Ronald Mccoy',
			avatar:
				'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
			isOnline: false,
		},
		lastMessage: {
			id: 'msg3',
			text: '✓✓ Thanks dude 😊',
			timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
			isRead: true,
			senderId: 'user3',
		},
		unreadCount: 0,
		isPinned: false,
		type: 'personal',
	},
	{
		id: '4',
		user: {
			id: 'user4',
			name: 'Albert Bell',
			avatar:
				'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
			isOnline: false,
		},
		lastMessage: {
			id: 'msg4',
			text: "I'm happy this anime has such grea...",
			timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
			isRead: true,
			senderId: 'user4',
		},
		unreadCount: 0,
		isPinned: false,
		type: 'personal',
	},
	{
		id: '5',
		user: {
			id: 'user5',
			name: 'Design Team',
			avatar:
				'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=face',
			isOnline: true,
		},
		lastMessage: {
			id: 'msg5',
			text: 'New mockups are ready for review',
			timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
			isRead: false,
			senderId: 'user5',
		},
		unreadCount: 3,
		isPinned: true,
		type: 'work',
	},
	{
		id: '6',
		user: {
			id: 'user6',
			name: 'Family Group',
			avatar:
				'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=150&h=150&fit=crop&crop=face',
			isOnline: false,
		},
		lastMessage: {
			id: 'msg6',
			text: "Mom: Don't forget dinner tonight!",
			timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
			isRead: true,
			senderId: 'user6',
		},
		unreadCount: 0,
		isPinned: false,
		type: 'group',
	},
];
