import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';

import screens from './screens';

const AppStack = createStackNavigator(
  {
    [screens.Products]: { screen: ProductsScreen },
    [screens.Product]: { screen: ProductScreen },
  },
  {
    initialRouteName: screens.Products,
  }
);


const RootNavigation = createSwitchNavigator(
  {
    [screens.Login]: { screen: LoginScreen },
    App: AppStack,
  },
  {
    initialRouteName: screens.Login,
  }
);

export default RootNavigation;
