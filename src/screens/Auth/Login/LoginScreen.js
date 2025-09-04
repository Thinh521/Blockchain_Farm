import React from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Text,
  View,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import styles from './Login.styles';
import Input from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButton/CustomButton';
import Images from '../../../assets/images/images';
import {loginApi} from '../../../api/auth/auth';
import {ErrorMap} from '../../../utils/errorMapper/errorMapper';
import {useForm} from '../../../components/useForm/useForm'; // ✅ import hook
import {showMessage} from 'react-native-flash-message';

const LoginScreen = ({navigation}) => {
  const {values, handleChange, validateForm, getFieldError, isError} = useForm(
    {emailPhone: '', password: ''},
    {
      emailPhone: {required: true, type: 'emailPhone'},
      password: {required: true, type: 'password'},
    },
  );

  const handleLogin = async () => {
    const isValid = validateForm();
    if (!isValid) {
      showMessage({
        message: 'Vui lòng nhập đúng thông tin',
        type: 'danger',
        icon: 'danger',
      });
      return;
    }

    try {
      console.log('Data gửi lên backend:', values);
      const data = await loginApi(values);

      console.log('Đăng nhập thành công:', data);
      showMessage({
        message: 'Đăng nhập thành công',
        type: 'success',
        icon: 'success',
      });

      navigation.replace('BottomTab', {screen: 'Home'});
    } catch (err) {
      console.log('Login error:', err);
      let message = 'Đăng nhập thất bại';
      if (err?.code && ErrorMap[err.code]) {
        message = ErrorMap[err.code];
      }

      showMessage({
        message,
        type: 'danger',
        icon: 'danger',
      });
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
            <Text style={styles.title}>
              Đăng nhập vào{'\n'}tài khoản của bạn.
            </Text>
            <Text style={styles.subtitle}>
              Vui lòng đăng nhập vào tài khoản của bạn
            </Text>

            <View style={styles.inputContainer}>
              <Input
                label="Email hoặc SĐT"
                placeholder="Nhập Email hoặc SĐT"
                placeholderTextColor="#ccc"
                value={values.emailPhone}
                onChangeText={text => handleChange('emailPhone', text)}
                keyboardType="email-address"
                error={getFieldError('emailPhone')}
                isError={isError('emailPhone')}
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={values.password}
                onChangeText={text => handleChange('password', text)}
                isPassword={true}
                autoComplete="password"
                textContentType="password"
                error={getFieldError('password')}
                isError={isError('password')}
                style={{marginBottom: 20}}
              />
            </View>

            <Button.Text
              title="Quên mật khẩu?"
              onPress={() => navigation.navigate('ForgotPassword')}
              textStyle={styles.forgotPassword}
            />
            <Button.Main
              title="Đăng nhập"
              onPress={handleLogin}
              style={styles.authButton}
            />
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>Hoặc đăng nhập bằng</Text>
              <View style={styles.line} />
            </View>
            <View style={styles.socialContainer}>
              <Button.Icon
                icon={
                  <FastImage
                    source={Images.google}
                    style={{width: 30, height: 30}}
                  />
                }
                onPress={() => console.log('Login with Google')}
                style={styles.socialButton}
              />
              <Button.Icon
                icon={
                  <FastImage
                    source={Images.facbook}
                    style={{width: 30, height: 30}}
                  />
                }
                onPress={() => console.log('Login with Facebook')}
                style={styles.socialButton}
              />
              <Button.Icon
                icon={
                  <FastImage
                    source={Images.apple}
                    style={{width: 30, height: 30}}
                  />
                }
                onPress={() => console.log('Login with Apple')}
                style={styles.socialButton}
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Chưa có tài khoản? </Text>
              <Button.Text
                title="Đăng ký"
                onPress={() => navigation.navigate('Register')}
                textStyle={styles.switchLink}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
