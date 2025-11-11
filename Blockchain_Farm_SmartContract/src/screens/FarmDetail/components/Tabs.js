import React from 'react';
import {ScrollView, TouchableOpacity, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../FarmDetail/FarmDetail.styles';

const Tabs = ({activeTab, setActiveTab}) => {
  const tabs = [
    {id: 'overview', label: 'Tổng quan', icon: 'information-circle-outline'},
    {id: 'products', label: 'Nông sản', icon: 'basket-outline'},
    {id: 'contact', label: 'Liên hệ', icon: 'call-outline'},
  ];

  return (
    <View style={styles.tabsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}>
            <Ionicons
              name={tab.icon}
              size={16}
              color={activeTab === tab.id ? '#059669' : '#6B7280'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Tabs;
