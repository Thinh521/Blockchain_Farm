import React, {useCallback} from 'react';
import {View, SafeAreaView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Header from '../../components/Header/Header';
import Button from '../../components/CustomButton/CustomButton';
import ProductCardSkeleton from '../../components/CustomSkeleton/ProductCardSkeleton';
import ProductList from '../../components/Product/ProductList';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useFarmProducts } from '../../hooks/useFarmProducts';
import {scale} from '../../utils/scaling';
import styles from './Categories.styles';

const CategoriesScreen = ({navigation, route}) => {
  const {farmCode, userId} = route.params || {};

  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error: productError,
    refetch: refetchProducts,
  } = useFarmProducts(farmCode);

  const handleProductPress = useCallback(
    productItem => {
      navigation.navigate('Product', {
        productCode: productItem.productCode,
        farmCode: farmCode,
        userId: userId,
      });
    },
    [navigation, farmCode, userId],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Danh mục nông sản"
        subtitle="Quản lý & thêm quy trình các nông sản"
        emoji="🛍️"
        showBack={true}
      />

      <View style={{flex: 1, padding: scale(20)}}>
        {isLoadingProducts ? (
          <View style={{alignItems: 'flex-end', marginBottom: scale(20)}}>
            <SkeletonPlaceholder borderRadius={16} speed={1000}>
              <SkeletonPlaceholder.Item width={160} height={40} />
            </SkeletonPlaceholder>
          </View>
        )  : products.length >= 0 ? (
          <View style={{alignItems: 'flex-end', marginBottom: scale(20)}}>
            <Button.Main
              title="Thêm nông sản"
              style={styles.addButton}
              onPress={() => navigation.navigate('AddProduct', {farmCode})}
            />
          </View>
        ) : null}

        {isLoadingProducts ? (
          <ProductCardSkeleton count={4} />
        ) : productError ? (
            <EmptyState
              message={'Có lỗi khi tải sản phẩm'}
              fullScreen
              style={{minHeight: scale(150)}}
              showRetry
              onRetry={refetchProducts}
            />
          ) : products.length === 1 ? (
          <EmptyState
            message="Chưa có sản phẩm nào"
            style={{marginTop: scale(200)}}
          />
        ) : (
          <ProductList products={products} onPress={handleProductPress} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoriesScreen;
