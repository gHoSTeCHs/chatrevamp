export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
  senderId: string;
}

export interface Chat {
  id: string;
  user: ChatUser;
  lastMessage: ChatMessage;
  unreadCount: number;
  isPinned: boolean;
  type: 'personal' | 'work' | 'group';
}

export type ChatCategory = 'all' | 'personal' | 'work' | 'groups';