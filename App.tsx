import React from 'react';
import { createAppContainer } from 'react-navigation';

import RootNavigation from './src/navigation/RootNavigation';
import withInternetConnection from './src/hocs/withInternetConnection';

const RootNavigationContainer = createAppContainer(RootNavigation);

const App = () => (
  <RootNavigationContainer />
);

export default withInternetConnection(App);
