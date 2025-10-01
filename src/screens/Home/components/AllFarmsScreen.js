import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';

import Header from '../../../components/Header/Header';
import FarmList from '../../../components/Farms/FarmList';
import FarmCardSkeleton from '../../../components/CustomSkeleton/FarmCardSkeleton';

import {useWishlist} from '../../../hooks/useWishlist';

import {Colors} from '../../../theme/theme';

const AllFarmsScreen = ({route}) => {
  const {farms, isLoading} = route.params;
  const {favorites, fetchWishlist} = useWishlist();

  useFocusEffect(
    useCallback(() => {
      fetchWishlist();
    }, [fetchWishlist]),
  );

  return (
    <View style={styles.container}>
      <Header
        title="Nông trại của tôi"
        subtitle="Tất cả nông trại trên toàn đất nước"
        emoji="🏡"
        showBack={true}
      />

      {isLoading ? (
        <FarmCardSkeleton count={4} />
      ) : (
        <View>
          <FarmList farms={farms} favorites={favorites} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default AllFarmsScreen;
