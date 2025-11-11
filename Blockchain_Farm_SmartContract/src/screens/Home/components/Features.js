import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {scale} from '../../../utils/scaling';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';

const {width} = Dimensions.get('window');

const FEATURES = [
  {
    emoji: '🔗',
    title: 'Minh bạch tuyệt đối',
    desc: 'Nguồn gốc rõ ràng trên blockchain',
  },
  {
    emoji: '🌱',
    title: 'Nông sản sạch',
    desc: 'An toàn cho sức khỏe, không hóa chất',
  },
  {
    emoji: '🛡️',
    title: 'Chất lượng',
    desc: 'Được xác thực từ nông trại đến bàn ăn',
  },
  {
    emoji: '⚡',
    title: 'Nhanh & tiện lợi',
    desc: 'Tươi ngon giao tận nơi trong 24h',
  },
];

const Features = () => {
  return (
    <View style={styles.featuresSection}>
      <Text style={[styles.sectionTitle, {paddingBottom: scale(20)}]}>
        Vì sao chọn chúng tôi?
      </Text>
      <View style={styles.featuresGrid}>
        {FEATURES.map((item, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>{item.emoji}</Text>
            </View>
            <Text style={styles.featureTitle}>{item.title}</Text>
            <Text style={styles.featureDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  featuresSection: {
    paddingVertical: scale(16),
    paddingHorizontal: scale(20),
  },
  sectionTitle: {
    color: Colors.title,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.semiBold,
  },
  featuresGrid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 58) / 2,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: scale(16),
    alignItems: 'center',
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  featureIcon: {
    width: scale(48),
    height: scale(48),
    backgroundColor: '#ECFDF5',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(12),
  },
  featureEmoji: {
    fontSize: FontSizes.xlarge,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: FontWeights.semiBold,
    color: Colors.title,
    marginBottom: scale(4),
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
});
