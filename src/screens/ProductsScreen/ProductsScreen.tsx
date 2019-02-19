import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { getProducts, PAGE_SIZE } from '../../api';
import screens from '../../navigation/screens';
import ProductItem from '../../components/ProductItem';
import styles from './styles';

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

  animatedValue: Animated.Value[] = [];

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    const { currentPage, totalProducts } = this.state;

    if (totalProducts && currentPage >= totalProducts / PAGE_SIZE) {
      return;
    }

    this.setState({ loading: true });

    try {
      const { items, total_count }: any = await getProducts(currentPage + 1);
      const newAnimatedChunk = items.map(() => {
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
        products: [...this.state.products, ...items],
        currentPage: this.state.currentPage + 1,
        totalProducts: total_count,
        refreshing: false,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: String(error),
        loading: false,
        refreshing: false,
      });
    }
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
    const { navigation } = this.props as any;
    const { products, refreshing, loading } = this.state;

    const onEndReachedThreshold = products.length ? 1 / products.length : 0.1;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Products</Text>
        <FlatList
          data={products}
          keyExtractor={(item: any) => `${item.id}`}
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
