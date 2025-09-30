import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';
import {scale} from '../../utils/scaling';

const LoadingOverlay = () => {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content"/>

      <View style={styles.overlay}>
        <LottieView
          ref={animationRef}
          source={require('../../assets/animations/loading_2.json')}
          loop
          style={styles.animation}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: scale(200),
    height: scale(200),
  },
});

export default LoadingOverlay;
