// FormWizard.style.js - Style file chung cho FormWizard component
import { StyleSheet } from 'react-native';
import { scale } from '../../utils/scaling';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  // Container chính
  whiteBackground: {
    flex: 1,
    backgroundColor: '#f0f0f0ff',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  // Content
  content: {
    flexGrow: 1,
    paddingHorizontal: scale(16),
    paddingTop: scale(20),
    paddingBottom: scale(80),
  },

  // Menu Item (Accordion)
  menuItemContainer: {
    marginBottom: scale(16),
    backgroundColor: '#fff',
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: 'rgba(219, 31, 31, 0.05)',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    borderLeftWidth: scale(4),
    borderLeftColor: '#4CAF50',
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

  // Form Section
  formSection: {
    backgroundColor: '#FFFFFF',
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
    fontSize: scale(14),
    fontWeight: '500',
    color: '#333333',
    marginBottom: scale(8),
  },

  // Image Upload
  uploadButton: {
    borderWidth: scale(2),
    borderColor: Colors.green,
    borderStyle: 'dashed',
    borderRadius: scale(8),
    paddingVertical: scale(40),
    paddingHorizontal: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(8),
    backgroundColor: '#F8FFF8',
  },
  uploadText: {
    fontSize: scale(14),
    color: Colors.green,
    fontWeight: '500',
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
    height: scale(150),
    borderRadius: scale(8),
    backgroundColor: '#F5F5F5',
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
    backgroundColor: '#F5F5F5',
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
  removeFarmImageButton: {
    position: 'absolute',
    top: scale(-6),
    right: scale(-6),
    backgroundColor: '#FF4444',
    borderRadius: scale(12),
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  addFarmImageButton: {
    width: scale(100),
    height: scale(80),
    borderRadius: scale(6),
    borderWidth: scale(2),
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FFF8',
  },

  // Submit Button Container
  submitContainer: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    backgroundColor: '#FFFFFF',
    borderTopWidth: scale(1),
    borderTopColor: '#E0E0E0',
  },

  // Validation
  errorInput: {
    borderColor: '#FF4444',
  },
  errorText: {
    fontSize: scale(12),
    color: '#FF4444',
    marginTop: scale(4),
  },
  successText: {
    fontSize: scale(12),
    color: Colors.green,
    marginTop: scale(4),
  },
});

export default styles;