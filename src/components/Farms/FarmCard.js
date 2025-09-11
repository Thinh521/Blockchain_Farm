import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Heart_Fill_Icon,
  Heart_Line_Icon,
  Location_line_Icon,
  Pulse_Line_Icon,
  Water_line_Icon,
} from '../../assets/icons/index';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';

const {width} = Dimensions.get('window');

const FarmCard = ({farm, favorites, toggleFavorite}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.farmCard}
      activeOpacity={0.9}
      onPress={() => {
        navigation.navigate('NoBottomTab', {
          screen: 'FarmDetail',
          params: {farm},
        });
      }}>
      <View style={styles.imageContainer}>
        <FastImage
          source={{uri: farm.image[0] || 'https://via.placeholder.com/400'}}
          style={styles.farmImage}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(farm.farmCode)}>
          {favorites.has(farm.farmCode) ? (
            <Heart_Fill_Icon style={{color: '#EF4444', width: 20}} />
          ) : (
            <Heart_Line_Icon style={{color: '#9CA3AF', width: 20}} />
          )}
        </TouchableOpacity>

        <View style={styles.areaBadge}>
          <Text style={styles.areaBadgeText}>{farm.area} ha</Text>
        </View>
      </View>

      <View style={styles.farmContent}>
        <Text style={styles.farmName} numberOfLines={1}>
          {farm.nameFarm}
        </Text>

        <Text style={styles.farmDescription} numberOfLines={2}>
          {farm.description}
        </Text>

        <View style={styles.locationContainer}>
          <Location_line_Icon style={{color: '#EF4444', width: 14}} />
          <Text style={styles.locationText} numberOfLines={1}>
            {farm.location}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Pulse_Line_Icon style={{color: '#10B981', width: 14}} />
            <Text style={styles.statText}>Hoạt động</Text>
          </View>
          <View style={styles.statItem}>
            <Water_line_Icon style={{color: '#3B82F6', width: 14}} />
            <Text style={styles.statText}>Organic</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  farmCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    width: (width - 52) / 2,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  farmImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  areaBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  farmContent: {
    padding: 12,
  },
  farmName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  farmDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 0.8,
    borderTopColor: '#E5E7EB',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 10,
    color: '#6B7280',
    marginLeft: 3,
  },
});

export default FarmCard;
