import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface FlipComponentProps {
  containerStyles?: StyleProp<ViewStyle>;
  renderBackView: ({ flip }: { flip: () => void }) => ReactNode;
  renderFrontView: ({ flip }: { flip: () => void }) => ReactNode;
};
