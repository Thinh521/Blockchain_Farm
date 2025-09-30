import React, {useCallback} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS, RPC_URL} from '@env';
import {useQuery} from '@tanstack/react-query';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Header from '../../components/Header/Header';
import Button from '../../components/CustomButton/CustomButton';
import ProductCardSkeleton from '../../components/CustomSkeleton/ProductCardSkeleton';
import contractArtifact from '../SmartConctract/contractABI.json';
import ProductList from '../../components/Product/ProductList';
import EmptyState from '../../components/EmptyState/EmptyState';

import api from '../../api/tokenApi';

import {scale} from '../../utils/scaling';
import styles from './Categories.styles';

const fetchProducts = async farmCode => {
  if (!farmCode) throw new Error('No farmCode provided');

  // 1. Lấy dữ liệu từ Smart Contract
  const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
  const contractRead = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    rpcProvider,
  );

  const productsData = await contractRead.getProductByFarmCode(farmCode);
  console.log('Products from SC:', productsData);

  const formattedProducts = productsData.map(product => {
    const images =
      typeof product.image === 'string'
        ? product.image
            .split(/[,|]/)
            .map(url => url.trim())
            .filter(Boolean)
        : [];

    return {
      farmCode: product.farmCode,
      productCode: product.productCode,
      categoryName: product.categoryName,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      area: product.area,
      image: images,
      description: product.description,
    };
  });

  // 2. Lấy danh sách productCode từ backend
  const backendRes = await api.get(`/api/farms/${farmCode}/products`);
  const backendCodes = Array.isArray(backendRes.data.data)
    ? backendRes.data.data.map(p => p.productCode)
    : [];

  // 3. Chỉ giữ lại sản phẩm có trong cả SC và backend
  return formattedProducts.filter(p => backendCodes.includes(p.productCode));
};

const CategoriesScreen = ({navigation, route}) => {
  const {farmCode, userId} = route.params || {};

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['products', farmCode],
    queryFn: () => fetchProducts(farmCode),
    enabled: !!farmCode,
  });

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
        {isLoading ? (
          <View style={{alignItems: 'flex-end', marginBottom: scale(20)}}>
            <SkeletonPlaceholder borderRadius={16} speed={1000}>
              <SkeletonPlaceholder.Item width={160} height={40} />
            </SkeletonPlaceholder>
          </View>
        ) : products.length >= 0 ? (
          <View style={{alignItems: 'flex-end', marginBottom: scale(20)}}>
            <Button.Main
              title="Thêm nông sản"
              style={styles.addButton}
              onPress={() => navigation.navigate('AddProduct', {farmCode})}
            />
          </View>
        ) : null}

        {isLoading ? (
          <ProductCardSkeleton count={4} />
        ) : isError ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>
              Không thể tải danh sách nông sản
            </Text>
            <Button.Main
              title="Thử lại"
              onPress={refetch}
              style={styles.refetchButton}
            />
          </View>
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
