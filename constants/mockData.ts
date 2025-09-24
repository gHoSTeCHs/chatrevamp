import { Chat, ChatConversation, ChatMessage } from '../types/chat.types';

// Current user ID for message identification
export const CURRENT_USER_ID = 'currentUser';

export const mockChats: Chat[] = [
	{
		id: '1',
		user: {
			id: 'user1',
			name: 'Dr. Mike Mazowski',
			avatar:
				'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
			isOnline: true,
		},
		lastMessage: {
			id: 'msg1_last',
			text: 'That\'s very nice place! you guys made a very good decision. Can\'t wait to go on vacation!',
			timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
			isRead: false,
			senderId: 'user1',
			type: 'text',
			status: 'delivered',
		},
		unreadCount: 2,
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

// Mock conversation data for individual chat screens
export const mockConversations: ChatConversation[] = [
	{
		id: '1',
		participants: [
			{
				id: 'currentUser',
				name: 'You',
				avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
				isOnline: true,
			},
			{
				id: 'user1',
				name: 'Dr. Mike Mazowski',
				avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
				isOnline: true,
			},
		],
		messages: [
			{
				id: 'msg1_1',
				text: 'Hello dear, we have discussed about post-corona vacation plan and our decision is to go to Bali. We will have a very big party after this corona ends! These are some images about our destination',
				timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
				isRead: true,
				senderId: 'user1',
				type: 'text',
				status: 'read',
			},
			{
				id: 'msg1_2',
				text: '',
				timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 2), // 1h 58m ago
				isRead: true,
				senderId: 'user1',
				type: 'image',
				status: 'read',
				attachments: [
					{
						id: 'att1_1',
						type: 'image',
						url: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop',
						thumbnail: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=200&h=150&fit=crop',
					},
					{
						id: 'att1_2',
						type: 'image',
						url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop',
						thumbnail: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=200&h=150&fit=crop',
					},
					{
						id: 'att1_3',
						type: 'image',
						url: 'https://images.unsplash.com/photo-1555400082-8dd4d78c670b?w=400&h=300&fit=crop',
						thumbnail: 'https://images.unsplash.com/photo-1555400082-8dd4d78c670b?w=200&h=150&fit=crop',
					},
				],
			},
			{
				id: 'msg1_3',
				text: 'That\'s very nice place! you guys made a very good decision. Can\'t wait to go on vacation!',
				timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
				isRead: false,
				senderId: 'currentUser',
				type: 'text',
				status: 'delivered',
			},
		],
		type: 'personal',
		isTyping: false,
	},
	{
		id: '2',
		participants: [
			{
				id: 'currentUser',
				name: 'You',
				avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
				isOnline: true,
			},
			{
				id: 'user2',
				name: 'Lee Williamson',
				avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
				isOnline: true,
			},
		],
		messages: [
			{
				id: 'msg2_1',
				text: 'Hey, how\'s the project coming along?',
				timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
				isRead: true,
				senderId: 'currentUser',
				type: 'text',
				status: 'read',
			},
			{
				id: 'msg2_2',
				text: 'Pretty good! Just finished the main components.',
				timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
				isRead: true,
				senderId: 'user2',
				type: 'text',
				status: 'read',
			},
			{
				id: 'msg2_3',
				text: 'That\'s great! Can you send me the latest version?',
				timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6 + 1000 * 60 * 30), // 6.5 hours ago
				isRead: true,
				senderId: 'currentUser',
				type: 'text',
				status: 'read',
			},
			{
				id: 'msg2_4',
				text: "Yes, that's gonna work, hopefully.",
				timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6 + 1000 * 60 * 12), // 6:12 hours ago
				isRead: true,
				senderId: 'user2',
				type: 'text',
				status: 'read',
			},
		],
		type: 'work',
		isTyping: false,
	},
	{
		id: '3',
		participants: [
			{
				id: 'currentUser',
				name: 'You',
				avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
				isOnline: true,
			},
			{
				id: 'user3',
				name: 'Ronald Mccoy',
				avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
				isOnline: false,
			},
		],
		messages: [
			{
				id: 'msg3_1',
				text: 'Hey man, thanks for helping me out yesterday!',
				timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), // Yesterday
				isRead: true,
				senderId: 'currentUser',
				type: 'text',
				status: 'read',
			},
			{
				id: 'msg3_2',
				text: '✓✓ Thanks dude 😊',
				timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
				isRead: true,
				senderId: 'user3',
				type: 'text',
				status: 'read',
			},
		],
		type: 'personal',
		isTyping: false,
	},
];
