import {StyleSheet} from 'react-native';
import {Colors, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: scale(20),
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 12,
    marginBottom: scale(20),
  },
  avatar: {
    width: scale(70),
    height: scale(70),
    borderRadius: 99,
  },
  camare: {
    position: 'absolute',
    bottom: scale(10),
    right: scale(125),
    backgroundColor: Colors.white,
    borderRadius: 9999,
    padding: scale(4),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  label: {
    marginBottom: 6,
    color: Colors.title,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: scale(10),
  },
  genderBtn: {
    flex: 1,
    padding: scale(10),
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  genderActive: {
    borderColor: Colors.primary,
    backgroundColor: '#e8f9f0',
  },
  genderTextActive: {
    color: Colors.primary,
    fontWeight: FontWeights.bold,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActions: {
    flexDirection: 'row',
    gap: scale(10),
    paddingHorizontal: scale(20),
    paddingVertical: scale(16),
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border_2,
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
});
