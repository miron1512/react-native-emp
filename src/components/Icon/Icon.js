import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

import icons from '../../../assets/icons/icons';

const Icon = ({ name, large, rotate = 0, style }) => {
  const iconSize = large ? '100' : '50';
  const icon = icons[name][iconSize];
  return (
    <Image
      style={[style, { transform: [{ rotate: `${rotate}deg` }] }]}
      source={icon}
    />
  );
};

Icon.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string.isRequired,
  rotate: PropTypes.number,
  large: PropTypes.bool,
};

export default Icon;
