import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { requestInterceptor } from './interceptors/requestInterceptor';
import { responseInterceptor, responseInterceptorError } from './interceptors/responseInterceptor';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

instance.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));
instance.interceptors.response.use(responseInterceptor, responseInterceptorError
);

export default instance;