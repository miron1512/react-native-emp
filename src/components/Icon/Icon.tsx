import React, { SFC } from 'react';
import { Image } from 'react-native';

import icons from './icons';
import { IconProps } from './types';

const Icon: SFC<IconProps> = ({ name, large, rotate = 0, style }) => {
  const iconSize = large ? '100' : '50';
  const icon = icons[name][iconSize];
  return (
    <Image
      style={[style, { transform: [{ rotate: `${rotate}deg` }] }]}
      source={icon}
    />
  );
};

export default Icon;
