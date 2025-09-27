import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import FarmCard from './FarmCard';
import {scale} from '../../utils/scaling';

const FarmList = ({farms, favorites, toggleFavorite, isUserFarm = false}) => {
  const renderFarm = ({item}) => (
    <FarmCard
      farm={item}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      isUserFarm={isUserFarm}
    />
  );

  return (
    <FlatList
      data={farms}
      renderItem={renderFarm}
      keyExtractor={item => item.farmCode}
      numColumns={2}
      columnWrapperStyle={styles.farmRow}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.farmList}
    />
  );
};

const styles = StyleSheet.create({
  farmList: {
    padding: scale(20),
  },
  farmRow: {
    justifyContent: 'space-between',
  },
});

export default FarmList;
