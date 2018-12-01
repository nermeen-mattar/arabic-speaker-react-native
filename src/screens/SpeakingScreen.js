import React from 'react';
import { ScrollView, StyleSheet, TextInput, View, TouchableOpacity, TouchableHighlight, Image, Keyboard} from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../constants/Colors';
import CustomHeader from '../components/CustomHeader';
import { TextToSpeach } from '../classes/TextToSpeach';
import { MonoText } from '../components/StyledText';
import { Storage } from '../classes/Storage';
import { TextPredection } from '../classes/TextPrediction';
import commonStyles from '../styles/commonStyles';

export default class TextToSpeachScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputPlaceholder: "أكتب",
      text: '',
      predectedWords: [],
      toolsBar: [
        {
          title: 'نطق',
          iconName: 'volume-up',
          onPress: () => this.speak(),
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
          title: 'المفضلة',
          iconName: 'star',
          onPress: () => this.addToFavourites(),
          style: styles.tool
        },
        {
          title: 'مسح',
          iconName: 'trash',
          onPress: () => this.clear(),
          style: styles.tool
        }
      ],
      activeToolName: '',
    };
    props.navigation.addListener('willFocus', this.load)
  }

  load = () => {
    this.setState({
      text: '',
    predectedWords: []
    });
    this.onTextChanged('');
 }

  componentDidMount() {
    TextPredection.getInstance().initIndexedDefaultWords() 
  }
 
  static navigationOptions = {
    header: null
  };


  render() {
    return (
      <TouchableOpacity
      style={styles.container}
      activeOpacity = {1}
      onPress={Keyboard.dismiss} 
    >
        <CustomHeader navigation = {this.props.navigation} />

      <View style={commonStyles.center}>


      <View style={styles.inputAndToolsWrapper}> 
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
        
            : <Icon style={{textAlign: 'center'}}  name={tool.iconName} size={22}  color={ this.state.activeToolName === tool.title ? Colors.brand: Colors.borderColor}/> 
          }
            <MonoText style={{ textAlign: 'center',  color: this.state.activeToolName === tool.title ? Colors.brand: Colors.borderColor}}> {tool.title} </MonoText>
          </View>
        </TouchableHighlight>
              )})
            }
        </View>
        </View> 

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
      </TouchableOpacity>
    );
  }
  onTextChanged(text) {
    this.setState({
      text: text,
      predectedWords: TextPredection.getInstance().getPredectedWords(text).slice(0, 12)
    });
  }

  speak() {
    TextPredection.getInstance().addToUserWordsIfNew(this.state.text); 
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
  inputAndToolsWrapper: {
    marginTop: 10,
    paddingTop: 12,
    height: 144,
    width: 350,
    position: 'relative',
    // marginHorizontal: 'auto',
    backgroundColor: Colors.primary,
    borderRadius: 10 /* **N** */
  },
  textInput: {
    // width: 350,
    height:  84,
    // backgroundColor: Colors.primary,
    fontSize: 21,
    //   color: Colors.textSecondary,
    textAlign: 'right',
    paddingHorizontal: 8, // 11
    // paddingVertical: 12, // 16 // moved to wrapper
    // marginLeft: 'auto', // 10, // 12
    // marginRight: 'auto',
},
toolsbar: {
  position: 'absolute',
  top: 84,
  backgroundColor: '#F7F7F7', // temp
  flexDirection: 'row',
  justifyContent: 'center',
  // marginLeft: 'auto',
  // marginRight: 'auto',
  paddingTop: 10,
  paddingBottom: 6,
  // marginLeft: 'auto', // 10, // 12
  // marginRight: 'auto',
  height: 60,
  borderRadius: 10 /* **N** */

},
tool: {
  // width: 60,
  paddingHorizontal: 16,
  textAlign: 'center'
},
space: {
  // width: 150,
  paddingHorizontal: 18,
  textAlign: 'center',
},
spaceIcon: {
  width: 116, // 117
  height: 22,
  backgroundColor:  Colors.borderColor,
  borderRadius: 6
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

