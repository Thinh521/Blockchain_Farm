import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import {ethers} from 'ethers';
import {useQuery} from '@tanstack/react-query';
import {CONTRACT_ADDRESS, RPC_URL} from '@env';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import contractArtifact from '../../SmartConctract/contractABI.json';
import ProductSlider from '../../../components/Product/ProductSlider';
import ProductCardSkeleton from '../../../components/CustomSkeleton/ProductCardSkeleton';
import EmptyState from '../../../components/EmptyState/EmptyState';

import api from '../../../api/baseApi';

import {scale} from '../../../utils/scaling';
import styles from './RelatedProducts.styles';

const RelatedProducts = ({farmCode, currentProductCode, navigation}) => {
  const fetchRelatedProducts = async () => {
    if (!farmCode || !currentProductCode) return [];

    // 1. Backend: lấy danh sách productCode
    const backendRes = await api.get(`/api/farms/${farmCode}/products`);
    const backendCodes = (backendRes.data?.data || []).map(p => p.productCode);

    // 2. Smart Contract
    const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
    const contractRead = new ethers.Contract(
      CONTRACT_ADDRESS,
      contractArtifact.abi,
      rpcProvider,
    );
    const productsData = await contractRead.getProductByFarmCode(farmCode);

    // 3. Format + lọc
    return productsData
      .filter(
        p =>
          p.productCode !== currentProductCode &&
          backendCodes.includes(p.productCode),
      )
      .slice(0, 10)
      .map(p => ({
        farmCode: p.farmCode,
        productCode: p.productCode,
        categoryName: p.categoryName,
        name: p.name,
        quantity: p.quantity,
        price: p.price,
        image:
          typeof p.image === 'string'
            ? p.image
                .split(/[,|]/)
                .map(url => url.trim())
                .filter(Boolean)
            : [],
        description: p.description,
      }));
  };

  const {data: products = [], isLoading} = useQuery({
    queryKey: ['relatedProducts', farmCode, currentProductCode],
    queryFn: fetchRelatedProducts,
    enabled: !!farmCode && !!currentProductCode,
  });

  const handleProductPress = useCallback(
    item => navigation.navigate('Product', {productCode: item.productCode}),
    [navigation],
  );

  return (
    <View style={styles.sectionContainer}>
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
      {isLoading ? (
        <ProductCardSkeleton count={2} />
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
