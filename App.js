import React from 'react';
import {Platform, StyleSheet, StatusBar, View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { createDrawerNavigator} from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'
import { Storage } from './src/classes/Storage';

import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/constants/Colors';
import SettingsComponent from './src/components/SettingsComponent'
import { I18nManager } from 'react-native';
import IllustrationScreen from './src/screens/IllustrationScreen';
I18nManager.forceRTL(true) // for testing RTL


const SettingsDrawer = createDrawerNavigator({
  AppNavigator: {
    screen: AppNavigator
  },
},
  {
    drawerWidth: 310,
    drawerPosition:  Platform.OS === 'android' ? 'right' : 'left',
    contentComponent: SettingsComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    // navigationOptions: {
    //   header: 'none'
    // }
  });

export default class App extends React.Component {
  navigatorRef;
  state = {
    isLoadingComplete: false
  };
  componentDidMount(){
    const storageInstance = Storage.getInstance();
    const result = { value: "null" };
    // storageInstance.removeItem('alreadyLaunched');
    storageInstance
      .getItem("alreadyLaunched", result).then(res => {
        if(result.value == null){
          storageInstance.setItem('alreadyLaunched', true); // No need to wait for `setItem` to finish, although you might want to handle errors
             this.setState({firstLaunch: true});
        }
        else{
             this.setState({firstLaunch: false});
        }}) // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
}

  // gets the current screen from navigation state
 getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return this.getActiveRouteName(route);
  }
  return route.routeName;
}
  render() {
  //  if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) { 
    // return (
      // <AppLoading
      //   startAsync={this._loadResourcesAsync}
      //   onError={this._handleLoadingError}
      //   onFinish={this._handleFinishLoading}
      // />
      // <ActivityIndicator size="small" color="#00ff00" />
      // https://facebook.github.io/react-native/docs/activityindicator
    // );
  // } else {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000   )
    return (
      //   if(this.state.firstLaunch === null){
      //      return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user.
      //  }else if(this.state.firstLaunch == true){
      //      return <FirstLaunchComponent/>
      //  }else{
      //      return <NotFirstLaunchComponent/>
      //  }
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {
          this.state.firstLaunch &&
          <IllustrationScreen onBackClicked= {() => {
            this.setState({firstLaunch: false})
          }}></IllustrationScreen>
        }
      <SettingsDrawer 
          
          ref={navigatorRef => {
            this.navigatorRef = navigatorRef;
          }}

          onNavigationStateChange = {(prevState, currentState, action) => {
          
            if(this.getActiveRouteName(currentState) == 'Alert') {
              this.navigatorRef.dispatch(
                NavigationActions.navigate({
                  routeName: this.getActiveRouteName(prevState) 
                })
              )
              // SettingsDrawer.navigation.navigate(prevState) 
            }
            // this.props.navigation.dispatch(NavigationActions.back()); 
        }}/>   
  
      </View>
    );
  // }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in CategoriesScreen.js. Feel free
        // to remove this if you are not using it in your app
        'tajawal': require('./assets/fonts/Tajawal-Regular.ttf'),
        'tajawal-bold': require('./assets/fonts/Tajawal-Bold.ttf'),
      }),
    ]);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  }
});
