import {
  AxiosError,
  AxiosInterceptorManager,
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { createErrorResponse } from '../utils/errorResponse';
import { handleTokenRefresh } from '../utils/refreshToken';
import { shouldRetry, handleRetryLogic } from '../utils/retryHandler';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

export const responseInterceptor = (
  response: AxiosInterceptorManager<AxiosResponse>,
  axiosInstance: AxiosInstance
) => {
  response.use(
    (data: AxiosResponse) => data,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequestConfig;

      if (!originalRequest) {
        return Promise.reject(createErrorResponse(error));
      }

      const isLoginRequest = originalRequest.url?.includes('/auth/login');

      if (error.response?.status === 401) {
        if (isLoginRequest) {
          return Promise.reject(createErrorResponse(error));
        }

        if (!originalRequest._retry) {
          try {
            return await handleTokenRefresh(originalRequest, axiosInstance);
          } catch (_refreshError) {
            return Promise.reject(createErrorResponse(error));
          }
        }
      }

      if (shouldRetry(error)) {
        return handleRetryLogic(error, originalRequest, axiosInstance);
      }

      if (error.response?.status === 403) {
        console.warn('Access forbidden - insufficient permissions', error.response.data);
      }

      return Promise.reject(createErrorResponse(error));
    }
  );
};
