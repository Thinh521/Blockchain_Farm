import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '../../utils/scaling';

const {width} = Dimensions.get('window');

const ProductSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={16}>
      <SkeletonPlaceholder.Item
        width="100%"
        height={scale(240)}
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
      />
      <SkeletonPlaceholder.Item
        flexDirection="row"
        gap={10}
        marginTop={20}
        paddingHorizontal={20}>
        {[0, 1, 2].map(idx => (
          <SkeletonPlaceholder.Item
            key={idx}
            width={scale(70)}
            height={scale(70)}
            borderRadius={8}
          />
        ))}
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item padding={scale(16)}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={scale(12)}>
          <SkeletonPlaceholder.Item width="80%" height={20} />
          <SkeletonPlaceholder.Item width={32} height={32} borderRadius={8} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={scale(30)}>
          <SkeletonPlaceholder.Item width={100} height={18} />
          <SkeletonPlaceholder.Item width={80} height={18} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={120} height={18} marginBottom={10} />
          <SkeletonPlaceholder.Item width="100%" height={14} marginBottom={6} />
          <SkeletonPlaceholder.Item width="90%" height={14} marginBottom={6} />
          <SkeletonPlaceholder.Item width="80%" height={14} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default ProductSkeleton;
