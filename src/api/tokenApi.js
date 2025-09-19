import axios from 'axios';
import {API_URL} from '@env';
import {storage} from '../utils/storage/storage';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
});

// Request: gắn accessToken
api.interceptors.request.use(async config => {
  const token = storage.getString('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response: nếu accessToken hết hạn → gọi refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === '401-3' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = storage.getString('refreshToken');
      if (!refreshToken) return Promise.reject(error);

      try {
        const res = await axios.post(`${API_URL}/api/auth/refresh`, {
          refreshToken,
        });
        const newAccessToken = res.data?.accessToken;
        if (newAccessToken) {
          storage.set('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;