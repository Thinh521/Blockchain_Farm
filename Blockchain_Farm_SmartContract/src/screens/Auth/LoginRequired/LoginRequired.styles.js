import {StyleSheet} from 'react-native';
import {Colors, FontSizes} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: scale(20),
  },
  imagesComtainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBackground: {
    position: 'absolute',
    top: scale(-14),
    width: scale(200),
    height: scale(200),
    borderRadius: scale(100),
  },
  illustration: {
    width: scale(160),
    height: scale(160),
    marginBottom: scale(60),
  },
  description: {
    lineHeight: scale(20),
    textAlign: 'center',
    color: Colors.gray,
    fontSize: FontSizes.medium,
    marginBottom: scale(60),
    paddingHorizontal: scale(20),
  },
  createButton: {
    width: '100%',
    borderRadius: 999,
    marginBottom: 10,
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  signInButtonText: {
    color: Colors.primary,
  },
});
