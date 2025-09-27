import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: scale(138),
    position: 'relative',
    backgroundColor: Colors.primary,
  },
  headerContent: {
    flex: 1,
    paddingTop: scale(14),
    paddingHorizontal: scale(20),
    justifyContent: 'space-between',
  },
  welcomeSection: {
    marginBottom: scale(6),
  },
  welcomeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#D1FAE5',
    marginBottom: scale(2),
    fontSize: FontSizes.small,
  },
  appTitle: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.semiBold,
  },
  headerActions: {
    gap: scale(10),
    flexDirection: 'row',
  },
  notificationButton: {
    width: scale(38),
    height: scale(38),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
  },
  profileButton: {
    width: scale(38),
    height: scale(38),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    marginLeft: 12,
  },
  carouselSection: {
    paddingTop: 20,
    paddingBottom: 16,
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
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    backgroundColor: Colors.background,
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
