import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {getUser} from '../../utils/storage/authStorage';
import {scale} from '../../utils/scaling';

const NewsCard = ({
  item,
  isExpanded,
  onToggleExpand,
  onOpenImageViewer,
  onDelete,
}) => {
  const currentUserId = getUser()?.userId;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.card}>
      {item.trending && (
        <View style={styles.trendingBadge}>
          <Text style={styles.trendingText}>Nổi bật</Text>
        </View>
      )}

      <View style={styles.imagesContainer}>
        {item.images.length === 1 && (
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() =>
              onOpenImageViewer(
                item.images.map(i => i.url),
                0,
              )
            }
            activeOpacity={0.95}>
            <FastImage
              source={{uri: item.images[0].url}}
              style={styles.singleImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}

        {item.images.length === 2 && (
          <View style={styles.twoImagesRow}>
            {item.images.map((img, index) => (
              <TouchableOpacity
                key={index}
                style={{flex: 1}}
                onPress={() =>
                  onOpenImageViewer(
                    item.images.map(i => i.url),
                    index,
                  )
                }>
                <FastImage
                  source={{uri: img.url}}
                  style={styles.twoImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {item.images.length >= 3 && (
          <>
            <TouchableOpacity
              style={styles.bigImageContainer}
              onPress={() =>
                onOpenImageViewer(
                  item.images.map(i => i.url),
                  0,
                )
              }
              activeOpacity={0.95}>
              <FastImage
                source={{uri: item.images[0].url}}
                style={styles.bigImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <View style={styles.imagesBox}>
              {item.images.slice(1, 3).map((img, index) => {
                const imageIndex = index + 1;
                const isLastVisible =
                  imageIndex === 2 && item.images.length > 3;
                return (
                  <TouchableOpacity
                    key={imageIndex}
                    style={styles.smallImageContainer}
                    onPress={() =>
                      onOpenImageViewer(
                        item.images.map(i => i.url),
                        imageIndex,
                      )
                    }
                    activeOpacity={0.95}>
                    <FastImage
                      source={{uri: img.url}}
                      style={styles.smallImage}
                      resizeMode="cover"
                    />
                    {isLastVisible && (
                      <View style={styles.overlay}>
                        <Text style={styles.overlayText}>
                          +{item.images.length - 3}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
      </View>

      {/* Nội dung */}
      <View style={styles.cardContent}>
        <View style={styles.cardBox}>
          <View style={styles.cardContentHeader}>
            <View style={styles.avatarContainer}>
              <FastImage
                source={
                  item?.userId?.avatar
                    ? {uri: item.userId.avatar}
                    : require('../../assets/images/avatar.png')
                }
                style={styles.cardAvatar}
                resizeMode="cover"
              />
              <View style={styles.avatarBadge}>
                <Text style={styles.avatarBadgeText}>✓</Text>
              </View>
            </View>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{item?.userId?.userName}</Text>
              <View style={styles.metaInfo}>
                <Text style={[styles.date, styles.dateText]}>{item?.date}</Text>
                <Text style={[styles.dot, styles.dateText]}>•</Text>
                <Text style={[styles.readTime, styles.dateText]}>
                  {item?.time}
                </Text>
              </View>
            </View>
          </View>

          {currentUserId === item?.userId?._id && (
            <View style={{position: 'relative'}}>
              <TouchableOpacity
                style={styles.engagementButton}
                onPress={() => {
                  setShowMenu(prev => !prev);
                }}>
                <Ionicons name="ellipsis-vertical" size={20} color="#333" />
              </TouchableOpacity>

              {showMenu && (
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                      setShowMenu(false);
                      onEdit?.(item._id);
                    }}>
                    <View style={styles.menubox}>
                      <Ionicons name="create-outline" size={20} color="#000" />
                      <Text style={styles.menuText}>Chỉnh sửa</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                      setShowMenu(false);
                      onDelete?.(item._id);
                    }}>
                    <View style={styles.menubox}>
                      <Ionicons name="trash-outline" size={20} color="red" />
                      <Text style={[styles.menuText, {color: 'red'}]}>Xóa</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>

        <Text style={styles.cardTitle}>{item.title}</Text>

        <Text
          style={styles.cardDescription}
          numberOfLines={isExpanded ? undefined : 2}>
          {item.description}
        </Text>

        {/* Action */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={() => onToggleExpand(item._id)}
            style={styles.seeMoreButton}>
            <Text style={styles.seeMore}>
              {isExpanded ? 'Thu gọn' : 'Xem thêm'}
            </Text>
            <Ionicons
              name={isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={16}
              color={Colors.green}
              style={{marginLeft: 4}}
            />
          </TouchableOpacity>

          <View style={styles.engagement}>
            <TouchableOpacity style={styles.engagementButton}>
              <Ionicons name="heart-outline" size={18} color="#333" />
              <Text style={styles.engagementCount}>{item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.engagementButton}>
              <Ionicons name="chatbubble-outline" size={18} color="#333" />
              <Text style={styles.engagementCount}>{item.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.engagementButton}>
              <Ionicons name="share-social-outline" size={18} color="#333" />
              <Text style={styles.engagementCount}>{item.shares}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    marginBottom: scale(20),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border_2,
  },
  trendingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  trendingText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: scale(5),
    padding: scale(12),
  },
  singleImage: {
    width: '100%',
    height: scale(160),
    borderRadius: 16,
  },
  twoImagesRow: {
    flexDirection: 'row',
    gap: scale(5),
  },
  twoImage: {
    width: '100%',
    height: scale(160),
    borderRadius: 16,
    resizeMode: 'cover',
  },
  bigImageContainer: {
    flex: 1,
    position: 'relative',
  },
  bigImage: {
    width: '100%',
    height: scale(160),
    borderRadius: 16,
  },
  imagesBox: {
    flex: 1,
    justifyContent: 'space-between',
  },
  smallImageContainer: {
    position: 'relative',
  },
  smallImage: {
    width: '100%',
    height: scale(78),
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cardContent: {
    padding: scale(12),
    paddingTop: scale(2),
  },
  cardBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
    gap: scale(12),
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  cardAvatar: {
    width: scale(44),
    height: scale(44),
    borderRadius: 24,
    borderWidth: 3,
    borderColor: Colors.green,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  avatarBadgeText: {
    color: Colors.white,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.semiBold,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    marginBottom: scale(2),
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
  dot: {
    marginHorizontal: scale(5),
  },
  cardTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    marginBottom: scale(6),
    color: Colors.title,
  },
  cardDescription: {
    fontSize: FontSizes.small,
    color: Colors.gray,
    lineHeight: scale(18),
  },
  menuContainer: {
    position: 'absolute',
    top: 45,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    paddingVertical: 6,
    minWidth: 140,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menubox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  menuText: {
    fontSize: 14,
    color: '#333',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f3f4',
    paddingTop: 16,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.2)',
  },
  seeMore: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.green,
    marginRight: 4,
  },
  arrow: {
    fontSize: 12,
    color: Colors.green,
    fontWeight: FontWeights.semiBold,
  },
  engagement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),

  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
  },
  engagementIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  engagementCount: {
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.semiBold,
    color: '#5a6c7d',
    marginLeft: scale(4),
  },
});
