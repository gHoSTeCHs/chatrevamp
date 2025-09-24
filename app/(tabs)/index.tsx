import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatHeader } from '../../components/chat/ChatHeader';
import { ChatListItem } from '../../components/chat/ChatListItem';
import { useTheme } from '../../contexts/ThemeContext';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import { SearchBar } from '../../components/ui/SearchBar';
import HospitalMembersModal from '../../components/modals/HospitalMembersModal';
import { mockChats } from '../../constants/mockData';
import { Chat } from '../../types/chat.types';
import { HospitalMember } from '../../types/hospital.types';
import '../global.css';

export default function ChatHomeScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isHospitalMembersModalVisible, setIsHospitalMembersModalVisible] = useState(false);

  const filteredChats = mockChats.filter(chat => {
    const matchesSearch = chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleNewChat = () => {
    setIsHospitalMembersModalVisible(true);
  };

  const handleChatPress = (chat: Chat) => {
    console.log('Chat pressed:', chat.user.name);
  };

  const handleStartConversation = (member: HospitalMember) => {
    console.log('Starting conversation with:', member.name);
    // Here you would typically navigate to a chat screen or create a new chat
    // For now, we'll just log the action
  };

  const handleCloseModal = () => {
    setIsHospitalMembersModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <ChatHeader 
        title="Chats" 
        showSearch={true}
        onSearchPress={() => console.log('Search pressed')}
      />
      
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search chats..."
        style={{ backgroundColor: colors.surface }}
      />
      
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            chat={item}
            onPress={() => handleChatPress(item)}
          />
        )}
        style={{ backgroundColor: colors.background, flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
      
      <FloatingActionButton onPress={handleNewChat} />
      
      <HospitalMembersModal
        visible={isHospitalMembersModalVisible}
        onClose={handleCloseModal}
        onStartConversation={handleStartConversation}
      />
    </SafeAreaView>
  );
}
