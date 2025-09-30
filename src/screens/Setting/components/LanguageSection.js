import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {GlobalIcon} from '../../../assets/icons';

import {Colors} from '../../../theme/theme';
import styles from '../Setting.styles';

const LanguageOption = ({flag, title, isSelected, onPress}) => (
  <TouchableOpacity
    style={[styles.languageOption, isSelected && styles.languageOptionSelected]}
    onPress={onPress}
    activeOpacity={0.7}>
    <Text style={styles.flag}>{flag}</Text>
    <Text
      style={[styles.languageText, isSelected && styles.languageTextSelected]}>
      {title}
    </Text>
    {isSelected && <View style={styles.selectedDot} />}
  </TouchableOpacity>
);

const LanguageSection = ({language, setLanguage}) => (
  <View style={styles.section}>
    <View style={[styles.sectionHeader, {backgroundColor: '#ECFDF5'}]}>
      <View style={[styles.sectionIconContainer, {backgroundColor: '#BBF7D0'}]}>
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
);

export default LanguageSection;
