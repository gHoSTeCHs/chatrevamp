import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function IndexScreen() {
	const [error, setError] = useState<string | null>(null);

	console.log('IndexScreen: Component rendering started');

	console.log('IndexScreen: Attempting to get auth context');
	const authData = useAuth();
	console.log('IndexScreen: Auth context loaded:', {
		user: !!authData?.user,
		isLoading: authData?.isLoading,
	});

	console.log('IndexScreen: Attempting to get theme context');
	const themeData = useTheme();
	console.log('IndexScreen: Theme context loaded:', {
		isDark: themeData?.isDark,
	});

	useEffect(() => {
		console.log('IndexScreen: useEffect triggered', {
			user: !!authData?.user,
			isLoading: authData?.isLoading,
		});

		if (!authData || !themeData) {
			console.error('IndexScreen: Context not available');
			return;
		}

		const { user, isLoading } = authData;

		try {
			if (!isLoading) {
				console.log('IndexScreen: Not loading, checking user status');
				if (user) {
					console.log('IndexScreen: User exists, navigating to tabs');
					router.replace('/(tabs)');
				} else {
					console.log('IndexScreen: No user, navigating to login');
					router.replace('/auth/login');
				}
			} else {
				console.log('IndexScreen: Still loading, waiting...');
			}
		} catch (err) {
			console.error('IndexScreen: Navigation error:', err);
			setError('Navigation error: ' + (err as Error).message);
		}
	}, [authData?.user, authData?.isLoading, authData, themeData]);

	if (!authData) {
		console.error('IndexScreen: Auth context is null');
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Auth context not available</Text>
			</View>
		);
	}

	if (!themeData) {
		console.error('IndexScreen: Theme context is null');
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Theme context not available</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>{error}</Text>
			</View>
		);
	}

	console.log('IndexScreen: Rendering activity indicator');

	const { colors } = themeData;

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: colors?.background || '#ffffff' },
			]}>
			<ActivityIndicator size="large" color={colors?.primary || '#007AFF'} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	errorText: {
		color: 'red',
		textAlign: 'center',
	},
});
