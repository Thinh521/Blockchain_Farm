import React, {useMemo, useState, useRef, useCallback} from 'react';
import {View, TouchableOpacity, FlatList, TextInput, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import Header from '../../components/Header/Header';
import NewsList from '../../components/News/NewsList';
import NewsCardSkeleton from '../../components/CustomSkeleton/NewsCardSkeleton';
import ImageViewerModal from '../../components/ImageViewerModal/ImageViewerModal';
import {Search_Line_Icon} from '../../assets/icons';
import Button from '../../components/CustomButton/CustomButton';

import {useNews} from '../../hooks/useNews';
import useDebouncedSearching from '../../hooks/useDebouncedSearching';

import {scale} from '../../utils/scaling';
import styles from './New.styles';
import {Colors} from '../../theme/theme';

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

  const [searchQuery, setSearchQuery] = useState('');
  const isSearching = useDebouncedSearching(searchQuery, 500);

  const [filterType, setFilterType] = useState(null);
  const [activeTab, setActiveTab] = useState('date');
  const [tempDateFilter, setTempDateFilter] = useState(null);
  const [tempInteractionFilter, setTempInteractionFilter] = useState(null);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['70%'], []);

  const openFilter = () => {
    setTempDateFilter(
      filterType?.includes('today') ||
        filterType?.includes('7days') ||
        filterType?.includes('month') ||
        filterType?.includes('oldest') ||
        filterType?.includes('newest')
        ? filterType
        : null,
    );
    setTempInteractionFilter(
      filterType?.includes('likes') ||
        filterType?.includes('comments') ||
        filterType?.includes('shares')
        ? filterType
        : null,
    );
    bottomSheetRef.current?.expand();
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  const handleCancel = () => {
    setTempDateFilter(null);
    setTempInteractionFilter(null);
    handleClose();
  };

  const handleApplyFilter = () => {
    if (tempInteractionFilter) {
      setFilterType(tempInteractionFilter);
    } else if (tempDateFilter) {
      setFilterType(tempDateFilter);
    } else {
      setFilterType(null);
    }
    handleClose();
  };

  const filteredNews = useMemo(() => {
    let data = [...news];

    // search
    if (searchQuery.trim()) {
      const lowerSearch = searchQuery.toLowerCase();
      data = data.filter(
        item =>
          item.title?.toLowerCase().includes(lowerSearch) ||
          item.userId.userName?.toLowerCase().includes(lowerSearch) ||
          item.description?.toLowerCase().includes(lowerSearch),
      );
    }

    // filter logic
    switch (filterType) {
      case 'today':
        data = data.filter(item => {
          const date = new Date(item.createdAt);
          const today = new Date();
          return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        });
        break;
      case '7days':
        data = data.filter(item => {
          const date = new Date(item.createdAt);
          const now = new Date();
          const diff = (now - date) / (1000 * 60 * 60 * 24);
          return diff <= 7;
        });
        break;
      case 'month':
        data = data.filter(item => {
          const date = new Date(item.createdAt);
          const now = new Date();
          return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        });
        break;
      case 'oldest':
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'newest':
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'likes':
        data.sort((a, b) => {
          const aLikes = Array.isArray(a.likes) ? a.likes.length : a.likes || 0;
          const bLikes = Array.isArray(b.likes) ? b.likes.length : b.likes || 0;
          return bLikes - aLikes;
        });
        break;
      case 'comments':
        data.sort((a, b) => {
          const aComments = Array.isArray(a.comments)
            ? a.comments.length
            : a.comments || 0;
          const bComments = Array.isArray(b.comments)
            ? b.comments.length
            : b.comments || 0;
          return bComments - aComments;
        });
        break;
      case 'shares':
        data.sort((a, b) => {
          const aShares = Array.isArray(a.shares)
            ? a.shares.length
            : a.shares || 0;
          const bShares = Array.isArray(b.shares)
            ? b.shares.length
            : b.shares || 0;
          return bShares - aShares;
        });
        break;
    }

    return data;
  }, [news, searchQuery, filterType]);

  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    [],
  );

  // Render filter options
  const FilterOption = ({title, value, isSelected, onPress}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 4,
        backgroundColor: isSelected ? '#E3F2FD' : 'transparent',
        borderRadius: 8,
        borderWidth: isSelected ? 1 : 0,
        borderColor: isSelected ? Colors.green : 'transparent',
      }}
      onPress={() => onPress(value)}>
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          color: isSelected ? Colors.green : '#333',
          fontWeight: isSelected ? '600' : 'normal',
        }}>
        {title}
      </Text>
      {isSelected && (
        <Ionicons name="checkmark-circle" size={20} color="#2196F3" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Tin tức nông sản"
        subtitle="Cập nhật thông tin mới nhất từ ruộng đồng Việt Nam"
        emoji="📰"
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
                    placeholder="Tìm kiếm trang trại"
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    filterType && {backgroundColor: Colors.green},
                  ]}
                  onPress={openFilter}>
                  <Ionicons name="filter-outline" size={20} color="#fff" />
                  {filterType && (
                    <View
                      style={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#FF5722',
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.totalPosts}>
                  {filteredNews.length} bài viết
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
            ) : isSearching ? (
              <NewsCardSkeleton count={1} />
            ) : filteredNews.length === 0 ? (
              <View style={styles.emptyWrapper}>
                <Text style={styles.emptyText}>Không có tin tức nào</Text>
              </View>
            ) : (
              <FlatList
                data={filteredNews}
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

      {/* Filter BottomSheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.bottomSheetContainer}
        handleIndicatorStyle={styles.bottomSheetHandle}>
        <BottomSheetView style={styles.bottomSheetContent}>
          {/* Header */}
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetHeaderTitle}>Bộ lọc</Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabNavigation}>
            <TouchableOpacity
              style={[
                styles.tabItem,
                activeTab === 'date' && styles.tabItemActive,
              ]}
              onPress={() => setActiveTab('date')}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={activeTab === 'date' ? Colors.green : '#666'}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'date' && styles.tabTextActive,
                ]}>
                Lọc theo ngày
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabItem,
                activeTab === 'interaction' && styles.tabItemActive,
              ]}
              onPress={() => setActiveTab('interaction')}>
              <Ionicons
                name="people-outline"
                size={20}
                color={activeTab === 'interaction' ? Colors.green : '#666'}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'interaction' && styles.tabTextActive,
                ]}>
                Lọc theo tương tác
              </Text>
            </TouchableOpacity>
          </View>

          {/* Filter Content */}
          <View style={styles.filterContent}>
            {activeTab === 'date' ? (
              <View>
                <FilterOption
                  title="Hôm nay"
                  value="today"
                  isSelected={tempDateFilter === 'today'}
                  onPress={value =>
                    setTempDateFilter(tempDateFilter === value ? null : value)
                  }
                />
                <FilterOption
                  title="7 ngày qua"
                  value="7days"
                  isSelected={tempDateFilter === '7days'}
                  onPress={value =>
                    setTempDateFilter(tempDateFilter === value ? null : value)
                  }
                />
                <FilterOption
                  title="Tháng này"
                  value="month"
                  isSelected={tempDateFilter === 'month'}
                  onPress={value =>
                    setTempDateFilter(tempDateFilter === value ? null : value)
                  }
                />
                <FilterOption
                  title="Cũ nhất → Mới nhất"
                  value="oldest"
                  isSelected={tempDateFilter === 'oldest'}
                  onPress={value =>
                    setTempDateFilter(tempDateFilter === value ? null : value)
                  }
                />
                <FilterOption
                  title="Mới nhất → Cũ nhất"
                  value="newest"
                  isSelected={tempDateFilter === 'newest'}
                  onPress={value =>
                    setTempDateFilter(tempDateFilter === value ? null : value)
                  }
                />
              </View>
            ) : (
              <View>
                <FilterOption
                  title="Nhiều lượt thích nhất"
                  value="likes"
                  isSelected={tempInteractionFilter === 'likes'}
                  onPress={value =>
                    setTempInteractionFilter(
                      tempInteractionFilter === value ? null : value,
                    )
                  }
                />
                <FilterOption
                  title="Nhiều bình luận nhất"
                  value="comments"
                  isSelected={tempInteractionFilter === 'comments'}
                  onPress={value =>
                    setTempInteractionFilter(
                      tempInteractionFilter === value ? null : value,
                    )
                  }
                />
                <FilterOption
                  title="Được chia sẻ nhiều nhất"
                  value="shares"
                  isSelected={tempInteractionFilter === 'shares'}
                  onPress={value =>
                    setTempInteractionFilter(
                      tempInteractionFilter === value ? null : value,
                    )
                  }
                />
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.bottomSheetActions}>
            <Button.Main
              title="Hủy"
              onPress={handleCancel}
              style={styles.cancelButton}
              textStyle={styles.cancelButtonText}
            />

            <Button.Main
              title="Áp dụng"
              onPress={handleApplyFilter}
              style={styles.applyButton}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>

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
