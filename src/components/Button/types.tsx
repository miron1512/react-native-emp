import { StyleProp, ViewStyle } from 'react-native';

export interface ButtonProps {
  onPress: () => void;
  primary?: boolean;
  style?: StyleProp<ViewStyle>,
  title: string;
};
