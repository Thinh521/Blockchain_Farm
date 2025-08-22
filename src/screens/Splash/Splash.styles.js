import {StyleSheet} from 'react-native';
import {Colors} from '../../theme/theme';
import {scale} from '../..//utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  logo: {
    width: scale(200),
    height: scale(200),
  },
});
