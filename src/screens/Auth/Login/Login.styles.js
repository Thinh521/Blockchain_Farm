import {StyleSheet} from 'react-native';
import {scale} from '../../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: scale(20),
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
    marginBottom: scale(32),
    lineHeight: scale(22),
  },
  inputContainer: {
    marginBottom: scale(20),
  },
  forgotPassword: {
    fontSize: FontSizes.small,
    textAlign: 'right',
    marginBottom: scale(20),
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(20),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  orText: {
    marginHorizontal: scale(12),
    color: Colors.gray,
    fontSize: FontSizes.small,
    textAlign: 'center',
    marginBottom: scale(5),
  },
  authButton: {
    marginBottom: scale(16),
    borderRadius: scale(40),
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(16),
    marginBottom: scale(24),
  },
  socialButton: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  socialIcon: {
    fontSize: FontSizes.large,
    color: Colors.gray,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: {
    color: Colors.gray,
    fontSize: FontSizes.small,
  },
  switchLink: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    color: Colors.primary,
  },
});

export default styles;