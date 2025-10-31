import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS, RPC_URL} from '@env';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Controller, useForm} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@tanstack/react-query';

import Input from '../../components/CustomInput/CustomInput';
import Button from '../../components/CustomButton/CustomButton';
import Header from '../../components/Header/Header';
import contractArtifact from '../SmartConctract/contractABI.json';
import Images from '../../assets/images/images';

import {createNewsApi, updateNewsApi} from '../../api/newsApi';
import {getUser} from '../../utils/storage/authStorage';
import {useAppLoading} from '../../context/AppLoadingContext';

import {Colors} from '../../theme/theme';
import {scale} from '../../utils/scaling';
import styles from './AddNews.styles';

const fetchFarmsByUserId = async (userId, isConnected) => {
  if (!isConnected || !userId) {
    throw new Error('Chưa có userId hoặc chưa kết nối ví');
  }

  console.log('farmsData', farmsData);

  const rpcProvider = new ethers.JsonRpcProvider(RPC_URL);
  const contractRead = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    rpcProvider,
  );

  console.log('contractRead', contractRead);

  const farmsData = await contractRead.getFarmByUser(userId);

  console.log('farmsData', farmsData);

  return farmsData.map(farm => ({
    farmCode: farm.farmCode || farm[0],
    nameFarm: farm.nameFarm || farm[2],
  }));
};

