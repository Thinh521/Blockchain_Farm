import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import styles from '../../FarmDetail/FarmDetail.styles';

const {width} = Dimensions.get('window');

const ImageCarousel = ({
  farm,
  imageScale,
  setCurrentImageIndex,
  onOpenImageViewer,
  currentImageIndex,
}) => (
  <View style={styles.imageCarousel}>
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={event => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentImageIndex(index);
      }}>
      {farm.image.map((imgUrl, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => onOpenImageViewer(idx)}
          activeOpacity={0.9}>
          <Animated.Image
            source={{uri: imgUrl}}
            style={[styles.carouselImage, {transform: [{scale: imageScale}]}]}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ))}
    </ScrollView>

    <View style={styles.imageIndicators}>
      {farm.image.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            currentImageIndex === index && styles.activeIndicator,
          ]}
        />
      ))}
    </View>
  </View>
);

export default ImageCarousel;
