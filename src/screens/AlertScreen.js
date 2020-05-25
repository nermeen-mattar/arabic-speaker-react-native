


import React from 'react';
import SoundPlayer from 'react-native-sound-player'

export default class AlertScreen extends React.Component {

  constructor(props) {
    super();
    props.navigation.addListener('willFocus', this.load)

  }
  load = () => {
    SoundPlayer.playSoundFile('alert', 'mp3');
  }

  render() {
    return null
  }
}

