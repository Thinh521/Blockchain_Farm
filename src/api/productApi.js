import {API_URL} from '@env';
import api from './baseApi';

// Lấy tất cả sản phẩm của 1 farm theo farmCode
export const getProductsByFarm = async farmCode => {
  try {
    const res = await api.get(`${API_URL}/api/farms/${farmCode}/products`);
    return res.data?.data || [];
  } catch (error) {
    console.error('❌ Lỗi khi fetch products by farm:', error);
    return [];
  }
};
