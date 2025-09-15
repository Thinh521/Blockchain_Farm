import {getUser} from '../../utils/storage/authStorage';
import api from '../tokenApi';

export const createNewsApi = async ({
  farmCode,
  name,
  title,
  description,
  images,
}) => {
  try {
    const user = getUser();
    if (!user) throw new Error('NO_AUTH');

    const formData = new FormData();
    formData.append('farmCode', farmCode);
    formData.append('name', name);
    formData.append('title', title);
    formData.append('description', description);

    (images || []).forEach((img, idx) => {
      // img should be { uri, type, fileName } from image-picker
      const uri = img.uri;
      const fileType = img.type || 'image/jpeg';
      const nameFile = img.fileName || `image_${Date.now()}_${idx}.jpg`;
      formData.append('images', {
        uri,
        type: fileType,
        name: nameFile,
      });
    });

    const res = await api.post('/api/news', formData, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.log('createNewsApi error:', error.response?.data || error.message);
    // chuẩn hoá lỗi để frontend xử lý
    const server = error.response?.data || {};
    return Promise.reject(server?.code ? server : {code: 'NETWORK_ERROR'});
  }
};

export const getNewsByFarmApi = async farmCode => {
  try {
    const user = getUser();
    if (!user) throw new Error('NO_AUTH');
    const res = await api.get(`/api/news/${encodeURIComponent(farmCode)}`, {
      headers: {Authorization: `Bearer ${user.accessToken}`},
    });
    return res.data;
  } catch (error) {
    console.log(
      'getNewsByFarmApi error:',
      error.response?.data || error.message,
    );
    const server = error.response?.data || {};
    return Promise.reject(server?.code ? server : {code: 'NETWORK_ERROR'});
  }
};

export const updateNewsApi = async ({id, name, title, description, images}) => {
  try {
    const user = getUser();
    if (!user) throw new Error('NO_AUTH');

    const formData = new FormData();
    if (name) formData.append('name', name);
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);

    // Tách ảnh cũ & ảnh mới
    const oldImages = images.filter(img => !img.uri); // ảnh từ DB
    const newImages = images.filter(img => img.uri); // ảnh chọn từ device

    formData.append('oldImages', JSON.stringify(oldImages));

    newImages.forEach((img, idx) => {
      formData.append('images', {
        uri: img.uri,
        type: img.type || 'image/jpeg',
        name: img.fileName || `image_${Date.now()}_${idx}.jpg`,
      });
    });

    const res = await api.put(`/api/news/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.log('updateNewsApi error:', error.response?.data || error.message);
    const server = error.response?.data || {};
    return Promise.reject(server?.code ? server : {code: 'NETWORK_ERROR'});
  }
};

export const deleteNewsApi = async id => {
  try {
    const user = getUser();
    if (!user) throw new Error('NO_AUTH');
    const res = await api.delete(`/api/news/${id}`, {
      headers: {Authorization: `Bearer ${user.accessToken}`},
    });
    return res.data;
  } catch (error) {
    console.log('deleteNewsApi error:', error.response?.data || error.message);
    const server = error.response?.data || {};
    return Promise.reject(server?.code ? server : {code: 'NETWORK_ERROR'});
  }
};
