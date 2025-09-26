import { AuthProvider } from '@/contexts/AuthContext';
import { HospitalMembersProvider } from '@/contexts/HospitalMembersContext';
import { StreamChatProvider } from '@/contexts/StreamChatContext';
import { ThemeProvider as CustomThemeProvider } from '@/contexts/ThemeContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import './global.css';

export default function RootLayout() {
	console.log('RootLayout: Initializing...');

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<CustomThemeProvider>
				<AuthProvider>
					<StreamChatProvider>
						<HospitalMembersProvider>
							<StatusBar style="auto" />
							<Stack screenOptions={{ headerShown: false }}>
								<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
								<Stack.Screen
									name="auth/login"
									options={{ headerShown: false }}
								/>
								<Stack.Screen
									name="auth/register"
									options={{ headerShown: false }}
								/>
								<Stack.Screen
									name="modal"
									options={{ presentation: 'modal' }}
								/>
							</Stack>
						</HospitalMembersProvider>
					</StreamChatProvider>
				</AuthProvider>
			</CustomThemeProvider>
		</GestureHandlerRootView>
	);
}
