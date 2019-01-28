import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  NetInfo,
  Text,
  Vibration,
  View,
} from 'react-native';

import screens from '../../navigation/screens';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import styles from './styles';

const USER_TOKEN = 'USER_TOKEN';
const EXPIRE_DATE = 'EXPIRE_DATE';
const VIBRATE_DURATION = 1000;

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    username: '',
    password: '',
    error: null,
  };

  constructor(props: any) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const [[, userToken], [, expireDateString]] = await AsyncStorage.multiGet([
      USER_TOKEN,
      EXPIRE_DATE,
    ]);
    if (!userToken) {
      return;
    }

    const isConnected = await NetInfo.isConnected.fetch();
    if (!isConnected) {
      Alert.alert('No Internet Connection', 'Please, turn on the internet', [
        { text: 'Ok', style: 'default' },
      ]);
      console.log('post alert');
    }

    const expireDate = new Date(expireDateString);
    if (new Date() > expireDate) {
      await AsyncStorage.clear();
      return;
    }

    this.props.navigation.navigate(screens.Products);
  }

  handleUsernameChange = (value: string) => {
    this.setState({ username: value });
  };

  handlePasswordChange = (value: string) => {
    this.setState({ password: value });
  };

  async showErrorMessage(message: string) {
    await AsyncStorage.clear();
    Vibration.vibrate(VIBRATE_DURATION, false);
    this.setState({ error: message });
  }

  async handleSubmit() {
    const { username, password } = this.state;

    const isConnected = await NetInfo.isConnected.fetch();
    if (!isConnected) {
      Alert.alert('No Internet Connection', 'Please, turn on the internet', [
        { text: 'Ok', style: 'default' },
      ]);
      return;
    }

    try {
      const response = await fetch(
        'http://ecsc00a02fb3.epam.com/index.php/rest/V1/integration/customer/token',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();
      if (typeof data !== 'string') {
        this.showErrorMessage(
          'You have entered an invalid username or password'
        );
        return;
      }

      const expireDate = new Date();
      expireDate.setMinutes(expireDate.getMinutes() + 2);
      await AsyncStorage.multiSet([
        [USER_TOKEN, data],
        [EXPIRE_DATE, expireDate.toISOString()],
      ]);

      this.props.navigation.navigate(screens.Products);
    } catch (error) {
      console.log('fetch error', error);
      this.showErrorMessage(String(error));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon name="shopping-cart" large />
        <Text style={styles.title}>Firday's shop</Text>
        <View style={styles.form}>
          <Input placeholder="Login" onChangeText={this.handleUsernameChange} />
          <Input
            secureTextEntry
            placeholder="Password"
            onChangeText={this.handlePasswordChange}
          />
        </View>
        <Button primary title="Login" onPress={this.handleSubmit} />
        <Modal
          visible={!!this.state.error}
          title="Error"
          onCancel={() => {
            this.setState({ error: null });
          }}
          onOk={() => {
            this.setState({ error: null }, () => {
              this.handleSubmit();
            });
          }}
          okText="Try again"
        >
          <View>
            <Text>{this.state.error}</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

export default LoginScreen;
