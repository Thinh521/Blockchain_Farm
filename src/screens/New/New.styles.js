import {Dimensions, StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    marginBottom: scale(30),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: scale(12),
    height: scale(44),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#111',
    fontSize: 14,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: '#10B981',
    padding: scale(12),
    borderRadius: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPosts: {
    color: Colors.title,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
  },
  addPostButton: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    paddingVertical: scale(10),
    paddingHorizontal: scale(14),
    borderRadius: scale(10),
  },
  addPostText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: FontWeights.semiBold,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImageWrapper: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  emptyWrapper: {
    marginTop: scale(150),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#307EF4',
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  bottomSheetContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  bottomSheetHandle: {
    backgroundColor: Colors.bottomSheetHandle,
  },
  bottomSheetContent: {
    flex: 1,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: scale(16),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  bottomSheetHeaderTitle: {
    color: Colors.title,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  tabNavigation: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    paddingTop: scale(8),
    marginBottom: scale(16),
  },
  tabItem: {
    flex: 1,
    gap: scale(8),
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    justifyContent: 'center',
  },
  tabItemActive: {
    borderBottomColor: Colors.green,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#666',
  },
  tabTextActive: {
    fontWeight: '600',
    color: Colors.green,
  },
  filterContent: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
  },
  bottomSheetActions: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
    borderTopWidth: 1,
    borderTopColor: Colors.border_2,
    gap: scale(10),
    marginTop: 'auto',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  cancelButtonText: {
    color: '#666',
  },
  applyButton: {
    flex: 1,
  },
});
