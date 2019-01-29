import React, { Component } from 'react';
import { Font } from 'expo';
import { createAppContainer } from 'react-navigation';

import RootNavigation from './src/navigation/RootNavigation';
import withInternetConnection from './src/hocs/withInternetConnection';

const RootNavigationContainer = createAppContainer(RootNavigation);
const RootWithInternetConnection = withInternetConnection(
  RootNavigationContainer
);
export default class App extends Component {
  state = {
    fontLoaded: false,
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

    return <RootWithInternetConnection />;
  }
}
