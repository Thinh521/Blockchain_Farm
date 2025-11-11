import {Dimensions, StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    paddingBottom: scale(15),
    backgroundColor: Colors.green,
    zIndex: 1000,
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    color: Colors.white,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    marginLeft: scale(14),
  },
  scrollView: {
    flex: 1,
  },
  galleryContainer: {
    backgroundColor: Colors.white,
  },
  mainImage: {
    width,
    height: scale(250),
  },
  imageCounter: {
    position: 'absolute',
    top: scale(20),
    left: scale(20),
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: scale(12),
    paddingVertical: scale(4),
    borderRadius: 999,
  },
  imageCounterText: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
  thumbnailContainer: {
    padding: scale(20),
    paddingBottom: 0,
  },
  thumbnail: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(12),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderRadius: scale(12),
    borderColor: Colors.green,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    backgroundColor: Colors.white,
    padding: scale(20),
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productTitle: {
    color: Colors.title,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  qrBadge: {
    backgroundColor: Colors.white,
    paddingVertical: scale(2),
    paddingHorizontal: scale(6),
    alignItems: 'flex-end',
    borderWidth: 1,
    borderRadius: scale(8),
    borderColor: '#D1D5DB',
  },
  priceContainer: {
    marginTop: scale(8),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    color: '#DC2626',
  },
  stockText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: scale(20),
    marginTop: scale(20),
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    backgroundColor: Colors.white,
    marginTop: scale(20),
    paddingVertical: scale(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
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
  description: {
    fontSize: FontSizes.small,
    lineHeight: scale(18),
    color: Colors.gray,
    marginTop: scale(10),
    textAlign: 'justify',
  },
  loadingText: {
    textAlign: 'center',
    color: '#6B7280',
  },
  loadingMainText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyTraceability: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginTop: 8,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: FontWeights.semiBold,
    color: '#1F2937',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '85%',
    alignItems: 'center',
  },
  modalHeader2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(16),
    marginBottom: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    width: '100%',
  },
  productIcon: {
    fontSize: 28,
    marginRight: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.title,
  },
  modalImages: {
    width: scale(40),
    height: scale(40),
    borderRadius: 20,
    marginRight: 12,
  },
  qrText: {
    marginTop: 12,
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(16),
    marginTop: scale(20),
    width: '100%',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '500',
  },
  closeWrapper: {
    backgroundColor: '#E5E7EB',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#111827',
  },
});
export default styles;
