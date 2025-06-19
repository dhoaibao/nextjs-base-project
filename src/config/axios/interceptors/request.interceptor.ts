import { AxiosInterceptorManager, InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from '@src/config/axios/utils/tokenManager';

export const requestInterceptor = (
  request: AxiosInterceptorManager<InternalAxiosRequestConfig>
) => {
  request.use(
    (config: InternalAxiosRequestConfig) => {
      const csrfToken = tokenManager.getCsrfToken();

      if (csrfToken) {
        config.headers.set('X-CSRF-Token', csrfToken);
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
};
