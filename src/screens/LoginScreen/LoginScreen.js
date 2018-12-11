import React from 'react';
import { View, Text } from 'react-native';

import Icon from '../../components/Icon';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './styles';

const LoginScreen = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Icon name="shopping-cart" large />
      <Text style={styles.title}>Firday's shop</Text>
      <View style={styles.form}>
        <Input placeholder="Login" />
        <Input secureTextEntry placeholder="Password" />
      </View>
      <Button primary title="Login" onPress={onPress} />
    </View>
  );
};

export default LoginScreen;
