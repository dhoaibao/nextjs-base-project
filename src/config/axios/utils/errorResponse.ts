import { AxiosError } from 'axios';

export interface ApiErrorResponse {
  status: number;
  message: string;
}

const defaultMessages: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

type ErrorData = { message: string } | { error: string } | { error: { message: string } } | object;

export const createErrorResponse = (error: AxiosError): ApiErrorResponse => {
  if (!error.response) {
    return {
      status: 0,
      message: 'Network error. Please check your connection.',
    };
  }

  const status = error.response.status;
  const data = error.response.data as ErrorData;

  let message: string | undefined;

  if (typeof data === 'object') {
    if ('message' in data && typeof data.message === 'string') {
      message = data.message;
    } else if ('error' in data) {
      const errorField = data.error;
      if (typeof errorField === 'string') {
        message = errorField;
      } else if (
        typeof errorField === 'object' &&
        'message' in errorField &&
        typeof errorField.message === 'string'
      ) {
        message = errorField.message;
      }
    }
  }

  return {
    status,
    message: message || defaultMessages[status] || 'An unexpected error occurred',
  };
};
