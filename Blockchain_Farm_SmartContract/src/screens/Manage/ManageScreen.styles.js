import {Dimensions, StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes} from '../../theme/theme';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  connectContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  floatingIcon1: {
    position: 'absolute',
    top: height * 0.15,
    left: 40,
  },
  floatingIcon2: {
    position: 'absolute',
    top: height * 0.25,
    right: 60,
  },
  floatingIcon3: {
    position: 'absolute',
    bottom: height * 0.1,
    left: 60,
  },
  logoContainer: {
    marginBottom: 32,
    position: 'relative',
  },
  logo: {
    width: scale(160),
    height: scale(160),
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    color: '#16a34a',
    textAlign: 'center',
    marginBottom: scale(8),
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: scale(20),
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '50%',
    marginBottom: 64,
  },
});
