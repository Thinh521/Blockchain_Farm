import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fffe',
  },

  // Header Styles
  headerContainer: {
    alignItems: 'center',
    paddingVertical: scale(24),
    paddingHorizontal: scale(20),
    backgroundColor: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
    marginBottom: scale(8),
  },
  header: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#065f46',
    marginTop: scale(8),
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: scale(14),
    color: '#059669',
    marginTop: scale(4),
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Status Styles
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(8),
    marginBottom: scale(16),
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: scale(12),
    color: '#374151',
    fontWeight: '500',
  },

  // Section Styles
  section: {
    marginHorizontal: scale(20),
    marginBottom: scale(20),
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#065f46',
    marginBottom: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Dropdown Styles
  dropdownContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: scale(16),
    paddingVertical: scale(14),
    borderWidth: 2,
    borderColor: '#d1fae5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dropdownButtonText: {
    fontSize: scale(15),
    color: '#374151',
    marginLeft: 10,
    fontWeight: '500',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: scale(8),
    borderWidth: 2,
    borderColor: '#d1fae5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownItemSelected: {
    backgroundColor: '#ecfdf5',
  },
  dropdownItemText: {
    fontSize: scale(14),
    color: '#374151',
    marginLeft: 10,
    fontWeight: '400',
  },
  dropdownItemTextSelected: {
    color: '#065f46',
    fontWeight: '600',
  },

  // Input Styles
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1fae5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputIcon: {
    marginLeft: scale(16),
    marginRight: scale(8),
  },
  input: {
    flex: 1,
    fontSize: scale(15),
    color: '#374151',
    paddingVertical: scale(14),
    paddingRight: scale(16),
    fontWeight: '400',
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    minHeight: scale(120),
  },
  textAreaIcon: {
    marginLeft: scale(16),
    marginRight: scale(8),
    marginTop: scale(14),
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: scale(14),
    minHeight: scale(90),
  },

  // Image Styles
  imageSection: {
    alignItems: 'center',
  },
  imagePickerButton: {
    backgroundColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    backgroundColor: '#10b981',
    paddingVertical: scale(16),
    paddingHorizontal: scale(24),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    width: '100%',
  },
  imagePickerText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '600',
    marginTop: scale(8),
  },
  imagePickerSubText: {
    color: '#a7f3d0',
    fontSize: scale(12),
    marginTop: scale(2),
  },
  imagePreviewContainer: {
    marginTop: scale(16),
    paddingVertical: scale(8),
  },
  imageWrapper: {
    position: 'relative',
    marginRight: scale(12),
  },
  previewImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1fae5',
  },
  removeImageButton: {
    position: 'absolute',
    top: -scale(6),
    right: -scale(6),
    backgroundColor: '#ef4444',
    borderRadius: 12,
    width: scale(24),
    height: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  // Submit Button Styles
  submitButton: {
    backgroundColor: '#2563eb',
    marginHorizontal: scale(20),
    paddingVertical: scale(16),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    marginTop: scale(8),
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowColor: '#9ca3af',
    shadowOpacity: 0.2,
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
    marginLeft: scale(8),
  },

  bottomSpacer: {
    height: scale(40),
  },
});
