import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS} from '@env';
import contractArtifact from '../SmartConctract/contractABI.json';
import Images from '../../assets/images/images';

const {width} = Dimensions.get('window');
const RPC_URL = 'https://rpc.zeroscan.org';
const CARD_WIDTH = 160;
const CARD_HEIGHT = 240;

const RelatedProducts = React.memo(
  ({farmCode, currentProductCode, navigation}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRelatedProducts = useCallback(async () => {
      if (!farmCode || !currentProductCode) return;
      try {
        setLoading(true);
        const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
        const contractRead = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractArtifact.abi,
          rpcProvider,
        );

        const productsData = await contractRead.getProductByFarmCode(farmCode);
        const formattedProducts = productsData
          .filter(p => p.productCode !== currentProductCode)
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

        setProducts(formattedProducts);
      } catch (err) {
        console.error('Error fetching related products:', err);
      } finally {
        setLoading(false);
      }
    }, [farmCode, currentProductCode]);

    useEffect(() => {
      fetchRelatedProducts();
    }, [fetchRelatedProducts]);

    const handleProductPress = useCallback(
      item => navigation.navigate('Product', {productCode: item.productCode}),
      [navigation],
    );

    const renderRelatedProduct = ({item}) => {
      const imageSource =
        item.image?.length > 0 ? {uri: item.image[0]} : Images.bg;
      return (
        <TouchableOpacity
          style={styles.relatedRow}
          onPress={() => handleProductPress(item)}
          activeOpacity={0.8}>
          <Image source={imageSource} style={styles.relatedCircleImage} />
          <Text style={styles.relatedRowText} numberOfLines={1}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sản phẩm cùng trang trại</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#10B981" />
          ) : (
            <Text style={styles.sectionSubtitle}>
              {products.length} sản phẩm
            </Text>
          )}
        </View>
        {loading ? (
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
            contentContainerStyle={{paddingHorizontal: 16}}
          />
        )}
      </View>
    );
  },
);

const ProductScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {productCode} = route.params || {};
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const fetchProduct = useCallback(async () => {
    if (!productCode) return;
    try {
      setIsLoading(true);
      const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
      const contractRead = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        rpcProvider,
      );
      const productData = await contractRead.getProduct(productCode);

      const images =
        typeof productData[7] === 'string'
          ? productData[7]
              .split(/[,|]/)
              .map(url => url.trim())
              .filter(Boolean)
          : [];

      setProduct({
        farmCode: productData[0],
        productCode: productData[1],
        categoryName: productData[2],
        name: productData[3],
        quantity: productData[4],
        price: productData[5],
        description: productData[6],
        image: images,
      });
    } catch (err) {
      console.error('Error fetch product:', err);
    } finally {
      setIsLoading(false);
    }
  }, [productCode]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  // Reset về ảnh đầu tiên khi product thay đổi
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [productCode, product]);

  const renderImageGallery = useMemo(() => {
    if (!product?.image || product.image.length === 0) {
      return (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>📷 Không có hình ảnh</Text>
        </View>
      );
    }

    return (
      <View style={styles.galleryContainer}>
        <Image
          source={{uri: product.image[selectedImageIndex]}}
          style={styles.mainImage}
          resizeMode="cover"
        />
        <View style={styles.imageCounter}>
          <Text style={styles.imageCounterText}>
            {selectedImageIndex + 1}/{product.image.length}
          </Text>
        </View>

        {product.image.length > 1 && (
          <FlatList
            data={product.image}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[
                  styles.thumbnail,
                  selectedImageIndex === index && styles.selectedThumbnail,
                ]}
                onPress={() => setSelectedImageIndex(index)}
                activeOpacity={0.8}>
                <Image
                  source={{uri: item}}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.thumbnailContainer}
            ItemSeparatorComponent={() => <View style={{width: 8}} />}
          />
        )}
      </View>
    );
  }, [product?.image, selectedImageIndex]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#10B981" />
        <Text style={styles.loadingMainText}>
          Đang tải chi tiết sản phẩm...
        </Text>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>⚠️ Không tìm thấy sản phẩm</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {renderImageGallery}

        <View style={styles.productInfo}>
          <View style={styles.productHeader}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryText}>{product.categoryName}</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{product.price}/kg</Text>
            <Text
              style={[
                styles.stockText,
                {color: product.quantity > 0 ? '#10B981' : '#EF4444'},
              ]}>
              {product.quantity > 0 ? `Còn ${product.quantity} kg` : 'Hết hàng'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <RelatedProducts
          farmCode={product.farmCode}
          currentPuroductCode={product.productCode}
          navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Related Products (ảnh tròn + tên)
  relatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 8,
    borderColor: '#d1d2d6ff',
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  relatedCircleImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e1e2e4ff',
    marginRight: 8,
  },
  relatedRowText: {
    paddingHorizontal: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    maxWidth: 100,
  },

  // Container
  container: {flex: 1, backgroundColor: '#fff'},
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollView: {flex: 1},

  // Gallery
  galleryContainer: {backgroundColor: '#fff'},
  mainImage: {width, height: 320, backgroundColor: '#F9FAFB'},
  imageCounter: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageCounterText: {color: '#fff', fontSize: 12, fontWeight: '500'},
  thumbnailContainer: {paddingHorizontal: 16, paddingVertical: 16},
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {borderColor: '#10B981'},
  thumbnailImage: {width: '100%', height: '100%'},

  // Placeholder
  placeholderContainer: {
    width,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  placeholderText: {fontSize: 16, color: '#6B7280'},

  // Product Info
  productInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  categoryPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  categoryText: {fontSize: 12, fontWeight: '600', color: '#10B981'},
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  price: {fontSize: 26, fontWeight: 'bold', color: '#DC2626'},
  stockText: {fontSize: 14, fontWeight: '600'},

  // Section
  section: {backgroundColor: '#fff', marginTop: 8, padding: 16},
  sectionContainer: {
    backgroundColor: '#fff',
    marginTop: 8,
    paddingVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {fontSize: 18, fontWeight: '600', color: '#111827'},
  sectionSubtitle: {fontSize: 14, color: '#6B7280'},
  description: {fontSize: 16, lineHeight: 22, color: '#4B5563', marginTop: 8},

  // Loading / Empty
  loadingText: {textAlign: 'center', color: '#6B7280'},
  loadingMainText: {marginTop: 16, fontSize: 16, color: '#6B7280'},
  emptyText: {textAlign: 'center', color: '#9CA3AF', fontSize: 14},

  // Error
  errorText: {fontSize: 16, color: '#6B7280', marginBottom: 16},
  primaryButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {color: '#fff', fontSize: 16, fontWeight: '600'},
});

export default ProductScreen;
