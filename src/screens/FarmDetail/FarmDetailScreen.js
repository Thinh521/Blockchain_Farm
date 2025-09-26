import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Animated,
  Modal,
  Linking,
  FlatList,
} from 'react-native';
import styles from './FarmDetail.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Arrow_Left_Line_Icon} from '../../assets/icons';
import {useRoute} from '@react-navigation/core';
import Button from '../../components/CustomButton/CustomButton';
import FastImage from 'react-native-fast-image';
import FarmSlider from '../../components/Farms/FarmSlider';
import FarmCardSkeleton from '../../components/CustomSkeleton/FarmCardSkeleton';
import ImageCarousel from './components/ImageCarousel';
import Tabs from './components/Tabs';
import BottomActionBar from './components/BottomActionBar';
import {useFarms} from '../../hooks/useFarms';
import {CONTRACT_ADDRESS} from '@env';
import contractArtifact from '../SmartConctract/contractABI.json';
import {ethers} from 'ethers';
import NewsSlider from '../../components/News/NewsSlider';
import {useNews} from '../../hooks/useNews';
import {scale} from '../../utils/scaling';
import NewsCardSkeleton from '../../components/CustomSkeleton/NewsCardSkeleton';
import ImageViewerModal from '../../components/ImageViewerModal/ImageViewerModal';
import {getProductsByFarm} from '../../api/productApi';
import {useWishlist} from '../../hooks/useWishlist';

const farmData = {
  farmCode: 'F001',
  fullname: 'Nguyễn Văn An',
  nameFarm: 'Trang trại rau sạch An Phước',
  userId: 'user001',
  email: 'anvn@email.com',
  phone: '0123456789',
  description:
    'Chuyên trồng rau xanh organic, không sử dụng thuốc trừ sâu, cam kết chất lượng tốt nhất cho sức khỏe. Trang trại được thành lập từ năm 2015 với diện tích 5.2 hecta, áp dụng công nghệ hiện đại trong canh tác và tuân thủ nghiêm ngặt các tiêu chuẩn organic quốc tế.',
  location: 'Đà Lạt, Lâm Đồng',
  area: '5.2',
  images: [
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
  ],
  rating: 4.8,
  reviews: 156,
  established: '2015',
  certifications: ['VietGAP', 'Organic', 'ISO 22000'],
  products: [
    {
      name: 'Rau cải xanh',
      price: '25,000',
      unit: 'kg',
      image:
        'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300',
    },
    {
      name: 'Rau muống',
      price: '15,000',
      unit: 'kg',
      image:
        'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300',
    },
    {
      name: 'Cà chua cherry',
      price: '45,000',
      unit: 'kg',
      image:
        'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=300',
    },
    {
      name: 'Rau xà lách',
      price: '30,000',
      unit: 'kg',
      image:
        'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300',
    },
  ],
  facilities: [
    {
      icon: 'water-outline',
      name: 'Hệ thống tưới nhỏ giọt',
      description: 'Tiết kiệm nước 40%',
    },
    {
      icon: 'leaf-outline',
      name: 'Nhà kính hiện đại',
      description: 'Kiểm soát môi trường tốt nhất',
    },
    {
      icon: 'shield-checkmark-outline',
      name: 'Chứng nhận Organic',
      description: 'Đạt chuẩn quốc tế',
    },
    {
      icon: 'analytics-outline',
      name: 'IoT Monitoring',
      description: 'Giám sát 24/7',
    },
  ],
  openHours: '6:00 - 18:00 (Thứ 2 - Chủ nhật)',
  visitPrice: '50,000 VNĐ/người',
};

