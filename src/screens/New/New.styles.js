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
    paddingHorizontal: 12,
    height: scale(40),
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
    padding: 10,
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
    backgroundColor: '#10B981',
    paddingVertical: scale(10),
    paddingHorizontal: 12,
    borderRadius: 8,
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
});
