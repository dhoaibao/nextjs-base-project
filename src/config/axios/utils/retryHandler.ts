import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { createErrorResponse } from './errorResponse';
import { RETRY_CONFIG } from '../constants';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

export const shouldRetry = (error: AxiosError): boolean => {
  const status = error.response?.status;
  return !error.response || (status !== undefined && status >= 500 && status < 600);
};

export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const handleRetryLogic = async (
  error: AxiosError,
  originalRequest: RetryableRequestConfig,
  axiosInstance: AxiosInstance
): Promise<unknown> => {
  const retryCount = originalRequest._retryCount || 0;

  if (retryCount >= RETRY_CONFIG.MAX_RETRIES) {
    return Promise.reject(createErrorResponse(error));
  }

  originalRequest._retry = true;
  originalRequest._retryCount = retryCount + 1;

  const delayMs = Math.pow(2, retryCount) * RETRY_CONFIG.BASE_DELAY_MS;

  console.warn(`[Retry ${retryCount + 1}] Delaying for ${delayMs}ms`);

  await delay(delayMs);
  return axiosInstance(originalRequest);
};
