import { StyleSheet } from 'react-native';
import { scale } from '../../../utils/scaling';
import { Colors, FontSizes, FontWeights } from '../../../theme/theme';

const styles = StyleSheet.create({
  checkMark: {
  color: '#fff',       
  fontSize: scale(14),  // vừa ô vuông
  textAlign: 'center',
  lineHeight: scale(20), // canh giữa chiều cao 20
},

  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
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
    marginBottom: scale(20),
    lineHeight: scale(22),
  },
  inputContainer: {
    marginBottom: scale(20),
  },
  authButton: {
    marginBottom: scale(16),
    borderRadius: scale(40),
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

  // checkbox
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(4),
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: scale(8),
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
  linkText: {
    color: Colors.primary,
    fontWeight: FontWeights.semiBold,
  },
    socialIcon: {
    width: scale(30),
    height: scale(30),
  },

});


export default styles;
