import React from 'react';
import { Animated } from 'react-native';

class SpringView extends React.Component {
  state = {
    scale: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.spring(this.state.scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  render() {
    let { scale } = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          scaleX: scale,
          scaleY: scale,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default SpringView;
