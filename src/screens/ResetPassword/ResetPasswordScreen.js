import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Text,
  View,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './ResetPassword.styles';
import Input from '../../components/CustomInput/CustomInput';
import Button from '../../components/CustomButton/CustomButton';
import {resetPasswordApi} from '../../api/auth/auth';
import {ErrorMap} from '../../utils/errorMapper/errorMapper';
import {Arrow_Left_S_Icon} from '../../assets/icons';

const ResetPasswordScreen = ({navigation, route}) => {
  const {email} = route.params || {};
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = password => {
    return password.length >= 8;
  };

  const handleVerifyAccount = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (!validatePassword(newPassword)) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      setLoading(true);
      console.log('Data gửi lên backend:', {email, newPassword});
      const data = await resetPasswordApi({email, newPassword});

      if (data.success) {
        console.log(' Đặt lại mật khẩu thành công:', data);
        Alert.alert('Thành công', 'Mật khẩu đã được đặt lại thành công', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } else {
        console.log(' Đặt lại mật khẩu thất bại:', data);
        Alert.alert('Lỗi', data.message || 'Đặt lại mật khẩu thất bại');
      }
    } catch (err) {
      console.log(' Reset password error:', err);
      let message = 'Đặt lại mật khẩu thất bại';
      if (err?.code && ErrorMap[err.code]) {
        message = ErrorMap[err.code];
      }

      Alert.alert('Lỗi', message);
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

            <View style={styles.inputContainer}>
              <Input
                label="New Password"
                placeholder="••••••••••"
                value={newPassword}
                onChangeText={setNewPassword}
                isPassword={true}
                autoComplete="new-password"
                textContentType="newPassword"
              />
              <Text style={styles.helperText}>
                Must be at least 8 character
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Confirm Password"
                placeholder="••••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword={true}
                autoComplete="new-password"
                textContentType="newPassword"
              />
              <Text style={styles.helperText}>Both password must match</Text>
            </View>

            <Button.Main
              title="Verify Account"
              onPress={handleVerifyAccount}
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
