import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import {CONTRACT_ADDRESS} from '@env';
import {ethers} from 'ethers';

import contractArtifact from '../SmartConctract/contractABI.json';
import FarmCardSkeleton from '../../components/CustomSkeleton/FarmCardSkeleton';
import FarmList from '../../components/Farms/FarmList';
import Header from '../../components/Header/Header';

import {getUser} from '../../utils/storage/authStorage';
import {useWishlist} from '../../hooks/useWishlist';

import {scale} from '../../utils/scaling';
import styles from './MyFarm.styles';
import {useQuery} from '@tanstack/react-query';

const fetchFarmsByUser = async ({queryKey}) => {
  const [, userId] = queryKey;
  

  if (!userId) throw new Error('Missing userId');

  const rpcProvider = new ethers.JsonRpcProvider('https://rpc.zeroscan.org');
  const contractRead = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    rpcProvider,
  );

  const farmsData = await contractRead.getFarmsByUser(userId);

  return farmsData.map((farm, idx) => ({
    farmCode: farm.farmCode || farm[0],
    fullname: farm.fullname || farm[1],
    nameFarm: farm.nameFarm || farm[2],
    userId: farm.userId || farm[3],
    email: farm.email || farm[4],
    phone: farm.phone || farm[5],
    description: farm.description || farm[6],
    location: farm.location || farm[7],
    area: farm.area?.toString?.() || farm[8]?.toString?.() || '',
    image: Array.isArray(farm.images || farm[9]) ? farm.images || farm[9] : [],
  }));
};

const MyFarmScreen = () => {
  const navigation = useNavigation();
  const {isConnected} = useAppKitAccount();
  const {favorites, fetchWishlist} = useWishlist();

  const userId = getUser()?.userId;

  const {
    data: farms = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['farmsByUser', userId],
    queryFn: fetchFarmsByUser,
    enabled: isConnected && !!userId,
  });

  React.useEffect(() => {
    if (isConnected) {
      fetchWishlist();
    }
  }, [isConnected, fetchWishlist]);

  return (
    <View style={styles.contaiber}>
      <Header
        title="Nông trại của tôi"
        subtitle="Quản lý & cập nhật các nông trại của bạn"
        emoji="🏡"
        showBack={true}
      />

      <FlatList
        data={[1]}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80, padding: scale(20)}}
        renderItem={() => (
          <>
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
                      isLoading: isLoading,
                    },
                  })
                }>
                <Text style={styles.seeAllText}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <FarmCardSkeleton count={4} />
            ) : isError ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>Lỗi tải dữ liệu</Text>
                <TouchableOpacity onPress={refetch}>
                  <Text style={styles.seeAllText}>Thử lại</Text>
                </TouchableOpacity>
              </View>
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
              <FarmList
                farms={farms}
                favorites={favorites}
                isLoading={isLoading}
                isUserFarm={true}
                onPressFarm={farm =>
                  navigation.navigate('FarmDetail', {
                    farm,
                    isFavorite: favorites.has(farm.farmCode),
                  })
                }
              />
            )}
          </>
        )}
      />
    </View>
  );
};

export default MyFarmScreen;
