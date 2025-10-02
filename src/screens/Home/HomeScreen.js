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
import {API_URL} from '@env';
import FastImage from 'react-native-fast-image';
import {useFocusEffect, useNavigation} from '@react-navigation/core';

import {
  NotificationIcon,
  Search_Line_Icon,
  Sun_Line_Icon,
  User_Line_Icon,
  UserIcon,
} from '../../assets/icons';
import Images from '../../assets/images/images';
import Carousel from './components/Carousel';
import Features from './components/Features';
import Footer from './components/Footer';
import Categories from './components/Categories';
import FarmList from '../../components/Farms/FarmList';
import FarmCardSkeleton from '../../components/CustomSkeleton/FarmCardSkeleton';
import ErrorState from '../../components/ErrorState/ErrorState';
import {useFarms} from '../../hooks/useFarms';
import {useUser} from '../../hooks/useUser';
import {useWishlist} from '../../hooks/useWishlist';
import useDebouncedSearching from '../../hooks/useDebouncedSearching';
import styles from './Home.styles';
import {scale} from '../../utils/scaling';
import {ethers} from 'ethers';
import {getAllProducts} from '../../api/productApi';
import contractArtifact from '../SmartConctract/contractABI.json';
import {CONTRACT_ADDRESS, RPC_URL} from '@env';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const {favorites, fetchWishlist} = useWishlist();

  const isSearching = useDebouncedSearching(searchQuery, 500);

  const {farms, isLoading, error, refetch} = useFarms();
  const {data: user} = useUser();

  const [allProducts, setAllProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();

        // kết nối smart contract
        const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
        const contractRead = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractArtifact.abi,
          rpcProvider,
        );

        // Lấy dữ liệu chi tiết từ SC cho từng productCode
        const productDetails = await Promise.all(
          products.map(async p => {
            try {
              const productData = await contractRead.getProduct(p.productCode);

              return {
                farmCode: productData[0],
                productCode: productData[1],
                categoryName: productData[2],
                name: productData[3],
                quantity: productData[4],
                price: productData[5],
                description: productData[6],
                images:
                  typeof productData[7] === 'string'
                    ? productData[7].split(/[,|]/).map(url => url.trim())
                    : [],
              };
            } catch (err) {
              console.log(' Lỗi fetch product từ SC:', err);
              return null;
            }
          }),
        );

        // lọc sản phẩm null
        setAllProducts(productDetails.filter(Boolean));
      } catch (err) {
        console.log('❌ Lỗi fetchProducts:', err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const normalizeCategory = name => {
    if (!name) return 'Khác';
    const clean = name.trim().toLowerCase();
    return clean.charAt(0).toUpperCase() + clean.slice(1); // viết hoa chữ đầu
  };

  const categories = Array.from(
    new Set(allProducts.map(p => normalizeCategory(p.categoryName))),
  );

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
                  <Text style={styles.appTitle}>GreenFarm</Text>
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
        contentContainerStyle={{paddingBottom: 100}}
        renderItem={() => (
          <>
            {searchQuery.trim().length === 0 && (
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
                  navigation={navigation}
                  allProducts={allProducts}
                />
              </>
            )}

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
                <ErrorState
                  message="Không thể tải trang trại"
                  onRetry={refetch}
                  style={{minHeight: scale(250)}}
                />
              ) : isSearching ? (
                <FarmCardSkeleton count={2} />
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
                  farms={filteredFarms.slice(0, 6)}
                  favorites={favorites}
                  isLoading={isLoading}
                />
              )}
            </View>

            {searchQuery.trim().length === 0 && (
              <>
                <Features />
                <Footer />
              </>
            )}
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
