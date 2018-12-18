import React from 'react';
import { View, Text } from 'react-native';

import Icon from '../../components/Icon';
import Button from '../../components/Button';
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

const ProductScreen = ({ navigation }) => {
  const {
    state: {
      params: { product },
    },
    goBack,
  } = navigation;

  const { name, id, custom_attributes } = product;
  const description = custom_attributes.find(
    attr => attr.attribute_code === 'description'
  );
  const iconName = iconNames[id % iconNames.length];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Icon large style={styles.productIcon} name={iconName} />
          <Text style={styles.productName}>{name}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.productDescription}>
            {description ? description.value : 'No description'}
          </Text>
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
