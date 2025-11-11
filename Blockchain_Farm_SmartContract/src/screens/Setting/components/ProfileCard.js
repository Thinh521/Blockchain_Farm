import React from 'react';
import {API_URL} from '@env';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {EditIcon} from '../../../assets/icons';
import {scale} from '../../../utils/scaling';
import styles from '../Setting.styles';

const ProfileCard = ({user, navigation}) => (
  <View style={styles.profileCard}>
    <View style={styles.profileInfo}>
      <View style={styles.avatarContainer}>
        <FastImage
          source={
            user?.avatar
              ? {uri: `${API_URL}/api/images/${user.avatar}`}
              : require('../../../assets/images/avatar.png')
          }
          style={styles.avatar}
          resizeMode={FastImage.resizeMode.contain}
        />
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('NoBottomTab', {screen: 'Profile'})
          }>
          <EditIcon style={{width: scale(14), height: scale(14)}} />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user?.fullName}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>
    </View>
  </View>
);

export default ProfileCard;
