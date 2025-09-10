import {storage} from './storage';

export const saveUser = ({userId, accessToken}) => {
  try {
    storage.set('userId', userId);
    storage.set('accessToken', accessToken);
    console.log('✅ Saved user info:', {userId, accessToken});
  } catch (error) {
    console.log('❌ Save user error:', error);
  }
};

export const getUser = () => {
  try {
    const userId = storage.getString('userId');
    const accessToken = storage.getString('accessToken');
    return userId && accessToken ? {userId, accessToken} : null;
  } catch (error) {
    console.log('❌ Get user error:', error);
    return null;
  }
};

// Xóa userId và accessToken (logout)
export const deleteUser = () => {
  try {
    storage.delete('userId');
    storage.delete('accessToken');
    console.log('✅ User info deleted');
  } catch (error) {
    console.log('❌ Delete user error:', error);
  }
};
