import React, { Component } from 'react';
import { View, Text, LayoutAnimation, UIManager } from 'react-native';

import Icon from '../../components/Icon';
import Button from '../../components/Button';
import FlipComponent from '../../components/FlipComponent';
import styles from './styles';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const iconNames = [
  'book-stack',
  'google-images',
  'nerf-gun',
  'packaging',
  'sedan',
  'teddy-bear',
  'support',
];

class ProductScreen extends Component {
  componentWillMount() {
    LayoutAnimation.configureNext({
      create: {
        property: LayoutAnimation.Properties.scaleY,
        type: LayoutAnimation.Types.spring,
        springDamping: 0.4,
      },

      duration: 1000,
    });
  }

  render() {
    const { navigation } = this.props;
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
        <FlipComponent
          flipType="rotateY"
          renderFrontView={({ flip }) => (
            <View style={styles.card}>
              <View style={styles.header}>
                <Icon large style={styles.productIcon} name={iconName} />
                <Text style={styles.productName}>{name}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.productDescription}>
                  {description ? description.value : 'No description'}
                </Text>
              </View>
              <View style={styles.cardButtons}>
                <Button
                  title="All Products"
                  onPress={() => {
                    goBack();
                  }}
                />
                <Button
                  title="View Details"
                  primary
                  onPress={() => {
                    flip();
                  }}
                />
              </View>
            </View>
          )}
          renderBackView={({ flip }) => (
            <View style={[styles.card, { alignItems: 'center' }]}>
              <Text>No details</Text>
              <Button
                title="View Product"
                onPress={() => {
                  flip();
                }}
              />
            </View>
          )}
        />
      </View>
    );
  }
}

export default ProductScreen;
