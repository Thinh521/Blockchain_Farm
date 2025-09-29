import React, {useEffect, useRef} from 'react';
import {Text, View, SafeAreaView, Animated} from 'react-native';
import {
  AppKitButton,
  useAppKitAccount,
} from '@reown/appkit-ethers-react-native';
import Icon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';

import Header from '../../components/Header/Header';
import Images from '../../assets/images/images';

import styles from './ManageScreen.styles';

const FloatingIcon = ({name, style, animationDelay = 0}) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startBouncing = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
            delay: animationDelay,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    const timer = setTimeout(startBouncing, animationDelay);
    return () => clearTimeout(timer);
  }, [bounceAnim, animationDelay]);

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{translateY}],
        },
      ]}>
      <Icon name={name} size={40} color="#000" style={{opacity: 0.1}} />
    </Animated.View>
  );
};

const ManageScreen = () => {
  const {isConnected} = useAppKitAccount();
  const navigation = useNavigation();
  const logoScaleAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(logoScaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 3,
      useNativeDriver: true,
    }).start();

    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 5,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (isConnected) {
      navigation.navigate('BottomTab', {
        screen: 'FarmRegistration',
      });
    }
  }, [isConnected, navigation]);

  const renderConnectScreen = () => (
    <View style={styles.connectContainer}>
      <FloatingIcon name="sun" style={styles.floatingIcon1} />
      <FloatingIcon
        name="feather"
        style={styles.floatingIcon2}
        animationDelay={1000}
      />
      <FloatingIcon
        name="edit-3"
        style={styles.floatingIcon3}
        animationDelay={2000}
      />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{scale: logoScaleAnim}],
          },
        ]}>
        <FastImage
          source={Images.logo_remove}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Kết nối ví của bạn</Text>
        <Text style={styles.subtitle}>
          Để bắt đầu hành trình quản lý nông sản thông minh, vui lòng kết nối ví
          của bạn.
        </Text>
      </View>

      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [{scale: buttonScaleAnim}],
          },
        ]}>
        <AppKitButton balance="show" />
      </Animated.View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Kết nối ví"
        subtitle="Liên kết ví để sử dụng đầy đủ tính năng"
        emoji="👛"
        showBack={true}
      />

      <View style={{flex: 1}}>{renderConnectScreen()}</View>
    </SafeAreaView>
  );
};

export default ManageScreen;
