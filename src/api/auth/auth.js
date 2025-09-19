import api from '../baseApi.js';
import {ErrorMap} from '../../utils/errorMapper/errorMapper.js';
import {deleteUser, saveUser} from '../../utils/storage/authStorage.js';


// Đăng ký
export const registerApi = async data => {
  try {
    const res = await api.post(`/api/auth/register`, data);

    if (res.data?.code === '200') {
      return {success: true, data: res.data};
    }

    return {
      success: false,
      message: ErrorMap[res.data?.code] || 'Đăng ký thất bại',
      code: res.data?.code,
    };
  } catch (error) {
    const code = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[code] || 'Có lỗi từ server',
      code,
    };
  }
};

export const loginApi = async ({emailPhone, password}) => {
  try {
    const res = await api.post('/api/auth/login', {emailPhone, password}, { withCredentials: true });

    if (res.data?.code !== '200') {
      return {
        success: false,
        message: ErrorMap[res.data?.errorCodes?.code] || 'Đăng nhập thất bại',
        code: res.data?.errorCodes?.code,
      };
    }

    if (res.data?.accessToken && res.data?.user?.id && res.data?.refreshToken) {
      saveUser({
        userId: res.data.user.id,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
    }

    return {success: true, data: res.data};
  } catch (err) {
    const code = err.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[code] || 'Có lỗi từ server',
      code,
    };
  }
};


// Đăng xuất
export const logoutApi = async () => {
  try {
    const res = await api.post('/api/auth/logout', {}, { withCredentials: true });

    if (res.data?.code === '200') {
      deleteUser('accessToken');
      deleteUser('refreshToken');
      deleteUser('userId');
      return { success: true, data: res.data };
    }

    return {
      success: false,
      message: ErrorMap[res.data?.code] || 'Đăng xuất thất bại',
      code: res.data?.code,
    };
  } catch (error) {
    const code = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[code] || 'Có lỗi từ server',
      code,
    };
  }
};


// Quên mật khẩu
export const forgotPasswordApi = async ({email}) => {
  try {
    const res = await api.post('/api/user/forgot-password', {email});

    if (res.data?.code === 200) {
      return {success: true, data: res.data};
    }

    return {
      success: false,
      message: ErrorMap[res.data?.code] || 'Gửi email thất bại',
      code: res.data?.code,
    };
  } catch (error) {
    const code = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[code] || 'Không thể gửi email',
      code,
    };
  }
};

// Đặt lại mật khẩu
export const resetPasswordApi = async ({email, newPassword}) => {
  try {
    const res = await api.put('/api/user/reset-password', {email, newPassword});

    console.log('Reset Password API response:', res.data);

    if (res.data?.code === 200) {
      return {success: true, data: res.data};
    }

    return {
      success: false,
      message: ErrorMap[res.data?.code] || 'Đặt lại mật khẩu thất bại',
      code: res.data?.code,
    };
  } catch (error) {
    const code = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[code] || 'Không thể đặt lại mật khẩu',
      code,
    };
  }
};
