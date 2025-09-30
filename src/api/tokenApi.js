import axios from 'axios';
import {API_URL} from '@env';
import {storage} from '../utils/storage/storage';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

// Request interceptor: gắn accessToken
api.interceptors.request.use(async config => {
  const token = storage.getString('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: refresh token khi 401
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = storage.getString('refreshToken');
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        // gọi refresh
        const res = await axios.post(`${API_URL}/api/auth/refresh`, {
          refreshToken,
        });
        const newAccessToken = res.data?.accessToken; // đổi key nếu backend khác

        if (newAccessToken) {
          // lưu token mới
          storage.set('accessToken', newAccessToken);

          // gắn lại headers cho request gốc
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
            Accept: 'application/json',
          };

          // Nếu là FormData thì để axios tự set Content-Type (multipart/form-data)
          if (!(originalRequest.data instanceof FormData)) {
            originalRequest.headers['Content-Type'] = 'application/json';

            // nếu data bị stringify thì parse lại (cho POST/PUT JSON)
            if (
              originalRequest.data &&
              typeof originalRequest.data === 'string'
            ) {
              try {
                originalRequest.data = JSON.parse(originalRequest.data);
              } catch {
                // bỏ qua nếu không parse được
              }
            }
          }

          return api(originalRequest);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
