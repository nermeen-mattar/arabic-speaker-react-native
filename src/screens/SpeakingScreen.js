import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Keyboard
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Colors from "../constants/Colors";
import CustomHeader from "../components/CustomHeader";
import { TextToSpeach } from "../classes/TextToSpeach";
import { MonoText } from "../components/StyledText";
import { Storage } from "../classes/Storage";
import { TextPrediction } from "../classes/TextPrediction";
import commonStyles from "../styles/commonStyles";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { AutoSoundsSaver }from "../classes/AutoSoundsSaver";

export default class TextToSpeachScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputPlaceholder: "أكتب",
      text: "",
      predectedWords: TextPrediction.getInstance().getPredectedWords(""),
      toolsBar: [
        {
          title: "نطق",
          iconName: "volume-up",
          iconSize: 34,
          onPress: () => this.speak(),
          styles: [styles.tool]
        },
        {
          title: "مسافة",
          customIcon: styles.spaceIcon,
          onPress: () => this.addSpace(),
          // style={styles.space}
          styles: [styles.space]
        },
        {
          title: "المفضلة",
          iconName: "star",
          onPress: () => this.toggleFavourites(),
          styles: [styles.tool]
        },
        {
          title: "مسح",
          iconName: "trash",
          onPress: () => this.clear(),
          styles: [styles.tool]
        }
      ],
      toolsColors: {
        نطق: Colors.brand,
        المفضلة: Colors.borderColor,
        مسح: Colors.borderColor,
        مسافة: Colors.borderColor
      },
      activeToolName: "" // 'نطق',
    };
    this.initFavourites();
    props.navigation.addListener("willFocus", this.load);
  }

  load = () => {
    this.initFavourites();
    this.setState({
      // activeToolName: 'نطق',
      // text: JSON.stringify(this.props.navigation.getParam('prevRoute') !== AlertScreen.name),
      toolsColors: {
        نطق: Colors.brand,
        المفضلة: Colors.borderColor,
        مسح: Colors.borderColor,
        مسافة: Colors.borderColor
      }
    });
    // if(this.props.navigation.getParam('prevRoute') !== AlertScreen.name) {
    //   this.onTextChanged('');
    // }
  };

  componentDidMount() {
    TextPrediction.getInstance().initIndexedDefaultWords();
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={Keyboard.dismiss}
      >
        <CustomHeader navigation={this.props.navigation} />

        <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.inputAndToolsWrapper}>
            <TextInput
              value={this.state.text}
              style={styles.textInput}
              onChangeText={text => {this.setState({text: text}); this.onTextChanged(text)}}
              placeholder={this.state.inputPlaceholder}
              multiline={true}
            />

            <View style={styles.toolsbar}>
              {this.state.toolsBar.map(tool => {
                return (
                  <TouchableHighlight
                    style={tool.styles}
                    underlayColor="transparent"
                    onPress={tool.onPress}
                    onShowUnderlay={() =>
                      this.setState({ activeToolName: tool.title })
                    }
                    onHideUnderlay={() => this.setState({ activeToolName: "" })}
                  >
                    <View>
                      {tool.customIcon ? (
                        <MonoText
                          style={[
                            tool.customIcon,
                            {
                              backgroundColor: this.state.toolsColors[
                                tool.title
                              ]
                            }
                          ]}
                        >
                                                 </MonoText>
                      ) : (
                        // this.state.activeToolName === 'مسافة' ?  Colors.brand : Colors.borderColor}

                        <Icon
                          style={{ textAlign: "center" }}
                          name={tool.iconName}
                          size={tool.iconSize || 24}
                          color={this.state.toolsColors[tool.title]}
                        />
                      )
                      // color={ this.state.activeToolName === tool.title ? Colors.brand: Colors.borderColor}
                      }
                      <MonoText
                        style={{
                          textAlign: "center",
                          color: this.state.toolsColors[tool.title]
                        }}
                      >
                                               {tool.title}{" "}
                      </MonoText>
                      {/* color: this.state.activeToolName === tool.title ? Colors.brand: Colors.borderColor */}
                    </View>
                  </TouchableHighlight>
                );
              })}
            </View>
            </View>
          <View style={[styles.predectionsWrapper, commonStyles.flexCenter]}>
          {this.state.predectedWords.map(word => {
            return (
              <TouchableOpacity
                style={[styles.predectedWord, commonStyles.shadow]}
                onPress={() => this.selectPredectedWord(word)}
              >
                <MonoText numberOfLines={1} style={styles.predectedWordText}> {word} </MonoText>
              </TouchableOpacity>
            );
          })}
        </View>
   
        </View>
          {/* <ScrollView>
          <MonoText>{JSON.stringify(   TextPrediction.getInstance().debuggingText)}</MonoText>

          </ScrollView> */}
        {this.state.showConfirmDialog ? (
          <ConfirmDeleteDialog
            customizedText={
              "هل أنت متأكد أنك تربد حذف" +
              " '" +
              this.state.text +
              " '" +
              "من المفضلات"
            }
            onConfirm={() => {
              this.setState({
                showConfirmDialog: false
              });
              this.deleteFavourite();
            }}
            onCancel={() => {
              this.setState({
                showConfirmDialog: false
              });
            }}
          >
                     </ConfirmDeleteDialog>
        ) : null}
      </TouchableOpacity>
    );
  }

  selectPredectedWord(word) {
    let inputText = this.state.text;
    const indexOfLastWord = inputText.lastIndexOf(" ");
    if (indexOfLastWord === -1) {
      // writing the first word
      inputText = "";
    }
    if (indexOfLastWord !== inputText.length - 1) {
      inputText = inputText.slice(0, indexOfLastWord).concat(" ");
    }
    this.changeText(inputText.concat(word).concat(" "));
  }


  changeText(text) {
    this.setState({text: text});
    const toolsColors = this.state.toolsColors;
    toolsColors["المفضلة"] = this.state.favourites.includes(text)
      ? Colors.brand
      : Colors.borderColor;
    this.setState({
      toolsColors: toolsColors,
      predectedWords: TextPrediction.getInstance().getPredectedWords(text) // .slice(0, 12)
    });
  }

  speak() {
    let toolsBar = [...this.state.toolsBar];
    toolsBar[0].styles = [styles.tool, styles.speakActive];
    this.setState({ toolsBar: toolsBar });
    TextPrediction.getInstance().addSentenceToUserWords(this.state.text);
    TextToSpeach.getInstance().speak(this.state.text);
    setTimeout(() => {
      toolsBar[0].styles = [styles.tool];
      this.setState({ toolsBar: toolsBar });
    }, (this.state.text.length / 10.5) * 1000);
  }

  addSpace() {
    this.setState({
      text: this.state.text.concat(" ")
    });
  }

  clear() {
    this.changeText("");
  }

  initFavourites() {
    const storageInstance = Storage.getInstance();
    const result = { value: null };
    storageInstance.getItem("favourites", result).then(res => {
      const currFavourites = result.value ? result.value : [];
      this.setState({
        favourites: currFavourites
      });
    });
  }

  deleteFavourite() {
    let currFavourites = this.state.favourites;
    const storageInstance = Storage.getInstance();
    const toolsColors = this.state.toolsColors;
    toolsColors["المفضلة"] = Colors.borderColor;
    if (currFavourites.includes(this.state.text)) {
      currFavourites = currFavourites.filter(
        favourite => favourite !== this.state.text
      );
      storageInstance.setItem("favourites", currFavourites).then(res => {});
    }

    this.setState({
      favourites: currFavourites,
      toolsColors: toolsColors
    });
  }

  toggleFavourites() {
    if (!this.state.text.trim().length) {
      return;
    }
    const storageInstance = Storage.getInstance();
    const toolsColors = this.state.toolsColors;
    let currFavourites = this.state.favourites;
    if (toolsColors["المفضلة"] == Colors.brand) {
      this.setState({ showConfirmDialog: true });
    } else {
      toolsColors["المفضلة"] = Colors.brand;
      if (!currFavourites.includes(this.state.text)) {
        currFavourites = [...currFavourites, this.state.text];
        AutoSoundsSaver.getInstance().storeSoundIfNotExist(this.state.text);
        storageInstance.setItem("favourites", currFavourites).then(res => {});
      }
    }
    this.setState({
      favourites: currFavourites,
      toolsColors: toolsColors
    });
  }

  onTextChanged = this.debounce((text) => {
    this.changeText(text);
   }, 200);

  debounce(a, b, c) {
    let d, e;
    return function() {
      function h() {
        (d = null), c || (e = a.apply(f, g));
      }
      let f = this,
        g = arguments;
      return (
        clearTimeout(d),
        (d = setTimeout(h, b)),
        c && !d && (e = a.apply(f, g)),
        e
      );
    };
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
    //     padding: 13,
  },
  inputAndToolsWrapper: {
    width: '85%', 
    maxWidth: 500,
    marginTop: 10,
    paddingTop: 12,
    height: 144,
    // width: 350,
    position: "relative",
    backgroundColor: Colors.primary,
    borderRadius: 10 /* **N** */
  },
  textInput: {
    height: 60,
    fontSize: 21,
    textAlign: "right",
    paddingHorizontal: 8 // 11
  },
  toolsbar: {
    position: "absolute",
    top: 84,
    width: '100%',
    backgroundColor: "#F7F7F7", // temp
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    borderRadius: 10
  },
  tool: {
    // paddingVertical: 5,
    // paddingHorizontal: 16,
    minWidth: 50,
    textAlign: "center"
  },
  speakActive: {
    backgroundColor: Colors.orange, // f9812A
    borderRadius: 10
  },
  space: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    textAlign: "center"
  },
  spaceIcon: {
    width: 121,
    height: 22,
    backgroundColor: Colors.borderColor,
    borderRadius: 10,
    marginBottom: 4
  },
  predectionsWrapper: {
    paddingVertical: 14,
    maxWidth: 690
    // paddingHorizontal: 12,
    // maxWidth: 500,
  },
  predectedWord: {
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: '1.5%', // was 10
    marginBottom: 10,
    width: '20%',
    minWidth: 95,
    maxWidth: 200
  },
  predectedWordText: {
    fontSize: 18,
    textAlign: "center"
  }
});
