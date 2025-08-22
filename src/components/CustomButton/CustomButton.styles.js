import {StyleSheet} from 'react-native';
import {Colors} from '../../theme/theme';
import {scale} from '../../utils/scaling';
import {FontSizes, FontWeights} from '../../theme/theme';

export const styles = StyleSheet.create({
  baseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    minHeight: scale(44),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    backgroundColor: Colors.primary,
  },
  selectButton: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: '#b0ffce',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: Colors.gray,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContentSelect: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  baseText: {
    fontWeight: FontWeights.semiBold,
    fontSize: FontSizes.medium,
    lineHeight: scale(24),
    color: Colors.white,
  },
  disabledText: {
    color: Colors.gray,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: scale(8),
  },
  iconRight: {
    marginLeft: scale(8),
  },
  loadingIndicator: {
    marginRight: scale(8),
  },
  textButtonText: {
    color: Colors.primary,
    fontWeight: FontWeights.semiBold,
    fontSize: FontSizes.medium,
    lineHeight: scale(24),
  },
  disabledTextButton: {
    opacity: 0.6,
  },
  disabledTextButtonText: {
    color: Colors.gray,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10),
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10),
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
});