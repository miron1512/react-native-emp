import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from '../Icon';
import styles from './styles';

const ProductItem = ({ name, id, onPress, icon }) => {
  return (
    <View style={styles.container}>
      <Icon style={styles.productIcon} name={icon} />
      <Text style={styles.productName}>{name}</Text>
      <TouchableOpacity
        onPress={() => {
          onPress(id);
        }}
      >
        <Icon style={styles.nextIcon} name="chevron-left" rotate={180} />
      </TouchableOpacity>
    </View>
  );
};

export default ProductItem;
