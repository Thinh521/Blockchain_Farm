import {useState, useEffect} from 'react';
import {Alert} from 'react-native'; 
import {useIsFocused} from '@react-navigation/core';
import {useQuery} from '@tanstack/react-query';
import {showMessage} from 'react-native-flash-message';

import {
  deleteNewsApi,
  getAllNewsApi,
  getAllNewsByFarmApi,
} from '../api/newsApi';
import {getUser} from '../utils/storage/authStorage';

export const useNews = ({farmCode} = {}) => {
  const isFocused = useIsFocused();
  const accessToken = getUser()?.accessToken;

  const [expandedId, setExpandedId] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const [visibleNews, setVisibleNews] = useState([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const {
    data: allNews = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['news', farmCode ?? 'all'],
    queryFn: () =>
      farmCode
        ? getAllNewsByFarmApi(farmCode, accessToken)
        : getAllNewsApi(accessToken),
    staleTime: 10 * 60 * 1000,
    enabled: !!accessToken,
    retry: 1,
  });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  useEffect(() => {
    if (allNews.length > 0) {
      const newData = allNews.slice(0, page * PAGE_SIZE);
      setVisibleNews(newData);
    }
  }, [allNews, page]);

  const loadMore = () => {
    if (page * PAGE_SIZE < allNews.length) {
      setPage(prev => prev + 1);
    }
  };

  const handleDelete = async id => {
    Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa bài viết này?', [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          const res = await deleteNewsApi(id, accessToken);
          if (res.success) {
            showMessage({
              message: 'Thành công',
              description: 'Bài viết đã được xóa',
              type: 'success',
            });
            refetch();
          } else {
            showMessage({
              message: 'Thất bại',
              description: 'Không thể xóa bài viết',
              type: 'danger',
            });
          }
        },
      },
    ]);
  };

  const openImageViewer = (images, index) => {
    setSelectedImages(images);
    setSelectedImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
    setSelectedImages([]);
  };

  const toggleExpand = id => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return {
    news: visibleNews,
    isLoading,
    error,
    refetch,
    loadMore,
    hasMore: page * PAGE_SIZE < allNews.length,
    expandedId,
    selectedImageIndex,
    selectedImages,
    handleDelete,
    openImageViewer,
    closeImageViewer,
    toggleExpand,
  };
};
