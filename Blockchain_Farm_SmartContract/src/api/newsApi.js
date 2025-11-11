import api from './tokenApi';
import {ErrorMap} from '../utils/errorMapper/errorMapper';

// Get all the news
export const getAllNewsApi = async () => {
  try {
    const res = await api.get('/api/news/all');

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

// Get all news by farmCode
export const getAllNewsByFarmApi = async farmCode => {
  try {
    const res = await api.get(`/api/news/${farmCode}`);

    if (res.data?.code === 200) {
      return res.data.data;
    }
    return [];
  } catch (error) {
    const code = error.response?.data?.code;
        console.log(code);

    return {
      success: false,
      message: ErrorMap[code] || 'Có lỗi từ server',
      code,
    };
  }
};

// Create new news
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
    console.log(code);
    return {
      success: false,
      message: ErrorMap[code] || 'Có lỗi từ server',
      code,
    };
  }
};

// News update
export const updateNewsApi = async (id, accessToken, formData) => {
  try {
    const res = await api.put(`/api/news/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.data?.code === 200) {
      return {success: true, data: res.data.data};
    }

    return {success: false, message: 'Không thể chỉnh sửa bài viết'};
  } catch (error) {
    const code = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[code] || 'Có lỗi từ server',
      code,
    };
  }
};

// Delete news
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
