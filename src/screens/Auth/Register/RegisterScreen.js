import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useForm, Controller} from 'react-hook-form';
import {showMessage} from 'react-native-flash-message';
import styles from './Register.styles';
import Input from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButton/CustomButton';
import Images from '../../../assets/images/images';
import {registerApi} from '../../../api/auth/auth';
import LoadingOverlay from '../../../components/CustomLoading/LoadingOverlay';
import {
  validateEmail,
  validatePassword,
} from '../../../utils/validation/validation';

const RegisterScreen = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      phone: '',
      username: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    Keyboard.dismiss();
    if (!agree) {
      return showMessage({
        message:'Cảnh báo',
        description: 'Bạn phải đồng ý với điều khoản để tiếp tục',
        type: 'warning',
      });
    }

    try {
      setLoading(true); 
      const payload = {
        userName: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
      };

      const res = await registerApi(payload);

      if (res.success) {
        showMessage({
          message:'Thành công',
          description: 'Đăng ký thành công',
          type: 'success',
        });
        navigation.navigate('OTP', {type: 'register', email: data.email});
      } else {
        showMessage({
          message:'Thất bại',
          description: res.message,
          type: 'danger',
        });
      }
    } catch (err) {
      showMessage({
        message:'Lỗi',
        description: err.message,
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
            <Text style={styles.title}>Tạo tài khoản mới</Text>
            <Text style={styles.subtitle}>
              Vui lòng điền thông tin để đăng ký
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
                  label="Email"
                  placeholder="Nhập Email"
                  keyboardType="email-address"
                  value={value}
                  style={styles.inputContainer}
                  onChangeText={onChange}
                  error={errors.email?.message}
                  isError={!!errors.email}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              rules={{
                required: 'Số điện thoại là bắt buộc',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Số điện thoại phải gồm đúng 10 chữ số',
                },
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  keyboardType="numeric"
                  style={styles.inputContainer}
                  maxLength={10}
                  value={value}
                  onChangeText={onChange}
                  error={errors.phone?.message}
                  isError={!!errors.phone}
                />
              )}
            />

            <Controller
              control={control}
              name="username"
              rules={{required: 'Tên người dùng là bắt buộc'}}
              render={({field: {onChange, value}}) => (
                <Input
                  label="Tên người dùng"
                  style={styles.inputContainer}
                  placeholder="Nhập tên người dùng"
                  value={value}
                  onChangeText={onChange}
                  error={errors.username?.message}
                  isError={!!errors.username}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Mật khẩu là bắt buộc',
                validate: val =>
                  validatePassword(val) || 'Mật khẩu phải có ít nhất 6 ký tự',
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  label="Mật khẩu"
                  style={styles.inputContainer}
                  placeholder="Nhập mật khẩu"
                  isPassword
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                  isError={!!errors.password}
                />
              )}
            />

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, agree && styles.checkboxChecked]}
                onPress={() => setAgree(!agree)}>
                {agree && <Text style={styles.checkMark}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                Tôi đồng ý với{' '}
                <Text style={styles.linkText}>Điều khoản dịch vụ</Text> và{' '}
                <Text style={styles.linkText}>Chính sách bảo mật</Text>
              </Text>
            </View>

            <Button.Main
              title="Đăng ký"
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
              style={styles.authButton}
            />

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>Hoặc đăng ký bằng</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialContainer}>
              <Button.Icon
                icon={
                  <FastImage source={Images.google} style={styles.socialIcon} />
                }
                onPress={() => console.log('Register with Google')}
                style={styles.socialButton}
              />
              <Button.Icon
                icon={
                  <FastImage
                    source={Images.facbook}
                    style={styles.socialIcon}
                  />
                }
                onPress={() => console.log('Register with Facebook')}
                style={styles.socialButton}
              />
              <Button.Icon
                icon={
                  <FastImage source={Images.apple} style={styles.socialIcon} />
                }
                onPress={() => console.log('Register with Apple')}
                style={styles.socialButton}
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Đã có tài khoản? </Text>
              <Button.Text
                title="Đăng nhập"
                onPress={() => navigation.navigate('Login')}
                textStyle={styles.switchLink}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {loading && <LoadingOverlay />}
    </SafeAreaView>
  );
};

export default RegisterScreen;
