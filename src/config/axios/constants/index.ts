export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  CSRF_TOKEN: 'csrfToken',
} as const;

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export type MethodType = (typeof METHODS)[keyof typeof METHODS];

export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  BASE_DELAY_MS: 1000,
} as const;

export const AUTH_CONFIG = {
  LOGIN_ENDPOINT: '/auth/login',
  REFRESH_TOKEN_ENDPOINT: '/auth/refresh-token',
  LOGOUT_ENDPOINT: '/auth/logout',
  LOGIN_REDIRECT_PATH: '/login',
} as const;
