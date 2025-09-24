import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  HospitalMembersContextType, 
  HospitalMember, 
  HospitalMembersResponse,
  HospitalMembersError 
} from '../types/hospital.types';
import { useAuth } from './AuthContext';

const HospitalMembersContext = createContext<
	HospitalMembersContextType | undefined
>(undefined);

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export function HospitalMembersProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<HospitalMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);
  const [cachedUserId, setCachedUserId] = useState<number | null>(null);
  const { token, user } = useAuth();

  // Cache duration: 5 minutes
  const CACHE_DURATION = 5 * 60 * 1000;

  const clearCache = () => {
    setMembers([]);
    setLastFetchTime(null);
    setCachedUserId(null);
    setError(null);
  };

  // Clear cache when user changes or logs out
  useEffect(() => {
    if (!user) {
      clearCache();
    } else if (cachedUserId && cachedUserId !== user.id) {
      clearCache();
    }
  }, [user?.id, cachedUserId]);

  const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
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
			const errorData: HospitalMembersError = await response
				.json()
				.catch(() => ({
					success: false,
					message: 'Request failed',
				}));
			throw new Error(errorData.message || 'Request failed');
		}

		return response.json();
	};

	const isCacheValid = (userId: number): boolean => {
		if (!lastFetchTime || cachedUserId !== userId) {
			return false;
		}
		
		const now = Date.now();
		return (now - lastFetchTime) < CACHE_DURATION;
	};

	const fetchHospitalMembers = async (userId: number, forceRefresh: boolean = false) => {
		// Check if we have valid cached data
		if (!forceRefresh && isCacheValid(userId) && members.length > 0) {
			console.log('Using cached hospital members data');
			return;
		}

		try {
			setIsLoading(true);
			setError(null);

			const response: HospitalMembersResponse = await makeAuthenticatedRequest(
				`/users/${userId}`
			);

			if (response.success) {
				setMembers(response.data);
				setLastFetchTime(Date.now());
				setCachedUserId(userId);
				console.log('Hospital members data fetched and cached');
			} else {
				throw new Error(response.message || 'Failed to fetch hospital members');
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Failed to fetch hospital members';
			setError(errorMessage);
			console.error('Hospital members fetch error:', err);
		} finally {
			setIsLoading(false);
		}
	};

	const refreshMembers = async (forceRefresh: boolean = true) => {
     if (user?.id) {
       await fetchHospitalMembers(user.id, forceRefresh);
     }
   };

  const value: HospitalMembersContextType = {
    members,
    isLoading,
    error,
    fetchHospitalMembers,
    refreshMembers,
    clearCache,
    isCacheValid: (userId: number) => isCacheValid(userId),
    lastFetchTime,
  };

	return (
		<HospitalMembersContext.Provider value={value}>
			{children}
		</HospitalMembersContext.Provider>
	);
}

export function useHospitalMembers(): HospitalMembersContextType {
	const context = useContext(HospitalMembersContext);
	if (context === undefined) {
		throw new Error(
			'useHospitalMembers must be used within a HospitalMembersProvider'
		);
	}
	return context;
}
