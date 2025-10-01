import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import ProductSlider from '../../../components/Product/ProductSlider';
import ProductCardSkeleton from '../../../components/CustomSkeleton/ProductCardSkeleton';
import EmptyState from '../../../components/EmptyState/EmptyState';

import {useRelatedProducts} from '../../../hooks/useRelatedProducts';

import {scale} from '../../../utils/scaling';
import styles from './RelatedProducts.styles';

const RelatedProducts = ({farmCode, currentProductCode, navigation}) => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useRelatedProducts(farmCode, currentProductCode);

  const handleProductPress = useCallback(
    item => navigation.navigate('Product', {productCode: item.productCode}),
    [navigation],
  );

  return (
    <View style={styles.sectionContainer}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sản phẩm cùng trang trại</Text>

        {isLoading ? (
          <SkeletonPlaceholder borderRadius={16} speed={1000}>
            <SkeletonPlaceholder.Item width={80} height={14} />
          </SkeletonPlaceholder>
        ) : (
          <Text style={styles.sectionSubtitle}>{products.length} sản phẩm</Text>
        )}
      </View>

      {/* Nội dung */}
      {isLoading ? (
        <ProductCardSkeleton count={2} />
      ) : isError ? (
        <EmptyState
          message={'Có lỗi khi tải sản phẩm'}
          fullScreen
          style={{minHeight: scale(150)}}
          showRetry
          onRetry={refetch}
        />
      ) : products.length === 0 ? (
        <EmptyState
          message="Chưa có sản phẩm nào"
          fullScreen
          style={{minHeight: scale(150)}}
        />
      ) : (
        <ProductSlider products={products} onPress={handleProductPress} />
      )}
    </View>
  );
};

export default React.memo(RelatedProducts);
