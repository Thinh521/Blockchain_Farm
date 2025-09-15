import {API_URL} from '@env';
import api from '../tokenApi';
import {getUser} from '../../utils/storage/authStorage';

const user = getUser();

// Lấy danh sách wishlist
export const getWishlistFarms = async () => {
  try {
    if (!user) throw new Error('Chưa đăng nhập');

    const res = await api.get(`${API_URL}/api/wishlist`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || {message: 'Lỗi khi lấy wishlist'};
  }
};

// Xoá farm khỏi wishlist (theo farmCode)
export const removeWishlistFarm = async farmCode => {
  try {
    if (!user) throw new Error('Chưa đăng nhập');

    const res = await api.delete(`${API_URL}/api/wishlist/${farmCode}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || {message: 'Lỗi khi xoá wishlist'};
  }
};

// Thêm farm vào wishlist (theo farmCode)
export const addWishlistFarm = async farmCode => {
  try {
    if (!user) throw new Error('Chưa đăng nhập');

    const res = await api.post(
      `${API_URL}/api/wishlist`,
      { farmCode },
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || {message: 'Lỗi khi thêm wishlist'};
  }
};
