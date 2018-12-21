import React from 'react';
import { Platform , Image} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import CategoriesScreen from '../screens/CategoriesScreen';
import SpeakingScreen from '../screens/SpeakingScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import NewCategoryScreen from '../screens/NewCategoryScreen'; 
// import SentencesScreen from '../screens/SentencesScreen'; 
import NewSentenceScreen from '../screens/NewSentenceScreen'; 
import IconsLibrariesScreen from '../screens/IconsLibrariesScreen'; 
import IconsScreen from '../screens/IconsScreen'; 
import AlertScreen from '../screens/AlertScreen';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';

const CategoriesStack = createStackNavigator({
  CategoriesScreen: CategoriesScreen,
  NewCategoryScreen: NewCategoryScreen,
  // SentencesScreen: SentencesScreen,
  NewSentenceScreen: NewSentenceScreen,
  IconsLibrariesScreen: IconsLibrariesScreen,
  IconsScreen: IconsScreen
});

CategoriesStack.navigationOptions = {
  tabBarLabel:  ({ focused }) => (
    <MonoText style={{color: focused ? Colors.brand: Colors.grayFontColor}}> المكتبات </MonoText>  
  ),

  // tabBarIcon:  ({ focused }) => (
  //   <Icon name="table" size={24} color={focused ? Colors.brand: Colors.grayFontColor}   />  
  // ),
  tabBarIcon: ({ focused }) => (
      <Image source={ 
        focused ? require('../../assets/images/tabs-bar/categories-active.png') : 
        require('../../assets/images/tabs-bar/categories-inactive.png')
    } />
  )
};

const SpeakingStack = createStackNavigator({
  SpeakingScreen: SpeakingScreen,
});

SpeakingStack.navigationOptions = {
  tabBarLabel:  ({ focused }) => (
    <MonoText style={{color: focused ? Colors.brand: Colors.grayFontColor}}> التحدث </MonoText>  
  ),
  tabBarIcon:  ({ focused }) => (
    <Icon name="comments" size={24} color={focused ? Colors.brand: Colors.grayFontColor}   />  

  ),
};

const FavourtiesStack = createStackNavigator({
  FavouritesScreen: FavouritesScreen,
});

FavourtiesStack.navigationOptions = {
  tabBarLabel:  ({ focused }) => (
    <MonoText style={{color: focused ? Colors.brand: Colors.grayFontColor}}> المفضلة </MonoText>  
  ),
  tabBarIcon:  ({ focused }) => (
    <Icon name="star" size={24} color={focused ? Colors.brand: Colors.grayFontColor} />  
  ),
};

const AlertStack = createStackNavigator({
  Alert: AlertScreen,
});

AlertStack.navigationOptions = {
  tabBarLabel:  ({ focused }) => (
    <MonoText style={{color: focused ? Colors.brand: Colors.grayFontColor}}> تنبيه </MonoText>  
  ),
//   <TabBarIcon
//   focused={focused}
//   name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
// />
  tabBarIcon:  ({ focused }) => (
    <Icon name="bell" size={24}  color={focused ? Colors.brand: Colors.grayFontColor}  />  
  ),
};

export default createBottomTabNavigator({
  SpeakingStack,
  CategoriesStack,
  FavourtiesStack,
  AlertStack
}, {
  initialRouteName: 'SpeakingStack'
});
