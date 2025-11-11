import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import Images from '../../../assets/images/images';

import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

const Footer = () => {
  return (
    <View style={styles.footerSection}>
      <View style={styles.footerContent}>
        <View style={styles.appContainer}>
          <FastImage
            source={Images.logo}
            style={styles.appIcon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.footerLogo}>
          <Text style={styles.footerTitle}>GreenFarm</Text>
        </View>
        <Text style={styles.footerDescription}>
          Ứng dụng truy xuất nguồn gốc minh bạch trên blockchain, giúp người
          tiêu dùng yên tâm và nông dân khẳng định giá trị nông sản sạch.
        </Text>

        <View style={styles.footerLinks}>
          <TouchableOpacity style={styles.footerLink}>
            <Text style={styles.footerLinkText}>Về Blockchain Farm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerLink}>
            <Text style={styles.footerLinkText}>Truy xuất nguồn gốc</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerLink}>
            <Text style={styles.footerLinkText}>Hỗ trợ</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.copyright}>
          © 2025 GreenFarm. Minh bạch – Tin cậy – Bền vững.
        </Text>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerSection: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: scale(32),
    marginTop: scale(20),
  },
  footerContent: {
    paddingHorizontal: scale(20),
    alignItems: 'center',
  },
  appContainer: {
    marginBottom: scale(10),
    padding: scale(10),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  appIcon: {
    width: scale(40),
    height: scale(40),
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  footerTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    color: Colors.primary,
  },
  footerDescription: {
    fontSize: FontSizes.small,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: scale(18),
    marginBottom: scale(24),
    paddingHorizontal: scale(20),
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(20),
    marginBottom: scale(20),
    paddingHorizontal: scale(20),
  },
  footerLink: {
    paddingVertical: scale(8),
  },
  footerLinkText: {
    fontSize: FontSizes.small,
    color: Colors.primary,
    fontWeight: FontWeights.medium,
  },
  copyright: {
    fontSize: FontSizes.small,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
