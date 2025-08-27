import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Text,
  View,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import styles from './Login.styles';
import Input from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButton/CustomButton';
import Images from '../../../assets/images/images';
import {
  validateEmail,
  validatePhone,
} from '../../../utils/validation/validation';
import {loginApi} from '../../../api/auth/auth';
import {ErrorMap} from '../../../utils/errorMapper/errorMapper';

const LoginScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [emailPhone, setemailPhone] = useState('');

  const handleLogin = async () => {
    if (!emailPhone || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập Email/SĐT và mật khẩu');
      return;
    }

    const isEmail = validateEmail(emailPhone);
    const isPhone = validatePhone(emailPhone);

    if (!isEmail && !isPhone) {
      Alert.alert('Lỗi', 'Vui lòng nhập đúng định dạng Email hoặc SĐT');
      return;
    }

    try {
      console.log('📤 Data gửi lên backend:', {emailPhone, password});
      const data = await loginApi({emailPhone, password});

      console.log('✅ Đăng nhập thành công:', data);
      Alert.alert('Thành công', 'Đăng nhập thành công');
      navigation.replace('Home');
    } catch (err) {
      console.log('❌ Login error:', err);
      let message = 'Đăng nhập thất bại';
      if (err?.code && ErrorMap[err.code]) {
        message = ErrorMap[err.code];
      }

      Alert.alert('Lỗi', message);
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
                label="Email"
                placeholder="Nhập Email"
                placeholderTextColor="#ccc"
                value={emailPhone}
                onChangeText={setemailPhone}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={password}
                onChangeText={setPassword}
                isPassword={true}
                autoComplete="password"
                textContentType="password"
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
