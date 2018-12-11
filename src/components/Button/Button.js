import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Button = ({ onPress, children, title, style = {}, primary }) => {
  const content = title
    ? (
      <Text
        style={styles[`${primary ? 'primary' : 'default'}Text`]}
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
          styles[`${primary ? 'primary' : 'default'}Background`],
          style
        ]}
      >
        {content}
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.element,
  title: PropTypes.string,
  style: PropTypes.object,
  primary: PropTypes.bool,
};

export default Button;
