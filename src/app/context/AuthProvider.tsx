'use client';

import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '@/lib/axios';

// Define types for the context
interface AuthContextType {
  accessToken: string | null;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  refreshAccessToken: () => Promise<void>;
  fetchWithAuth: (url: string, options?: AxiosRequestConfig) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface JwtPayload {
  exp: number;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const getRefreshToken = () => localStorage.getItem('refresh_token');
  const setRefreshToken = (token: string) => localStorage.setItem('refresh_token', token);
  const removeRefreshToken = () => localStorage.removeItem('refresh_token');

  const getAccessTokenExpirationTime = (token: string) => {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp - currentTime;
  };

  const scheduleAccessTokenRefresh = (token: string) => {
    const expirationTime = getAccessTokenExpirationTime(token);
    const refreshTime = Math.max(expirationTime - 60, 0) * 1000;

    setTimeout(async () => {
      await refreshAccessToken();
    }, refreshTime);
  };

  const login = async (credentials: { email: string; password: string }) => {
    let isSuccess = false;
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, credentials);
      const { data: res } = response;

      if (res.success && res.data.access_token && res.data.refresh_token) {
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        isSuccess = true;
      } else {
        console.error('Login failed', res.error);
        isSuccess = false;
      }
    } catch (error) {
      console.error('Login error:', error);
      isSuccess = false;
    }
    return isSuccess;
  };

  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      console.error('No refresh token found');
      router.push('/login');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/access-reissue', { refresh_token: refreshToken });
      const { data: res } = response;

      if (res.success && res.data.access_token) {
        setAccessToken(res.data.access_token);
        return res.data.access_token;
      } else {
        console.error('Failed to refresh access token');
        setAccessToken(null);
        removeRefreshToken();
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  const fetchWithAuth = async (url: string, options: AxiosRequestConfig = {}) => {
    let newAccessToken = '';
    if (!accessToken) {
      newAccessToken = await refreshAccessToken();
    }

    const headers = {
      Authorization: `Bearer ${accessToken ?? newAccessToken}`,
      ...options.headers,
    };

    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
        method: options.method || 'get',
        headers,
        withCredentials: true,
        ...options,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          const newAccessToken = await refreshAccessToken();
          
          const newHeaders = {
            Authorization: `Bearer ${accessToken ?? newAccessToken}`,
            ...options.headers,
          };
          const response = await axios({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
            method: options.method || 'get',
            headers: newHeaders,
            withCredentials: true,
            ...options,
          });
          return response.data;
        }
      }
      throw error;
    }
  };

  useEffect(() => {
    if (accessToken) {
      scheduleAccessTokenRefresh(accessToken);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, login, refreshAccessToken, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
