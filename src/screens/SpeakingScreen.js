import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Keyboard,
  Platform
} from "react-native";
import Share from 'react-native-share';
import Icon from "react-native-vector-icons/FontAwesome";

import Colors from "../constants/Colors";
import CustomHeader from "../components/CustomHeader";
import { TextToSpeach } from "../classes/TextToSpeach";
import { MonoText } from "../components/StyledText";
import { Storage } from "../classes/Storage";
import { TextPrediction } from "../classes/TextPrediction";
import commonStyles from "../styles/commonStyles";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { AutoSoundsSaver } from "../classes/AutoSoundsSaver";
// import { ArabicRecorderAndPlayer } from "../classes/ArabicRecorderAndPlayer";

export default class TextToSpeachScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inputPlaceholder: "أكتب",
      text: "",
      predectedWords: TextPrediction.getInstance().getPredectedWords(""),
      textWidth: '99%',
      toolsBar: [
        {
          title: "نطق",
          iconName: "volume-up",
          iconSize: 34,
          onPress: () => this.speak(),
          styles: [{...styles.tool, minWidth: 50}]
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
          title: "مشاركة",
          iconName: "share",
          // iconSize: 28,
          onPress: () => this.onShare(),
          styles: [styles.tool] // styles: [{...styles.tool, marginLeft: 4}]

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
        مسافة: Colors.borderColor,
        مشاركة: Colors.borderColor
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
        مسافة: Colors.borderColor,
        مشاركة: Colors.borderColor
      }
    });
    // if(this.props.navigation.getParam('prevRoute') !== AlertScreen.name) {
    //   this.onTextChanged('');
    // }
  };

  componentDidMount() {
    TextPrediction.getInstance().initIndexedDefaultWords();
    setTimeout(() => {
      this.setState({textWidth: '100%'})
    }, 100)
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

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={styles.inputAndToolsWrapper}>
            <TextInput
              value={this.state.text}
              style={styles.textInput}
              onChangeText={text => {
                this.setState({ text: text });
                this.onTextChanged(text);
              }}
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
                              backgroundColor: 
                              this.state.toolsColors[tool.title] || Colors.borderColor
                            }
                          ]}
                        />
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
                        {tool.title}
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
          />
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
    this.setState({ text: text });
    const toolsColors = this.state.toolsColors;
    toolsColors["المفضلة"] = this.state.favourites.includes(text)
      ? Colors.brand
      : Colors.borderColor;
    this.setState({
      toolsColors: toolsColors,
      predectedWords: TextPrediction.getInstance().getPredectedWords(text) // .slice(0, 12)
    });
  }

   onShare = async () => {
            let url = 'data:audio/mpeg;base64,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';

    // TextToSpeach.instance
    // .fetchWithTimeout(AutoSoundsSaver.getInstance().getUrlForResposiveVoiceRequest(this.state.text, 'female'))
    // .then(res => {
    //   // Alert.alert('res', JSON.stringify(res));
    //   const autoSoundSaver = AutoSoundsSaver.getInstance();
    //   const fileName = autoSoundSaver.getFileName('female', this.state.text);
    //   const isSoundExist = autoSoundSaver.isSoundExist(fileName);
    //   if (!isSoundExist) {
    //   } else {
    //     url = Platform.select({
    //       ios: fileName + ".mpga",
    //       android: 'sdcard/' + fileName.concat(".mp4")
    //     });
    //   ArabicRecorderAndPlayer.getInstance().onStartPlay(url
    //     );
    
    //   }
    
      const title =" nerrp"
      const message =" nerrp"
  
      const options = Platform.select({
      ios: {
        activityItemSources: [
          { // For sharing url with custom title.
            placeholderItem: { type: 'audio/mpeg', content: url },
            item: {
              default: { type: 'audio/mpeg', content: url },
            },
            subject: {
              default: title,
            },
            linkMetadata: { originalUrl: url, url, title },
          },
          { // For sharing text.
            placeholderItem: { type: 'text', content: message },
            item: {
              default: { type: 'text', content: message },
              message: null, // Specify no text to share via Messages app.
            },
            linkMetadata: { // For showing app icon on share preview.
               title: message
            },
          }
        ],
      },
      default: {
        title,
        subject: title,
        // message: `${message} ${'https://code.responsivevoice.org/getvoice.php?t=hi&tl=en&gender=female&key=oH5oldm2'}`,
        message: 'some message',
        url: url,
        social: Share.Social.WHATSAPP,
        whatsAppNumber: "00962797145530",  // country code + phone number
        filename: 'testo' , // only for base64 file in Android
      },
    });
    
    Share.open({        
      title: "شارك الصوت",
      subject: "شارك الصوت",
      // message: `${message} ${'https://code.responsivevoice.org/getvoice.php?t=hi&tl=en&gender=female&key=oH5oldm2'}`,
      // message: 'some message',
      url: url,
      type: "audio/mpeg",
      social: Share.Social.WHATSAPP,
      whatsAppNumber: "00962797145530",  // country code + phone number
      filename: 'testo' , // only for base64 file in Android
    });

    // }).catch(err => {
    //   Alert.alert('Error');
    // });
    
  };

  speak() {
    let toolsBar = [...this.state.toolsBar];
    const defaultStyles = toolsBar[0].styles 
    toolsBar[0].styles = [...defaultStyles, styles.speakActive];
    this.setState({ toolsBar: toolsBar });
    TextPrediction.getInstance().addSentenceToUserWords(this.state.text);
    TextToSpeach.getInstance().speak(this.state.text);
    setTimeout(() => {
      toolsBar[0].styles = defaultStyles;
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

  onTextChanged = this.debounce(text => {
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
    width: "94%",
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
    paddingHorizontal: 8, // 11
    width: '99%'
  },
  toolsbar: {
    position: "absolute",
    top: 84,
    width: "100%",
    backgroundColor: "#F7F7F7", // temp
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
    height: 60,
    borderRadius: 10
  },
  tool: {
    // paddingVertical: 5,
    // paddingHorizontal: 16,
    minWidth: 40
  },
  speakActive: {
    backgroundColor: Colors.orange, // f9812A
    borderRadius: 10
  },
  space: {
    padding:10
  },
  spaceIcon: {
    width: 114,
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
    paddingVertical: "1.5%", // was 10
    marginBottom: 10,
    width: "20%",
    minWidth: 95,
    maxWidth: 200
  },
  predectedWordText: {
    fontSize: 18,
    textAlign: "center"
  }
});
