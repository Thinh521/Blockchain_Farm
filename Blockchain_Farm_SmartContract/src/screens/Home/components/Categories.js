import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import EmptyState from '../../../components/EmptyState/EmptyState';
import CategorySkeleton from '../../../components/CustomSkeleton/CategorySkeleton';

import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

const Categories = ({
  categories,
  selectedCategory,
  onSelectCategory,
  navigation,
  allCategories,
  isLoadingCategories,
  isErrorCategories,
  refetchCategories,
}) => {
  const getCategoryIcon = name => {
    const lower = name.toLowerCase();

    if (lower.includes('trái cây')) return 'nutrition-outline';
    if (lower.includes('rau')) return 'leaf-outline';
    if (lower.includes('hoa')) return 'flower-outline';

    return 'pricetag-outline';
  };

  const renderCategory = ({item}) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.categoryButtonActive,
      ]}
      onPress={() => {
        onSelectCategory(item);
        navigation.navigate('NoBottomTab', {
          screen: 'CategoryList',
          params: {
            categoryName: item,
            allCategories: allCategories,
          },
        });
      }}>
      <Ionicons
        name={getCategoryIcon(item)}
        size={18}
        color={selectedCategory === item ? Colors.green : '#6B7280'}
      />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.categoryTextActive,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.categoriesSection}>
      <View style={styles.categoriesHeader}>
        <Text style={styles.categoriesTitle}>Danh mục nông sản</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      {isLoadingCategories ? (
        <CategorySkeleton count={3} />
      ) : isErrorCategories ? (
        <EmptyState
          message={'Có lỗi khi tải danh mục'}
          fullScreen
          style={{minHeight: scale(150)}}
          showRetry
          onRetry={refetchCategories}
        />
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
          contentContainerStyle={styles.categoryListContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesSection: {
    paddingVertical: scale(20),
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginBottom: scale(16),
  },
  categoriesTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
  },
  seeAllButton: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    backgroundColor: '#F3F4F6',
    borderRadius: scale(12),
  },
  seeAllText: {
    color: '#6B7280',
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },
  categoryList: {
    paddingLeft: scale(20),
  },
  categoryListContent: {
    paddingRight: scale(20),
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    marginRight: scale(12),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryButtonActive: {
    backgroundColor: '#ECFDF5',
    borderColor: Colors.green,
  },
  categoryText: {
    color: '#6B7280',
    marginLeft: scale(6),
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },
  categoryTextActive: {
    color: Colors.green,
  },
  carouselSection: {
    paddingVertical: scale(20),
    paddingHorizontal: scale(20),
  },
});

export default Categories;
