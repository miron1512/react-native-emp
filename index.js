import { AppRegistry } from 'react-native';
import { Sentry } from 'react-native-sentry';

import App from './App';
import { name as appName } from './app.json';

Sentry.config('https://d6717fe034b5449f8c31802c990f32ee@sentry.io/1397654').install();

AppRegistry.registerComponent(appName, () => App);
