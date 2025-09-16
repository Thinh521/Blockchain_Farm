import React, {useState, useRef, useCallback, useEffect} from 'react';
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
} from 'react-native';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS} from '@env';
import contractArtifact from '../SmartConctract/contractABI.json';
import styles from './FarmDetail.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Arrow_Left_Line_Icon} from '../../assets/icons';
import {useRoute} from '@react-navigation/core';
import Button from '../../components/CustomButton/CustomButton';
import FastImage from 'react-native-fast-image';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import FarmSlider from '../../components/Farms/FarmSlider';
import FarmCardSkeleton from '../../components/CustomSkeleton/FarmCardSkeleton';
import ImageCarousel from './components/ImageCarousel';
import Tabs from './components/Tabs';
import BottomActionBar from './components/BottomActionBar';
import {useWishlist} from '../../context/WishlistContext';

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
  const {farm} = useRoute().params;
  const {isConnected} = useAppKitAccount();
  const [farms, setFarms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const {favorites, toggleFavorite} = useWishlist();

  const scrollY = useRef(new Animated.Value(0)).current;

  const getAllFarms = useCallback(async () => {
    if (!isConnected) {
      return;
    }
    setIsLoading(true);

    try {
      const rpcProvider = new ethers.JsonRpcProvider(
        'https://rpc.zeroscan.org',
      );

      const contractRead = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        rpcProvider,
      );

      const farmsData = await contractRead.getAllFarms();

      const formattedFarms = farmsData.map((farm, idx) => {
        return {
          farmCode: farm.farmCode || farm[0],
          fullname: farm.fullname || farm[1],
          nameFarm: farm.nameFarm || farm[2],
          userId: farm.userId || farm[3],
          email: farm.email || farm[4],
          phone: farm.phone || farm[5],
          description: farm.description || farm[6],
          location: farm.location || farm[7],
          area: farm.area?.toString?.() || farm[8]?.toString?.() || '',
          image: Array.isArray(farm.images || farm[9])
            ? farm.images || farm[9]
            : [],
        };
      });

      setFarms(formattedFarms);
    } catch (error) {
      console.log('Lỗi getAllFarms:', error);
      setFarms([]);
    } finally {
      setIsLoading(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      getAllFarms();
    }
  }, [isConnected, getAllFarms]);

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
            <Text style={styles.infoValue}>{farm.area} hecta</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.infoLabel}>Thành lập</Text>
            <Text style={styles.infoValue}>{farmData.established}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.infoLabel}>Giờ mở cửa</Text>
            <Text style={styles.infoValue}>{farmData.openHours}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="cash-outline" size={16} color="#6B7280" />
            <Text style={styles.infoLabel}>Phí tham quan</Text>
            <Text style={styles.infoValue}>{farmData.visitPrice}</Text>
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

      <View style={styles.infoCard}>
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
      </View>
    </View>
  );

  const renderProductsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="basket" size={20} color="#059669" />
          <Text style={styles.cardTitle}>Sản phẩm nổi bật</Text>
        </View>

        <View style={styles.productsGrid}>
          {farmData.products.map((product, index) => (
            <TouchableOpacity key={index} style={styles.productCard}>
              <FastImage
                source={{uri: product.image}}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>
                  {product.name}
                </Text>
                <Text style={styles.productPrice}>
                  {product.price} VNĐ/{product.unit}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
      </Animated.View>

      <TouchableOpacity
        style={styles.floatingBackButton}
        onPress={() => navigation.goBack()}>
        <Arrow_Left_Line_Icon style={{color: '#fff'}} />
      </TouchableOpacity>

      <View style={[styles.floatingActions, ]}>
        <TouchableOpacity
          style={[styles.floatingActionButton, {marginTop: 8}]}
          onPress={() => toggleFavorite(farm.farmCode)}>
          <Ionicons
            name={favorites.has(farm.farmCode) ? 'heart' : 'heart-outline'}
            size={20}
            color={favorites.has(farm.farmCode) ? '#EF4444' : '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <ImageCarousel
          farm={farm}
          imageScale={imageScale}
          setCurrentImageIndex={setCurrentImageIndex}
          setShowImageModal={setShowImageModal}
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
                    favorites,
                    toggleFavorite,
                  },
                })
              }>
              <Text style={styles.seeAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <FarmCardSkeleton count={2} />
          ) : farms.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                Không tìm thấy trang trại nào
              </Text>
              <Text style={styles.emptySubtitle}>
                Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác để khám
                phá thêm nhiều trang trại
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
      </Animated.ScrollView>

      <BottomActionBar handleCall={handleCall} />

      <Modal
        visible={showImageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImageModal(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setShowImageModal(false)}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.modalImageScroll}>
              {farmData.images.map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image}}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowImageModal(false)}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FarmDetailScreen;
