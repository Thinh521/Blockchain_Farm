import {API_URL} from '@env';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
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
import {logoutApi} from '../../api/auth/auth';
import {deleteUserApi, getUserApi} from '../../api/userApi';
import {deleteUser, getUser} from '../../utils/storage/authStorage';
import {showMessage} from 'react-native-flash-message';
import styles from './Setting.styles';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import Header from '../../components/Header/Header';
import {useWishlist} from '../../context/WishlistContext';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const {isConnected} = useAppKitAccount();
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [pushNoti, setPushNoti] = useState(true);
  const [emailNoti, setEmailNoti] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(false);
  const {resetWishlist} = useWishlist();

  const storedUser = getUser();

  const accessToken = storedUser.accessToken;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserApi(accessToken);
        if (res.user) {
          setUser(res.user);
        } else {
          console.log('Lỗi load user', res.message);
        }
      } catch (error) {
        console.log('Lỗi load user:', error.message);
      }
    };

    fetchUser();
  }, [setUser, accessToken]);

  const handleLogout = async () => {
    try {
      const res = await logoutApi();

      console.log('res', res);

      if (res.success) {
        resetWishlist();
        await deleteUser();

        navigation.reset({
          index: 0,
          routes: [{name: 'BottomTab', params: {screen: 'Home'}}],
        });
      } else {
        Alert.alert('Thông báo', res.message || 'Đăng xuất thất bại');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại!');
    }
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xoá tài khoản? Hành động này không thể hoàn tác.',
      [
        {text: 'Huỷ', style: 'cancel'},
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await deleteUserApi(accessToken);
              if (res.code === 200) {
                await deleteUser(); // xoá localStorage
                showMessage({
                  message: 'Xóa tài khoản thành công',
                  type: 'success',
                  icon: 'success',
                });
                navigation.reset({
                  index: 0,
                  routes: [{name: 'BottomTab', params: {screen: 'Home'}}],
                });
              } else {
                showMessage({
                  message: 'Xoá tài khoản thất bại',
                  description: res.message || 'Xoá tài khoản thất bại',
                  type: 'danger',
                  icon: 'danger',
                });
              }
            } catch (error) {
              showMessage({
                message: 'Lỗi',
                description: 'Không thể xoá tài khoản. Vui lòng thử lại!',
                type: 'danger',
                icon: 'danger',
              });
            }
          },
        },
      ],
    );
  };

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 120}}>
        <Header
          title="Cài đặt"
          subtitle="Quản lý tài khoản và tùy chỉnh ứng dụng"
          emoji="🌱"
        />

        <View style={styles.content}>
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <View style={styles.avatarContainer}>
                <FastImage
                  source={
                    user?.avatar
                      ? {
                          uri: `${API_URL}/api/images/${user?.avatar}`,
                        }
                      : require('../../assets/images/avatar.png')
                  }
                  style={styles.avatar}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <TouchableOpacity
                  style={styles.editButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('NoBottomTab', {screen: 'Profile'});
                  }}>
                  <EditIcon style={{width: scale(18), height: scale(18)}} />
                </TouchableOpacity>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user?.fullName}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
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
            {isConnected ? (
              <SettingItem
                title="Nông trại yêu thích"
                onPress={() => {
                  navigation.navigate('NoBottomTab', {screen: 'WishList'});
                }}
              />
            ) : (
              <SettingItem
                title="Đăng ký và quản lí nông trại"
                onPress={() => {
                  navigation.navigate('NoBottomTab', {screen: 'Manage'});
                }}
              />
            )}
            <SettingItem title="Xóa tài khoản " onPress={handleDeleteAccount} />
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
          <Button.Main
            title="Đăng xuất"
            style={{flex: 1}}
            onPress={handleLogout}
          />
          <Button.Main title="Đổi tài khoản" style={{flex: 1}} />
        </View>

        <Button.Main
          title="LoginRequired"
          onPress={() => {
            navigation.navigate('NoBottomTab', {screen: 'LoginRequired'});
          }}
        />
        <Button.Main
          title="Login"
          onPress={() => {
            navigation.navigate('NoBottomTab', {screen: 'Login'});
          }}
        />
        <Button.Main
          title="FarmDetail"
          onPress={() => {
            navigation.navigate('NoBottomTab', {screen: 'FarmDetail'});
          }}
        />
        <Button.Main
          title="Farm"
          onPress={() => {
            navigation.navigate('NoBottomTab', {screen: 'RegisterManage'});
          }}
        />
        <Button.Main
          title="Product"
          onPress={() => {
            navigation.navigate('NoBottomTab', {screen: 'Product'});
          }}
        />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
