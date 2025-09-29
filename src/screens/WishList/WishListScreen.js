import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {CONTRACT_ADDRESS} from '@env';
import {ethers} from 'ethers';

import FarmList from '../../components/Farms/FarmList';
import Header from '../../components/Header/Header';
import contractArtifact from '../SmartConctract/contractABI.json';
import FarmCardSkeleton from '../../components/CustomSkeleton/FarmCardSkeleton';

import {getWishlistFarms} from '../../api/wishlist/wishlistApi';

import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

const WishlistScreen = () => {
  const isFocused = useIsFocused();
  const [wishlistFarms, setWishlistFarms] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);

      // 1. Lấy farms từ blockchain
      const rpcProvider = new ethers.JsonRpcProvider(
        'https://rpc.zeroscan.org',
      );

      const contractRead = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        rpcProvider,
      );
      const allFarms = await contractRead.getAllFarms();

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

      // 2. Lấy wishlist từ API
      const res = await getWishlistFarms();
      const wishlistFarmsApi = res?.wishlist?.farms || [];
      const wishlistCodes = new Set(wishlistFarmsApi.map(f => f.farmCode));

      // 3. Lọc farm nào nằm trong wishlist
      const matchedFarms = formattedFarms.filter(f =>
        wishlistCodes.has(f.farmCode),
      );

      setWishlistFarms(matchedFarms);
      setFavorites(new Set(matchedFarms.map(f => f.farmCode)));
    } catch (err) {
      console.log('Lỗi fetchWishlist:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchWishlist();
    }
  }, [isFocused, fetchWishlist]);

  return (
    <View style={styles.container}>
      <Header
        title="Yêu thích"
        subtitle="Nơi lưu giữ những nông trại bạn quan tâm"
        emoji="❤️"
      />

      <View style={styles.content}>
        {loading ? (
          <View style={{padding: scale(20)}}>
            <FarmCardSkeleton count={4} />
          </View>
        ) : wishlistFarms.length > 0 ? (
          <View style={{flex: 1, width: '100%'}}>
            <FarmList farms={wishlistFarms} favorites={favorites} />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có nông trại yêu thích</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.title,
    fontWeight: FontWeights.bold,
    fontSize: FontSizes.regular,
  },
});

export default WishlistScreen;
