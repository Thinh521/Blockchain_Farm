import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

export default StyleSheet.create({
  contaiber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: scale(20),
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
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingSpinner: {
    width: 60,
    height: 60,
    backgroundColor: '#ECFDF5',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  loadingEmoji: {
    fontSize: 28,
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
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
