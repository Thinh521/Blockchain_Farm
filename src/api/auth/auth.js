import axios from 'axios';
import {API_URL} from '@env'; // nhớ import đúng từ .env
import { ErrorMap } from '../../utils/errorMapper/errorMapper.js';

export const registerApi = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/register`, data);

    // Backend trả code = "200" coi như thành công
    if (res.data?.code === "200") {
      return { success: true, data: res.data };
    }

    return {
      success: false,
      message: ErrorMap[res.data?.code] || "Đăng ký thất bại",
    };
  } catch (error) {
    const code = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[code] || "Có lỗi từ server",
    };
  }
};
