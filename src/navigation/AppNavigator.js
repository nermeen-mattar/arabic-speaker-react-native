import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
// import CategoriesScreen from '../screens/CategoriesScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import AboutUsScreen from '../screens/AboutUsScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  ContactUsScreen: {
    screen: ContactUsScreen
  },
  AboutUsScreen: {
    screen: AboutUsScreen
  }
});