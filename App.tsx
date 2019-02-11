import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import RootNavigation from './src/navigation/RootNavigation';
import withInternetConnection from './src/hocs/withInternetConnection';

const RootNavigationContainer = createAppContainer(RootNavigation);

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <RootNavigationContainer />;
  }
}

export default withInternetConnection(App);
