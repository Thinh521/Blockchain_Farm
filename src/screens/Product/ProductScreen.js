import React, {useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  Animated,
  StatusBar,
} from 'react-native';
import {ethers} from 'ethers';
import {useQuery} from '@tanstack/react-query';
import {CONTRACT_ADDRESS, RPC_URL} from '@env';
import {useRoute, useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import contractArtifact from '../SmartConctract/contractABI.json';
import TraceabilitySection from './components/TraceabilitySection';
import {Arrow_Left_Line_Icon, QrTabIcon} from '../../assets/icons';
import RelatedProducts from './components/RelatedProducts';
import ProductSkeleton from '../../components/CustomSkeleton/ProductSkeleton';
import Button from '../../components/CustomButton/CustomButton';
import {formatCurrency} from '../../utils/formatCurrency';
import api from '../../api/baseApi';
import {Colors} from '../../theme/theme';
import {scale} from '../../utils/scaling';
import styles from './ProductScreen.style';


const ProductScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {productCode, farmCode, userId} = route.params || {};
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showQRModal, setShowQRModal] = useState(false);
  const [hashes, setHashes] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  // 🔹 fetch product detail
  const fetchProduct = async () => {
    if (!productCode) return null;
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

    return {
      farmCode: productData[0],
      productCode: productData[1],
      categoryName: productData[2],
      name: productData[3],
      quantity: productData[4],
      price: productData[5],
      description: productData[6],
      image: images,
    };
  };

  const {
    data: product,
    isLoading: isLoadingProduct,
    isError,
  } = useQuery({
    queryKey: ['product', productCode],
    queryFn: fetchProduct,
    enabled: !!productCode,
  })

  // 🔹 fetch hashes riêng (API)
  React.useEffect(() => {
    const fetchHashes = async () => {
      try {
        const hashResponse = await api.get(`/api/process/${productCode}`);
        const hashData = hashResponse.data?.process?.steps || [];
        const hashesOnly = hashData.slice(0, 5).map(step => ({
          name: step.stepName,
          hash: step.txHash,
        }));
        setHashes(hashesOnly);
      } catch (err) {
        console.log('Lỗi fetch hashes:', err);
      }
    };
    if (productCode) fetchHashes();
  }, [productCode]);

  // 🔹 QR value
  const qrValue = useMemo(() => {
    if (!product) return '';
    return JSON.stringify({
      productCode: product.productCode,
      hashes: hashes || [],
    });
  }, [product, hashes]);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  if (isLoadingProduct) {
    return (
      <SafeAreaView style={styles.container}>
        <ProductSkeleton />
      </SafeAreaView>
    );
  }

  if (isError || !product) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>Không tìm thấy sản phẩm</Text>
        <Button.Main title="Quay lại" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.green} />

      {/* Header */}
      <Animated.View style={[styles.header, {opacity: headerOpacity}]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Arrow_Left_Line_Icon style={{color: '#fff'}} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {product.name}
        </Text>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}>
        {/* Gallery */}
        <View style={styles.galleryContainer}>
          <FastImage
            source={{
              uri:
                product?.image?.[selectedImageIndex] ||
                'https://via.placeholder.com/300',
            }}
            style={styles.mainImage}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>
              {selectedImageIndex + 1}/{product?.image?.length}
            </Text>
          </View>

          {product?.image?.length > 1 && (
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
                  <FastImage
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

        {/* Info */}
        <View style={styles.productInfo}>
          <View style={styles.productHeader}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', flex: 10}}>
              <Text
                style={styles.productTitle}
                numberOfLines={1}
                ellipsizeMode="tail">
                {product.name}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.qrBadge}
              onPress={() => setShowQRModal(true)}>
              <QrTabIcon style={{width: scale(24)}} />
            </TouchableOpacity>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            <Text
              style={[
                styles.stockText,
                {color: product.quantity > 0 ? '#10B981' : '#EF4444'},
              ]}>
              {product.quantity > 0
                ? `Số lượng: ${product.quantity} kg`
                : 'Hết hàng'}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Traceability */}
        <TraceabilitySection
          productCode={product.productCode}
          farmCode={farmCode}
          userId={userId} 
        />

        {/* Related */}
        <RelatedProducts
          farmCode={product.farmCode}
          currentProductCode={product.productCode}
          navigation={navigation}
        />

        {/* Modal QR */}
        <Modal
          visible={showQRModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowQRModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Icon + tên sản phẩm */}
              <View style={styles.modalHeader2}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FastImage
                    source={{uri: product.image[0]}}
                    style={styles.modalImages}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Text style={styles.productName}>Mận</Text>
                </View>
                <TouchableOpacity
                  style={styles.closeWrapper}
                  onPress={() => setShowQRModal(false)}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* QR Code */}
              <QRCode
                value={qrValue}
                size={180}
                backgroundColor="#ffffff"
                color="#000000"
              />

              {/* Nút hành động */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => Clipboard.setString(qrValue)}>
                  <Text style={styles.actionText}>Sao chép</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  // onPress={handleDownloadQR}
                >
                  <Text style={styles.actionText}>Tải xuống</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default ProductScreen;
