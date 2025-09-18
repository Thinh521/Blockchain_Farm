import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Dimensions,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import styles from './New.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewsList from '../../components/News/NewsList';
import Header from '../../components/Header/Header';
import {Search_Line_Icon} from '../../assets/icons';
import {scale} from '../../utils/scaling';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {useQuery} from '@tanstack/react-query';
import {deleteNewsApi, getAllNewsApi} from '../../api/newsApi';
import {getUser} from '../../utils/storage/authStorage';
import NewsCardSkeleton from '../../components/CustomSkeleton/NewsCardSkeleton';
import {showMessage} from 'react-native-flash-message';

const NewScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const accessToken = getUser()?.accessToken;

  const [expandedId, setExpandedId] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const {
    data: mockNews = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['News'],
    queryFn: () => getAllNewsApi(accessToken),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

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

  const toggleExpand = id => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <View style={styles.container}>
      <Header
        title="Tin tức nông sản"
        subtitle="Cập nhật thông tin mới nhất từ ruộng đồng Việt Nam"
        emoji="🚜"
      />

      <FlatList
        data={[1]}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: scale(20),
          paddingHorizontal: scale(20),
          paddingBottom: scale(100),
        }}
        renderItem={() => (
          <>
            <View style={styles.header}>
              <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                  <Search_Line_Icon style={{color: '#9CA3AF', width: 20}} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm trang trại, sản phẩm..."
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                  <Ionicons name="filter-outline" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.totalPosts}>
                  {mockNews.length} bài viết
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('NoBottomTab', {
                      screen: 'AddMewsScreen',
                    });
                  }}
                  style={styles.addPostButton}>
                  <Text style={styles.addPostText}>+ Thêm bài viết</Text>
                </TouchableOpacity>
              </View>
            </View>

            {isLoading ? (
              <NewsCardSkeleton count={2} />
            ) : (
              <NewsList
                data={mockNews}
                expandedId={expandedId}
                onToggleExpand={toggleExpand}
                onOpenImageViewer={openImageViewer}
                onDelete={handleDelete}
              />
            )}
          </>
        )}
      />

      <Modal visible={selectedImageIndex !== null} transparent={true}>
        <View style={styles.modalContainer}>
          <FlatList
            data={selectedImages}
            horizontal
            pagingEnabled
            initialScrollIndex={selectedImageIndex}
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: Dimensions.get('window').width,
              offset: Dimensions.get('window').width * index,
              index,
            })}
            renderItem={({item}) => (
              <View style={styles.fullImageWrapper}>
                <Image source={{uri: item}} style={styles.modalImage} />
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedImageIndex(null)}>
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default NewScreen;
