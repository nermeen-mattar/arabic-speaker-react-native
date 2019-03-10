


import React from 'react';
import {
  View
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { PlaySound } from 'react-native-play-sound';



export default class AlertScreen extends React.Component {

  constructor(props) {
    super();
    props.navigation.addListener('willFocus', this.load)

  }
  load = () => {
    PlaySound('alert');
    // this.props.navigation.goBack();
    // this.props.navigation.dispatch(NavigationActions.back());   
    // this.props.navigation.navigate('SpeakingScreen', {prevRoute: 'AlertScreen'});
  }

  
  render() {
    return (
      <View>
      </View>
    );
  }


}

