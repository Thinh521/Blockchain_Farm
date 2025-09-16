import React from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {scale} from '../../utils/scaling';
import FarmList from '../../components/Farms/FarmList';
import {useWishlist} from '../../context/WishlistContext';
import FarmCardSkeleton from '../../components/CustomSkeleton/FarmCardSkeleton';

const WishlistScreen = () => {
  const {wishlistFarms, favorites, loading} = useWishlist();

  return (
    <View style={styles.container}>
      {loading ? (
        <FarmCardSkeleton count={4} />
      ) : wishlistFarms.length > 0 ? (
        <View style={{padding: scale(16), flex: 1, width: '100%'}}>
          <FarmList farms={wishlistFarms} favorites={favorites} />
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

export default WishlistScreen;
