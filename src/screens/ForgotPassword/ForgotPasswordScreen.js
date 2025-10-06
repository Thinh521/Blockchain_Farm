import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Text,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {showMessage} from 'react-native-flash-message';
import styles from './ForgotPassword.styles';
import Input from '../../components/CustomInput/CustomInput';
import Button from '../../components/CustomButton/CustomButton';
import {validateEmail} from '../../utils/validation/validation';
import {forgotPasswordApi} from '../../api/auth/auth';
import LoadingOverlay from '../../components/CustomLoading/LoadingOverlay';

const ForgotPasswordScreen = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    try {
      setLoading(true);
      const res = await forgotPasswordApi({email: data.email});

      if (res.success) {
        showMessage({
          message: 'Thành công',
          description: 'Chúng tôi đã gửi mã OTP về email',
          type: 'success',
        });

        navigation.navigate('OTP', {
          email: data.email,
          type: 'resetPassword',
        });
      } else {
        showMessage({
          message: 'Lỗi',
          description: res.message,
          type: 'danger',
        });
      }
    } catch (err) {
      console.log(' Forgot password error:', err);
      showMessage({
        message: 'Lỗi',
        description: 'Không thể gửi email',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.title}>Quên mật khẩu?</Text>
            <Text style={styles.subtitle}>
              Nhập địa chỉ email của bạn và chúng tôi sẽ gửi {'\n'}cho bạn mã
              xác nhận để đặt lại mật khẩu
            </Text>

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email là bắt buộc',
                validate: val => validateEmail(val) || 'Email không hợp lệ',
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  style={styles.inputContainer}
                  label="Email "
                  placeholder="nguyenvana@gmail.com"
                  placeholderTextColor="#ccc"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="Email"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  error={errors.email?.message}
                  isError={!!errors.email}
                />
              )}
            />

            <Button.Main
              title="Tiếp tục"
              onPress={handleSubmit(onSubmit)}
              style={styles.continueButton}
              loading={loading}
            />

            <View style={styles.backContainer}>
              <Text style={styles.backText}>Đã nhớ mật khẩu? </Text>
              <Button.Text
                title="Đăng nhập"
                onPress={() => navigation.goBack()}
                textStyle={styles.backLink}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {loading && <LoadingOverlay />}
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
