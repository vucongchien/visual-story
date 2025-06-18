// src/api/apiClient.ts

import { refreshAccessToken } from './authApi';
import { logoutUser } from './authApi'; 

const BASE_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void, reject: (reason?: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const fetchOptions: RequestInit = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };


  let response = await fetch(`${BASE_URL}${url}`, fetchOptions);


  if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        await refreshAccessToken();
        response = await fetch(`${BASE_URL}${url}`, fetchOptions);
        if (!response.ok) throw new Error("API request failed after refresh.");

        processQueue(null, 'refreshed');
      } catch (refreshError) {
        console.error("Refresh token failed, logging out.", refreshError);
        processQueue(refreshError, null);
        logoutUser(); 
        
        throw refreshError; 
      } finally {
        isRefreshing = false;
      }
    } else {
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        }).then(() => {
            return fetch(`${BASE_URL}${url}`, fetchOptions);
        });
    }
  }

  return response;
}