import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { HospitalMembersProvider } from '../contexts/HospitalMembersContext';
import './global.css';

export default function RootLayout() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<HospitalMembersProvider>
					<StatusBar style="auto" />
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="auth/login" options={{ headerShown: false }} />
						<Stack.Screen name="auth/register" options={{ headerShown: false }} />
						<Stack.Screen name="modal" options={{ presentation: 'modal' }} />
					</Stack>
				</HospitalMembersProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}
