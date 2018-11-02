import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text} from 'react-native';

import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './src/navigation/AppNavigator';

import { DrawerNavigator} from 'react-navigation'

const CustomDrawerContentComponent = (props) => (

  // <Container>
  //   <Header>
  //     <Body>
        <Text> الإعدادات </Text>
  //     </Body>
  //   </Header>
  //   <Content>
  //     <DrawerItems {...props} />
  //   </Content>

  // </Container>

);


const SettingsDrawer = DrawerNavigator({
  // For each screen that you can navigate to, create a new entry like this:
  AppNavigator: {
    screen: AppNavigator
  },
},
  {
    drawerPosition: 'right',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    // navigationOptions: {
    //   header: 'none'
    // }
  });


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <SettingsDrawer/>
          {/* <AppNavigator /> */}
        </View>
      );
    }
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
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  header: {
    backgroundColor: '#1c1',
  }
});
