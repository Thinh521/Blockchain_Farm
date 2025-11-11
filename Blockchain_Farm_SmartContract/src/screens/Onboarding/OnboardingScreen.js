import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import onboardingData from '../../data/onboardingData';
import {Arrow_Right_S_Icon} from '../../assets/icons';
import Images from '../../assets/images/images';
import {setOnboarding} from '../../utils/storage/onboardingStorage';
import styles from './Onboarding.styles';

const {width: screenWidth} = Dimensions.get('window');

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const progressAnim = useRef(new Animated.Value(0.33)).current;

  const handleScroll = event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentIndex(roundIndex);

    let progress;
    if (roundIndex === 0) progress = 0.33;
    else if (roundIndex === 1) progress = 0.66;
    else progress = 1.0;

    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const goToNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);

      let progress;
      if (nextIndex === 0) progress = 0.33;
      else if (nextIndex === 1) progress = 0.66;
      else progress = 1.0;

      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setOnboarding('onboarding', true);
    }
  };

  const renderProgressButton = () => {
    const size = 64;
    const strokeWidth = 3;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    return (
      <TouchableOpacity onPress={goToNext} style={styles.progressButton}>
        <Svg
          width={size}
          height={size}
          style={{position: 'absolute'}}
          viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#007E2F"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [circumference, 0],
            })}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>

        <View style={styles.nextButtonInner}>
          <Arrow_Right_S_Icon style={styles.nextArrow} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <FastImage
            source={Images.logo_text}
            style={styles.logo}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}>
        {onboardingData.map(item => (
          <View key={item.id} style={styles.slide}>
            <View style={styles.illustrationContainer}>
              <FastImage
                source={item.image}
                style={styles.onboardingImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex ? '#007E2F' : '#E5E7EB',
                  width: index === currentIndex ? 20 : 8,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setOnboarding('onboarding', true);
            }}
            style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          {renderProgressButton()}
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;
