import {StyleSheet} from 'react-native';
import {Colors, FontSizes} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  label: {
    fontSize: FontSizes.small,
    marginBottom: scale(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    backgroundColor: Colors.white,
    width: '100%',
    height: scale(50),
  },
  input: {
    flex: 1,
    fontSize: FontSizes.medium,
    paddingVertical: 0,
    height: '100%',
  },
  disabledContainer: {
    backgroundColor: '#e0e0e0',
    borderColor: '#d0d0d0',
    opacity: 0.6,
  },
  leftIcon: {
    marginRight: scale(8),
  },
  rightContent: {
    marginLeft: scale(8),
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  rightIcon: {
    width: 24,
    height: 24,
  },
});