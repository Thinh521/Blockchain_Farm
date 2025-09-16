import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {createNewsApi} from '../../api/news/newsApi';
import {getUser} from '../../utils/storage/authStorage';

const {width} = Dimensions.get('window');

const NewsScreen = ({navigation}) => {
  const user = getUser();
  const [farmCode, setFarmCode] = useState('FARM792237');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const pickImages = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
        includeBase64: false,
      });
      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert('Lỗi chọn ảnh', result.errorMessage || result.errorCode);
        return;
      }
      const assets = result.assets || [];
      const newImgs = assets.map(a => ({
        uri: Platform.OS === 'android' ? a.uri : a.uri.replace('file://', ''),
        fileName: a.fileName || `photo_${Date.now()}.jpg`,
        type: a.type || 'image/jpeg',
      }));
      setImages(prev => [...prev, ...newImgs]);
    } catch (err) {
      console.log('pickImages err', err);
      Alert.alert('Lỗi', 'Không thể chọn ảnh');
    }
  };

  const removeImageAt = idx => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
      return;
    }
    if (!farmCode || !name || !title) {
      Alert.alert(
        'Thiếu thông tin',
        'Vui lòng nhập đầy đủ: farmCode, name, title',
      );
      return;
    }

    setLoading(true);
    try {
      const payload = {farmCode, name, title, description, images};
      console.log('creating news with', payload);
      const res = await createNewsApi(payload);
      // backend trả về chỉ code hoặc {code:200, data}
      if (res && res.code === 200) {
        Alert.alert('Thành công', 'Tin tức đã được thêm', [
          {text: 'OK', onPress: () => navigation.goBack?.()},
        ]);
      } else {
        // nếu backend trả mã lỗi theo errorCodes (object)
        const code = res?.code || res?.errorCode || 'UNKNOWN';
        Alert.alert('Lỗi', `Server trả về mã lỗi: ${code}`);
      }
    } catch (err) {
      console.log('create news error', err);
      const code = err?.code || err?.errorCode || 'NETWORK_ERROR';
      Alert.alert('Lỗi', `Không gửi được. Mã lỗi: ${code}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}> Thông tin cơ bản</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên tin tức</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nhập tên tin tức..."
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tiêu đề</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Nhập tiêu đề tin tức..."
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mô tả chi tiết</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Nhập mô tả chi tiết về tin tức..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.imageSection}>
          <Text style={styles.sectionTitle}>📸 Hình ảnh</Text>

          <View style={styles.imageGrid}>
            <TouchableOpacity
              style={styles.addImageButton}
              onPress={pickImages}
              activeOpacity={0.7}>
              <View style={styles.addImageContent}>
                <Text style={styles.addImageIcon}>📷</Text>
                <Text style={styles.addImageText}>Thêm ảnh</Text>
              </View>
            </TouchableOpacity>

            {images.map((img, idx) => (
              <View key={idx} style={styles.imageWrapper}>
                <Image
                  source={{uri: img.uri}}
                  style={styles.imagePreview}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeImageAt(idx)}
                  activeOpacity={0.7}>
                  <Text style={styles.removeImageText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}>
          <View style={styles.submitButtonContent}>
            {loading ? (
              <>
                <ActivityIndicator color="#FFFFFF" size="small" />
                <Text style={styles.submitButtonText}>Đang tạo tin...</Text>
              </>
            ) : (
              <>
                <Text style={styles.submitButtonText}>Đăng tin tức</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8F0',
  },
  header: {
    backgroundColor: '#059669',
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 10,
    shadowColor: '#059669',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E8F5E8',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#059669',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 8,
  },
  labelIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    backgroundColor: '#F8FDF8',
    borderWidth: 2,
    borderColor: '#E8F5E8',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#010e09ff',
    fontWeight: '500',
  },
  textArea: {
    height: 120,
    paddingTop: 14,
  },
  imageSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#059669',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  addImageButton: {
    width: (width - 72) / 3,
    height: (width - 72) / 3,
    backgroundColor: '#E8F5E8',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#90EE90',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageContent: {
    alignItems: 'center',
  },
  addImageIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  addImageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    textAlign: 'center',
  },
  imageWrapper: {
    width: (width - 72) / 3,
    height: (width - 72) / 3,
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(220, 38, 38, 0.9)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#059669',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});

export default NewsScreen;
