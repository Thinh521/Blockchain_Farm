import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExpandableText = ({ text, numberOfLines = 2, style }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  const shouldShowExpand = text.length > 50;

  return (
    <View style={[{ flex: 1 }, style]}>
      <Text
        style={{
          fontSize: 13,
          color: '#333',
          lineHeight: 20,
          flexShrink: 1,
          flexWrap: 'wrap',
        }}
        numberOfLines={expanded ? undefined : numberOfLines}>
        {text}
      </Text>

      {shouldShowExpand && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text
            style={{
              color: '#0cb046ff',
              fontWeight: '500',
              marginTop: 2,
            }}>
            {expanded ? 'Thu gọn' : 'Xem thêm'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ExpandableText;
