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
  NotificationTabIcon,
  Search_Line_Icon,
  Sun_Line_Icon,
  User_Line_Icon,
  UserIcon,
} from '../../assets/icons';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS} from '@env';
import contractArtifact from '../SmartConctract/contractABI.json';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import Carousel from './components/Carousel';
import styles from './Home.styles';
import Features from './components/Features';
import Footer from './components/Footer';
import Categories from './components/Categories';
import FarmList from '../../components/Farms/FarmList';
import {useNavigation} from '@react-navigation/core';
import FarmCardSkeleton from '../../components/CustomSkeleton/FarmCardSkeleton';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {isConnected} = useAppKitAccount();
  const [farms, setFarms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  const categories = [
    {id: 'all', name: 'Tất cả', icon: Leaf_Line_Icon},
    {id: 'vegetable', name: 'Rau củ', icon: Flower_Line_Icon},
    {id: 'fruit', name: 'Trái cây', icon: Sun_Line_Icon},
    {id: 'livestock', name: 'Chăn nuôi', icon: User_Line_Icon},
  ];

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

  const filteredFarms = farms.filter(
    farm =>
      farm.nameFarm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleFavorite = farmCode => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(farmCode)) {
      newFavorites.delete(farmCode);
    } else {
      newFavorites.add(farmCode);
    }
    setFavorites(newFavorites);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

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
                  <NotificationTabIcon style={{color: '#fff', width: 18}} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButton}>
                  <UserIcon style={{color: '#fff', width: 18}} />
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

            {/* Enhanced Categories */}
            <Categories
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Main Content */}
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
                        toggleFavorite,
                        isLoading: isLoading
                      },
                    })
                  }>
                  <Text style={styles.seeAllText}>Xem tất cả</Text>
                </TouchableOpacity>
              </View>

              {isLoading ? (
                <FarmCardSkeleton count={6} />
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
                <>
                  <FarmList
                    farms={filteredFarms.slice(0, 6)}
                    favorites={favorites}
                    isLoading={isLoading}
                    toggleFavorite={toggleFavorite}
                  />
                </>
              )}
            </View>

            {/* Features Section */}
            <Features />

            {/* Footer Section */}
            <Footer />
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
