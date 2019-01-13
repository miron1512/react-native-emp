import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import screens from '../../navigation/screens';
import ProductItem from '../../components/ProductItem';
import styles from './styles';

const PAGE_SIZE = 15;
const API_PRODUCTS = 'http://ecsc00a02fb3.epam.com/rest/V1/products';

class ProductsScreen extends Component {
  state = {
    products: [],
    currentPage: 0,
    totalProducts: null,
    refreshing: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = () => {
    const { currentPage, totalProducts } = this.state;

    if (totalProducts && currentPage >= totalProducts / PAGE_SIZE) {
      return;
    }

    const url =
      API_PRODUCTS +
      `?searchCriteria[pageSize]=${PAGE_SIZE}` +
      `&searchCriteria[currentPage]=${currentPage + 1}`;

    this.setState({ loading: true });

    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          this.setState({
            products: [...this.state.products, ...data.items],
            currentPage: this.state.currentPage + 1,
            totalProducts: data.total_count,
            refreshing: false,
            loading: false,
          });
        }
      })
      .catch(error => {
        this.setState({
          error: String(error),
          loading: false,
          refreshing: false,
        });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        products: [],
        totalProducts: null,
        currentPage: 0,
        refreshing: true,
      },
      () => {
        this.loadProducts();
      }
    );
  };

  render() {
    const { navigation } = this.props;
    const { products, refreshing, loading } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Products</Text>
        <FlatList
          data={products}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
            <ProductItem
              product={item}
              onPress={product => {
                navigation.navigate(screens.Product, { product });
              }}
            />
          )}
          onEndReached={() => {
            this.loadProducts();
          }}
          onEndReachedThreshold={0}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
        />
        {loading && <ActivityIndicator size="large" color="#A3C644" />}
      </View>
    );
  }
}

export default ProductsScreen;
