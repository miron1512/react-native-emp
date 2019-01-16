import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import screens from '../../navigation/screens';
import ProductItem from '../../components/ProductItem';
import styles from './styles';

const PAGE_SIZE = 15;
const API_PRODUCTS = 'http://ecsc00a02fb3.epam.com/rest/V1/products';

class ProductsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    products: [],
    currentPage: 0,
    totalProducts: null,
    refreshing: false,
    loading: false,
    error: null,
  };

  animatedValue = [];

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
          const newAnimatedChunk = data.items.map((item, index) => {
            return new Animated.Value(0);
          });
          this.animatedValue = [...this.animatedValue, ...newAnimatedChunk];
          const animations = this.animatedValue.map((item, index) => {
            return Animated.timing(this.animatedValue[index], {
              toValue: 1,
              duration: 30,
              useNativeDriver: true,
            });
          });
          Animated.sequence(animations).start();

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
    this.animatedValue = [];
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

    const onEndReachedThreshold = products.length ? 1 / products.length : 0.1;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Products</Text>
        <FlatList
          data={products}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item, index }) => (
            <ProductItem
              style={{
                opacity: this.animatedValue[index],
                transform: [
                  {
                    translateX: this.animatedValue[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              }}
              product={item}
              onPress={product => {
                navigation.navigate(screens.Product, { product });
              }}
            />
          )}
          onEndReached={() => {
            this.loadProducts();
          }}
          onEndReachedThreshold={onEndReachedThreshold}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
        />
        {loading && <ActivityIndicator size="large" color="#A3C644" />}
      </View>
    );
  }
}

export default ProductsScreen;