const FarmDetailScreen = ({navigation}) => {
  const {farm, isFavorite: initialFavorite} = useRoute().params;
  const [favorite, setFavorite] = useState(initialFavorite);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const {favorites, fetchWishlist, toggleFavorite} = useWishlist();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [farmImageViewerVisible, setFarmImageViewerVisible] = useState(false);
  const [farmImageIndex, setFarmImageIndex] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;

  const {farms, isLoading: farmsLoading, error, refetch} = useFarms();

  const farmCode = farm?.farmCode;

  const {
    news,
    isLoading,
    expandedId,
    selectedImageIndex,
    selectedImages,
    handleDelete,
    closeImageViewer,
    openImageViewer,
    toggleExpand,
  } = useNews({farmCode});

  useEffect(() => {
    let isMounted = true;
    fetchWishlist();

    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        // 🔹 1. Lấy từ API backend
        const apiProducts = await getProductsByFarm(farm.farmCode);

        // 🔹 2. Lấy từ smart contract
        const rpcProvider = new ethers.JsonRpcProvider(
          'https://rpc.zeroscan.org',
        );
        const contractRead = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractArtifact.abi,
          rpcProvider,
        );

        const scProducts = await contractRead.getProductByFarmCode(
          farm.farmCode,
        );

        const formattedSC = scProducts.map(product => {
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

        // 🔹 3. So khớp: chỉ giữ những product tồn tại ở cả API & SC
        const matchedProducts = formattedSC.filter(scProd =>
          apiProducts.some(
            apiProd => apiProd.productCode === scProd.productCode,
          ),
        );

        if (isMounted) setProducts(matchedProducts);
      } catch (err) {
        console.error(' Error fetchProducts:', err);
      } finally {
        if (isMounted) setLoadingProducts(false);
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [farm.farmCode, fetchWishlist]);

  const handleToggleFavorite = async farmCode => {
    if (loading) return;
    setLoading(true);

    try {
      await toggleFavorite(farmCode);
      setFavorite(prev => !prev); // vẫn giữ UI local cho farm chính
    } catch (err) {
      console.log('Lỗi toggle favorite:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleCall = () => {
    Linking.openURL(`tel:${farmData.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${farmData.email}`);
  };

  const contactItems = [
    {
      id: 1,
      icon: 'person-circle',
      label: 'Chủ trang trại',
      value: farm.fullname || 'Nguyễn Văn A',
      onPress: null,
    },
    {
      id: 2,
      icon: 'call',
      label: 'Số điện thoại',
      value: farm.phone || '0123456789',
      onPress: handleCall,
      showChevron: true,
    },
    {
      id: 3,
      icon: 'mail',
      label: 'Email',
      value: farm.email,
      onPress: handleEmail,
      showChevron: true,
    },
    {
      id: 4,
      icon: 'location',
      label: 'Địa chỉ',
      value: farmData.location,
      onPress: null,
    },
  ];

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="information-circle" size={24} color="#059669" />
          <Text style={styles.cardTitle}>Thông tin cơ bản</Text>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Ionicons name="resize-outline" size={16} color="#6B7280" />
            <Text style={styles.infoLabel}>Diện tích</Text>
            <Text style={styles.infoValue}>{farm.area || '1000'} hecta</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.infoLabel}>Thành lập</Text>
            <Text style={styles.infoValue}>
              {farmData.established || '2015'}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.infoLabel}>Giờ mở cửa</Text>
            <Text style={styles.infoValue}>
              {farmData.openHours || '6:00 - 18:00 (Thứ 2 - Chủ nhật)'}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="cash-outline" size={16} color="#6B7280" />
            <Text style={styles.infoLabel}>Phí tham quan</Text>
            <Text style={styles.infoValue}>
              {farmData.visitPrice || '50,000 VNĐ/người'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="shield-checkmark" size={24} color="#059669" />
          <Text style={styles.cardTitle}>Chứng nhận</Text>
        </View>

        <View style={styles.certificationsContainer}>
          {farmData.certifications.map((cert, index) => (
            <View key={index} style={styles.certificationBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.certificationText}>{cert}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="construct" size={24} color="#059669" />
          <Text style={styles.cardTitle}>Cơ sở vật chất</Text>
        </View>

        {farmData.facilities.map((facility, index) => (
          <View key={index} style={styles.facilityItem}>
            <View style={styles.facilityIcon}>
              <Ionicons name={facility.icon} size={20} color="#059669" />
            </View>
            <View style={styles.facilityInfo}>
              <Text style={styles.facilityName}>{facility.name}</Text>
              <Text style={styles.facilityDescription}>
                {facility.description}
              </Text>
            </View>
          </View>
        ))}
      </View> */}
    </View>
  );

  const renderProductsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="basket" size={20} color="#059669" />
          <Text style={styles.cardTitle}>Sản phẩm nổi bật</Text>
        </View>

        {loadingProducts ? (
          <Text style={{textAlign: 'center', margin: 10}}>
            Đang tải sản phẩm...
          </Text>
        ) : products.length === 0 ? (
          <Text style={{textAlign: 'center', marginTop: 10}}>
            Chưa có nông sản nào.
          </Text>
        ) : products.length > 4 ? (
          <FlatList
            data={products}
            keyExtractor={(item, index) => String(item.productCode || index)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 8}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[styles.productCard, {width: 160, marginRight: 12}]}
                onPress={() =>
                  navigation.navigate('Product', {
                    productCode: item.productCode,
                  })
                }>
                <FastImage
                  source={{
                    uri:
                      item.image?.[0] ||
                      'https://via.placeholder.com/300x200.png?text=No+Image',
                  }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.productPrice}>{item.price} VNĐ</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          // 🔹 Nếu ≤ 4 thì giữ grid như cũ
          <View style={styles.productsGrid}>
            {products.map((product, index) => (
              <TouchableOpacity
                key={index}
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate('Product', {
                    productCode: product.productCode,
                  })
                }>
                <FastImage
                  source={{
                    uri:
                      product.image?.[0] ||
                      'https://via.placeholder.com/300x200.png?text=No+Image',
                  }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text style={styles.productPrice}>{product.price} VNĐ</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  const renderContactTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="person" size={20} color="#059669" />
          <Text style={styles.cardTitle}>Thông tin liên hệ</Text>
        </View>

        <View style={styles.contactInfo}>
          {contactItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.contactItem}
              onPress={item.onPress}
              activeOpacity={item.onPress ? 0.7 : 1}>
              <View style={styles.facilityIcon}>
                <Ionicons name={item.icon} size={20} color="#059669" />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>{item.label}</Text>
                <Text style={styles.contactValue}>{item.value}</Text>
              </View>
              {item.showChevron && (
                <Ionicons name="chevron-forward" size={18} color="#6B7280" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.mapCard}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={48} color="#6B7280" />
          <Text style={styles.mapText}>Bản đồ vị trí</Text>
          <Button.Main style={styles.mapButton} title="Xem trên Google Maps" />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      <Animated.View style={[styles.header, {opacity: headerOpacity}]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Arrow_Left_Line_Icon style={{color: '#fff'}} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {farm.nameFarm}
        </Text>
        <TouchableOpacity
          style={styles.headerHeart}
          onPress={() => handleToggleFavorite(farm.farmCode)}
          disabled={loading}>
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={20}
            color={favorite ? '#EF4444' : '#FFFFFF'}
          />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.floatingBackButton}
        onPress={() => navigation.goBack()}>
        <Arrow_Left_Line_Icon style={{color: '#fff'}} />
      </TouchableOpacity>

      <View style={[styles.floatingActions]}>
        <TouchableOpacity
          style={[styles.floatingActionButton, {marginTop: 8}]}
          onPress={() => handleToggleFavorite(farm.farmCode)}
          disabled={loading}>
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={20}
            color={favorite ? '#EF4444' : '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>

      <Animated.FlatList
        data={[1]}
        keyExtractor={(_, index) => index.toString()}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        contentContainerStyle={{paddingBottom: scale(40)}}
        renderItem={() => (
          <>
            <ImageCarousel
              farm={farm}
              imageScale={imageScale}
              setCurrentImageIndex={setCurrentImageIndex}
              onOpenImageViewer={index => {
                setFarmImageIndex(index);
                setFarmImageViewerVisible(true);
              }}
              currentImageIndex={currentImageIndex}
            />

            <View style={styles.content}>
              <View style={styles.titleSection}>
                <Text style={styles.farmName}>{farm.nameFarm}</Text>
                <View style={styles.location}>
                  <Ionicons name="location-outline" size={16} color="#EF4444" />
                  <Text style={styles.locationText}>{farm.location}</Text>
                </View>
                <Text style={styles.description}>{farm.description}</Text>
              </View>

              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {activeTab === 'overview' && renderOverviewTab()}
              {activeTab === 'products' && renderProductsTab()}
              {activeTab === 'contact' && renderContactTab()}
            </View>

            <View style={{paddingHorizontal: scale(20)}}>
              <View style={styles.resultsHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Tin tức nông trại</Text>
                  <Text style={styles.resultsCount}>
                    Tìm thấy {news.length} tin tức phù hợp
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.seeAllButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('NoBottomTab', {
                      screen: 'AllNews',
                      params: {farmCode: farmCode},
                    })
                  }>
                  <Text style={styles.seeAllText}>Xem tất cả</Text>
                </TouchableOpacity>
              </View>

              {isLoading ? (
                <NewsCardSkeleton count={1} />
              ) : news.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyTitle}>
                    Không tìm thấy tin tức nào
                  </Text>
                </View>
              ) : (
                <NewsSlider
                  news={news}
                  expandedId={expandedId}
                  onToggleExpand={toggleExpand}
                  onOpenImageViewer={openImageViewer}
                  onDelete={handleDelete}
                />
              )}
            </View>

            <View style={styles.mainContent}>
              <View style={styles.resultsHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Trang Trại Nổi Bật</Text>
                  <Text style={styles.resultsCount}>
                    Tìm thấy {farms.length} trang trại phù hợp
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.seeAllButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('NoBottomTab', {
                      screen: 'AllFarms',
                      params: {
                        farms: farms,
                        favorite,
                        handleToggleFavorite,
                      },
                    })
                  }>
                  <Text style={styles.seeAllText}>Xem tất cả</Text>
                </TouchableOpacity>
              </View>

              {farmsLoading ? (
                <FarmCardSkeleton count={2} />
              ) : farms.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyTitle}>
                    Không tìm thấy trang trại nào
                  </Text>
                </View>
              ) : (
                <>
                  <FarmSlider
                    farms={farms}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                </>
              )}
            </View>
          </>
        )}></Animated.FlatList>

      <BottomActionBar handleCall={handleCall} />

      <ImageViewerModal
        visible={farmImageViewerVisible}
        images={farm.image}
        startIndex={farmImageIndex}
        onClose={() => setFarmImageViewerVisible(false)}
      />

      <ImageViewerModal
        visible={selectedImageIndex !== null}
        images={selectedImages}
        startIndex={selectedImageIndex || 0}
        onClose={closeImageViewer}
      />
    </SafeAreaView>
  );
};

export default FarmDetailScreen;
