import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '../../utils/scaling';

const {width} = Dimensions.get('window');
const CARD_HEIGHT = 100; // cao vừa phải cho 1 news item

const NewsSkeleton = ({count = 4}) => {
  const skeletons = Array.from({length: count}, (_, i) => i);

  return (
    <View>
      <SkeletonPlaceholder borderRadius={12}>
        {skeletons.map(i => (
          <SkeletonPlaceholder.Item
            padding={26}
            key={i}
            flexDirection="row"
            alignItems="center"
            marginBottom={scale(16)}
            borderRadius={16}>
            {/* Hình ảnh bên trái */}
            <SkeletonPlaceholder.Item
              width={120}
              height={150}
              borderRadius={8}
              marginRight={12}
            />

            {/* Nội dung bên phải */}
            <SkeletonPlaceholder.Item flex={1}>
              {/* Tiêu đề */}
              <SkeletonPlaceholder.Item
                width="80%"
                height={16}
                marginBottom={18}
              />
              {/* Mô tả */}
              <SkeletonPlaceholder.Item
                width="95%"
                height={12}
                marginBottom={16}
              />
              <SkeletonPlaceholder.Item
                width="70%"
                height={12}
                marginBottom={16}
              />
              {/* Ngày tạo */}
              <SkeletonPlaceholder.Item width="40%" height={10} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder>
    </View>
  );
};

export default NewsSkeleton;
