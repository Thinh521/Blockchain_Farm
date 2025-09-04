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
import styles from './ForgotPassword.styles';
import Input from '../../components/CustomInput/CustomInput';
import Button from '../../components/CustomButton/CustomButton';
import {validateEmail} from '../../utils/validation/validation';
import {forgotPasswordApi} from '../../api/auth/auth';
import {ErrorMap} from '../../utils/errorMapper/errorMapper';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

const handleContinue = async () => {
  if (!email) {
    Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ email');
    return;
  }

  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    Alert.alert('Lỗi', 'Vui lòng nhập đúng định dạng email');
    return;
  }

  try {
    setLoading(true);
    const res = await forgotPasswordApi({ email });

    if (res.success) {
      Alert.alert('Thành công', 'Chúng tôi đã gửi mã OTP về email', [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('OTP', {
              email,
              type: 'resetPassword',
            }),
        },
      ]);
    } else {
      Alert.alert('Lỗi', res.message);
    }
  } catch (err) {
    console.log('❌ Forgot password error:', err);
    Alert.alert('Lỗi', 'Không thể gửi email');
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
            <Text style={styles.title}>Forgot password?</Text>
            <Text style={styles.subtitle}>
              Enter your email address and we'll send you{'\n'}confirmation code to reset your password
            </Text>

            <View style={styles.inputContainer}>
              <Input
                label="Email Address"
                placeholder="Albertstevano@gmail.com"
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
              />
            </View>

            <Button.Main
              title="Continue"
              onPress={handleContinue}
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
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;