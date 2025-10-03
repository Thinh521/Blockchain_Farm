import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { scale } from '../../utils/scaling';

const CategorySkeleton = ({ count = 3 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: scale(20) }}>
      <SkeletonPlaceholder borderRadius={24}>
        <SkeletonPlaceholder.Item flexDirection="row">
          {skeletons.map(i => (
            <SkeletonPlaceholder.Item
              key={i}
              width={scale(100)}
              height={scale(38)}
              borderRadius={24}
              marginRight={scale(12)}
            />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default CategorySkeleton;
