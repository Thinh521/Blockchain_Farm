import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  // Modal Overlay
  modalOverlay: {
    position: 'absolute',
    bottom: 410,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  modalCloseButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
  },
  modalCloseText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
  },
  backButton: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },

  // Progress
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },

  // Menu Item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  menuItemCompleted: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },
  menuItemLeft: {
    flex: 1,
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Submit
  submitContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitNote: {
    fontSize: 12,
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: 5,
  },
  saveButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal Body
  modalBody: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  // Input
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    height: 120,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 5,
  },

  // Picker
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#333',
  },

  // Image Upload
  imageUploadContainer: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  cameraIcon: {
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  selectedImageInfo: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
  },
  selectedImageText: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
    fontWeight: '600',
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  replaceImageButton: {
    backgroundColor: '#FF6B35',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
},

});

export default styles;
