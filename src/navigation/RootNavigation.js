import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';

import screens from './screens';

const RootNavigation = createStackNavigator(
  {
    [screens.Login]: { screen: LoginScreen },
    [screens.Products]: { screen: ProductsScreen },
    [screens.Product]: { screen: ProductScreen },
  },
  {
    initialRouteName: screens.Login,
  }
);

export default RootNavigation;
