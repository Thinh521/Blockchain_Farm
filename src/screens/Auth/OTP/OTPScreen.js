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
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {showMessage} from 'react-native-flash-message';
import Button from '../../../components/CustomButton/CustomButton';
import styles from './OTPScreen.styles';
import {ClockIcon} from '../../../assets/icons';
import {verifyOtpApi, resendOtpApi} from '../../../api/auth/verifyOtp';
import LoadingOverlay from '../../../components/CustomLoading/LoadingOverlay';
const OTPScreen = ({navigation, route}) => {
  const {type, email} = route.params || {};
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false); // ✅ state loading
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
        setTimer(t => t - 1);
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
  Keyboard.dismiss();
  const code = otpCode.join('');
  if (code.length !== 6) {
    return showMessage({
      message: 'Lỗi',
      description: 'Vui lòng nhập đầy đủ mã OTP',
      type: 'danger',
    });
  }

  try {
    setLoading(true); 
    const payload = {email, type, otp: code};
    const res = await verifyOtpApi(payload);

    if (res.success) {
      if (type === 'resetPassword') {
        showMessage({
          message: 'Thành công',
          description: 'Xác thực OTP thành công',
          type: 'success',
        });
        navigation.navigate('ResetPassword', {email});
      } else if (type === 'updateEmail') {
        showMessage({
          message: 'Thành công',
          description: 'Xác thực OTP thành công',
          type: 'success',
        });
        navigation.goBack();
      } else {
        showMessage({
          message: 'Thành công',
          description: res.message || 'Xác thực OTP thành công',
          type: 'success',
        });
        navigation.navigate('Login');
      }
    } else {
      showMessage({
        message: 'Lỗi',
        description: res.message || 'Xác thực OTP thất bại',
        type: 'danger',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Lỗi',
      description: 'Không thể xác thực OTP',
      type: 'danger',
    });
  } finally {
    setLoading(false); 
  }
};


  const handleResend = async () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtpCode(['', '', '', '', '', '']);
      setCurrentIndex(0);

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);

      try {
        setLoading(true); // ✅ bật loading
        const res = await resendOtpApi({email, type});
        if (res.success) {
          showMessage({
            message: 'Thành công',
            description: res.message || 'Đã gửi lại OTP',
            type: 'success',
          });
        } else {
          showMessage({
            message: 'Lỗi',
            description: res.message || 'Không thể gửi lại OTP',
            type: 'danger',
          });
        }
      } catch (err) {
        console.log('❌ Resend OTP error:', err);
        showMessage({
          message: 'Lỗi',
          description: 'Không thể gửi lại OTP',
          type: 'danger',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const renderOTPInput = () => (
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
              Enter the verification code we sent to:{'\n'}
              {email}
            </Text>

            {renderOTPInput()}

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
      {loading && <LoadingOverlay />}
    </SafeAreaView>
  );
};

export default OTPScreen;
