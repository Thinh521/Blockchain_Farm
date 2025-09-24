import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {
  Flower_Line_Icon,
  Leaf_Line_Icon,
  NotificationIcon,
  Search_Line_Icon,
  Sun_Line_Icon,
  User_Line_Icon,
  UserIcon,
} from '../../assets/icons';
import Carousel from './components/Carousel';
import styles from './Home.styles';
import Features from './components/Features';
import Footer from './components/Footer';
import Categories from './components/Categories';
import FarmList from '../../components/Farms/FarmList';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import FarmCardSkeleton from '../../components/CustomSkeleton/FarmCardSkeleton';
import {useFarms} from '../../hooks/useFarms';
import {getWishlistFarms} from '../../api/wishlist/wishlistApi';
import {useUser} from '../../hooks/useUser';
import FastImage from 'react-native-fast-image';
import Images from '../../assets/images/images';
import {API_URL} from '@env';
import { useWishlist } from '../../hooks/useWishlist';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { favorites, fetchWishlist } = useWishlist();

  const {farms, isLoading, error, refetch} = useFarms();
  const {data: user} = useUser();

  const {farms, isLoading, error, refetch} = useFarms();
  const {data: user} = useUser();

  const categories = [
    {id: 'all', name: 'Tất cả', icon: Leaf_Line_Icon},
    {id: 'vegetable', name: 'Rau củ', icon: Flower_Line_Icon},
    {id: 'fruit', name: 'Trái cây', icon: Sun_Line_Icon},
    {id: 'livestock', name: 'Chăn nuôi', icon: User_Line_Icon},
  ];

  const fetchWishlist = useCallback(async () => {
    try {
      const res = await getWishlistFarms();
      const wishlistFarmsApi = res?.wishlist?.farms || [];
      setFavorites(new Set(wishlistFarmsApi.map(f => f.farmCode)));
    } catch (err) {
      console.log('Lỗi fetch wishlist:', err);
      setFavorites(new Set());
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  useFocusEffect(
    useCallback(() => {
      fetchWishlist();
    }, [fetchWishlist]),
  );

  const filteredFarms = farms.filter(
    farm =>
      farm.nameFarm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.welcomeSection}>
            <View style={styles.welcomeTop}>
              <View style={styles.titleContainer}>
                <View>
                  <Text style={styles.welcomeText}>Chào mừng đến với</Text>
                  <Text style={styles.appTitle}>Nông Nghiệp Xanh</Text>
                </View>
              </View>

              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.notificationButton}>
                  <View style={styles.notificationDot} />
                  <NotificationIcon style={{color: '#fff', width: 18}} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.profileButton}
                  activeOpacity={user ? 0.7 : 1}
                  onPress={() => {
                    if (user) {
                      navigation.navigate('BottomTab', {screen: 'Setting'});
                    }
                  }}>
                  {user ? (
                    <FastImage
                      source={
                        user?.avatar
                          ? {uri: `${API_URL}/api/images/${user.avatar}`}
                          : Images.avatar
                      }
                      style={{width: 32, height: 32, borderRadius: 16}}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  ) : (
                    <UserIcon style={{color: '#fff', width: 18}} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <Search_Line_Icon style={{color: '#9CA3AF', width: 20}} />
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm trang trại, sản phẩm..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </View>
      </View>

      <FlatList
        data={[1]}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        renderItem={() => (
          <>
            {/* Carousel Section */}
            <View style={styles.carouselSection}>
              <Text style={[styles.sectionTitle, {paddingHorizontal: 20}]}>
                Trang trại nổi bật
              </Text>
              <View style={{alignItems: 'center'}}>
                <Carousel />
              </View>
            </View>

            {/* Categories */}
            <Categories
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Farms */}
            <View style={styles.mainContent}>
              <View style={styles.resultsHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Trang Trại Nổi Bật</Text>
                  <Text style={styles.resultsCount}>
                    Tìm thấy {filteredFarms.length} trang trại phù hợp
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.seeAllButton}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('NoBottomTab', {
                      screen: 'AllFarms',
                      params: {
                        farms: filteredFarms,
                        favorites,
                        isLoading: isLoading,
                      },
                    })
                  }>
                  <Text style={styles.seeAllText}>Xem tất cả</Text>
                </TouchableOpacity>
              </View>

              {isLoading ? (
                <FarmCardSkeleton count={4} />
              ) : error ? (
                <View style={styles.errorContainer}>
                  <Text style={{color: 'red'}}>Không thể tải trang trại</Text>
                  <TouchableOpacity
                    onPress={refetch}
                    style={styles.retryButton}>
                    <Text style={styles.retryText}>Thử lại</Text>
                  </TouchableOpacity>
                </View>
              ) : filteredFarms.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyTitle}>
                    Không tìm thấy trang trại nào
                  </Text>
                  <Text style={styles.emptySubtitle}>
                    Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác để
                    khám phá thêm nhiều trang trại
                  </Text>
                </View>
              ) : (
                <FarmList
                  farms={filteredFarms.slice(4, 10)}
                  favorites={favorites}
                  isLoading={isLoading}
                />
              )}
            </View>

            {/* Features + Footer */}
            <Features />
            <Footer />
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
