import {StyleSheet, Dimensions} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: 'center',
    paddingTop: scale(30),
    paddingBottom: scale(20),
    paddingHorizontal: scale(20),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: scale(140),
    height: scale(140),
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    width: screenWidth,
    paddingHorizontal: scale(20),
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(40),
  },
  onboardingImage: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.4,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: scale(40),
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.primary,
    textAlign: 'center',
    lineHeight: scale(28),
    marginBottom: scale(16),
  },
  description: {
    lineHeight: scale(20),
    color: Colors.gray,
    fontSize: FontSizes.medium,
    textAlign: 'center',
  },
  bottomSection: {
    paddingBottom: scale(50),
    paddingHorizontal: scale(20),
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(40),
  },
  dot: {
    height: scale(8),
    borderRadius: 9999,
    marginHorizontal: scale(4),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipButton: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(20),
  },
  skipText: {
    color: Colors.gray,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  progressButton: {
    position: 'relative',
    width: scale(64),
    height: scale(64),
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(48),
    height: scale(48),
    borderRadius: 9999,
    backgroundColor: Colors.primary,
  },
  nextArrow: {
    color: Colors.white,
  },
});
