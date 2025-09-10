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
    // justifyContent: 'center',
  },
  header: {
    marginTop:15,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  height: scale(30),
},

backButton: {
  position: 'absolute',
  left: scale(20),
  width: scale(20),
  height: scale(20),
  justifyContent: 'center',
  alignItems: 'center',
  padding:17,
  borderWidth:2,
  borderColor:'#EDEDED',
  borderRadius:20
},

headerTitle: {
  fontSize: FontSizes.medium,
  fontWeight: FontWeights.bold,
  color: Colors.title,
  textAlign: 'center',
},
  title: {
    fontSize: FontSizes.xxlarge,
    fontWeight: FontWeights.bold,
    color: Colors.title,
    marginBottom: scale(8),
    lineHeight: scale(30),
    marginTop: scale(60),
  },
  subtitle: {
    fontSize: FontSizes.medium,
    color: Colors.gray,
    marginBottom: scale(40),
    lineHeight: scale(22),
  },
  inputContainer: {
    marginBottom: scale(20),
  },
  verifyButton: {
    marginTop: scale(20),
    borderRadius: scale(40),
  },
});

export default styles;