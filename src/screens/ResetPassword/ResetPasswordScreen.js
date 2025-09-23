import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {showMessage} from 'react-native-flash-message';
import styles from './ResetPassword.styles';
import Input from '../../components/CustomInput/CustomInput';
import Button from '../../components/CustomButton/CustomButton';
import {resetPasswordApi} from '../../api/auth/auth';
import {ErrorMap} from '../../utils/errorMapper/errorMapper';
import {Arrow_Left_S_Icon} from '../../assets/icons';

const ResetPasswordScreen = ({navigation, route}) => {
  const {email} = route.params || {};
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async data => {
    try {
      setLoading(true);
      const res = await resetPasswordApi({
        email,
        newPassword: data.newPassword,
      });

      if (res.success) {
        showMessage({
          message: 'Thành công',
          description: 'Mật khẩu đã được đặt lại thành công',
          type: 'success',
        });
        navigation.navigate('NobottomTab', {
          screen: 'Login',
        });
      } else {
        showMessage({
          message: 'Lỗi',
          description: res.message || 'Đặt lại mật khẩu thất bại',
          type: 'danger',
        });
      }
    } catch (err) {
      console.log('Reset password error:', err);
      let message = 'Đặt lại mật khẩu thất bại';
      if (err?.code && ErrorMap[err.code]) {
        message = ErrorMap[err.code];
      }
      showMessage({
        message: 'Lỗi',
        description: message,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Arrow_Left_S_Icon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Your new password must be different from the{'\n'}previously used
              password
            </Text>

            <Controller
              control={control}
              name="newPassword"
              rules={{
                required: 'Mật khẩu là bắt buộc',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự',
                },
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  label="New Password"
                  placeholder="********"
                  value={value}
                  onChangeText={onChange}
                  isPassword
                  autoComplete="new-password"
                  textContentType="newPassword"
                  error={errors.newPassword?.message}
                  isError={!!errors.newPassword}
                  style={styles.inputContainer}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Xác nhận mật khẩu là bắt buộc',
                validate: val =>
                  val === watch('newPassword') ||
                  'Mật khẩu xác nhận không khớp',
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  label="Confirm Password"
                  placeholder="********"
                  value={value}
                  onChangeText={onChange}
                  isPassword
                  autoComplete="new-password"
                  textContentType="newPassword"
                  error={errors.confirmPassword?.message}
                  isError={!!errors.confirmPassword}
                  style={styles.inputContainer}
                />
              )}
            />

            <Button.Main
              title="Verify Account"
              onPress={handleSubmit(onSubmit)}
              style={styles.verifyButton}
              loading={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
