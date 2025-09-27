import React from 'react';
import {View, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {scale} from '../../utils/scaling';

const TraceabilitySkeleton = ({count = 3}) => {
  return (
    <SkeletonPlaceholder borderRadius={16} speed={1000}>
      <ScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: scale(20)}}>
        {Array.from({length: count}).map((_, index) => (
          <View
            key={index}
            style={{flexDirection: 'row', marginBottom: scale(20)}}>
            {/* Timeline */}
            <View style={{alignItems: 'center', marginRight: scale(14)}}>
              <SkeletonPlaceholder.Item
                width={40}
                height={40}
                borderRadius={20}
              />
              {index !== count - 1 && (
                <SkeletonPlaceholder.Item width={2} height={80} marginTop={8} />
              )}
            </View>

            {/* Card */}
            <SkeletonPlaceholder.Item flex={1}>
              <SkeletonPlaceholder.Item
                width="60%"
                height={18}
                borderRadius={6}
                marginBottom={10}
              />
              <SkeletonPlaceholder.Item
                width="80%"
                height={14}
                borderRadius={6}
                marginBottom={6}
              />
              <SkeletonPlaceholder.Item
                width="70%"
                height={14}
                borderRadius={6}
                marginBottom={6}
              />
              <SkeletonPlaceholder.Item
                width="50%"
                height={14}
                borderRadius={6}
                marginBottom={6}
              />
            </SkeletonPlaceholder.Item>
          </View>
        ))}
      </ScrollView>
    </SkeletonPlaceholder>
  );
};

export default TraceabilitySkeleton;
