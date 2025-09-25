import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import FarmList from '../../../components/Farms/FarmList';
import FarmCardSkeleton from '../../../components/CustomSkeleton/FarmCardSkeleton';
import { scale } from '../../../utils/scaling';
import { useWishlist } from '../../../hooks/useWishlist';
import { useFocusEffect } from '@react-navigation/core';

const AllFarmsScreen = ({ route }) => {
  const { farms, isLoading } = route.params; 
  const { favorites, fetchWishlist } = useWishlist();

useFocusEffect(
  useCallback(() => {
    fetchWishlist(); // gọi lại API để đồng bộ
  }, [fetchWishlist])
);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <FarmCardSkeleton count={4} />
      ) : (
        <View style={{ padding: scale(16) }}>
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
