import React from 'react';
import { TextInput, View } from 'react-native';

import styles from './styles';

const Input = ({ style = {}, ...inputProps }) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput {...inputProps} style={styles.input} />
    </View>
  );
};

export default Input;
