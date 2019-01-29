import { StyleProp, ImageStyle } from 'react-native';

export type Icons = 'book-stack'
  | 'chevron-left'
  | 'google-images'
  | 'nerf-gun'
  | 'packaging'
  | 'sedan'
  | 'shopping-cart'
  | 'support'
  | 'teddy-bear';

export interface IconProps {
  large?: boolean,
  name: Icons,
  rotate?: number,
  style?: StyleProp<ImageStyle>;
};
