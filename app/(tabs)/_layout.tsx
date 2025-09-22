import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

import '../global.css';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#3B82F6',
				tabBarInactiveTintColor: '#9CA3AF',
				tabBarStyle: {
					backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
					borderTopWidth: 1,
					borderTopColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
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
					title: 'Home',
					tabBarIcon: ({ color, focused }) => (
						<IconSymbol
							size={24}
							name={focused ? 'house.fill' : 'house'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: 'Chats',
					tabBarIcon: ({ color, focused }) => (
						<IconSymbol
							size={24}
							name={focused ? 'message.fill' : 'message'}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
