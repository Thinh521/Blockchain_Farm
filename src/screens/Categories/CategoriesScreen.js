import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {ethers} from 'ethers';
import contractArtifact from '../SmartConctract/contractABI.json';
import Images from '../../assets/images/images';
import {CONTRACT_ADDRESS} from '@env';
import styles from './Categories.styles';
import api from '../../api/tokenApi';


const CategoriesScreen = ({navigation, route}) => {
  const {farmCode} = route.params || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  let isMounted = true;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      if (!farmCode) {
        throw new Error('No farmCode provided');
      }

      // 1. Lấy dữ liệu từ Smart Contract
      const rpcProvider = new ethers.JsonRpcProvider(
        'https://rpc.zeroscan.org',
      );
      const contractRead = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        rpcProvider,
      );

      const productsData = await contractRead.getProductByFarmCode(farmCode);

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
      const syncedProducts = formattedProducts.filter(p =>
        backendCodes.includes(p.productCode),
      );

      if (isMounted) {
        setProducts(syncedProducts);
      }
    } catch (err) {
      console.log('Error in getProductsByFarm:', err);
      if (isMounted) {
        setError(err.message || 'Không thể tải danh sách nông sản.');
        Alert.alert('Lỗi', err.message || 'Không thể tải danh sách nông sản.');
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  fetchProducts();

  const unsubscribe = navigation.addListener('focus', () => {
    fetchProducts();
  });

  return () => {
    isMounted = false;
    unsubscribe();
  };
}, [farmCode, navigation]);



  const handleProductPress = productItem => {
    navigation.navigate('Product', {productCode: productItem.productCode});
  };

  const handleProcessPress = productCode => {
    navigation.navigate('Process', {productCode, farmCode});
  };

  const renderProductItem = ({item}) => {
    const imageSource =
      item.image?.length > 0 ? {uri: item.image[0]} : Images.bg;

    return (
      <View style={styles.productCard}>
        <TouchableOpacity
          onPress={() => handleProductPress(item)}
          activeOpacity={0.8}
          style={styles.productImageWrapper}>
          <View style={styles.imageContainer}>
            <Image
              source={imageSource}
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
        <View style={styles.productFooter}>
          <TouchableOpacity
            onPress={() => handleProductPress(item)}
            style={styles.productNameWrapper}>
            <Text style={styles.productName}>{item.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.processButton}
            onPress={() => handleProcessPress(item.productCode)}
            activeOpacity={0.7}>
            <Text style={styles.processButtonText}>Quy trình</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0E9F58" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      );
    }

    if (products.length === 0) {
      return (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Chưa có nông sản nào.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => item.productCode || `product-${index}`}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#059669" barStyle="light-content" />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduct', {farmCode})}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.content}>{renderContent()}</View>
    </SafeAreaView>
  );
};

export default CategoriesScreen;
