import {API_BASE_URL} from '@env';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useForm, Controller} from 'react-hook-form';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import Button from '../../components/CustomButton/CustomButton';
import Input from '../../components/CustomInput/CustomInput';
import {getUserApi, updateUserApi} from '../../api/userApi';
import {Colors} from '../../theme/theme';
import LoadingOverlay from '../../components/CustomLoading/LoadingOverlay';

const ProfileScreen = () => {
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

  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWQ3Y2MzNjRlZTZhMTA5Mzk0YWI3MSIsImlhdCI6MTc1NjI2NDQyNCwiZXhwIjoxNzU2MjY2MjI0fQ.jOLJFfDXMe9WHiRBd206Mq7dsRYxmmcttqpfhO0hgEY';

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
        const data = await getUserApi(accessToken);
        console.log('user', data);

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
            setServerAvatar(`${API_BASE_URL}/api/images/${data.user.avatar}`);
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
        message: 'Không có thay đổi nào để lưu',
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
      await updateUserApi(accessToken, formData);

      showMessage({
        message: 'Cập nhật thành công!',
        type: 'success',
      });

      setOriginalUser(currentData);
      setAvatar(null);

      const data = await getUserApi(accessToken);
      if (data?.user?.avatar) {
        setServerAvatar(`${API_BASE_URL}/api/images/${data.user.avatar}`);
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="light-content" backgroundColor="#28a745" />

        {/* Avatar */}
        <View style={{flex: 1, paddingTop: 40}}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handlePickImage}>
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
            <Text style={styles.avatarText}>Nhấn để đổi ảnh</Text>
          </TouchableOpacity>

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

            {/* User Name */}
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

            {/* Email */}
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

            {/* Phone */}
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

            {/* Address */}
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

            {/* Gender */}
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
                        styles.genderText,
                        gender === item.value && styles.genderTextActive,
                      ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Date of Birth */}
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

        <Button.Main
          title={saving ? 'Đang lưu...' : 'Lưu thông tin'}
          onPress={handleSubmit(onSubmit)}
          disabled={saving}
        />
      </ScrollView>

      {saving && <LoadingOverlay />}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  avatarText: {
    marginTop: 8,
    color: '#666',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderBtn: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  genderActive: {
    borderColor: '#28a745',
    backgroundColor: '#e8f9f0',
  },
  genderText: {
    color: '#333',
    fontWeight: '500',
  },
  genderTextActive: {
    color: '#28a745',
    fontWeight: '700',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
