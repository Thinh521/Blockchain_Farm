import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import NewsCard from './NewsCard';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width - 45;
const SPACING = 16;

const NewsSlider = ({
  news,
  expandedId,
  onToggleExpand,
  onOpenImageViewer,
  onDelete,
}) => {
  return (
    <FlatList
      data={news}
      keyExtractor={item => item._id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({item, index}) => (
        <View
          style={[
            styles.cardWrapper,
            index === news.length - 1 && {marginRight: 0},
          ]}>
          <NewsCard
            item={item}
            isExpanded={expandedId === item._id}
            onToggleExpand={onToggleExpand}
            onOpenImageViewer={onOpenImageViewer}
            onDelete={onDelete}
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

export default NewsSlider;

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    marginRight: SPACING,
  },
});
