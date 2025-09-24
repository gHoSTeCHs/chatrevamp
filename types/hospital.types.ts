export interface HospitalMember {
  id: number;
  name: string;
  email: string;
  hospital_id: number;
  stream_token: string;
  created_at: string;
  updated_at: string;
}

export interface HospitalMembersResponse {
  success: boolean;
  message: string;
  data: HospitalMember[];
}

export interface HospitalMembersError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface HospitalMembersContextType {
  members: HospitalMember[];
  isLoading: boolean;
  error: string | null;
  lastFetchTime: number | null;
  fetchHospitalMembers: (userId: number, forceRefresh?: boolean) => Promise<void>;
  refreshMembers: (forceRefresh?: boolean) => Promise<void>;
  clearCache: () => void;
  isCacheValid: (userId: number) => boolean;
}