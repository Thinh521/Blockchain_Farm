import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Button from '../../components/CustomButton/CustomButton';
import Input from '../../components/CustomInput/CustomInput';
import {Arrow_Left_S_Icon, Keyhole_Icon} from '../../assets/icons';
import {Colors} from '../../theme/theme';
import {useNavigation} from '@react-navigation/core';
import {scale} from '../../utils/scaling';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();

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

  const onSubmit = data => {
    console.log('Change Password Data:', data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Arrow_Left_S_Icon style={{color: Colors.white}} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Đổi mật khẩu</Text>
        </View>

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
                  containerStyle={[
                    errors.currentPassword && {
                      borderColor: 'red',
                      borderWidth: 1,
                    },
                  ]}
                />
              )}
            />
            {errors.currentPassword && (
              <Text style={styles.errorText}>
                {errors.currentPassword.message}
              </Text>
            )}
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
                  containerStyle={[
                    errors.newPassword && {
                      borderColor: 'red',
                      borderWidth: 1,
                    },
                  ]}
                />
              )}
            />
            {errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword.message}</Text>
            )}
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
                  containerStyle={[
                    errors.confirmPassword && {
                      borderColor: 'red',
                      borderWidth: 1,
                    },
                  ]}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
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

          {/* Submit Button */}
          <Button.Main title="Đổi mật khẩu" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 4,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBackground: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  requirementsContainer: {
    marginBottom: 30,
  },
  requirementsList: {
    backgroundColor: '#f0f8f0',
    borderRadius: 8,
    padding: 16,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginRight: 12,
  },
  requirementDotMet: {
    backgroundColor: '#4CAF50',
  },
  requirementText: {
    fontSize: 14,
    color: '#666',
  },
  requirementTextMet: {
    color: '#4CAF50',
  },
});
