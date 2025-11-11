import React, {useCallback} from 'react';
import {View, SafeAreaView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Header from '../../components/Header/Header';
import Button from '../../components/CustomButton/CustomButton';
import ProductCardSkeleton from '../../components/CustomSkeleton/ProductCardSkeleton';
import ProductList from '../../components/Product/ProductList';
import EmptyState from '../../components/EmptyState/EmptyState';
import {useFarmProducts} from '../../hooks/useFarmProducts';
import {scale} from '../../utils/scaling';
import styles from './Categories.styles';

const CategoriesScreen = ({navigation, route}) => {
  const {farmCode} = route.params || {};

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
      });
    },
    [navigation, farmCode],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Danh mục nông sản"
        subtitle="Quản lý & thêm quy trình các nông sản"
        emoji="🛍️"
        showBack={true}
      />

      <View style={{flex: 1}}>
        {isLoadingProducts ? (
          <View
            style={{
              alignItems: 'flex-end',
              padding: scale(20),
              paddingBottom: 0,
            }}>
            <SkeletonPlaceholder borderRadius={16} speed={1000}>
              <SkeletonPlaceholder.Item width={170} height={48} />
            </SkeletonPlaceholder>
          </View>
        ) : products.length >= 0 ? (
          <View
            style={{
              alignItems: 'flex-end',
              padding: scale(20),
              paddingBottom: 0,
            }}>
            <Button.Main
              title="Thêm nông sản"
              style={styles.addButton}
              onPress={() => navigation.navigate('AddProduct', {farmCode})}
            />
          </View>
        ) : null}

        {isLoadingProducts ? (
          <View style={{padding: scale(20)}}>
            <ProductCardSkeleton count={4} />
          </View>
        ) : products.length === 0 ? (
          <EmptyState
            message="Chưa có sản phẩm nào"
            style={{marginTop: scale(200)}}
          />
        ) : productError ? (
          <EmptyState
            message={'Có lỗi khi tải sản phẩm'}
            fullScreen
            style={{minHeight: scale(150)}}
            showRetry
            onRetry={refetchProducts}
          />
        ) : (
          <ProductList products={products} onPress={handleProductPress} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoriesScreen;
