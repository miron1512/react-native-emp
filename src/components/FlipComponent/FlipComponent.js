import React, { Component } from 'react';
import { Animated, View, Easing } from 'react-native';

class FlipComponent extends Component {
  state = {
    isFlipped: false,
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }

  handleFlip = () => {
    const { isFlipped } = this.state;

    Animated.timing(this.animatedValue, {
      toValue: 90,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ isFlipped: !isFlipped }, () => {
        Animated.spring(this.animatedValue, {
          toValue: !isFlipped ? 180 : 0,
          useNativeDriver: true,
        }).start();
      });
    });
  };

  render() {
    const { renderFrontView, renderBackView, containerStyles } = this.props;

    const { isFlipped } = this.state;

    const frontAnimationStyles = {
      transform: [{ rotateY: this.frontInterpolate }],
    };
    const backAnimationStyles = {
      transform: [{ rotateY: this.backInterpolate }],
    };
    const renderParams = { flip: this.handleFlip };

    return (
      <View style={containerStyles}>
        {!isFlipped ? (
          <Animated.View style={frontAnimationStyles}>
            {renderFrontView(renderParams)}
          </Animated.View>
        ) : (
          <Animated.View style={backAnimationStyles}>
            {renderBackView(renderParams)}
          </Animated.View>
        )}
      </View>
    );
  }
}

export default FlipComponent;
