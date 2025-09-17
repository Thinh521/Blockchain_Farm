import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const Header = ({title, subtitle, emoji = '🌱'}) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.green} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
        <View style={styles.headerDecoration}>
          <Text style={styles.decorEmoji}>{emoji}</Text>
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: scale(20),
    backgroundColor: Colors.green,
    position: 'relative',
    overflow: 'hidden',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: FontWeights.semiBold,
    color: Colors.white,
    marginBottom: scale(2),
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  headerDecoration: {
    position: 'absolute',
    right: -10,
    top: 20,
    flexDirection: 'row',
    opacity: 0.2,
  },
  decorEmoji: {
    fontSize: 40,
    marginHorizontal: 5,
    transform: [{rotate: '15deg'}],
  },
});
