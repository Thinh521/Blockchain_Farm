import React from 'react';
import {View, TouchableOpacity, FlatList, TextInput, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';

import Header from '../../components/Header/Header';
import NewsList from '../../components/News/NewsList';
import NewsCardSkeleton from '../../components/CustomSkeleton/NewsCardSkeleton';
import ImageViewerModal from '../../components/ImageViewerModal/ImageViewerModal';
import {Search_Line_Icon} from '../../assets/icons';

import {useNews} from '../../hooks/useNews';

import {scale} from '../../utils/scaling';
import styles from './New.styles';

const NewScreen = () => {
  const navigation = useNavigation();

  const {
    news,
    isLoading,
    loadMore,
    hasMore,
    expandedId,
    selectedImageIndex,
    selectedImages,
    handleDelete,
    openImageViewer,
    closeImageViewer,
    toggleExpand,
  } = useNews();

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
                <Text style={styles.totalPosts}>{news.length} bài viết</Text>
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
            ) : !isLoading && news.length === 0 ? (
              <View style={styles.emptyWrapper}>
                <Text style={styles.emptyText}>Không có tin tức nào</Text>
              </View>
            ) : (
              <FlatList
                data={news}
                keyExtractor={item => item._id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <NewsList
                    data={[item]}
                    expandedId={expandedId}
                    onToggleExpand={toggleExpand}
                    onOpenImageViewer={openImageViewer}
                    onDelete={handleDelete}
                  />
                )}
                onEndReached={() => {
                  if (hasMore) loadMore();
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  hasMore ? <NewsCardSkeleton count={1} /> : null
                }
              />
            )}
          </>
        )}
      />

      <ImageViewerModal
        visible={selectedImageIndex !== null}
        images={selectedImages}
        startIndex={selectedImageIndex || 0}
        onClose={closeImageViewer}
      />
    </View>
  );
};

export default NewScreen;
