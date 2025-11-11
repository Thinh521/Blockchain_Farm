import axios from 'axios';
import { API_URL } from '@env';
import { ErrorMap } from '../../utils/errorMapper/errorMapper.js';

export const verifyOtpApi = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/verify-otp`, data);

    if (res.status === 200) {
      return {
        success: true,
        message: 'Xác thực OTP thành công',
        data: res.data,
      };
    }

    return {
      success: false,
      message: ErrorMap[res.data?.code] || 'Xác thực OTP thất bại',
      code: res.data?.code,
    };
  } catch (error) {
    const errCode = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[errCode] || 'Không thể xác thực OTP',
      code: errCode,
    };
  }
};
export const resendOtpApi = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/resend-otp`, data);

    if (res.status === 200) {
      return {
        success: true,
        message: 'OTP đã được gửi lại thành công',
        data: res.data,
      };
    }

    return {
      success: false,
      message: ErrorMap[res.data?.code] || 'Gửi lại OTP thất bại',
      code: res.data?.code,
    };
  } catch (error) {
    const errCode = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[errCode] || 'Không thể gửi lại OTP',
      code: errCode,
    };
  }
};
