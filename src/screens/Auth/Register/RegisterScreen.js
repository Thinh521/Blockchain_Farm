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
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './Register.styles';
import Input from '../../../components/CustomInput/CustomInput';
import Button from '../../../components/CustomButton/CustomButton';
import Images from '../../../assets/images/images';
import {registerApi} from '../../../api/auth/auth';
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from '../../../utils/validation/validation';

const RegisterScreen = ({navigation}) => {
  const [form, setForm] = useState({email: '', username: '', password: ''});
  const [agree, setAgree] = useState(false);

  const handleChange = (key, value) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const handleRegister = async () => {
    if (!agree) {
      return Alert.alert(
        'Thông báo',
        'Bạn phải đồng ý với điều khoản để tiếp tục',
      );
    }

    if (
      !form.email.trim() ||
      !form.phone?.trim() ||
      !form.username.trim() ||
      !form.password.trim()
    ) {
      return Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
    }
    if (!validateEmail(form.email)) {
      return Alert.alert('Lỗi', 'Email không hợp lệ');
    }
    if (!/^[0-9]{10}$/.test(form.phone)) {
      return Alert.alert('Lỗi', 'Số điện thoại phải gồm đúng 10 chữ số');
    }
    if (!validatePassword(form.password)) {
      return Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
    }

    const payload = {
      userName: form.username,
      email: form.email,
      password: form.password,
      phone: form.phone,
    };

    const res = await registerApi(payload);

    if (res.success) {
      console.log('✅ Đăng ký thành công:', res);
      navigation.navigate('OTP', {type: 'register', email: form.email});
    } else {
      Alert.alert('Đăng ký thất bại', res.message);
    }
  };
  const inputs = [
    {
      label: 'Email',
      placeholder: 'Nhập Email',
      key: 'email',
      keyboardType: 'email-address',
    },
    {
      label: 'Số điện thoại',
      placeholder: 'Nhập số điện thoại',
      key: 'phone',
      keyboardType: 'numeric',
      maxLength: 10,
    },
    {
      label: 'Tên người dùng',
      placeholder: 'Nhập tên người dùng',
      key: 'username',
    },
    {
      label: 'Mật khẩu',
      placeholder: 'Nhập mật khẩu',
      key: 'password',
      isPassword: true,
    },
  ];

  const socialButtons = [
    {source: Images.google, action: () => console.log('Register with Google')},
    {
      source: Images.facbook,
      action: () => console.log('Register with Facebook'),
    },
    {source: Images.apple, action: () => console.log('Register with Apple')},
  ];

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

            {inputs.map(({label, placeholder, key, ...rest}) => (
              <View style={styles.inputContainer} key={key}>
                <Input
                  label={label}
                  placeholder={placeholder}
                  value={form[key]}
                  onChangeText={val => handleChange(key, val)}
                  {...rest}
                />
              </View>
            ))}

            {/* Checkbox */}
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
              onPress={handleRegister}
              style={styles.authButton}
            />

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>Hoặc đăng ký bằng</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialContainer}>
              {socialButtons.map((btn, index) => (
                <Button.Icon
                  key={index}
                  icon={
                    <FastImage source={btn.source} style={styles.socialIcon} />
                  }
                  onPress={btn.action}
                  style={styles.socialButton}
                />
              ))}
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
    </SafeAreaView>
  );
};

export default RegisterScreen;
