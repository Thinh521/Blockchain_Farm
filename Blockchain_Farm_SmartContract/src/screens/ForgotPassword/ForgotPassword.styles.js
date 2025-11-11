import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: scale(24),
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSizes.xxlarge,
    fontWeight: FontWeights.bold,
    color: Colors.title,
    marginBottom: scale(8),
    lineHeight: scale(30),
  },
  subtitle: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
    marginBottom: scale(40),
    lineHeight: scale(22),
  },
  inputContainer: {
    marginBottom: scale(32),
  },
  continueButton: {
    marginBottom: scale(24),
    borderRadius: scale(40),
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: Colors.gray,
    fontSize: FontSizes.small,
  },
  backLink: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    color: Colors.primary,
  },
});

export default styles;