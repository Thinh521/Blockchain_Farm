import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

export default StyleSheet.create({
  contaiber: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
  },
  seeAllButton: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    backgroundColor: '#F3F4F6',
    borderRadius: scale(12),
  },
  seeAllText: {
    color: '#6B7280',
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});
