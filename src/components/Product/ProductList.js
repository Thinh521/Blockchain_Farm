import React from 'react';
import {FlatList} from 'react-native';
import ProductCard from './ProductCard';

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
    />
  );
};

export default React.memo(ProductList);
