import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';

import {Colors, FontSizes, FontWeights} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const Header = ({title, subtitle, emoji = '🌱', showBack = false}) => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.green} />

      <View style={styles.header}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.white} />
          </TouchableOpacity>
        )}

        <View>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>

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
    paddingHorizontal: scale(20),
    paddingTop: scale(18),
    paddingBottom: scale(18),
    backgroundColor: Colors.green,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(14),
  },
  headerTitle: {
    fontSize: FontSizes.large,
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
    opacity: 0.3,
  },
  decorEmoji: {
    fontSize: 40,
    marginHorizontal: 5,
    transform: [{rotate: '15deg'}],
  },
});
