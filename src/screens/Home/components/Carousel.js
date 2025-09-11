import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {Colors} from '../../../theme/theme';
import FastImage from 'react-native-fast-image';
import {isTablet, scale} from '../../../utils/scaling';
import Images from '../../../assets/images/images';

const discountBanners = [
  {
    id: '1',
    image: Images.slider_1,
    title: '50-40% OFF',
    subtitle1: 'Now in (product)',
    subtitle2: 'All colours',
  },
  {
    id: '2',
    image: Images.slider_2,
    title: '30% OFF',
    subtitle1: 'Exclusive',
    subtitle2: 'New arrivals',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {width: windowWidth} = useWindowDimensions();
  const width = Math.round(windowWidth - 32);
  const bannerHeight = useMemo(
    () => (isTablet ? (width * 5) / 16 : (width * 9) / 16),
    [],
  );
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);

  // Memoize onViewableItemsChanged
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }, []);

  // Start auto-scroll
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (flatListRef.current && discountBanners.length > 0) {
        const nextIndex = (currentIndex + 1) % discountBanners.length;
        flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
      }
    }, 3000);
  }, [currentIndex]);

  // Stop auto-scroll
  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Handle dot press
  const handleDotPress = index => {
    stopAutoScroll();
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({index, animated: true});
    setTimeout(startAutoScroll, 3000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [startAutoScroll]);

  return (
    <View style={[{width}]}>
      <FlatList
        ref={flatListRef}
        data={discountBanners}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
        renderItem={({item}) => (
          <View style={[styles.discountBanner, {width}]}>
            <FastImage
              source={item.image}
              style={[styles.bannerImage, {width, height: bannerHeight}]}
              resizeMode="contain"
            />
          </View>
        )}
      />
      <View style={[styles.dotsContainer]}>
        {discountBanners.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDotPress(index)}
            style={index === currentIndex ? styles.bigDot : styles.smallDot}
          />
        ))}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  discountBanner: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    gap: scale(8),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  smallDot: {
    width: scale(8),
    height: scale(8),
    backgroundColor: '#DEDBDB',
    borderRadius: 9999,
  },
  bigDot: {
    width: scale(10),
    height: scale(10),
    backgroundColor: Colors.green,
    borderRadius: 9999,
  },
});
