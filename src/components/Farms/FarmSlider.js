import React from 'react';
import {FlatList, View, StyleSheet, Dimensions} from 'react-native';
import FarmCard from './FarmCard';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const SPACING = 16;

const FarmSlider = ({farms, favorites, toggleFavorite}) => {
  return (
    <FlatList
      data={farms}
      keyExtractor={item => item.farmCode}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View
          style={[
            styles.cardWrapper,
            index === farms.length - 1 && {marginRight: 0},
          ]}>
          <FarmCard
            farm={item}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </View>
      )}
      snapToInterval={CARD_WIDTH + SPACING}
      snapToAlignment="start"
      decelerationRate="fast"
      disableIntervalMomentum
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    marginRight: SPACING,
  },
});

export default FarmSlider;