const AddNewsScreen = () => {
  const navigation = useNavigation();
  const {mode, news} = useRoute().params || {};
  const {isConnected} = useAppKitAccount();
  const {loading, setLoading} = useAppLoading();

  const [selectedFarm, setSelectedFarm] = useState(null);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [showFarmDropdown, setShowFarmDropdown] = useState(false);

  const userId = getUser()?.userId;
  const accessToken = getUser()?.accessToken;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const {
    data: farms = [],
    isLoading: isFarmsLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['farms', userId],
    queryFn: () => fetchFarmsByUserId(userId, isConnected),
    enabled: !!userId && isConnected,
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: mode === 'edit' ? news?.title || '' : '',
      description: mode === 'edit' ? news?.description || '' : '',
      farmCode: mode === 'edit' ? news?.farmCode || '' : '',
    },
  });

  useEffect(() => {
    if (mode === 'edit' && news) {
      setValue('title', news.title || '');
      setValue('description', news.description || '');
      setValue('farmCode', news.farmCode || '');
      setOldImages(news.images || []);

      const matchedFarm = farms.find(farm => farm.farmCode === news.farmCode);
      if (matchedFarm) {
        setSelectedFarm(matchedFarm);
      } else {
        setSelectedFarm({
          farmCode: news.farmCode,
          nameFarm: news.nameFarm || 'Nông trại chưa xác định',
        });
      }
    }
  }, [mode, news, farms]);

  // Chọn ảnh
  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 5,
      quality: 0.8,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (!response.didCancel && !response.errorCode) {
        setImages(prev => [...prev, ...(response.assets || [])]);
      }
    });
  };

  const removeImage = (index, type = 'new') => {
    if (type === 'new') {
      setImages(prev => prev.filter((_, i) => i !== index));
    } else {
      setOldImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Submit tạo mới
  const handleCreate = async data => {
    const accessToken = getUser()?.accessToken;
    const formData = new FormData();

    formData.append('farmCode', selectedFarm.farmCode);
    formData.append('title', data.title);
    formData.append('description', data.description);

    images.forEach((img, index) => {
      formData.append('images', {
        uri: img.uri,
        name: img.fileName || `image_${index}.jpg`,
        type: img.type || 'image/jpeg',
      });
    });

    setLoading(true);
    try {
      const res = await createNewsApi(accessToken, formData);
      if (res.code === 200) {
        showMessage({
          message: 'Thành công',
          description: 'Tin tức đã được đăng!',
          type: 'success',
        });
        navigation.goBack();
      } else {
        showMessage({
          message: 'Thất bại',
          description: 'Không thể đăng tin tức',
          type: 'danger',
        });
      }
    } catch (err) {
      console.log('Lỗi handleCreate:', err);
    } finally {
      setLoading(false);
    }
  };

  // Submit chỉnh sửa
  const handleUpdate = async data => {
    const formData = new FormData();

    formData.append('farmCode', selectedFarm.farmCode);
    formData.append('title', data.title);
    formData.append('description', data.description);

    oldImages.forEach((img, index) => {
      formData.append(`oldImages[${index}][url]`, img.url);
      formData.append(`oldImages[${index}][publicId]`, img.publicId);
    });

    images.forEach((img, index) => {
      formData.append('images', {
        uri: img.uri,
        name: img.fileName || `image_${index}.jpg`,
        type: img.type || 'image/jpeg',
      });
    });

    setLoading(true);
    try {
      const res = await updateNewsApi(news._id, accessToken, formData);
      if (res.success) {
        showMessage({
          message: 'Thành công',
          description: 'Tin tức đã được cập nhật!',
          type: 'success',
        });
        navigation.goBack();
      } else {
        showMessage({
          message: 'Thất bại',
          description: res.message || 'Không thể cập nhật tin tức',
          type: 'danger',
        });
      }
    } catch (err) {
      console.log('Lỗi handleUpdate:', err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = data => {
    if (mode === 'edit') {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={mode === 'edit' ? 'Cập nhật tin tức' : 'Thêm tin tức'}
        subtitle={
          mode === 'edit'
            ? 'Chỉnh sửa và quản lý nội dung tin tức của bạn'
            : 'Chia sẻ những thông tin mới nhất từ nông trại'
        }
        emoji={mode === 'edit' ? '✏️' : '📰'}
        showBack={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <Icon name="newspaper-outline" size={32} color={Colors.primary} />
            </View>
          </View>
          <Text style={styles.headerTitle}>
            {mode === 'edit'
              ? 'Cập nhật tin tức nông sản'
              : 'Thêm tin tức nông sản'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {mode === 'edit'
              ? 'Chỉnh sửa nội dung để tin tức luôn chính xác'
              : 'Chia sẻ thông tin tin tức để kết nối cộng đồng nông nghiệp xanh'}
          </Text>
        </View>

        {/* Nông trại */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nông trại</Text>
          <Controller
            control={control}
            name="farmCode"
            rules={{required: 'Vui lòng chọn nông trại'}}
            render={({field: {onChange, value}}) => (
              <View style={styles.dropdownContainer}>
                <TouchableOpacity
                  style={[
                    styles.dropdownButton,
                    errors.farmCode && styles.inputError,
                  ]}
                  onPress={() => setShowFarmDropdown(!showFarmDropdown)}>
                  <View style={styles.dropdownButtonContent}>
                    <Icon
                      name="storefront-outline"
                      size={20}
                      color={Colors.inputText}
                    />
                    <Text style={styles.dropdownButtonText}>
                      {selectedFarm ? selectedFarm.nameFarm : 'Chọn nông trại'}
                    </Text>
                  </View>
                  <Icon
                    name={showFarmDropdown ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color={Colors.inputText}
                  />
                </TouchableOpacity>

                {errors.farmCode && (
                  <Text style={styles.errorText}>
                    {errors.farmCode.message}
                  </Text>
                )}

                {showFarmDropdown && (
                  <View style={styles.dropdownList}>
                    {farms.map(farm => (
                      <TouchableOpacity
                        key={farm.farmCode}
                        style={[
                          styles.dropdownItem,
                          value === farm.farmCode &&
                            styles.dropdownItemSelected,
                        ]}
                        onPress={() => {
                          setSelectedFarm(farm);
                          onChange(farm.farmCode);
                          setShowFarmDropdown(false);
                        }}>
                        <Icon
                          name="leaf-outline"
                          size={16}
                          color={Colors.primary}
                        />
                        <Text
                          style={[
                            styles.dropdownItemText,
                            value === farm.farmCode &&
                              styles.dropdownItemTextSelected,
                          ]}>
                          {farm.nameFarm}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}
          />
        </View>

        {/* Tiêu đề */}
        <View style={styles.section}>
          <Controller
            control={control}
            name="title"
            rules={{required: 'Vui lòng nhập tiêu đề'}}
            render={({field: {onChange, value, onBlur}}) => (
              <>
                <Input
                  label="Tiêu đề"
                  placeholder="Nhập tiêu đề"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.title?.message}
                  isError={!!errors.title}
                />
              </>
            )}
          />
        </View>

        {/* Mô tả */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả</Text>
          <Controller
            control={control}
            name="description"
            rules={{required: 'Vui lòng nhập mô tả'}}
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  style={[
                    styles.input,
                    errors.description && styles.inputError,
                  ]}
                  placeholder="Nhập mô tả chi tiết"
                  value={value}
                  onChangeText={onChange}
                  multiline
                />
                {errors.description && (
                  <Text style={styles.errorText}>
                    {errors.description.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        {/* Hình ảnh */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hình ảnh</Text>
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={pickImage}>
            <FastImage
              source={Images.images}
              resizeMode="contain"
              style={{width: scale(30), height: scale(30)}}
            />
            <Text style={styles.imagePickerText}>Chọn ảnh</Text>
          </TouchableOpacity>

          {oldImages.length > 0 && (
            <ScrollView horizontal style={styles.imagePreviewContainer}>
              {oldImages.map((img, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{uri: img.url}} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index, 'old')}>
                    <Icon name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

          {/* Ảnh mới */}
          {images.length > 0 && (
            <ScrollView horizontal style={styles.imagePreviewContainer}>
              {images.map((img, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{uri: img.uri}} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index, 'new')}>
                    <Icon name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {!isKeyboardVisible && (
        <View style={styles.buttonActions}>
          <Button.Main
            title="Quay lại"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />
          <Button.Main
            title={
              loading
                ? 'Đang xử lý...'
                : mode === 'edit'
                ? 'Cập nhật'
                : 'Đăng tin'
            }
            onPress={handleSubmit(onSubmit)}
            iconLeft={
              !loading &&
              (mode === 'edit' ? (
                <Icon name="save" size={16} color={Colors.white} />
              ) : (
                <Icon name="send" size={16} color={Colors.white} />
              ))
            }
            disabled={loading}
            style={{flex: 1}}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddNewsScreen;
