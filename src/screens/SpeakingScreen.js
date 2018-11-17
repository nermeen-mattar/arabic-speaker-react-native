import React from 'react';
import { ScrollView, StyleSheet, TextInput, View, TouchableOpacity, TouchableHighlight, Image} from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../constants/Colors';
import CustomHeader from '../components/CustomHeader';
import { TextToSpeach } from '../classes/text-to-speach';
import { MonoText } from '../components/StyledText';
import { Storage } from '../classes/storage';
import { TextPredection } from '../classes/textPrediction';
import commonStyles from '../styles/commonStyles';

export default class TextToSpeachScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      inputPlaceholder: "التحدث",
      text: '',
      predectedWords: [],
      toolsBar: [
        {
          title: 'مسح',
          iconName: 'trash',
          onPress: () => this.clear(),
          style: styles.tool
        },
        {
          title: 'المفضلة',
          iconName: 'star',
          onPress: () => this.addToFavourites(),
          style: styles.tool
        },
        {
          title: 'مسافة',
          customIcon: styles.spaceIcon,
          onPress: () => this.addSpace(),
          // style={styles.space}
          style: styles.space
        },
        {
          title: 'تحدث',
          iconName: 'volume-up',
          onPress: () => this.speak(),
           style: styles.tool
        }
      ],
      activeToolName: '',
    };
  }

  componentDidMount() {
    TextPredection.getInstance().initIndexedDefaultWords() 
  }
 
  static navigationOptions = {
    header: null
  };


  render() {
    return (
      <View style={styles.container}>

        <CustomHeader navigation = {this.props.navigation} />

        <TextInput value={this.state.text} style={styles.textInput} onChangeText={(text) => this.onTextChanged(text)}
        placeholder= {this.state.inputPlaceholder}  multiline = {true} />
     
     
        <View style={styles.toolsbar}> 

        {
            this.state.toolsBar.map(tool => {
              return(
            <TouchableHighlight style={tool.style}
            underlayColor = "transparent"
            onPress={tool.onPress} 
            onShowUnderlay={()=>this.setState({activeToolName:tool.title})}
            onHideUnderlay={()=>this.setState({activeToolName:''})}>    
          <View> 
          {
            tool.customIcon ?
            <MonoText     
            style={[tool.customIcon, 
              {backgroundColor: this.state.activeToolName === 'مسافة' ?  Colors.brand : Colors.borderColor}]} > </MonoText>
        
            : <Icon style={styles.addIcon}  name={tool.iconName} size={28}  color={ this.state.activeToolName === tool.title ? Colors.brand: Colors.borderColor}/> 
          }
            <MonoText style={{color: this.state.activeToolName === tool.title ? Colors.brand: Colors.borderColor}}> {tool.title} </MonoText>
          </View>
        </TouchableHighlight>
              )})
            }
        </View>


        <View style={styles.predectionsWrapper}>
        {
            this.state.predectedWords.map(word => {
              return(
        <TouchableOpacity  style={[styles.predectedWord, commonStyles.shadow ]} onPress={() =>
          this.onTextChanged(this.state.text.concat(' ').concat(word))}>
            <MonoText> {word} </MonoText>
    </TouchableOpacity>
              )})
              }
          </View>
      </View>
    );
  }
  onTextChanged(text) {
    this.setState({
      text: text,
      predectedWords: TextPredection.getInstance().getPredectedWords(text).slice(0, 12)
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
      if(this.state.text.trim().length && !currFavourites.includes(this.state.text)) {
        storageInstance.setItem('favourites', [...currFavourites,  this.state.text]).then(res => {
          // this.props.navigation.navigate('FavouritesStack');
          // add success msg
        })
      }
      // this.props.navigation.navigate('FavouritesStack');
    });
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
    marginLeft: 'auto', // 10, // 12
    marginRight: 'auto',
    borderRadius: 10 /* **N** */
},
toolsbar: {
  backgroundColor: '#F7F7F7', // temp
  flexDirection: 'row',
  justifyContent: 'center',
  // marginLeft: 'auto',
  // marginRight: 'auto',
  paddingTop: 10,
  paddingBottom: 6,
  height: 59
},
tool: {
  // width: 60,
  paddingHorizontal: 20,
  textAlign: 'center'
},
space: {
  // width: 150,
  paddingHorizontal: 14,

  textAlign: 'center',
},
spaceIcon: {
  width: 117,
  height: 22,
  backgroundColor:  Colors.borderColor,
  borderRadius: 4
}, 
predectionsWrapper: {
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  paddingVertical: 14, 
  paddingHorizontal: 12  
}, 
predectedWord: {
  marginHorizontal: 10,
  backgroundColor: 'white',
  fontSize: 21,
  borderRadius: 10,
  paddingHorizontal: 24,
  paddingVertical: 10,
  marginBottom: 10
}
});

