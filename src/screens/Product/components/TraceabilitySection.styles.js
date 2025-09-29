import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

const traceabilityStyles = StyleSheet.create({
  container: {
    marginTop: scale(20),
    backgroundColor: Colors.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginVertical: scale(20),
    marginBottom: scale(30),
  },
  sectionTitle: {
    color: Colors.title,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  sectionSubtitle: {
    color: Colors.gray,
    fontSize: FontSizes.small,
  },
  traceabilityItem: {
    flexDirection: 'row',
    marginBottom: scale(16),
    paddingHorizontal: scale(20),
  },
  traceabilityTimeline: {
    alignItems: 'center',
    marginRight: scale(14),
  },
  timelineIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  timelineIconText: {
    fontSize: FontSizes.regular,
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
    borderRadius: scale(12),
    backgroundColor: Colors.white,
    padding: scale(16),
    borderWidth: 1,
    borderColor: Colors.border_2,
  },
  traceabilityHeader: {
    marginBottom: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  traceabilityStep: {
    color: Colors.title,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  statusBadge: {
    borderRadius: 9999,
    paddingVertical: scale(4),
    paddingHorizontal: scale(12),
  },
  statusText: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    color: Colors.white,
  },
  traceabilityTitle: {
    color: Colors.title,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
    marginBottom: scale(10),
  },
  traceabilityDescription: {
    color: Colors.gray,
    fontSize: FontSizes.small,
    lineHeight: scale(18),
    marginBottom: scale(12),
  },
  additionalDetails: {
    marginTop: scale(4),
    marginBottom: scale(10),
    paddingTop: scale(10),
    borderTopWidth: 1,
    borderTopColor: Colors.border_2,
  },
  additionalDetailsTitle: {
    color: '#374151',
    marginBottom: scale(8),
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scale(6),
  },
  detailLabel: {
    fontWeight: '500',
    color: Colors.gray,
    fontSize: FontSizes.small,
  },
  detailValue: {
    flex: 1,
    color: Colors.title,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
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
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
  },
  hashText: {
    color: Colors.title,
    fontFamily: 'monospace',
    fontSize: FontSizes.small,
    backgroundColor: Colors.white,
    padding: scale(8),
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
  },
  hashCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  hashStep: {
    fontWeight: FontWeights.semiBold,
    color: '#333',
  },
  hashTextSmall: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default traceabilityStyles;
