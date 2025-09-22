import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useNews} from '../../hooks/useNews';
import NewsCard from '../../components/News/NewsCard';
import NewsCardSkeleton from '../../components/CustomSkeleton/NewsCardSkeleton';
import {Colors} from '../../theme/theme';
import {scale} from '../../utils/scaling';
import ImageViewerModal from '../../components/ImageViewerModal/ImageViewerModal';

const AllNewsScreen = () => {
  const {farmCode} = useRoute().params || {};

  const {
    news,
    isLoading,
    expandedId,
    selectedImageIndex,
    selectedImages,
    handleDelete,
    openImageViewer,
    closeImageViewer,
    toggleExpand,
  } = useNews({farmCode});

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{paddingTop: scale(20)}}>
          <NewsCardSkeleton count={2} />
        </View>
      ) : news.length === 0 ? (
        <View style={styles.emptyWrapper}>
          <Text style={styles.emptyText}>Không có tin tức nào</Text>
        </View>
      ) : (
        <FlatList
          data={news}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View>
              <NewsCard
                item={item}
                isExpanded={expandedId === item._id}
                onToggleExpand={toggleExpand}
                onOpenImageViewer={openImageViewer}
                onDelete={handleDelete}
              />
            </View>
          )}
        />
      )}

      <ImageViewerModal
        visible={selectedImageIndex !== null}
        images={selectedImages}
        startIndex={selectedImageIndex || 0}
        onClose={closeImageViewer}
      />
    </View>
  );
};

export default AllNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    padding: scale(20),
    paddingBottom: scale(40),
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.title,
  },
});
