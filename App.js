import React, { Component } from 'react';
import { Font } from 'expo';

import LoginScreen from './src/screens/LoginScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import ProductScreen from './src/screens/ProductScreen';

import mockProducts from './src/_mocks/mockProducts.json';

export default class App extends Component {
  state = {
    fontLoaded: false,
    screen: 'Login',
    productId: null,
  };

  async componentDidMount() {
    await Font.loadAsync({
      vincHand: require('./assets/fonts/vincHand.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return null;
    }

    if (this.state.screen === 'Login') {
      return (
        <LoginScreen
          onPress={() => {
            this.setState({ screen: 'Products' });
          }}
        />
      );
    }

    if (this.state.productId) {
      return (
        <ProductScreen
          product={mockProducts.products.find(product => this.state.productId === product.id)}
          onBackPress={() => {
            this.setState({ productId: null });
          }}
        />
      );
    }

    return (
      <ProductsScreen
        products={mockProducts.products}
        onPress={id => {
          this.setState({ productId: id });
        }}
      />
    );
  }
}
