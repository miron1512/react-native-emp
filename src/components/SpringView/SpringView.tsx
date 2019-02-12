import React, { Component } from 'react';
import { Animated } from 'react-native';

import { SpringViewProps } from './types';

class SpringView extends Component<SpringViewProps> {
  scale = new Animated.Value(0);

  componentDidMount() {
    Animated.spring(this.scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { style } = this.props;

    return (
      <Animated.View
        style={[
          style,
          {
            scaleX: this.scale,
            scaleY: this.scale,
          },
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
};

export default SpringView;
