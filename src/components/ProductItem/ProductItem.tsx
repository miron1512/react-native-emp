import React, { SFC } from 'react';
import { Animated, View, Text, TouchableOpacity } from 'react-native';

import Icon from '../Icon';
import { Icons } from '../Icon/types';
import styles from './styles';
import { ProductItemProps } from './types';

const iconNames: Icons[] = [
  'book-stack',
  'google-images',
  'nerf-gun',
  'packaging',
  'sedan',
  'teddy-bear',
  'support',
];

const ProductItem: SFC<ProductItemProps> = ({ product, style, onPress }) => {
  const { name, price, id } = product;
  const iconName = iconNames[id % iconNames.length];

  return (
    <Animated.View style={style}>
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
    </Animated.View>
  );
};

export default ProductItem;
