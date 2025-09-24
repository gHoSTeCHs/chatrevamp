import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
	AuthContextType,
	AuthError,
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
	User,
} from '../types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = '@chatrevamp_auth_token';
const USER_DATA_KEY = '@chatrevamp_user_data';
const API_BASE_URL = 'http://127.0.0.1:8000/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const isAuthenticated = !!user && !!token;

	useEffect(() => {
		loadStoredAuth();
	}, []);

	const loadStoredAuth = async () => {
		try {
			const [storedToken, storedUser] = await Promise.all([
				AsyncStorage.getItem(AUTH_TOKEN_KEY),
				AsyncStorage.getItem(USER_DATA_KEY),
			]);

			if (storedToken && storedUser) {
				setToken(storedToken);
				setUser(JSON.parse(storedUser));
			}
		} catch (error) {
			console.error('Failed to load stored auth:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const storeAuth = async (authToken: string, userData: User) => {
		try {
			await Promise.all([
				AsyncStorage.setItem(AUTH_TOKEN_KEY, authToken),
				AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData)),
			]);
			setToken(authToken);
			setUser(userData);
		} catch (error) {
			console.error('Failed to store auth:', error);
			throw new Error('Failed to save authentication data');
		}
	};

	const clearAuth = async () => {
		try {
			await Promise.all([
				AsyncStorage.removeItem(AUTH_TOKEN_KEY),
				AsyncStorage.removeItem(USER_DATA_KEY),
			]);
			setToken(null);
			setUser(null);
		} catch (error) {
			console.error('Failed to clear auth:', error);
		}
	};

	const makeAuthenticatedRequest = async (
		url: string,
		options: RequestInit = {}
	) => {
		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...(token && { Authorization: `Bearer ${token}` }),
			...options.headers,
		};

		const response = await fetch(`${API_BASE_URL}${url}`, {
			...options,
			headers,
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.message || 'Request failed');
		}

		return response.json();
	};

	const login = async (credentials: LoginRequest) => {
		try {
			setIsLoading(true);
			const response = await fetch(`${API_BASE_URL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(credentials),
			});

			if (!response.ok) {
				const errorData: AuthError = await response.json();
				throw new Error(errorData.message || 'Login failed');
			}

			const data: LoginResponse = await response.json();
			await storeAuth(data.token, data.user);
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (registerData: RegisterRequest) => {
		try {
			setIsLoading(true);
			const response = await fetch(`${API_BASE_URL}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(registerData),
			});

			if (!response.ok) {
				const errorData: AuthError = await response.json();
				throw new Error(errorData.message || 'Registration failed');
			}

			const data: RegisterResponse = await response.json();
			await storeAuth(data.token, data.user);
		} catch (error) {
			console.error('Registration error:', error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		try {
			if (token) {
				await makeAuthenticatedRequest('/logout', {
					method: 'POST',
				});
			}
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			await clearAuth();
		}
	};

	const value: AuthContextType = {
		user,
		token,
		isLoading,
		isAuthenticated,
		login,
		register,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
