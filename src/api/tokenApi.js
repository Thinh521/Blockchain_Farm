import axios from 'axios';
import {API_URL} from '@env';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // cần cho refreshToken
});

// Interceptor: bắt accessToken mới từ server
api.interceptors.response.use(
  response => {
    const newToken = response.headers['x-access-token'];
    if (newToken) {
      console.log('Nhận accessToken mới từ server:', newToken);
      storage.set('accessToken', newToken); // lưu vào mmkv
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
