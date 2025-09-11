import {StyleSheet} from 'react-native';
import {Shadows} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  contaiber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: scale(20),
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    ...Shadows.medium,
  },
});
