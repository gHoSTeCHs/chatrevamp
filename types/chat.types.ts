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
  type?: 'text' | 'image' | 'file';
  attachments?: ChatAttachment[];
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface ChatAttachment {
  id: string;
  type: 'image' | 'file';
  url: string;
  name?: string;
  size?: number;
  thumbnail?: string;
}

export interface Chat {
  id: string;
  user: ChatUser;
  lastMessage: ChatMessage;
  unreadCount: number;
  isPinned: boolean;
  type: 'personal' | 'work' | 'group';
}

export interface ChatConversation {
  id: string;
  participants: ChatUser[];
  messages: ChatMessage[];
  type: 'personal' | 'work' | 'group';
  title?: string;
  isTyping?: boolean;
  typingUsers?: string[];
}

export type ChatCategory = 'all' | 'personal' | 'work' | 'groups';