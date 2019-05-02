


import React from 'react';
import { PlaySound } from 'react-native-play-sound';

export default class AlertScreen extends React.Component {

  constructor(props) {
    super();
    props.navigation.addListener('willFocus', this.load)

  }
  load = () => {
    PlaySound('alert');
  }

  render() {
    return null
  }
}

