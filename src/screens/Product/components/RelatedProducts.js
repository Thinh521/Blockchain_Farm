import React, {useCallback} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ethers} from 'ethers';
import {useQuery} from '@tanstack/react-query';
import {CONTRACT_ADDRESS, RPC_URL} from '@env';

import contractArtifact from '../../SmartConctract/contractABI.json';
import Images from '../../../assets/images/images';
import api from '../../../api/baseApi';

import styles from '../ProductScreen.style';

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

  const renderRelatedProduct = ({item}) => {
    const imageSource =
      item.image?.length > 0 ? {uri: item.image[0]} : Images.bg;
    return (
      <TouchableOpacity
        style={styles.relatedCard}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.8}>
        <View style={styles.relatedImageContainer}>
          <Image
            source={imageSource}
            style={styles.relatedImage}
            resizeMode="cover"
          />
          <View style={styles.relatedBadge}>
            <Text style={styles.relatedBadgeText}>{item.categoryName}</Text>
          </View>
        </View>
        <View style={styles.relatedContent}>
          <Text style={styles.relatedName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.relatedPrice}>{item.price}</Text>
          <Text style={styles.relatedStock}>Còn {item.quantity} sản phẩm</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sản phẩm cùng trang trại</Text>
        {isLoading ? (
          <ActivityIndicator size="small" color="#10B981" />
        ) : (
          <Text style={styles.sectionSubtitle}>{products.length} sản phẩm</Text>
        )}
      </View>
      {isLoading ? (
        <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
      ) : products.length === 0 ? (
        <Text style={styles.emptyText}>
          Chưa có sản phẩm khác từ trang trại này
        </Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderRelatedProduct}
          keyExtractor={item => item.productCode}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.relatedList}
          ItemSeparatorComponent={() => <View style={{width: 12}} />}
        />
      )}
    </View>
  );
};

export default React.memo(RelatedProducts);
