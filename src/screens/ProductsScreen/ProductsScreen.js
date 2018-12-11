import React from 'react';
import { View, Text } from 'react-native';

import ProductItem from '../../components/ProductItem';
import styles from './styles';

const ProductsScreen = ({ products, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      {products.map(({ id, name, icon }) => (
        <ProductItem
          id={id}
          key={id}
          name={name}
          icon={icon}
          onPress={onPress}
        />
      ))}
    </View>
  );
};

export default ProductsScreen;
