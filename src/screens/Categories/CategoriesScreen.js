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
import {API_URL} from '@env';
import styles from './Categories.styles';

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

        console.log('📤 Calling getProductsByFarm for:', farmCode);
        const rpcProvider = new ethers.JsonRpcProvider(
          'https://rpc.zeroscan.org',
        );
        const contractRead = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractArtifact.abi,
          rpcProvider,
        );

        const productsData = await contractRead.getProductByFarmCode(farmCode);
        console.log('📦 Raw productsData:', productsData);

        const formattedProducts = productsData.map((product, index) => {
          const images =
            typeof product.image === 'string'
              ? product.image
                  .split(/[,|]/)
                  .map(url => url.trim())
                  .filter(Boolean)
              : [];

          console.log(`🧱 Product ${index + 1}:`, {
            productCode: product.productCode,
            name: product.name,
            imageCount: images.length,
          });

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

        if (isMounted) {
          setProducts(formattedProducts);
        }
      } catch (err) {
        console.error('❌ Error in getProductsByFarm:', err);
        if (isMounted) {
          setError(err.message || 'Không thể tải danh sách nông sản.');
          Alert.alert(
            'Lỗi',
            err.message || 'Không thể tải danh sách nông sản.',
          );
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

  const renderProductItem = ({item}) => {
    const imageSource =
      item.image?.length > 0 ? {uri: item.image[0]} : Images.bg;

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.8}>
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh mục nông sản</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProduct', {farmCode})}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>{renderContent()}</View>
    </SafeAreaView>
  );
};

export default CategoriesScreen;
