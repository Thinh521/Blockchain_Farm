import React from 'react';
import {FlatList} from 'react-native';
import ProductCard from './ProductCard';
import {scale} from '../../utils/scaling';

const ProductList = ({products, onPress}) => {
  return (
    <FlatList
      data={products}
      renderItem={({item}) => <ProductCard item={item} onPress={onPress} />}
      keyExtractor={item => item.productCode}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      contentContainerStyle={{padding: scale(20)}}
    />
  );
};

export default React.memo(ProductList);
