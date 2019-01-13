import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from '../Icon';
import styles from './styles';

const iconNames = [
  'book-stack',
  'google-images',
  'nerf-gun',
  'packaging',
  'sedan',
  'teddy-bear',
  'support',
];

const ProductItem = ({ product, onPress }) => {
  const { name, price, id } = product;
  const iconName = iconNames[id % iconNames.length];

  return (
    <View style={styles.container}>
      <Icon style={styles.productIcon} name={iconName} />
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.productName}>
        {name}
      </Text>
      <Text style={styles.productPrice}>${price}</Text>
      <TouchableOpacity
        onPress={() => {
          onPress(product);
        }}
      >
        <Icon style={styles.nextIcon} name="chevron-left" rotate={180} />
      </TouchableOpacity>
    </View>
  );
};

export default ProductItem;
