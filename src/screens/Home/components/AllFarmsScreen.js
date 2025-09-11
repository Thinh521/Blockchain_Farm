import React from 'react';
import {StyleSheet, View} from 'react-native';
import FarmList from '../../../components/Farms/FarmList';
import FarmCardSkeleton from '../../../components/CustomSkeleton/FarmCardSkeleton';
import {scale} from '../../../utils/scaling';

const AllFarmsScreen = ({route}) => {
  const {farms, favorites, toggleFavorite, isLoading} = route.params;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <FarmCardSkeleton count={4} />
      ) : (
        <View style={{padding: scale(16)}}>
          <FarmList
            farms={farms}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
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
