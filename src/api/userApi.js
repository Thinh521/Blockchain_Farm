import api from './tokenApi';

export const getUserApi = async accessToken => {
  try {
    const res = await api.get('/api/user/get-user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể tải thông tin người dùng';
    console.log('Không thể tải thông tin người dùng:', message);
    throw new Error(message);
  }
};

export const updateUserApi = async (accessToken, formData) => {
  console.log('Update User API called with formData:', formData);
  try {
    const res = await api.put('/api/user/update', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
    
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      'Không thể cập nhật thông tin người dùng';
    const status = error?.response?.data?.code;
    console.log('Không thể cập nhật thông tin người dùng:', message);
    console.log('Không thể cập nhật thông tin người dùng:', status);
    throw new Error(message);
  }
};

export const changepasswordApi = async ({
  accessToken,
  oldPassword,
  newPassword,
}) => {
  try {
    const res = await api.put(
      '/api/user/change-password',
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    const message = error?.response?.data?.message || 'Không thể đổi mật khẩu';
    const status = error?.response?.data?.code || 'Không thể đổi mật khẩu';
    console.log('Không thể đổi mật khẩu:', message);
    console.log('Không thể đổi mật khẩu:', status);
    throw new Error(message);
  }
};

export const deleteUserApi = async accessToken => {
  try {
    const res = await api.delete('/api/user/delete', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Không thể xoá tài khoản';
    console.log('Không thể xoá tài khoản:', message);
    throw new Error(message);
  }
};

