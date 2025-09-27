import {Dimensions, StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const {width} = Dimensions.get('window');
const CARD_WIDTH = 160;
const CARD_HEIGHT = 240;

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
  sectionTitle: {fontSize: 18, fontWeight: '600', color: '#111827'},
  sectionSubtitle: {fontSize: 14, color: '#6B7280'},
  description: {fontSize: 16, lineHeight: 22, color: '#4B5563', marginTop: 8},

  // Related Products
  relatedList: {paddingHorizontal: 16},
  relatedCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginRight: 20,
  },
  relatedImageContainer: {height: 120, position: 'relative'},
  relatedImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e1e2e4ff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  relatedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(16,185,129,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  relatedBadgeText: {fontSize: 10, fontWeight: '600', color: Colors.white},
  relatedContent: {padding: 12, flex: 1, justifyContent: 'space-between'},
  relatedName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  relatedPrice: {
    fontSize: 16,
    fontWeight: FontWeights.semiBold,
    color: '#DC2626',
    marginBottom: 4,
  },
  relatedStock: {fontSize: 12, color: '#6B7280'},

  // Loading / Empty
  loadingText: {textAlign: 'center', color: '#6B7280'},
  loadingMainText: {marginTop: 16, fontSize: 16, color: '#6B7280'},
  emptyText: {textAlign: 'center', color: '#9CA3AF', fontSize: 14},

  // Error
  errorText: {fontSize: 16, color: '#6B7280', marginBottom: 16},
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
  // QrCode
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: FontWeights.semiBold,
    marginBottom: 16,
    color: '#1F2937',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Hash Container Styles
  hashContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },

  hashHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  hashLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4F46E5',
  },

  hashHint: {
    fontSize: 11,
    color: '#6B7280',
    fontStyle: 'italic',
  },

  hashText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  hashCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  hashStep: {
    fontWeight: '600',
    color: '#333',
  },
  hashText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
export default styles;
