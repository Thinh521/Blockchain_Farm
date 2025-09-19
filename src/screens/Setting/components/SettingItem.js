import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Arrow_Right_S_Icon} from '../../../assets/icons';
import styles from '../Setting.styles';

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

export default SettingItem;
