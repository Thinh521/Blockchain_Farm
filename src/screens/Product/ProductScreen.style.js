import { Dimensions, StyleSheet } from "react-native";
const {width} = Dimensions.get('window');
const CARD_WIDTH = 160;
const CARD_HEIGHT = 240;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingBottom: 20},
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollView: {flex: 1},

  // Gallery
  galleryContainer: {backgroundColor: '#fff'},
  mainImage: {width, height: 320, backgroundColor: '#F9FAFB'},
  imageCounter: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageCounterText: {color: '#fff', fontSize: 12, fontWeight: '500'},
  thumbnailContainer: {paddingHorizontal: 16, paddingVertical: 16},
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {borderColor: '#10B981'},
  thumbnailImage: {width: '100%', height: '100%'},

  // Placeholder
  placeholderContainer: {
    width,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  placeholderText: {fontSize: 16, color: '#6B7280'},

  // Product Info
  productInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  categoryPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  categoryText: {fontSize: 12, fontWeight: '600', color: '#10B981'},
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  price: {fontSize: 26, fontWeight: 'bold', color: '#DC2626'},
  stockText: {fontSize: 14, fontWeight: '600'},

  // Section
  section: {backgroundColor: '#fff', marginTop: 8, padding: 16},
  sectionContainer: {
    backgroundColor: '#fff',
    marginTop: 8,
    paddingVertical: 10,
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
    backgroundColor: '#fff',
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
  relatedBadgeText: {fontSize: 10, fontWeight: '600', color: '#fff'},
  relatedContent: {padding: 12, flex: 1, justifyContent: 'space-between'},
  relatedName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  relatedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
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
  primaryButtonText: {color: '#fff', fontSize: 16, fontWeight: '600'},

   // Traceability Section Styles
  traceabilityItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  traceabilityTimeline: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  timelineIconText: {
    fontSize: 18,
  },
  timelineLine: {
    position: 'absolute',
    top: 40,
    width: 2,
    height: '100%',
    backgroundColor: '#E5E7EB',
    marginTop: 8,
  },
  traceabilityContent: {
    flex: 1,
  },
  traceabilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#d0d3d9ff',
  
  },
  traceabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  traceabilityStep: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  traceabilityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  traceabilityDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  traceabilityDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 13,
    color: '#6B7280',
    minWidth: 120,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    color: '#111827',
    flex: 1,
    fontWeight: '600',
  },
  additionalDetails: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  additionalDetailsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
  },
  traceabilityImages: {
    marginTop: 8,
  },
  traceabilityImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
  },
  traceabilityLoading: {
    alignItems: 'center',
    paddingVertical: 32,
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
    fontWeight: 'bold',
    color: '#1F2937',
  },
  qrBadge: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
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
    fontWeight: 'bold',
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
});
export default styles;