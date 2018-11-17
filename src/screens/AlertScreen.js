


import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { PlaySound } from 'react-native-play-sound';


import Colors from '../constants/Colors';

export default class AlertScreen extends React.Component {

  constructor(props) {
    super();
    props.navigation.addListener('willFocus', this.load)

  }
  load = () => {
    PlaySound('alert');
    // this.props.navigation.goBack();
    this.props.navigation.dispatch(NavigationActions.back())    
}

  
  render() {
    return (
      <View>
      </View>
    );
  }


}

