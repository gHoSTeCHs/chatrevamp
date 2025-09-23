import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { useTheme } from '@/contexts/ThemeContext';

import '../global.css';

export default function TabLayout() {
	const { colors } = useTheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.textTertiary,
				tabBarStyle: {
					backgroundColor: colors.surface,
					borderTopWidth: 1,
					borderTopColor: colors.separator,
					height: 60,
					paddingBottom: 8,
					paddingTop: 8,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: '600',
				},
				headerShown: false,
				tabBarButton: HapticTab,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Chats',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							size={24}
							name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: 'Settings',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							size={24}
							name={focused ? 'settings' : 'settings-outline'}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
