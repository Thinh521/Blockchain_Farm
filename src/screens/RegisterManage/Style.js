import { StyleSheet } from 'react-native';
import { scale } from '../../utils/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  // Modal Overlay
  modalOverlay: {
    position: 'absolute',
    bottom: scale(410),
    left: scale(20),
    right: scale(20),
    backgroundColor: '#ffffff',
    padding: scale(25),
    borderRadius: scale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.15,
    shadowRadius: scale(10),
    elevation: scale(6),
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: scale(22),
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: scale(8),
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: scale(15),
    color: '#666',
    textAlign: 'center',
    marginBottom: scale(20),
    lineHeight: scale(22),
    paddingHorizontal: scale(10),
  },
  modalCloseButton: {
    marginTop: scale(12),
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    backgroundColor: '#f0f0f0',
    borderRadius: scale(15),
  },
  modalCloseText: {
    fontSize: scale(14),
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: scale(15),
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
  },
  backButton: {
    fontSize: scale(28),
    color: '#fff',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: scale(10),
  },

  // Progress
  progressContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(15),
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: scale(1),
    borderBottomColor: '#e9ecef',
  },
  progressText: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: scale(8),
    textAlign: 'center',
  },
  progressBar: {
    height: scale(6),
    backgroundColor: '#e9ecef',
    borderRadius: scale(3),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: scale(3),
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },

  // Menu Item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(20),
    paddingHorizontal: scale(20),
    marginBottom: scale(15),
    backgroundColor: '#fff',
    borderRadius: scale(12),
    borderWidth: scale(1),
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(3.84),
  },
  menuItemCompleted: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },
  menuItemLeft: {
    flex: 1,
    marginRight: scale(15),
  },
  menuItemText: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#333',
    marginBottom: scale(4),
  },
  menuItemDescription: {
    fontSize: scale(14),
    color: '#666',
    lineHeight: scale(20),
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Submit
  submitContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: scale(1),
    borderTopColor: '#e9ecef',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: scale(15),
    borderRadius: scale(8),
    alignItems: 'center',
    marginBottom: scale(10),
  },
  submitNote: {
    fontSize: scale(12),
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Modal Container
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: scale(15),
    borderBottomWidth: scale(1),
    borderBottomColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: scale(5),
  },
  saveButton: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(8),
    backgroundColor: '#4CAF50',
    borderRadius: scale(6),
  },
  saveButtonText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '600',
  },

  // Modal Body
  modalBody: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
  },

  // Input
  inputGroup: {
    marginBottom: scale(20),
  },
  label: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#333',
    marginBottom: scale(8),
  },
  textInput: {
    borderWidth: scale(1),
    borderColor: '#ddd',
    borderRadius: scale(8),
    paddingHorizontal: scale(15),
    paddingVertical: scale(12),
    fontSize: scale(16),
    color: '#333',
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: scale(1),
    borderColor: '#ddd',
    borderRadius: scale(8),
    paddingHorizontal: scale(15),
    paddingVertical: scale(12),
    fontSize: scale(16),
    color: '#333',
    backgroundColor: '#fff',
    height: scale(120),
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: scale(12),
    color: '#666',
    textAlign: 'right',
    marginTop: scale(5),
  },

  // Picker
  pickerContainer: {
    borderWidth: scale(1),
    borderColor: '#ddd',
    borderRadius: scale(8),
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: scale(50),
    color: '#333',
  },

  // Image Upload
  imageUploadContainer: {
    borderWidth: scale(2),
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: scale(8),
    paddingVertical: scale(40),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  cameraIcon: {
    marginBottom: scale(10),
  },
  uploadText: {
    fontSize: scale(16),
    color: '#666',
    textAlign: 'center',
  },
  selectedImageInfo: {
    marginTop: scale(15),
    padding: scale(10),
    backgroundColor: '#e8f5e8',
    borderRadius: scale(8),
  },
  selectedImageText: {
    fontSize: scale(14),
    color: '#4CAF50',
    textAlign: 'center',
    fontWeight: '600',
  },
  formContainer: {
    padding: scale(16),
    backgroundColor: '#fff',
    borderRadius: scale(8),
    marginBottom: scale(10),
  },
  input: {
    borderWidth: scale(1),
    borderColor: '#ccc',
    borderRadius: scale(5),
    padding: scale(10),
    marginBottom: scale(10),
    fontSize: scale(16),
  },
  imageButton: {
    backgroundColor: '#4CAF50',
    padding: scale(10),
    borderRadius: scale(5),
    alignItems: 'center',
    marginBottom: scale(10),
  },
  imageButtonText: {
    color: '#fff',
    fontSize: scale(16),
  },
  previewImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(5),
    marginBottom: scale(10),
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  replaceImageButton: {
    backgroundColor: '#FF6B35',
    padding: scale(5),
    borderRadius: scale(5),
    marginLeft: scale(10),
  },
  submitButtonText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;