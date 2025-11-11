import React from 'react';
import {View} from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {scale} from '../../utils/scaling';

const ProductCardSkeleton = ({count = 4}) => {
  const skeletons = Array.from({length: count}, (_, i) => i);

  return (
    <SkeletonPlaceholder borderRadius={12}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {skeletons.map(i => (
          <View
            key={i}
            style={{
              width: '48%',
              marginBottom: scale(15),
              borderRadius: scale(16),
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: scale(16),
            }}>
            <SkeletonPlaceholder.Item
              width="100%"
              height={scale(120)}
              borderRadius={0}
            />

            <View style={{padding: scale(10)}}>
              <SkeletonPlaceholder.Item
                width="90%"
                height={16}
                marginBottom={8}
              />
              <SkeletonPlaceholder.Item
                width="50%"
                height={14}
                marginBottom={10}
              />
              <SkeletonPlaceholder.Item
                width="70%"
                height={14}
                marginBottom={10}
              />
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default ProductCardSkeleton;
