import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  
  // Progress Indicator Styles
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 20,
    shadowColor: '#6366f1',
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  progressCircleActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  progressCircleInactive: {
    backgroundColor: 'white',
    borderColor: '#e2e8f0',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressTextActive: {
    color: 'white',
  },
  progressTextInactive: {
    color: '#94a3b8',
  },
  progressLine: {
    width: 25,
    height: 3,
    borderRadius: 2,
  },
  progressLineActive: {
    backgroundColor: '#10b981',
  },
  progressLineInactive: {
    backgroundColor: '#e2e8f0',
  },

  // Form Container Styles
  formContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'white',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  stepIcon: {
    fontSize: 48,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  // Input Styles
  input: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 18,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',

  },
  inputFocused: {
    borderColor: '#10b981',
    shadowColor: '#10b981',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 16,
  },

  // Status Message Styles
  statusContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  successContainer: {
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  loadingContainer: {
    backgroundColor: '#f0f9ff',
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  loadingText: {
    fontSize: 16,
    color: '#0369a1',
    marginTop: 12,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
  },
  successText: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
  },
  hashText: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'monospace',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  // Button Styles
  submitButton: {
    backgroundColor: '#10b981',
    marginHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#059669',
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowColor: '#6b7280',
    shadowOpacity: 0.2,
    borderColor: '#9ca3af',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Enhanced Visual Elements
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    opacity: 0.1,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.02) 0%, rgba(16, 185, 129, 0) 50%)',
  },
  
  // Card Wrapper for Forms
  formCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 25,
    borderRadius: 20,
    shadowColor: '#1e293b',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },

  // Loading Spinner Enhancement
  loadingSpinner: {
    transform: [{ scale: 1.2 }],
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 50,
  },

  // Floating Action Style (Alternative Button)
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Step Divider
  stepDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 20,
    marginHorizontal: 20,
  },

  // Input Label (if needed)
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
  },

  // Success Animation Container
  successAnimation: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  successIconLarge: {
    fontSize: 60,
    marginBottom: 15,
  },

  // Enhanced Progress Steps
  progressWrapper: {
    backgroundColor: '#f8fafc',
    paddingVertical: 15,
    marginBottom: 10,
  },
  
  // Improved Typography
  heading1: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    textAlign: 'center',
  },
  
});

export default styles;