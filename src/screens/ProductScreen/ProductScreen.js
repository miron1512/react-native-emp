import React from 'react';
import { View, Text } from 'react-native';

import Icon from '../../components/Icon';
import Button from '../../components/Button';
import styles from './styles';

const ProductScreen = ({ product, onBackPress }) => {
  const { icon, description, name } = product;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Icon large style={styles.productIcon} name={icon} />
          <Text style={styles.productName}>{name}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.productDescription}>{description}</Text>
          <Button title="All Products" onPress={onBackPress} />
        </View>
      </View>
    </View>
  );
};

export default ProductScreen;
