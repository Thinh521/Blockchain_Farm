import React, {useMemo, useCallback} from 'react';
import {View, SafeAreaView} from 'react-native';
import Header from '../../components/Header/Header';
import ProductCardSkeleton from '../../components/CustomSkeleton/ProductCardSkeleton';
import ProductList from '../../components/Product/ProductList';
import EmptyState from '../../components/EmptyState/EmptyState';
import {scale} from '../../utils/scaling';
import styles from '../Categories/Categories.styles';
import {getUser} from '../../utils/storage/authStorage';

const CategoryListScreen = ({navigation, route}) => {
  const {categoryName, allProducts = []} = route.params || {};

const filteredProducts = useMemo(() => {
  return allProducts.filter(
    p => p.categoryName?.trim().toLowerCase() === categoryName?.trim().toLowerCase()
  );
}, [allProducts, categoryName]);

  const handleProductPress = useCallback(
    productItem => {
      navigation.navigate('Product', {
        productCode: productItem.productCode,
        farmCode: productItem.farmCode,
      });
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={categoryName}
        subtitle="Danh sách sản phẩm trong danh mục"
        emoji="🛍️"
        showBack={true}
      />

      <View style={{flex: 1, padding: scale(20)}}>
        {false ? (
          <ProductCardSkeleton count={4} />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            message="Chưa có sản phẩm nào trong danh mục này"
            style={{marginTop: scale(200)}}
          />
        ) : (
          <ProductList
            products={filteredProducts}
            onPress={handleProductPress}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoryListScreen;
