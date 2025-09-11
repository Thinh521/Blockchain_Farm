import React from 'react';
import {Dimensions, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '../../utils/scaling';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 52) / 2;
const CARD_HEIGHT = 245;

const FarmCardSkeleton = ({count = 4}) => {
  const skeletons = Array.from({length: count}, (_, i) => i);

  return (
    <View>
      <SkeletonPlaceholder borderRadius={16}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between">
          {skeletons.map(i => (
            <SkeletonPlaceholder.Item
              key={i}
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              borderRadius={16}
              marginBottom={scale(16)}
              overflow="hidden">
              {/* Image */}
              <SkeletonPlaceholder.Item width="100%" height={scale(120)} />

              {/* Content */}
              <SkeletonPlaceholder.Item padding={12}>
                <SkeletonPlaceholder.Item
                  width="80%"
                  height={14}
                  marginBottom={scale(10)}
                />
                <SkeletonPlaceholder.Item
                  width="100%"
                  height={10}
                  marginBottom={6}
                />
                <SkeletonPlaceholder.Item
                  width="50%"
                  height={10}
                  marginBottom={6}
                />
                <SkeletonPlaceholder.Item
                  width="60%"
                  height={10}
                  marginBottom={10}
                />
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  justifyContent="space-between">
                  <SkeletonPlaceholder.Item width="40%" height={10} />
                  <SkeletonPlaceholder.Item width="40%" height={10} />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default FarmCardSkeleton;
