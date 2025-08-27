import axios from 'axios';
import {API_BASE_URL} from '@env';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const getUserApi = async accessToken => {
  try {
    const res = await api.get('/api/user/get-user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải thông tin người dùng';
    console.log('Không thể tải thông tin người dùng:', message);
    throw new Error(message);
  }
};

export const updateUserApi = async (accessToken, formData) => {
  try {
    const res = await api.put('/api/user/update', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Không thể cập nhật thông tin người dùng';
    console.log('Không thể cập nhật thông tin người dùng:', message);
    throw new Error(message);
  }
};
