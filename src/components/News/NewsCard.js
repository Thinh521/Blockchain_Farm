import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import styles from '../../screens/New/New.styles';
import {Colors} from '../../theme/theme';
import {getUser} from '../../utils/storage/authStorage';

const NewsCard = ({item, isExpanded, onToggleExpand, onOpenImageViewer}) => {
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
                      onEdit?.(item);
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
                      onDelete?.(item);
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
              <Text style={styles.engagementCount}>24</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.engagementButton}>
              <Ionicons name="chatbubble-outline" size={18} color="#333" />
              <Text style={styles.engagementCount}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.engagementButton}>
              <Ionicons name="share-social-outline" size={18} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewsCard;
