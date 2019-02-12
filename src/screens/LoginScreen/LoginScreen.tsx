import React, { Component } from 'react';
import { Text, Vibration, View } from 'react-native';

import { getToken } from '../../api';
import { saveUserToken, isUserTokenValid } from '../../services/storage';
import screens from '../../navigation/screens';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import styles from './styles';

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
    const isTokenValid = await isUserTokenValid();

    if (isTokenValid) {
      this.props.navigation.navigate(screens.Products);
    }
  }

  handleUsernameChange = (value: string) => {
    this.setState({ username: value });
  };

  handlePasswordChange = (value: string) => {
    this.setState({ password: value });
  };

  async showErrorMessage(message: string) {
    Vibration.vibrate(VIBRATE_DURATION, false);
    this.setState({ error: message });
  }

  async handleSubmit() {
    const { username, password } = this.state;

    try {
      const token = await getToken(username, password);

      await saveUserToken(token);

      this.props.navigation.navigate(screens.Products);
    } catch (error) {
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
