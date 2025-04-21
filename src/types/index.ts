
// Common types used across the application
export interface User {
  id: string;
  username: string;
  email?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  sex: string;
  old: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
} 