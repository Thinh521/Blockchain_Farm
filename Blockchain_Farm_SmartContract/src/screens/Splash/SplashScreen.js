import React from 'react';
import {StatusBar, View} from 'react-native';
import styles from './Splash.styles';
import FastImage from 'react-native-fast-image';
import Images from '../../assets/images/images';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      <FastImage
        source={Images.logo_text}
        style={styles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default SplashScreen;
