import React, {useState} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/core';
import {showMessage} from 'react-native-flash-message';

import Button from '../../components/CustomButton/CustomButton';
import Input from '../../components/CustomInput/CustomInput';
import Header from '../../components/Header/Header';
import {Keyhole_Icon} from '../../assets/icons';

import {changepasswordApi} from '../../api/userApi';
import {scale} from '../../utils/scaling';
import {getUser} from '../../utils/storage/authStorage';

import {Colors} from '../../theme/theme';
import styles from './ChangePassword.styles';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const accessToken = getUser()?.accessToken;

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  const passwordRequirements = [
    {text: 'Dài ít nhất 8 ký tự', met: newPassword?.length >= 8},
    {text: 'Một chữ cái viết hoa', met: /[A-Z]/.test(newPassword)},
    {text: 'Một chữ cái thường', met: /[a-z]/.test(newPassword)},
    {text: 'Một số', met: /\d/.test(newPassword)},
    {
      text: 'Một ký tự đặc biệt',
      met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    },
  ];

  const onSubmit = async data => {
    try {
      setLoading(true);

      await changepasswordApi({
        accessToken,
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      showMessage({
        message: 'Thành công',
        description: 'Đổi mật khẩu thành công!',
        type: 'success',
      });

      navigation.goBack();
    } catch (error) {
      showMessage({
        message: 'Đổi mật khẩu thất bại',
        description: error.message,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Đổi mật khẩu"
        subtitle="Bảo mật tài khoản của bạn an toàn hơn"
        emoji="🔒"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
        <View style={styles.content}>
          {/* Security Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <Keyhole_Icon
                style={{
                  color: Colors.primary,
                  width: scale(30),
                  height: scale(30),
                }}
              />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Bảo mật tài khoản của bạn</Text>
          <Text style={styles.description}>
            Giữ dữ liệu nông nghiệp của bạn an toàn bằng cách cập nhật mật khẩu
          </Text>

          {/* Current Password */}
          <View style={styles.inputSection}>
            <Controller
              control={control}
              name="currentPassword"
              rules={{required: 'Vui lòng nhập mật khẩu hiện tại'}}
              render={({field: {onChange, value}}) => (
                <Input
                  label="Mật khẩu hiện tại"
                  placeholder="Nhập mật khẩu hiện tại"
                  value={value}
                  onChangeText={onChange}
                  isPassword
                  required
                  error={errors.currentPassword?.message}
                  isError={!!errors.currentPassword}
                />
              )}
            />
          </View>

          {/* New Password */}
          <View style={styles.inputSection}>
            <Controller
              control={control}
              name="newPassword"
              rules={{
                required: 'Vui lòng nhập mật khẩu mới',
                minLength: {
                  value: 8,
                  message: 'Mật khẩu phải có ít nhất 8 ký tự',
                },
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  label="Mật khẩu mới"
                  placeholder="Nhập mật khẩu mới"
                  value={value}
                  onChangeText={onChange}
                  isPassword
                  required
                  error={errors.newPassword?.message}
                  isError={!!errors.newPassword}
                />
              )}
            />
          </View>

          {/* Confirm Password */}
          <View style={styles.inputSection}>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Vui lòng xác nhận mật khẩu mới',
                validate: value =>
                  value === newPassword || 'Vui lòng xác nhận mật khẩu mới',
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  label="Xác nhận mật khẩu"
                  placeholder="Xác nhận mật khẩu mới"
                  value={value}
                  onChangeText={onChange}
                  isPassword
                  required
                  error={errors.confirmPassword?.message}
                  isError={!!errors.confirmPassword}
                />
              )}
            />
          </View>

          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <View style={styles.requirementsList}>
              {passwordRequirements.map((requirement, index) => (
                <View key={index} style={styles.requirementItem}>
                  <View
                    style={[
                      styles.requirementDot,
                      requirement.met && styles.requirementDotMet,
                    ]}
                  />
                  <Text
                    style={[
                      styles.requirementText,
                      requirement.met && styles.requirementTextMet,
                    ]}>
                    {requirement.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <Button.Main
            title={loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
