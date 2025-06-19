import axios, { AxiosInstance } from 'axios';
import { responseInterceptor } from './interceptors/response.interceptor';
import { requestInterceptor } from './interceptors/request.interceptor';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 6000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

requestInterceptor(axiosInstance.interceptors.request);
responseInterceptor(axiosInstance.interceptors.response, axiosInstance);

export default axiosInstance;
