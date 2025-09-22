import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS} from '@env';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/core';

import Input from '../../components/CustomInput/CustomInput';
import Button from '../../components/CustomButton/CustomButton';
import contractArtifact from '../SmartConctract/contractABI.json';

import {createNewsApi} from '../../api/newsApi';
import {getUser} from '../../utils/storage/authStorage';
import {useAppLoading} from '../../context/AppLoadingContext';

import {Colors} from '../../theme/theme';
import styles from './AddNews.styles';

const AddNewsScreen = () => {
  const navigation = useNavigation();
  const {isConnected} = useAppKitAccount();
  const {loading, setLoading} = useAppLoading();

  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [showFarmDropdown, setShowFarmDropdown] = useState(false);

  const userId = getUser()?.userId;

  // Lấy danh sách nông trại từ Smart Contract
  const getAllFarmsUserID = useCallback(async () => {
    if (!isConnected || !userId) {
      console.log('Chưa có userId hoặc chưa connect ví');
      return;
    }

    try {
      const rpcProvider = new ethers.JsonRpcProvider(
        'https://rpc.zeroscan.org',
      );
      const contractRead = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractArtifact.abi,
        rpcProvider,
      );

      const farmsData = await contractRead.getFarmByUserId(userId);

      const formattedFarms = farmsData.map(farm => ({
        farmCode: farm.farmCode || farm[0],
        nameFarm: farm.nameFarm || farm[2],
      }));

      setFarms(formattedFarms);
    } catch (error) {
      console.log('Lỗi getAllFarmsUserID:', error);
      setFarms([]);
    }
  }, [isConnected, userId]);

  useEffect(() => {
    if (isConnected) {
      getAllFarmsUserID();
    }
  }, [isConnected, getAllFarmsUserID]);

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

  const removeImage = index => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedFarm || !title.trim() || !description.trim()) {
      showMessage({
        message: 'Thiếu thông tin, Vui lòng nhập đầy đủ thông tin!',
        type: 'danger',
      });
      return;
    }

    const accessToken = getUser()?.accessToken;

    const formData = new FormData();
    formData.append('farmCode', selectedFarm.farmCode);
    formData.append('title', title);
    formData.append('description', description);

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

        setTitle('');
        setDescription('');
        setImages([]);
        setSelectedFarm(null);

        navigation.goBack();
      } else {
        showMessage({
          message: 'Thất bại',
          description: 'Không thể đăng tin tức',
          type: 'danger',
        });
        console.log(res.message || 'Không thể đăng tin tức');
      }
    } catch (error) {
      console.log('Lỗi handleSubmit:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderFarmDropdown = () => (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowFarmDropdown(!showFarmDropdown)}>
        <View style={styles.dropdownButtonContent}>
          <Icon name="storefront-outline" size={20} color={Colors.inputText} />
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

      {showFarmDropdown && (
        <View style={styles.dropdownList}>
          {farms.map(farm => (
            <TouchableOpacity
              key={farm.farmCode}
              style={[
                styles.dropdownItem,
                selectedFarm?.farmCode === farm.farmCode &&
                  styles.dropdownItemSelected,
              ]}
              onPress={() => {
                setSelectedFarm(farm);
                setShowFarmDropdown(false);
              }}>
              <Icon name="leaf-outline" size={16} color={Colors.primary} />
              <Text
                style={[
                  styles.dropdownItemText,
                  selectedFarm?.farmCode === farm.farmCode &&
                    styles.dropdownItemTextSelected,
                ]}>
                {farm.nameFarm}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.headerTitle}>Chia sẻ tin tức nông sản</Text>
          <Text style={styles.headerSubtitle}>
            Kết nối cộng đồng nông nghiệp xanh
          </Text>
        </View>

        {/* Nông trại */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nông trại</Text>
          {renderFarmDropdown()}
        </View>

        {/* Tiêu đề */}
        <View style={styles.section}>
          <Input
            label="Tiêu đề"
            placeholder="Nhập tiêu đề"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Mô tả */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mô tả chi tiết"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Hình ảnh */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hình ảnh</Text>
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={pickImage}>
            <Icon name="camera-outline" size={24} color="#fff" />
            <Text style={styles.imagePickerText}>Chọn ảnh</Text>
          </TouchableOpacity>

          {images.length > 0 && (
            <ScrollView horizontal style={styles.imagePreviewContainer}>
              {images.map((img, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{uri: img.uri}} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}>
                    <Icon name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        <Button.Main
          title={loading ? 'Đang đăng tin...' : 'Đăng tin'}
          iconLeft={!loading && <Icon name="send" size={20} color="#fff" />}
          disabled={!selectedFarm || !title || !description || loading}
          onPress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewsScreen;
