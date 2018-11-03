import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import NewCategoryScreen from '../screens/NewCategoryScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  NewCategory: {
    screen: NewCategoryScreen
  },
});