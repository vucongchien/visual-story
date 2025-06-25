import { User } from "../types";
import { fetchWithAuth } from './apiClient'; 

const BASE_URL = import.meta.env.VITE_API_URL;


export async function getMe(): Promise<User> {
  const response = await fetchWithAuth(`/users/me`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Người dùng chưa được xác thực.");
  }
  return response.json();
}


export async function handleGoogleCallback(code: string, codeVerifier: string): Promise<User> {
  const response = await fetch(`${BASE_URL}/auth/google/callback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, codeVerifier }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Đăng nhập thất bại' }));
    throw new Error(errorData.message || 'Đăng nhập bằng Google thất bại');
  }
  return response.json();
}

export async function refreshAccessToken(): Promise<void> {
  const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error("Refresh token is invalid or expired.");
  }
}

export async function logoutUser(): Promise<{ message: string }> {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    console.error("Lỗi khi gọi API logout.");
  }
  return response.json().catch(() => ({ message: "Logged out" }));
}