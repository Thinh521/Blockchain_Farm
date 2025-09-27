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
  emptyText: {
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    textAlign: 'center',
  },
  list: {
    paddingTop: scale(20),
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    marginBottom: scale(15),
    borderWidth: 1,
    borderColor: Colors.border_2,
    overflow: 'hidden',
  },
  trendingBadge: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    paddingHorizontal: scale(10),
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  trendingText: {
    color: Colors.white,
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.black,
  },
  productImageWrapper: {
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: scale(120),
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productContent: {
    padding: scale(16),
  },
  titleContainer: {
    marginTop: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    lineHeight: scale(18),
    textAlign: 'left',
  },
  processButton: {
    marginTop: scale(4),
    backgroundColor: Colors.primary,
    paddingHorizontal: scale(8),
    paddingVertical: scale(10),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  processButtonText: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
  },
});

export default styles;
