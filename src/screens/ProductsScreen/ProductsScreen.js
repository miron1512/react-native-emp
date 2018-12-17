import React from 'react';
import { View, Text } from 'react-native';

import screens from '../../navigation/screens';
import ProductItem from '../../components/ProductItem';
import styles from './styles';

import mockProducts from '../../_mocks/mockProducts.json';

const ProductsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      {mockProducts.products.map(({ id, name, icon }) => (
        <ProductItem
          id={id}
          key={id}
          name={name}
          icon={icon}
          onPress={productId => {
            navigation.navigate(screens.Product, { productId });
          }}
        />
      ))}
    </View>
  );
};

export default ProductsScreen;
