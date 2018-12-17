import React from 'react';
import { View, Text } from 'react-native';

import Icon from '../../components/Icon';
import Button from '../../components/Button';
import styles from './styles';

import mockProducts from '../../_mocks/mockProducts.json';

const ProductScreen = ({ navigation }) => {
  console.log('ProductScreen', navigation);
  const {
    state: {
      params: { productId },
    },
    goBack,
  } = navigation;
  const { icon, description, name } = mockProducts.products.find(
    product => product.id === productId
  );
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Icon large style={styles.productIcon} name={icon} />
          <Text style={styles.productName}>{name}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.productDescription}>{description}</Text>
          <Button
            title="All Products"
            onPress={() => {
              goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductScreen;
