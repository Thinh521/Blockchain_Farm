import {API_URL} from '@env';
import api from '../tokenApi';
import {getUser} from '../../utils/storage/authStorage';

// Lấy danh sách wishlist
export const getWishlistFarms = async () => {
  try {
    const user = await getUser();   // ⬅ lấy trong hàm
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
export const removeWishlistFarm = async (farmCode) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("Chưa đăng nhập");

    const res = await api.delete(`${API_URL}/api/wishlist/delete`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      data: { farmCode }, 
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Lỗi khi xoá wishlist" };
  }
};


// Thêm farm vào wishlist (theo farmCode)
export const addWishlistFarm = async farmCode => {
  try {
    const user = await getUser();   // ⬅ lấy trong hàm
    if (!user) throw new Error('Chưa đăng nhập');

    const res = await api.post(
      `${API_URL}/api/wishlist/add`,
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
