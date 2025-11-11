import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from '../../../assets/images/images';

import styles from '../Setting.styles';

const AppInfoCard = () => (
  <View style={styles.appInfoCard}>
    <View style={styles.appContainer}>
      <FastImage
        source={Images.logo}
        style={styles.appIcon}
        resizeMode="contain"
      />
    </View>
    <Text style={styles.appName}>GreenFarm</Text>
    <Text style={styles.appVersion}>Phiên bản 2.1.0</Text>
    <View style={styles.appLinks}>
      <TouchableOpacity>
        <Text style={styles.appLink}>Điều khoản</Text>
      </TouchableOpacity>
      <Text style={styles.separator}>•</Text>
      <TouchableOpacity>
        <Text style={styles.appLink}>Quyền riêng tư</Text>
      </TouchableOpacity>
      <Text style={styles.separator}>•</Text>
      <TouchableOpacity>
        <Text style={styles.appLink}>Hỗ trợ</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default AppInfoCard;
