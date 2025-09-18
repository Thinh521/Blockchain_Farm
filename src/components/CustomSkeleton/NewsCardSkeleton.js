import React from 'react';
import {Dimensions, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '../../utils/scaling';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width - scale(32);
const CARD_HEIGHT = scale(350);

const NewsCardSkeleton = ({count = 3}) => {
  const skeletons = Array.from({length: count}, (_, i) => i);

  return (
    <View>
      <SkeletonPlaceholder borderRadius={12}>
        {skeletons.map(i => (
          <SkeletonPlaceholder.Item
            key={i}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            borderRadius={12}
            marginBottom={scale(16)}
            alignSelf="center"
            overflow="hidden">
            <SkeletonPlaceholder.Item
              width="100%"
              height={scale(180)}
              borderRadius={24}
            />

            <SkeletonPlaceholder.Item padding={12}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                marginBottom={scale(12)}>
                <SkeletonPlaceholder.Item
                  width={40}
                  height={40}
                  borderRadius={20}
                  marginRight={10}
                />
                <SkeletonPlaceholder.Item>
                  <SkeletonPlaceholder.Item
                    width={120}
                    height={14}
                    marginBottom={6}
                  />
                  <SkeletonPlaceholder.Item width={80} height={12} />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>

              <SkeletonPlaceholder.Item
                width="90%"
                height={16}
                marginBottom={10}
              />

              <SkeletonPlaceholder.Item
                width="100%"
                height={12}
                marginBottom={6}
              />
              <SkeletonPlaceholder.Item
                width="95%"
                height={12}
                marginBottom={6}
              />
              <SkeletonPlaceholder.Item
                width="70%"
                height={12}
                marginBottom={12}
              />

              <SkeletonPlaceholder.Item
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <SkeletonPlaceholder.Item width={80} height={14} />
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  width={100}
                  height={14}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder>
    </View>
  );
};

export default NewsCardSkeleton;
