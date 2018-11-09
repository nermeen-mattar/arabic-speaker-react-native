import React from 'react';
import { ScrollView, StyleSheet, TextInput, View, TouchableOpacity, Image} from 'react-native';
import Colors from '../constants/Colors';
// import { ExpoLinksView } from '@expo/samples';

import CustomHeader from '../components/CustomHeader';
// import { TextToSpeach } from '../classes/text-to-speach';

export default class TextToSpeachScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      // title: "إضافة تصنيف جديد",
      inputPlaceholder: "التحدث",
      text: ''
    };
  }
  static navigationOptions = {
    header: null
  };
  
  // static navigationOptions = {
  //   title: 'Links',
  // };

  render() {
    return (
      <View style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        {/* <ExpoLinksView /> */}
        <CustomHeader />

        <TextInput  style={styles.textInput} onChangeText={(text) => this.onTextChanged(text)}
        placeholder= {this.state.inputPlaceholder}  multiline = {true} />
        <View style={styles.toolsbar}> 
        <TouchableOpacity onPress={this._onPressButton} style={styles.tool}>
          <Image
            style={styles.button}
            source={require('../../assets/images/categories/favourites.png')}
          />
    </TouchableOpacity>
    <TouchableOpacity onPress={this._onPressButton} style={styles.tool}>
          <Image
            style={styles.button}
            source={require('../../assets/images/categories/favourites.png')}
          />
    </TouchableOpacity>
    <TouchableOpacity onPress={this._onPressButton} style={styles.space}>
          <Image
            style={styles.button}
            source={require('../../assets/images/categories/favourites.png')}
          />
    </TouchableOpacity>
    <TouchableOpacity onPress={this._onPressButton} style={styles.tool}>
          <Image
            style={styles.button}
            source={require('../../assets/images/categories/favourites.png')}
          />
    </TouchableOpacity>
        </View>
        <ScrollView>
          </ScrollView>
      </View>
    );
  }

  onTextChanged(text) {
    this.setState({
      // title: 'okokok',
      text: text,
    });
    // const TextToSpeach = new TextToSpeach();
    // TextToSpeach.speak(text);
  }

  _onPressButton() {

  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    //     padding: 13,
  },
  textInput: {
    width: 350,
    height: 84,
    backgroundColor: Colors.primary,
    fontSize: 21,
  //   color: Colors.textSecondary,
    textAlign: 'right',
    padding: 8, // 11
    paddingTop: 12, // 16
    marginLeft: 10, // 12
    borderRadius: 10 /* **N** */
},
toolsbar: {
  backgroundColor: '#F7F7F7', // temp
  flex: 1,
  flexDirection: 'row',
  height: 58
},
tool: {
  width: 60,
  textAlign: 'center'
},
space: {
  width: 150,
  textAlign: 'center'
}
});
