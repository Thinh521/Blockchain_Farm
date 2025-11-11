import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    backgroundColor: Colors.white,
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border_2,
  },
  headerTitle: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    marginBottom: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: scale(20),
  },
  timeline: {
    paddingBottom: 20,
  },
  processCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border_2,
    padding: 16,
  },
  processHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border_2,
    paddingBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processHeaderText: {
    flex: 1,
    marginLeft: 12,
  },
  stepLabel: {
    color: Colors.gray,
    fontSize: FontSizes.small,
  },
  processTitle: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: 9999,
  },
  statusText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  detailsSection: {
    padding: scale(10),
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.title,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailBullet: {
    color: Colors.gray,
    fontSize: FontSizes.small,
    marginRight: 6,
  },
  detailText: {
    color: Colors.title,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
    flex: 1,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  imageButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  hashContainer: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hashLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 6,
  },
  hashValue: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'monospace',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  emptySubText: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalScrollView: {
    padding: 16,
  },
  modalImage: {
    width: '100%',
    height: 300,
    marginBottom: 12,
    borderRadius: 8,
  },
});

export default styles;
