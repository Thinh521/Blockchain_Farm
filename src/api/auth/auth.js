import api from '../baseApi.js';
import {ErrorMap} from '../../utils/errorMapper/errorMapper.js';
import {saveUser} from '../../utils/storage/authStorage.js';

export const registerApi = async data => {
  try {
    const res = await api.post('/api/auth/register', data);

    if (res.data?.code === '200') {
      return {success: true, data: res.data};
    }

    return {
      success: false,
      message: ErrorMap[res.data?.code] || 'Đăng ký thất bại',
    };
  } catch (error) {
    const code = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[code] || 'Có lỗi từ server',
    };
  }
};

export const loginApi = async ({emailPhone, password}) => {
  try {
    const res = await api.post('/api/auth/login', {
      emailPhone,
      password,
    });

    console.log('Login API response:', res.data);
    if (res.data?.errorCodes?.code !== '200') {
      throw {code: res.data.errorCodes?.code || '500-1'};
    }

    if (res.data?.accessToken && res.data?.user?.id) {
      saveUser({
        userId: res.data.user.id,
        accessToken: res.data.accessToken,
      });
    }

    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const logoutApi = async () => {
  try {
    const res = await api.post('/api/auth/logout', {}, {withCredentials: true});

    if (res.data?.code === '200') {
      return {success: true, data: res.data};
    }

    return {
      success: false,
      message: ErrorMap[res.data?.code] || 'Đăng xuất thất bại',
    };
  } catch (error) {
    const code = error.response?.data?.code;
    return {
      success: false,
      message: ErrorMap[code] || 'Có lỗi từ server',
    };
  }
};
