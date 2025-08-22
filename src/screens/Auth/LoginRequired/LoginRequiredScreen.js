import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import styles from './LoginRequired.styles';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/core';
import Images from '../../../assets/images/images';
import Button from '../../../components/CustomButton/CustomButton';

const LoginRequiredScreen = () => {
  const navigation = useNavigation();

  const NavigateToLogin = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Login',
    });
  };

  const NavigateToRegister = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Register',
    });
  };

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.container}>
        <View style={styles.imagesComtainer}>
          <LinearGradient
            colors={['#D6F5E3', '#FFFFFF']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.circleBackground}
          />
          <FastImage
            source={Images.login_required}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.description}>
          Quản lý thị trường nông sản dễ dàng, chính xác và thông minh hơn bao
          giờ hết.
        </Text>
        <Button.Main
          title="Đăng ký"
          style={styles.createButton}
          onPress={NavigateToRegister}
        />
        <Button.Main
          title="Đăng nhập"
          style={styles.signInButton}
          textStyle={styles.signInButtonText}
          onPress={NavigateToLogin}
        />
      </View>
    </>
  );
};

export default LoginRequiredScreen;
