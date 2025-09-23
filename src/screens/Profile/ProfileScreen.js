import {API_URL} from '@env';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useForm, Controller} from 'react-hook-form';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from '../../components/CustomButton/CustomButton';
import Input from '../../components/CustomInput/CustomInput';
import LoadingOverlay from '../../components/CustomLoading/LoadingOverlay';
import Header from '../../components/Header/Header';

import {getUserApi, updateUserApi} from '../../api/userApi';
import {getUser} from '../../utils/storage/authStorage';

import {scale} from '../../utils/scaling';
import styles from './Profile.styles';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [avatar, setAvatar] = useState(null);
  const [serverAvatar, setServerAvatar] = useState(null);
  const [gender, setGender] = useState('male');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);

  const genders = [
    {value: 'male', label: 'Nam'},
    {value: 'female', label: 'Nữ'},
    {value: 'other', label: 'Khác'},
  ];

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      fullName: '',
      userName: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
    },
  });

  const handlePickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
      });
      if (result.didCancel) return;
      if (!result.didCancel && result.assets?.length > 0) {
        setAvatar(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chọn ảnh');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = getUser()?.accessToken;

        const data = await getUserApi(accessToken);
        if (data?.user) {
          const user = {
            fullName: data.user.fullName || '',
            userName: data.user.userName || '',
            email: data.user.email || '',
            phone: data.user.phone || '',
            address: data.user.address || '',
            dateOfBirth: data.user.dateOfBirth?.toString() || '',
            gender: data.user.gender || 'male',
          };

          Object.keys(user).forEach(key => setValue(key, user[key]));
          setGender(user.gender);
          setOriginalUser(user);

          if (data.user.avatar) {
            setServerAvatar(`${API_URL}/api/images/${data.user.avatar}`);
          }
        }
      } catch (error) {
        console.log('Lỗi load user:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setValue]);

  const onSubmit = async values => {
    setSaving(true);
    const currentData = {...values, gender};

    if (
      originalUser &&
      JSON.stringify(currentData) === JSON.stringify(originalUser) &&
      !avatar
    ) {
      showMessage({
        message: 'Thông báo',
        description: 'Không có thay đổi nào để lưu',
        type: 'info',
      });
      setSaving(false);
      return;
    }

    const formData = new FormData();
    Object.entries(currentData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (avatar) {
      formData.append('avatar', {
        uri: avatar.uri,
        type: avatar.type,
        name: avatar.fileName || `avatar_${Date.now()}.jpg`,
      });
    }

    try {
      const storedUser = getUser();
      const accessToken = storedUser.accessToken;

      const response = await updateUserApi(accessToken, formData);

      if (response?.requireOtp) {
        navigation.navigate('OTP', {
          email: values.email,
          type: 'updateEmail',
        });
        setSaving(false);
        return;
      }

      showMessage({
        message: 'Thành công',
        description: 'Cập nhật thông tin thành công!',
        type: 'success',
      });

      setOriginalUser(currentData);
      setAvatar(null);

      const data = await getUserApi(accessToken);
      if (data?.user?.avatar) {
        setServerAvatar(`${API_URL}/api/images/${data.user.avatar}`);
      }
    } catch (error) {
      console.log('Lỗi update:', error.message);
      showMessage({
        message: 'Cập nhật thất bại!',
        description: error.message,
        type: 'danger',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Header
        title="Cập nhật thông tin"
        subtitle="Chỉnh sửa và quản lý thông tin của bạn"
        emoji="📝"
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: scale(40)}}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingTop: scale(20)}}>
          <View style={{position: 'relative'}}>
            <View style={styles.avatarContainer}>
              <FastImage
                source={
                  avatar
                    ? {uri: avatar.uri}
                    : serverAvatar
                    ? {uri: serverAvatar}
                    : require('../../assets/images/avatar.png')
                }
                style={styles.avatar}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <TouchableOpacity style={styles.camare} onPress={handlePickImage}>
              <Ionicons name="camera" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={{gap: 20, marginBottom: 20}}>
            <Controller
              control={control}
              name="fullName"
              rules={{required: 'Nhập tên đầy đủ'}}
              render={({field: {onChange, value, onBlur}}) => (
                <Input
                  label="Tên đầy đủ"
                  placeholder="Nhập tên đầy đủ"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!errors.fullName}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="userName"
              rules={{required: 'Vui lòng nhập tên người dùng'}}
              render={({field: {onChange, value, onBlur}}) => (
                <Input
                  label="Tên đăng nhập"
                  placeholder="Nhập tên đăng nhập"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!errors.userName}
                  errorMessage={errors.userName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Vui lòng nhập email',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Vui lòng nhập đúng định dạng email',
                },
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <Input
                  label="Email"
                  placeholder="Nhập email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              rules={{
                required: 'Vui lòng nhập số điện thoại',
                pattern: {
                  value: /^[0-9]{9,11}$/,
                  message: 'Số điện thoại không hợp lệ',
                },
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <Input
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  error={!!errors.phone}
                  errorMessage={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({field: {onChange, value, onBlur}}) => (
                <Input
                  label="Địa chỉ"
                  placeholder="Nhập địa chỉ"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />

            <View>
              <Text style={styles.label}>Giới tính</Text>
              <View style={styles.genderContainer}>
                {genders.map(item => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.genderBtn,
                      gender === item.value && styles.genderActive,
                    ]}
                    onPress={() => setGender(item.value)}>
                    <Text
                      style={[
                        gender === item.value && styles.genderTextActive,
                      ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Controller
              control={control}
              name="dateOfBirth"
              rules={{
                pattern: {
                  value: /^[0-9]{4}$/,
                  message: 'Vui lòng nhập năm sinh hợp lệ (YYYY)',
                },
              }}
              render={({field: {onChange, value, onBlur}}) => (
                <Input
                  label="Năm sinh"
                  placeholder="YYYY"
                  keyboardType="numeric"
                  maxLength={4}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!errors.dateOfBirth}
                  errorMessage={errors.dateOfBirth?.message}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonActions}>
        <Button.Main
          title="Quay lại"
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.cancelButton}
          textStyle={styles.cancelButtonText}
        />
        <Button.Main
          title={saving ? 'Đang lưu...' : 'Lưu thông tin'}
          onPress={handleSubmit(onSubmit)}
          disabled={saving}
          style={{flex: 1}}
        />
      </View>

      {saving && <LoadingOverlay />}
    </View>
  );
};

export default ProfileScreen;
