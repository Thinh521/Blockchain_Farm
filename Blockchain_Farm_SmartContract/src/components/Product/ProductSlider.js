import React from 'react';
import {FlatList, View} from 'react-native';
import ProductCard from './ProductCard';
import {scale} from '../../utils/scaling';

const ProductSlider = ({products, onPress}) => {
  return (
    <FlatList
      data={products}
      renderItem={({item}) => <ProductCard item={item} onPress={onPress} />}
      keyExtractor={item => item.productCode}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{width: scale(12)}} />}
    />
  );
};

export default React.memo(ProductSlider);
