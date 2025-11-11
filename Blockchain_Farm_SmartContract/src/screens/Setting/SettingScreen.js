import React, {useState} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {showMessage} from 'react-native-flash-message';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';

import Button from '../../components/CustomButton/CustomButton';
import {ContrastIcon, UserIcon} from '../../assets/icons';
import ProfileCard from './components/ProfileCard';
import Header from '../../components/Header/Header';
import AppInfoCard from './components/AppInfoCard';
import SettingItem from './components/SettingItem';
import SwitchComponent from './components/SwitchComponent';
import LanguageSection from './components/LanguageSection';

import {useUser} from '../../hooks/useUser';
import {logoutApi} from '../../api/auth/auth';
import {deleteUserApi} from '../../api/userApi';
import {useWishlist} from '../../context/WishlistContext';
import {deleteUser, getUser} from '../../utils/storage/authStorage';

import {Colors} from '../../theme/theme';
import styles from './Setting.styles';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const accessToken = getUser()?.accessToken;
  const {isConnected} = useAppKitAccount();

  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);

  const {resetWishlist} = useWishlist();
  const {data: user, isLoading, error} = useUser();

  const handleLogout = async () => {
    try {
      const res = await logoutApi();
      if (res.success) {
        resetWishlist();
        await deleteUser();

        showMessage({
          message: 'Thành công',
          description: 'Bạn đã đăng xuất thành công.',
          type: 'success',
        });

        navigation.reset({
          index: 0,
          routes: [{name: 'BottomTab', params: {screen: 'Home'}}],
        });
      } else {
        showMessage({
          message: 'Thất bại',
          description: res.message || 'Vui lòng thử lại sau.',
          type: 'danger',
        });
      }
    } catch (error) {
      console.log('Lỗi hệ thống');
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
                await deleteUser();
                showMessage({
                  message: 'Thành công',
                  message: 'Xóa tài khoản thành công',
                  type: 'success',
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
                });
              }
            } catch (error) {
              showMessage({
                message: 'Lỗi',
                description: 'Không thể xoá tài khoản. Vui lòng thử lại!',
                type: 'danger',
              });
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 120}}>
        <Header
          title="Cài đặt"
          subtitle="Quản lý tài khoản và tùy chỉnh ứng dụng"
          emoji="⚙️"
        />

        <View style={styles.content}>
          <ProfileCard user={user} navigation={navigation} />

          {/* Setting */}
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
          <LanguageSection language={language} setLanguage={setLanguage} />

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

          {/* App Info */}
          <AppInfoCard />
        </View>

        <View style={styles.footer}>
          <Button.Main
            title="Đăng xuất"
            style={{flex: 1}}
            onPress={handleLogout}
          />
          <Button.Main title="Đổi tài khoản" style={{flex: 1}} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
