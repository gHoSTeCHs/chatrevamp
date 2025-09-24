import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useHospitalMembers } from '../../contexts/HospitalMembersContext';
import { useAuth } from '../../contexts/AuthContext';
import { HospitalMember } from '../../types/hospital.types';

interface HospitalMembersModalProps {
  visible: boolean;
  onClose: () => void;
  onStartConversation: (member: HospitalMember) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.8;

export default function HospitalMembersModal({
  visible,
  onClose,
  onStartConversation,
}: HospitalMembersModalProps) {
  const { colors } = useTheme();
  const { 
    members, 
    isLoading, 
    error, 
    fetchHospitalMembers, 
    refreshMembers, 
    lastFetchTime,
    isCacheValid 
  } = useHospitalMembers();
  const { user } = useAuth();
  const [slideAnim] = useState(new Animated.Value(MODAL_HEIGHT));

  useEffect(() => {
    if (visible) {
      // Fetch hospital members when modal opens
      if (user?.id) {
        fetchHospitalMembers(user.id);
      }
      // Animate modal in
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      // Animate modal out
      Animated.spring(slideAnim, {
        toValue: MODAL_HEIGHT,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [visible, user?.id]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return gestureState.dy > 0 && gestureState.dy > Math.abs(gestureState.dx);
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        slideAnim.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > MODAL_HEIGHT * 0.3) {
        onClose();
      } else {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleStartConversation = (member: HospitalMember) => {
    Alert.alert(
      'Start Conversation',
      `Start a conversation with ${member.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Chat',
          onPress: () => {
            onStartConversation(member);
            onClose();
          },
        },
      ]
    );
  };

  const renderMemberItem = ({ item }: { item: HospitalMember }) => (
    <TouchableOpacity
      onPress={() => handleStartConversation(item)}
      style={{
        backgroundColor: colors.surface,
        marginHorizontal: 16,
        marginVertical: 6,
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      activeOpacity={0.7}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: '600',
          }}
        >
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 4,
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
          }}
        >
          {item.email}
        </Text>
      </View>
      
      <Ionicons
        name="chatbubble-outline"
        size={24}
        color={colors.primary}
      />
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
      }}
    >
      <Ionicons
        name="people-outline"
        size={64}
        color={colors.textSecondary}
        style={{ marginBottom: 16 }}
      />
      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        No Hospital Members Found
      </Text>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 14,
          textAlign: 'center',
          lineHeight: 20,
        }}
      >
        There are no other members from your hospital available for chat at the moment.
      </Text>
    </View>
  );

  const renderError = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
      }}
    >
      <Ionicons
        name="alert-circle-outline"
        size={64}
        color={colors.error}
        style={{ marginBottom: 16 }}
      />
      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        Unable to Load Members
      </Text>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 14,
          textAlign: 'center',
          lineHeight: 20,
          marginBottom: 24,
        }}
      >
        {error || 'Something went wrong while loading hospital members.'}
      </Text>
      <TouchableOpacity
        onPress={() => user?.id && fetchHospitalMembers(user.id)}
        style={{
          backgroundColor: colors.primary,
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
          }}
        >
          Try Again
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
        />
        
        <Animated.View
          style={{
            height: MODAL_HEIGHT,
            backgroundColor: colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            transform: [{ translateY: slideAnim }],
          }}
          {...panResponder.panHandlers}
        >
          {/* Handle bar */}
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 12,
            }}
          >
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: colors.border,
                borderRadius: 2,
              }}
            />
          </View>

          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingBottom: 16,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 20,
                  fontWeight: '700',
                }}
              >
                Hospital Members
              </Text>
              {lastFetchTime && user?.id && isCacheValid(user.id) && (
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  Updated {Math.round((Date.now() - lastFetchTime) / 60000)}m ago
                </Text>
              )}
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => refreshMembers(true)}
                style={{
                  padding: 8,
                  borderRadius: 20,
                  backgroundColor: colors.surface,
                  marginRight: 8,
                }}
                disabled={isLoading}
              >
                <Ionicons 
                  name="refresh" 
                  size={20} 
                  color={isLoading ? colors.textSecondary : colors.primary} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={onClose}
                style={{
                  padding: 8,
                  borderRadius: 20,
                  backgroundColor: colors.surface,
                }}
              >
                <Ionicons name="close" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Content */}
          <View style={{ flex: 1, paddingTop: 8 }}>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ActivityIndicator size="large" color={colors.primary} />
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 16,
                    marginTop: 16,
                  }}
                >
                  Loading hospital members...
                </Text>
              </View>
            ) : error ? (
              renderError()
            ) : members.length === 0 ? (
              renderEmptyState()
            ) : (
              <FlatList
                data={members}
                renderItem={renderMemberItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}