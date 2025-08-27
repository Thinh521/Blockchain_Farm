import React, {useState, useEffect, useRef} from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../../components/CustomButton/CustomButton';
import styles from './OTPScreen.styles';
import {ClockIcon} from '../../../assets/icons';
import { verifyOtpApi } from '../../../api/auth/verifyOtp';


const OTPScreen = ({navigation, route}) => {
  const {type, email} = route.params || {};
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0].focus();
      }, 100);
    }
  }, []);

  useEffect(() => {
    let interval = null;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleOTPChange = (value, index) => {
    const newOtpCode = [...otpCode];
    newOtpCode[index] = value;
    setOtpCode(newOtpCode);

    if (value && index < 5) {
      setCurrentIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otpCode[index] && index > 0) {
      setCurrentIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };
const handleContinue = async () => {
  const code = otpCode.join('');
  if (code.length !== 6) {
    Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ mã OTP');
    return;
  }

  try {
    const payload = { email, type, otp: code };
    const res = await verifyOtpApi(payload);

    if (res.success) {
      Alert.alert('Thành công', res.message, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } else {
      // ❌ Sai OTP hoặc lỗi khác
      Alert.alert('Lỗi', res.message || 'Xác thực OTP thất bại');
    }
  } catch (err) {
    console.log('Xác thực OTP thất bại:', err);
    Alert.alert('Lỗi', err?.message || 'Không thể xác thực OTP');
  }
};


  const handleResend = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtpCode(['', '', '', '', '', '']);
      setCurrentIndex(0);
      // Focus lại vào ô đầu tiên
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
      console.log('Resend OTP');
    }
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const renderOTPInput = () => {
    return (
      <View style={styles.otpContainer}>
        {otpCode.map((digit, index) => (
          <View
            key={index}
            style={[
              styles.otpBox,
              currentIndex === index && styles.otpBoxFocused,
            ]}>
            <TextInput
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              value={digit}
              onChangeText={value => handleOTPChange(value, index)}
              onKeyPress={e => handleOTPKeyPress(e, index)}
              onFocus={() => setCurrentIndex(index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
              textAlign="center"
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>OTP</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.title}>Email verification</Text>
            <Text style={styles.subtitle}>
              Enter the verification code we send you on:{'\n'}
              example****@gmail.com
            </Text>

            {/* OTP Input */}
            {renderOTPInput()}

            {/* Timer and Resend */}
            <View style={styles.timerContainer}>
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive code? </Text>
                <Button.Text
                  title="Resend"
                  onPress={handleResend}
                  textStyle={styles.resendLink}
                />
              </View>

              <View style={styles.timerRow}>
                <ClockIcon />
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
              </View>
            </View>

            {/* Continue Button */}
            <Button.Main
              title="Continue"
              onPress={handleContinue}
              style={[
                styles.continueButton,
                otpCode.join('').length === 6 && styles.continueButtonActive,
              ]}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPScreen;
