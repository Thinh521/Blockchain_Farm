import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import FarmList from '../../../components/Farms/FarmList';
import FarmCardSkeleton from '../../../components/CustomSkeleton/FarmCardSkeleton';
import {scale} from '../../../utils/scaling';
import {getWishlistFarms} from '../../../api/wishlist/wishlistApi';

const AllFarmsScreen = ({route}) => {
  const {farms, isLoading} = route.params; 
  const [favorites, setFavorites] = useState(new Set());

  const fetchWishlist = useCallback(async () => {
    try {
      const res = await getWishlistFarms();
      const wishlistFarmsApi = res?.wishlist?.farms || [];
      setFavorites(new Set(wishlistFarmsApi.map(f => f.farmCode)));
    } catch (err) {
      console.log("Lỗi fetch wishlist:", err);
      setFavorites(new Set());
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <FarmCardSkeleton count={4} />
      ) : (
        <View style={{padding: scale(16)}}>
          <FarmList farms={farms} favorites={favorites} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});

export default AllFarmsScreen;
