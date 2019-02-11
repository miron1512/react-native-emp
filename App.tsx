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
    PushNotification.localNotification({
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      subText: 'This is a subText', // (optional) default: none
      color: 'red', // (optional) default: system default
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message

      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
    });
  }

  render() {
    return <RootNavigationContainer />;
  }
}

export default withInternetConnection(App);
