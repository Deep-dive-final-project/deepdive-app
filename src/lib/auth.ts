"use client";

import { useState, useEffect } from "react";

import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface JwtPayload {
  exp: number; // 만료 시간 (Epoch Time 형식)
}

export default function useAuth() {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const getRefreshToken = () => localStorage.getItem("refresh_token");
  const setRefreshToken = (token: string) =>
    localStorage.setItem("refresh_token", token);
  const removeRefreshToken = () => localStorage.removeItem("refresh_token");

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
    // 유저 id 같은 걸 서버에서 넘겨주면 그걸로 판단
    let isSuccess = false;

    try {
      const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, credentials);

      const { data: res } = response;

      if (res.success && res.data.access_token && res.data.refresh_token) {
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);

        isSuccess = true;
      } else {
        console.error("Login failed", res.error);
        isSuccess = false;
      }
    } catch (error) {
      console.error("Login error:", error);
      isSuccess = false;
    }

    return isSuccess;
  };

  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      console.error("No refresh token found");
      router.push("/login");
      return;
    }

    const response = await axiosInstance.post("/api/auth/access-reissue", {
      refresh_token: refreshToken,
    });
    console.log("reissue res", response);

    const { data: res } = response;

    if (res.success && res.data.access_token) {
      console.log("access_token 발견", res.data);
      setAccessToken(res.data.access_token);
    } else {
      console.error("Failed to refresh access token");
      setAccessToken(null);
      removeRefreshToken();
    }
  };

  const fetchWithAuth = async (url: string, options: AxiosRequestConfig  = {}) => {
    if (!accessToken) {
      await refreshAccessToken();

      console.log("access token 찾아왔어요", accessToken);
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    };
    // let response: AxiosResponse;
    try {
      let response = await axios({
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
        await refreshAccessToken();
        const newHeaders = {
          Authorization: `Bearer ${accessToken}`,
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
      console.error("Axios error:", error.response?.data);
    } else {
      console.error("Unknown error:", error);
    }
      throw error;  // Rethrow other errors
    }
  }

  useEffect(() => {
    if (accessToken) {
      scheduleAccessTokenRefresh(accessToken);
    }
  }, [accessToken]);

  return { accessToken, login, refreshAccessToken, fetchWithAuth };
}
