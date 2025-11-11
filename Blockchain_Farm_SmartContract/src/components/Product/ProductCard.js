import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Images from '../../assets/images/images';
import {formatCurrency} from '../../utils/formatCurrency';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const {width} = Dimensions.get('window');

const ProductCard = ({item, onPress}) => {
const imageSource =
  (item.images && item.images.length > 0)
    ? {uri: item.images[0]}
    : (item.image && item.image.length > 0)
      ? {uri: item.image[0]}
      : Images.bg;


  return (
    <TouchableOpacity
      style={styles.relatedCard}
      onPress={() => onPress(item)}
      activeOpacity={0.8}>
      <View style={styles.relatedImageContainer}>
        <FastImage
          source={imageSource}
          style={styles.relatedImage}
          resizeMode="cover"
        />
        <View style={styles.relatedBadge}>
          <Text style={styles.relatedBadgeText}>{item.categoryName}</Text>
        </View>
      </View>
      <View style={styles.relatedContent}>
        <Text style={styles.relatedName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.relatedPrice}>{formatCurrency(item.price)}</Text>
        <Text style={styles.relatedStock}>Số lượng: {item.quantity} kg</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  relatedCard: {
    width: (width - 56) / 2,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: scale(10),
  },
  relatedImageContainer: {
    height: scale(120),
    position: 'relative',
  },
  relatedImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e1e2e4ff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  relatedBadge: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange,
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: 999,
  },
  relatedBadgeText: {
    color: Colors.white,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.bold,
  },
  relatedContent: {
    flex: 1,
    padding: scale(10),
    paddingBottom: scale(14),
  },
  relatedName: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    marginBottom: scale(4),
  },
  relatedPrice: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.primary,
    marginBottom: scale(6),
  },
  relatedStock: {
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
  loadingText: {
    textAlign: 'center',
    color: '#6B7280',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
  },
});

export default React.memo(ProductCard);
