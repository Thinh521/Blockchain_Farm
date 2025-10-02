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
import {scale} from '../../utils/scaling';

const {width} = Dimensions.get('window');

const FarmCard = ({farm, favorites, toggleFavorite, isUserFarm}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.farmCard}
      activeOpacity={0.9}
      onPress={() => {
        navigation.navigate('NoBottomTab', {
          screen: 'FarmDetail',
          params: {farm, isFavorite: favorites.has(farm.farmCode)},
        });
      }}>
      <View style={styles.imageContainer}>
        <FastImage
          source={{
            uri:
              (farm.image && farm.image.length > 0 && farm.image[0]) ||
              (farm.images && farm.images.length > 0 && farm.images[0]) ||
              'https://via.placeholder.com/150', // fallback nếu không có ảnh
          }}
          style={styles.farmImage}
          resizeMode="cover"
        />

        <View style={styles.favoriteButton}>
          {favorites.has(farm.farmCode) ? (
            <Heart_Fill_Icon style={{color: '#EF4444', width: 20}} />
          ) : (
            <Heart_Line_Icon style={{color: '#9CA3AF', width: 20}} />
          )}
        </View>
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

        {isUserFarm ? (
          <View style={styles.actionButtons}>

            <TouchableOpacity
              style={[styles.actionBtn, {backgroundColor: '#3B82F6'}]}>
              <Text style={styles.actionBtnText}>Cập nhật</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, {backgroundColor: '#EF4444'}]}
              onPress={() =>
                navigation.navigate('Categories', {
                  farmCode: farm.farmCode
                })
              }>
              <Text style={styles.actionBtnText}>Quản lí</Text>
            </TouchableOpacity>
          </View>
        ) : (
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
        )}
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
  actionButtons: {
    flexDirection: 'row',
    gap: scale(6),
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
});

export default FarmCard;
