import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {scale} from '../../utils/scaling';
import FarmList from '../../components/Farms/FarmList';
import {getWishlistFarms} from '../../api/wishlist/wishlistApi';

import {ethers} from 'ethers';
import {CONTRACT_ADDRESS} from '@env';
import contractArtifact from '../SmartConctract/contractABI.json';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';

const AllWishlistFarmsScreen = () => {
  const {isConnected} = useAppKitAccount();

  const [farms, setFarms] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const fetchFarms = useCallback(async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      const rpcProvider = new ethers.JsonRpcProvider(
        'https://rpc.zeroscan.org',
      );
      const contractRead = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        rpcProvider,
      );

      // lấy all farms từ blockchain
      const allFarms = await contractRead.getAllFarms();
      console.log('All farms từ blockchain:', allFarms);

      const formattedFarms = allFarms.map(farm => ({
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
      }));

      // gọi wishlist
      const wishlistRes = await getWishlistFarms();
      const wishlistFarms = wishlistRes?.wishlist?.farms || [];
      const wishlistCodes = new Set(wishlistFarms.map(f => f.farmCode));
      console.log('Wishlist từ API:', wishlistFarms);
      console.log(
        'FarmCode blockchain:',
        formattedFarms.map(f => f.farmCode),
      );
      console.log('Matched:', matchedFarms);

      // lọc farm có trong wishlist
      const matchedFarms = formattedFarms.filter(f =>
        wishlistCodes.has(f.farmCode),
      );

      setFarms(matchedFarms);
      setFavorites(new Set(matchedFarms.map(f => f.farmCode)));
    } catch (err) {
      console.log('Lỗi lấy farms:', err);
    } finally {
      setLoading(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      fetchFarms();
    }
  }, [isConnected, fetchFarms]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : farms.length > 0 ? (
        <View style={{padding: scale(16), flex: 1, width: '100%'}}>
          <FarmList farms={farms} favorites={favorites} />
        </View>
      ) : (
        <Text style={styles.emptyText}>Chưa có farm nào trong wishlist</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default AllWishlistFarmsScreen;
