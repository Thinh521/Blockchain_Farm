import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Leaf_Line_Icon} from '../../../assets/icons/index';
import {scale} from '../../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';

const Footer = () => {
  return (
    <View style={styles.footerSection}>
      <View style={styles.footerContent}>
        <View style={styles.footerLogo}>
          <Leaf_Line_Icon style={{color: Colors.green, width: scale(24)}} />
          <Text style={styles.footerTitle}>Blockchain Farm</Text>
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
          © 2024 Blockchain Farm. Minh bạch – Tin cậy – Bền vững.
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
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  footerTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
    color: Colors.green,
    marginLeft: scale(8),
  },
  footerDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: scale(18),
    marginBottom: 24,
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
    color: Colors.green,
    fontWeight: FontWeights.medium,
  },
  copyright: {
    fontSize: FontSizes.small,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
