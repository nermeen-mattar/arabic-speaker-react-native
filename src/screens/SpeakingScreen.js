import React from 'react';
import { ScrollView, StyleSheet, TextInput, View, TouchableOpacity, Image} from 'react-native';
import Colors from '../constants/Colors';
// import { ExpoLinksView } from '@expo/samples';

import CustomHeader from '../components/CustomHeader';
import { TextToSpeach } from '../classes/text-to-speach';
import { MonoText } from '../components/StyledText';
import { Storage } from '../classes/storage';

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

        <TextInput value={this.state.text} style={styles.textInput} onChangeText={(text) => this.onTextChanged(text)}
        placeholder= {this.state.inputPlaceholder}  multiline = {true} />
        <MonoText> {this.state.text}</MonoText>
        <View style={styles.toolsbar}> 
        <TouchableOpacity  onPress={() => this.clear()}style={styles.tool}>
          <Image
            style={styles.button}
            source={require('../../assets/images/categories/favourites.png')}
          />
            <MonoText> مسح </MonoText>

    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.addToFavourites()} style={styles.space}>

          <Image
            style={styles.button}
            source={require('../../assets/images/categories/favourites.png')}
          />
            <MonoText> المفضلة </MonoText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.addSpace()} style={styles.space}>
          <Image
            style={styles.button}
            source={require('../../assets/images/categories/favourites.png')}
          />
                      <MonoText> مسافة </MonoText>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.speak()} style={styles.space}>
          <Image
            style={styles.button}
            source={require('../../assets/images/categories/favourites.png')}
          />
                      <MonoText> تحدث </MonoText>

    </TouchableOpacity>
        </View>
        <ScrollView>
          </ScrollView>
      </View>
    );
  }
  onTextChanged(text) {
    this.setState({
      text: text,
    });
  }

  speak() {
    TextToSpeach.getInstance().speak(this.state.text);
  }

  addSpace() {
    this.setState({
      text: this.state.text.concat(' '),
    });
  }
  clear() {
    this.setState({
      text: '',
    });
  }

  addToFavourites() {
    const storageInstance = Storage.getInstance();
    // storageInstance.setItem('storageInstance', 'nermeen');
    const result = {value: 'null'};
    storageInstance.getItem('favourites', result).then(res => {
      const currFavourites = result.value ? result.value : [];
      storageInstance.setItem('favourites', [...currFavourites, this.state.text]).then(res => {
        // this.props.navigation.navigate('FavouritesStack');
        alert( [...currFavourites, this.state.text].length);
      })
      // this.props.navigation.navigate('FavouritesStack');
    });
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
