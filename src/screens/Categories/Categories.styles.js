import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  addButton: {
    width: scale(160),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80%',
  },
  errorText: {
    color: Colors.title,
    textAlign: 'center',
    marginBottom: scale(20),
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
  },
  refetchButton: {
    width: scale(160),
    borderRadius: 999,
  },
});

export default styles;
