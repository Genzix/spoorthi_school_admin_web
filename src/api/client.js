import axios from 'axios';
import {
  API_BASE_URL,
  getApiBaseUrl,
  setApiBaseUrl as setConfigApiBaseUrl,
} from '@/config/api';

export { getApiBaseUrl, apiUrl } from '@/config/api';

/** Update axios + shared API_BASE_URL when the active school changes. */
export const setApiBaseUrl = (url) => {
  setConfigApiBaseUrl(url);
  apiClient.defaults.baseURL = getApiBaseUrl();
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl();
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
      } catch {
        /* ignore */
      }
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  }
);
