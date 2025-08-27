import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets/images/images';
import {
  Arrow_Right_S_Icon,
  ContrastIcon,
  EditIcon,
  GlobalIcon,
  NotificationIcon,
  UserIcon,
} from '../../assets/icons';
import {scale} from '../../utils/scaling';
import {Colors} from '../../theme/theme';
import Button from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/core';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [pushNoti, setPushNoti] = useState(true);
  const [emailNoti, setEmailNoti] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(false);

  const SwitchComponent = ({value, onValueChange, color = '#10B981'}) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={value ? '#fff' : '#f4f3f4'}
      trackColor={{true: color, false: '#d1d5db'}}
      ios_backgroundColor="#d1d5db"
    />
  );

  const SettingItem = ({
    title,
    subtitle,
    onPress,
    rightComponent,
    hasChevron = true,
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.settingItemLeft}>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingItemRight}>
        {rightComponent}
        {hasChevron && !rightComponent && <Arrow_Right_S_Icon />}
      </View>
    </TouchableOpacity>
  );

  const LanguageOption = ({flag, title, isSelected, onPress}) => (
    <TouchableOpacity
      style={[
        styles.languageOption,
        isSelected && styles.languageOptionSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.flag}>{flag}</Text>
      <Text
        style={[
          styles.languageText,
          isSelected && styles.languageTextSelected,
        ]}>
        {title}
      </Text>
      {isSelected && <View style={styles.selectedDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#10b981" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 120}}>
        {/* Header */}
        <LinearGradient
          colors={['#10b981', '#10b981']}
          style={styles.header}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.headerTitle}>Cài đặt</Text>
          <Text style={styles.headerSubtitle}>
            Quản lý tài khoản và tùy chỉnh ứng dụng
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Profile Section */}
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <View style={styles.avatarContainer}>
                <FastImage
                  source={Images.avatar}
                  style={styles.avatar}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
                  <EditIcon style={{width: scale(18), height: scale(18)}} />
                </TouchableOpacity>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Nguyễn Văn An</Text>
                <Text style={styles.userEmail}>nguyenvanan@gmail.com</Text>
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>Tài khoản Premium</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={[styles.sectionHeader, {backgroundColor: '#ECFDF5'}]}>
              <View
                style={[
                  styles.sectionIconContainer,
                  {backgroundColor: '#BBF7D0'},
                ]}>
                <UserIcon style={{color: Colors.primary}} />
              </View>
              <Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>
            </View>

            <SettingItem
              title="Bảo mật tài khoản"
              onPress={() => {
                navigation.navigate('NoBottomTab', {screen: 'Profile'});
              }}
            />
            <SettingItem
              title="Đổi mật khẩu"
              onPress={() => {
                navigation.navigate('NoBottomTab', {screen: 'ChangePassword'});
              }}
            />
          </View>

          {/* Language Selection */}
          <View style={styles.section}>
            <View style={[styles.sectionHeader, {backgroundColor: '#ECFDF5'}]}>
              <View
                style={[
                  styles.sectionIconContainer,
                  {backgroundColor: '#BBF7D0'},
                ]}>
                <GlobalIcon style={{color: Colors.primary}} />
              </View>
              <Text style={styles.sectionTitle}>Ngôn ngữ</Text>
            </View>

            <View style={styles.sectionContent}>
              <LanguageOption
                flag="🇺🇸"
                title="English"
                isSelected={language === 'en'}
                onPress={() => setLanguage('en')}
              />
              <LanguageOption
                flag="🇻🇳"
                title="Tiếng Việt"
                isSelected={language === 'vi'}
                onPress={() => setLanguage('vi')}
              />
            </View>
          </View>

          {/* Theme */}
          <View style={styles.section}>
            <View style={[styles.sectionHeader, {backgroundColor: '#ECFDF5'}]}>
              <View
                style={[
                  styles.sectionIconContainer,
                  {backgroundColor: '#BBF7D0'},
                ]}>
                <ContrastIcon style={{color: Colors.primary}} />
              </View>
              <Text style={styles.sectionTitle}>Giao diện</Text>
            </View>

            <View>
              <SettingItem
                icon="brightness-6"
                title="Dark Mode"
                subtitle="Chế độ tối bảo vệ mắt"
                rightComponent={
                  <SwitchComponent
                    value={darkMode}
                    onValueChange={setDarkMode}
                    color="#8B5CF6"
                  />
                }
                hasChevron={false}
              />
            </View>
          </View>

          {/* Notifications */}
          <View style={styles.section}>
            <View style={[styles.sectionHeader, {backgroundColor: '#ECFDF5'}]}>
              <View
                style={[
                  styles.sectionIconContainer,
                  {backgroundColor: '#BBF7D0'},
                ]}>
                <NotificationIcon style={{color: Colors.primary}} />
              </View>
              <Text style={styles.sectionTitle}>Thông báo</Text>
            </View>

            <View>
              <SettingItem
                icon="notifications"
                title="Push Notifications"
                subtitle="Nhận thông báo đẩy"
                rightComponent={
                  <SwitchComponent
                    value={pushNoti}
                    onValueChange={setPushNoti}
                  />
                }
                hasChevron={false}
              />
              <SettingItem
                icon="email"
                title="Email Notifications"
                subtitle="Nhận thông báo qua email"
                rightComponent={
                  <SwitchComponent
                    value={emailNoti}
                    onValueChange={setEmailNoti}
                  />
                }
                hasChevron={false}
              />
              <SettingItem
                icon="local-shipping"
                title="Order Updates"
                subtitle="Cập nhật trạng thái đơn hàng"
                rightComponent={
                  <SwitchComponent
                    value={orderUpdates}
                    onValueChange={setOrderUpdates}
                  />
                }
                hasChevron={false}
              />
            </View>
          </View>

          {/* App Info */}
          <View style={styles.appInfoCard}>
            <LinearGradient
              colors={['#4F46E5', '#7C3AED']}
              style={styles.appIcon}>
              <Text style={styles.appIconText}>🚀</Text>
            </LinearGradient>
            <Text style={styles.appName}>Blockchain Farm</Text>
            <Text style={styles.appVersion}>Phiên bản 2.1.0</Text>
            <View style={styles.appLinks}>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.appLink}>Điều khoản</Text>
              </TouchableOpacity>
              <Text style={styles.separator}>•</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.appLink}>Quyền riêng tư</Text>
              </TouchableOpacity>
              <Text style={styles.separator}>•</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.appLink}>Hỗ trợ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Button.Main title="Đăng xuất" style={{flex: 1}} />
          <Button.Main title="Đổi tài khoản" style={{flex: 1}} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    paddingHorizontal: 24,
    marginTop: -16,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#fff',
    borderRadius: 9999,
    padding: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  premiumBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  premiumText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionIconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
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
    padding: 16,
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
    fontSize: 24,
    marginRight: 12,
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
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
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  appIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appIconText: {
    fontSize: 32,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  appLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appLink: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  separator: {
    fontSize: 14,
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
};

export default SettingsScreen;
