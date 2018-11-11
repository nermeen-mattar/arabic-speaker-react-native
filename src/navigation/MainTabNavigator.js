import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CategoriesScreen from '../screens/CategoriesScreen';
import SpeakingScreen from '../screens/SpeakingScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import NewCategoryScreen from '../screens/NewCategoryScreen'; 
import SentencesScreen from '../screens/SentencesScreen'; 
import NewSentenceScreen from '../screens/NewSentenceScreen'; 

const CategoriesStack = createStackNavigator({
  CategoriesScreen: CategoriesScreen,
  NewCategoryScreen: NewCategoryScreen,
  SentencesScreen: SentencesScreen,
  NewSentenceScreen: NewSentenceScreen
});

CategoriesStack.navigationOptions = {
  tabBarLabel: 'المكتبات',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: SpeakingScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'التحدث',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const FavourtiesStack = createStackNavigator({
  Favourites: FavouritesScreen,
});

FavourtiesStack.navigationOptions = {
  tabBarLabel: 'المفضلة',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  CategoriesStack,
    FavourtiesStack,
  CategoriesStack,
  LinksStack
});



// const NewCategoryStack = createStackNavigator({
//   NewCategory: NewCategoryScreen,
// });


// NewCategoryStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
//     />
//   ),
// };
