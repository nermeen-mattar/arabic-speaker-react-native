


import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {Card} from '../components/card';
import CustomHeader from '../components/CustomHeader';
import Colors from '../constants/Colors';
import { Storage } from '../classes/storage';

export default class FavouritesScreen extends React.Component {

  constructor(props) {
    super();
    this.state = {
      title: "المفضلة",
      favourites: []
    };
  }
  static navigationOptions = {
    header: null
  };
  
  render() {
    this.initFavourites(); /* didn't work in constructor because comp doesn't get killed ! solve caching
    /* make it a class prop (part of state) */
    return (
      <View style={styles.container}>
        {/* <Header
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent= {<CustomHeader title="Home" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />}
          rightComponent={{ icon: 'home', color: '#fff' }}
         /> */}
         <CustomHeader title={this.state.title} onNewClicked= {() => this.props.navigation.navigate('NewFavouriteScreen')}/>
         {/* <Header centerComponent = {{ text: 'MY nerro', style: { color: '#fff' } }} />  */}
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.cardsContainer}>
          {
            this.state.favourites.map((favourite, index) => {
              return(
            //     <View key ={index}>
            // <Text style={styles.getStartedText}>
            //   {favourite.label}
            // </Text>
            //  </View>
              <Card key ={index} cardInfo = {{label: favourite}}/>
              // <MonoText> {favourite} </MonoText>
              );
            })
          }
          </View>

          {/* <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <MonoText style={styles.getStartedText}>Get started by nermeen</MonoText>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/FavouritesScreen.js</MonoText>
            </View>

            <MonoText style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </MonoText>
          </View> */}

          {/* <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <MonoText style={styles.helpLinkText}>Help, it didn’t automatically reload!</MonoText>
            </TouchableOpacity>
          </View> */}
        </ScrollView>

        {/* <View style={styles.tabBarInfoContainer}>
          <MonoText style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</MonoText>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View> */}
      </View>
    );
  }

  initFavourites = ()  => {
    const storageInstance = Storage.getInstance();
    const result = {value: 'null'};
    storageInstance.getItem('favourites', result).then(res => {
      if(result.value) {
        this.setState({
          favourites: result.value
        });
      } else {
        this.setState({
          favourites: defaultFavourites
        });
        storageInstance.setItem('favourites', defaultFavourites);
      }
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
  cardsContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    // display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  // welcomeImage: {
  //   resizeMode: 'contain',
  // },
  // tabBarInfoContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: 'black',
  //       shadowOffset: { height: -3 },
  //       shadowOpacity: 0.1,
  //       shadowRadius: 3,
  //     },
  //     android: {
  //       elevation: 20,
  //     },
  //   }),
  //   alignItems: 'center',
  //   backgroundColor: '#fbfbfb',
  //   paddingVertical: 20,
  // }
});


