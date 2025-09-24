export interface User {
  id: number;
  name: string;
  email: string;
  hospital_id: number;
  stream_token: string;
  created_at: string;
  updated_at: string;
}

export interface Hospital {
  id: number;
  name: string;
  hospital_code: string;
  verified: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  hospital_code: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  message?: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
  hospital: Pick<Hospital, 'id' | 'name'>;
  message: string;
  stream_token: string;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}