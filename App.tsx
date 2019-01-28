import React, { Component } from 'react';
import { Font } from 'expo';
import { createNavigationContainer } from 'react-navigation';

import RootNavigation from './src/navigation/RootNavigation';

const RootNavigationContainer = createNavigationContainer(RootNavigation);

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

    return <RootNavigationContainer />;
  }
}
