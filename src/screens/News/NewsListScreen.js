import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {getNewsByFarmApi, deleteNewsApi} from '../../api/news/newsApi';
import {useIsFocused} from '@react-navigation/native';
import {getUser} from '../../utils/storage/authStorage';
import {API_URL} from '@env';
import {Colors} from '../../theme/theme';
import NewsSkeleton from '../../components/CustomSkeleton/NewsSkeleton';

const NewsListScreen = ({navigation}) => {
  const [newsList, setNewsList] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true); // skeleton chỉ 1 lần
  const isFocused = useIsFocused();
  const user = getUser();

  const farmCode = user?.farmCode || 'FARM792237';

const fetchNews = useCallback(async () => {
  try {
    const res = await getNewsByFarmApi(farmCode);
    if (res?.code === 200) {
      setNewsList(res.data || []);
    } else {
      Alert.alert('Lỗi', 'Không lấy được tin tức');
    }
  } catch (err) {
    Alert.alert('Lỗi', 'Không kết nối được server');
  } finally {
    // Giữ skeleton tối thiểu 800ms cho chắc chắn hiển thị
    setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);
  }
}, [farmCode]);


useEffect(() => {
  if (isFocused) {
    fetchNews();
  }
}, [isFocused, fetchNews]);
  const handleDelete = async id => {
    Alert.alert('Xóa tin tức', 'Bạn có chắc chắn muốn xóa tin tức này không?', [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await deleteNewsApi(id);
            if (res?.code === 200) {
              setNewsList(prev => prev.filter(item => item._id !== id));
            } else {
              Alert.alert('Lỗi', 'Không xóa được tin');
            }
          } catch (err) {
            Alert.alert('Lỗi', 'Không kết nối được server');
          }
        },
      },
    ]);
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Text style={styles.emptyIconText}>📰</Text>
      </View>
      <Text style={styles.emptyTitle}>Chưa có tin tức nào</Text>
      <Text style={styles.emptySubtitle}>
        Hãy thêm tin tức đầu tiên của bạn
      </Text>
    </View>
  );

  const renderItem = ({item, index}) => {
    const imageUrl =
      item.images && item.images.length > 0
        ? `${API_URL}/api/images/${item.images[0].publicId}`
        : null;

    return (
      <View style={[styles.card, {marginTop: index === 0 ? 0 : 16}]}>
        <View style={styles.cardTopActions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditNews', {news: item})}>
            <Text style={styles.editButtonText}>✏️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item._id)}>
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardBody}>
          {imageUrl ? (
            <Image
              source={{uri: imageUrl}}
              style={styles.cardImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>📰</Text>
            </View>
          )}

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.cardDescription} numberOfLines={3}>
              {item.description}
            </Text>
            {item.createdAt && (
              <Text style={styles.cardDate}>{formatDate(item.createdAt)}</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Tin tức nông trại</Text>
            <Text style={styles.headerSubtitle}>{newsList.length} tin tức</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('News', {farmCode})}>
            <Text style={styles.addButtonText}>+ Thêm tin</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {showSkeleton ? (
            <NewsSkeleton count={4} />
          ) : (
            <FlatList
              data={newsList}
              keyExtractor={item => item._id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={renderEmpty}
            />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 10,
    borderWidth: 1,
    borderColor: '#d6d7daff',
  },
  cardTopActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 12,
  },
  placeholderText: {
    fontSize: 40,
    opacity: 0.5,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.black,
    opacity: 0.9,
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#059669',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyIconText: {
    fontSize: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  editButtonText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  deleteButtonText: {
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default NewsListScreen;
