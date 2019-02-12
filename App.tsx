import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';

import RootNavigation from './src/navigation/RootNavigation';
import withInternetConnection from './src/hocs/withInternetConnection';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);
  },
});

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
