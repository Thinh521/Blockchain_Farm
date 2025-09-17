import api from './tokenApi';
import {ErrorMap} from '../utils/errorMapper/errorMapper';

export const createNewsApi = async (accessToken, formData) => {
  try {
    const res = await api.post('/api/news/create', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    const code = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[code] || 'Có lỗi từ server',
      code,
    };
  }
};

export const getAllNewsApi = async accessToken => {
  try {
    const res = await api.get('/api/news/all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.data?.code === 200) {
      return res.data.data;
    }
    return [];
  } catch (error) {
    const code = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[code] || 'Có lỗi từ server',
      code,
    };
  }
};

export const deleteNewsApi = async (id, accessToken) => {
  try {
    const res = await api.delete(`/api/news/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.data?.code === 200) {
      return {success: true, data: res.data.data};
    }

    return {success: false, message: 'Không thể xoá bài viết'};
  } catch (error) {
    const code = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[code] || 'Có lỗi từ server',
      code,
    };
  }
};
