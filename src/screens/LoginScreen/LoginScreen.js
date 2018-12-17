import React, { Component } from 'react';
import { View, Text } from 'react-native';

import screens from '../../navigation/screens';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './styles';

class LoginScreen extends Component {
  state = {
    username: '',
    password: '',
  };

  handleUsernameChange = value => {
    this.setState({ username: value });
  };

  handlePasswordChange = value => {
    this.setState({ password: value });
  };

  handleSubmit = () => {
    const { username, password } = this.state;
    fetch(
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
    )
      .then(response => response.json())
      .then(data => {
        if (typeof data === 'string') {
          this.props.navigation.navigate(screens.Products);
        }
      })
      .catch(error => {
        console.log('fetch error', error);
      });
  };

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
      </View>
    );
  }
}

export default LoginScreen;
