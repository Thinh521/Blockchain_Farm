import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: scale(20),
    marginTop: -scale(10),
    paddingBottom: scale(20),
  },
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: scale(16),
    marginBottom: scale(20),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: scale(14),
  },
  avatar: {
    width: scale(60),
    height: scale(60),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: Colors.white,
    borderRadius: 9999,
    padding: scale(4),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    marginBottom: scale(4),
  },
  userEmail: {
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: scale(20),
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionIconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  sectionTitle: {
    color: Colors.title,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  sectionContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(14),
    paddingVertical: scale(10),
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  languageOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#ECFDF5',
  },
  flag: {
    fontSize: FontSizes.regular,
    marginRight: scale(8),
  },
  languageText: {
    fontSize: FontSizes.medium,
    color: '#1F2937',
    flex: 1,
  },
  languageTextSelected: {
    color: Colors.primary,
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  appInfoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: scale(20),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  appIcon: {
    width: scale(64),
    height: scale(64),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  appName: {
    fontSize: FontSizes.regular,
    color: Colors.title,
    fontWeight: FontWeights.semiBold,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: FontSizes.small,
    color: Colors.gray,
    marginBottom: scale(16),
  },
  appLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appLink: {
    fontSize: FontSizes.small,
    fontWeight: '500',
    color: Colors.primary,
  },
  separator: {
    fontSize: FontSizes.small,
    color: '#D1D5DB',
    marginHorizontal: 8,
  },
  footer: {
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
});
