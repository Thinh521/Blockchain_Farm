import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Animated,
  Linking,
} from 'react-native';
import {useRoute} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from '../../components/CustomButton/CustomButton';
import FarmSlider from '../../components/Farms/FarmSlider';
import FarmCardSkeleton from '../../components/CustomSkeleton/FarmCardSkeleton';
import ImageCarousel from './components/ImageCarousel';
import Tabs from './components/Tabs';
import BottomActionBar from './components/BottomActionBar';
import NewsSlider from '../../components/News/NewsSlider';
import ImageViewerModal from '../../components/ImageViewerModal/ImageViewerModal';
import NewsCardSkeleton from '../../components/CustomSkeleton/NewsCardSkeleton';
import ProductCardSkeleton from '../../components/CustomSkeleton/ProductCardSkeleton';
import ProductSlider from '../../components/Product/ProductSlider';
import EmptyState from '../../components/EmptyState/EmptyState';
import {Arrow_Left_Line_Icon} from '../../assets/icons';

import {useWishlist} from '../../hooks/useWishlist';
import {useFarms} from '../../hooks/useFarms';
import {useNews} from '../../hooks/useNews';
import {useFarmProducts} from '../../hooks/useFarmProducts';

import {scale} from '../../utils/scaling';
import styles from './FarmDetail.styles';
import {showMessage} from 'react-native-flash-message';
import {getUser} from '../../utils/storage/authStorage';

const FarmDetailScreen = ({navigation}) => {
  const {farm, isFavorite: initialFavorite} = useRoute().params;
  const [favorite, setFavorite] = useState(initialFavorite);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {favorites, fetchWishlist, toggleFavorite} = useWishlist();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [farmImageViewerVisible, setFarmImageViewerVisible] = useState(false);
  const [farmImageIndex, setFarmImageIndex] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;

  const user = getUser();
  const isLoggedIn = !!user;

  const {
    farms,
    isLoading: isLoadingFarms,
    error: errorFarms,
    refetch: refetchFarms,
  } = useFarms();

  const farmCode = farm?.farmCode;
  const farmUserId = farm?.userId;

  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error: productError,
    refetch: refetchProducts,
  } = useFarmProducts(farmCode);

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
    fetchWishlist();
  }, [fetchWishlist]);

  const handleToggleFavorite = async farmCode => {
    if (loading) return;
    setLoading(true);

    try {
      await toggleFavorite(farmCode);
      setFavorite(prev => !prev);
    } catch (err) {
      console.log('Lỗi toggle favorite:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = useCallback(
    products => {
      navigation.navigate('Product', {
        productCode: products.productCode,
        farmCode: farmCode,
        userId: farmUserId,
      });
    },
    [navigation, farmCode, farmUserId],
  );

  const handleCall = () => {
    Linking.openURL(`tel:${farm?.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${farm?.email}`);
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
      value: farm?.location || 'Đà Lạt, Lâm Đồng',
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
            <Text style={styles.infoValue}>{farm?.established || '2015'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.infoLabel}>Giờ mở cửa</Text>
            <Text style={styles.infoValue}>
              {farm?.openHours || '6:00 - 18:00 (Thứ 2 - Chủ nhật)'}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="cash-outline" size={16} color="#6B7280" />
            <Text style={styles.infoLabel}>Phí tham quan</Text>
            <Text style={styles.infoValue}>
              {farm?.visitPrice || '50,000 VNĐ/người'}
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
          {farm?.certifications?.length > 0 ? (
            farm.certifications.map((cert, index) => (
              <View key={index} style={styles.certificationBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.certificationText}>{cert}</Text>
              </View>
            ))
          ) : (
            <View style={styles.certificationBadge}>
              <Ionicons name="close-circle" size={16} color="#EF4444" />
              <Text style={styles.certificationText}>Chưa có chứng nhận</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  const renderProductsTab = () => (
    <View style={[styles.tabContent, {marginBottom: scale(20)}]}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scale(16),
          }}>
          <Ionicons name="basket" size={20} color="#059669" />
          <Text style={styles.cardTitle}>Nông sản nổi bật</Text>
        </View>

        <View>
          {isLoadingProducts ? (
            <ProductCardSkeleton count={2} />
          ) : productError ? (
            <EmptyState
              message={'Có lỗi khi tải nông sản'}
              fullScreen
              style={{minHeight: scale(150)}}
              showRetry
              onRetry={refetchProducts}
            />
          ) : products.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Chưa có nông sản nào</Text>
            </View>
          ) : (
            <ProductSlider products={products} onPress={handleProductPress} />
          )}
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
        <TouchableOpacity
          style={styles.headerHeart}
          onPress={() => {
            if (isLoggedIn) {
              // 👉 Nếu đã đăng nhập thì chuyển trang yêu thích
              navigation.navigate('WishlistScreen');
            } else {
              // 👉 Nếu chưa đăng nhập thì hiện cảnh báo
              showMessage({
                message: 'Bạn cần đăng nhập để sử dụng chức năng này',
                type: 'warning',
              });
            }
          }}>
          <Ionicons name="heart-outline" size={20} color="#FFFFFF" />
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
                <Text style={styles.description}>
                  {farm.description || 'Không có thông tin'}
                </Text>
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
                  <Text style={styles.sectionTitle}>Nông Trại Nổi Bật</Text>
                  <Text style={styles.resultsCount}>
                    Tìm thấy {farms.length} nông trại phù hợp
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

              {isLoadingFarms ? (
                <FarmCardSkeleton count={2} />
              ) : errorFarms ? (
                <EmptyState
                  message={'Có lỗi khi tải nông trại'}
                  fullScreen
                  style={{minHeight: scale(150)}}
                  showRetry
                  onRetry={refetchFarms}
                />
              ) : farms.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyTitle}>
                    Không tìm thấy nông trại nào
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
