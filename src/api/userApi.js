import api from './baseApi';

export const getAllCategories = async () => {
  try {
    const res = await api.put('/api/user/update');
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Không thể cập nhật thông tin người dùng';
    console.log('Không thể cập nhật thông tin người dùng:', message);
    throw new Error(message);
  }
};
