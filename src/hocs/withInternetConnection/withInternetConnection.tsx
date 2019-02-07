import React, { Component, ComponentType } from 'react';
import { NetInfo, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import LottieView from 'lottie-react-native';

import styles from './styles';

const withInternetConnection = (WrappedComponent: ComponentType) => {
  return class WithInternetConnection extends Component {
    state = {
      hasInternetConnection: false,
    };

    async componentDidMount() {
      const isConnected = await NetInfo.isConnected.fetch();

      this.setState({ hasInternetConnection: isConnected });

      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this.handleConnectionChange
      );
    }

    componentWillUnmount() {
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this.handleConnectionChange
      );
    }

    handleConnectionChange = (isConnected: boolean) => {
      console.log('handleConnectionChange', isConnected);
      this.setState({ hasInternetConnection: isConnected });
    };

    render() {
      const { hasInternetConnection } = this.state;
      if (hasInternetConnection) {
        return <WrappedComponent />;
      }
      return (
        <View style={styles.container}>
          <LottieView
            autoPlay
            loop
            source={require('./noInternetConnectionAnimation.json')}
          />
          <Text>Please, connect {DeviceInfo.getBrand()} to the internet</Text>
        </View>
      );
    }
  };
};

export default withInternetConnection;
