import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from './tokenManager';
import { AUTH_CONFIG } from '../constants';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

type QueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

function processQueue(error: unknown) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
}

async function refreshAccessToken(axiosInstance: AxiosInstance) {
  const refreshToken = tokenManager.getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token available');

  try {
    await axiosInstance.post(AUTH_CONFIG.REFRESH_TOKEN_ENDPOINT);
    return true;
  } catch (error) {
    throw error;
  }
}

async function logout(axiosInstance: AxiosInstance) {
  try {
    await axiosInstance.post(AUTH_CONFIG.LOGOUT_ENDPOINT);
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    if (typeof window !== 'undefined') {
      window.location.href = AUTH_CONFIG.LOGIN_REDIRECT_PATH;
    }
  }
}

export async function handleTokenRefresh(
  originalRequest: RetryableRequestConfig,
  axiosInstance: AxiosInstance
): Promise<unknown> {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then(() => {
      return axiosInstance(originalRequest);
    });
  }

  originalRequest._retry = true;
  isRefreshing = true;

  try {
    await refreshAccessToken(axiosInstance);
    processQueue(null);
    return axiosInstance(originalRequest);
  } catch (refreshError) {
    processQueue(refreshError);
    await logout(axiosInstance);
    throw refreshError;
  } finally {
    isRefreshing = false;
  }
}
