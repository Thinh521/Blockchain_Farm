import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';

const styles = StyleSheet.create({
  whiteBackground: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    paddingBottom: scale(80),
  },
  menuItemContainer: {
    marginBottom: scale(16),
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.border_2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    borderLeftWidth: scale(4),
    borderLeftColor: Colors.primary,
  },
  menuItemCompleted: {
    borderLeftColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  menuItemActive: {
    borderLeftWidth: scale(6),
    backgroundColor: '#E3F2FD',
  },
  menuItemLeft: {
    flex: 1,
  },
  menuItemText: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#333333',
  },
  menuItemDescription: {
    fontSize: scale(12),
    color: '#666666',
    marginTop: scale(4),
    lineHeight: scale(16),
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: scale(20),
    borderBottomLeftRadius: scale(12),
    borderBottomRightRadius: scale(12),
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  inputGroup: {
    marginBottom: scale(16),
  },
  inputLabel: {
    fontSize: FontSizes.small,
    fontWeight: '500',
    color: '#333333',
    marginBottom: scale(8),
  },
  uploadButton: {
    borderWidth: scale(2),
    borderColor: Colors.gray,
    borderStyle: 'dashed',
    borderRadius: scale(8),
    paddingVertical: scale(40),
    paddingHorizontal: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(8),
  },
  uploadText: {
    color: Colors.gray,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    marginTop: scale(8),
    textAlign: 'center',
  },
  imagePreviewContainer: {
    position: 'relative',
    marginVertical: scale(8),
    alignSelf: 'center',
  },
  imagePreview: {
    width: scale(200),
    height: scale(140),
    borderRadius: scale(8),
  },
  farmImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(4),
  },
  farmImageContainer: {
    position: 'relative',
    marginRight: scale(12),
  },
  farmImagePreview: {
    width: scale(100),
    height: scale(80),
    borderRadius: scale(6),
  },
  removeImageButton: {
    position: 'absolute',
    top: scale(-8),
    right: scale(-8),
    backgroundColor: '#FF4444',
    borderRadius: scale(15),
    width: scale(30),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  addFarmImageButton: {
    width: scale(100),
    height: scale(80),
    borderRadius: scale(6),
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitContainer: {
    padding: scale(20),
    backgroundColor: Colors.white,
    borderTopWidth: scale(1),
    borderTopColor: '#E0E0E0',
  },
  dropdownButton: {
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: scale(8),
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  dropdownList: {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: scale(72),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: scale(8),
    marginTop: scale(2),
    backgroundColor: Colors.white,
    overflow: 'hidden',
    zIndex: 1,
  },
  optionItem: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionItemSelected: {
    backgroundColor: Colors.primary + '20',
  },
  optionText: {
    fontSize: FontSizes.small,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: FontWeights.bold,
  },
});

export default styles;
