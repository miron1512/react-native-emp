import React, { SFC } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { ButtonProps } from './types';
import styles from './styles';

const Button: SFC<ButtonProps> = ({ onPress, children, title, style = {}, primary }) => {
  const content = title
    ? (
      <Text
        style={styles[primary ? 'primaryText' : 'defaultText']}
      >
        {title.toUpperCase()}
      </Text>
    )
    : children;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.button,
          styles[primary ? 'primaryBackground' : 'defaultBackground'],
          style,
        ]}
      >
        {content}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
