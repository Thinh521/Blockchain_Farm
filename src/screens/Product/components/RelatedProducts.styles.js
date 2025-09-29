import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: Colors.white,
    padding: scale(20),
    paddingBottom: scale(80),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default styles;
