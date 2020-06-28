import React from "react";
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert
} from "react-native";
import analytics from '@react-native-firebase/analytics';

import { MonoText } from "../components/StyledText";
import FormHeader from "../components/FormHeader";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextToSpeachObj } from "../classes/TextToSpeach";

import { StorageObj } from "../classes/Storage";
import { TextPredictionObj } from "../classes/TextPrediction";
import { ImagePickerHelper } from "../classes/ImagePickerHelper";
import { ArabicRecorderAndPlayerObj } from "../classes/ArabicRecorderAndPlayer";
import { AutoSoundsSaverObj } from "../classes/AutoSoundsSaver";

import {EVENTS, logEvent} from "../classes/Events";

export default class NewSentenceScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: ["إضافة عبارة جديدة"],
      cardInfo: { label: "ارفق صورة" },
      inputPlaceholder: "اكتب عبارة لا تتجاوز ست كلمات",
      sentence: "",
      imgSrc: props.navigation.getParam("imgSrc"),
      // categoryName: props.navigation.getParam('categoryName'),
      categoryPath: props.navigation.getParam("categoryPath"),
      recordingState: null,
      soundPath: null,
      imagePickerInstance: ImagePickerHelper.getInstance(
        () =>
          this.props.navigation.navigate("IconsLibrariesScreen", {
            srcScreen: "NewSentenceScreen"
          }),
        img => this.setState({ imgSrc: img })
      )
    };
    props.navigation.addListener("willFocus", this.load);
  }

  load = () => {
    const newState = {
      soundPath: null,
      recordingState: null,
      imgSrc: this.props.navigation.getParam("imgSrc"),
      imagePickerInstance: ImagePickerHelper.getInstance(
        () =>
          this.props.navigation.navigate("IconsLibrariesScreen", {
            srcScreen: "NewSentenceScreen"
          }),
        img => this.setState({ imgSrc: img })
      )

      // categoryPath: ''
    };
    if (!this.props.navigation.getParam("imgSrc")) {
      newState.sentence = "";
    }
    this.setState(newState);
  };
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={Keyboard.dismiss}
      >
        <FormHeader
          title={this.state.title}
          onCancelClicked={() => {
            this.props.navigation.navigate("CategoriesScreen", {
              categoryPath: this.state.categoryPath
            });
            logEvent(EVENTS.CANCEL_NEW_CATEGORY, {
              categoryPath: this.state.categoryPath,
              text: this.state.sentence
            });
          }

          }
          onSaveClicked={this.addNewSentence}
        />

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.onTextChanged(text)}
            placeholder={this.state.inputPlaceholder}
            multiline={true}
            value={this.state.sentence}
          />
          {/* value={this.state.sentence} */}
        </View>
        <View style={styles.inputsWrapper}>
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                this.state.imagePickerInstance.displayImagePickerMenu()
              }
            >
              {this.state.imgSrc ? (
                <Image
                  style={{ width: 108, height: 104 }}
                  source={this.state.imgSrc}
                />
              ) : (
                <View>
                  <Icon
                    name="camera"
                    size={32}
                    color={Colors.borderColor}
                    style={styles.cardIcon}
                  />
                  <MonoText style={styles.cardLabel}>
                    {this.state.cardInfo.label}
                  </MonoText>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: !this.state.recordingState
                  ? Colors.brand
                  : Colors.primary
              }
            ]}
            onPress={() => this.autoSoundClicked()}
          >
            <View>
              <Icon
                name="volume-up"
                size={32}
                color={Colors.borderColor}
                style={styles.cardIcon}
              />
            </View>
            <MonoText style={styles.cardLabel}>صوت آلي</MonoText>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.card}  onPress = {() => this.startRecording()} > */}
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor:
                  this.state.recordingState === "recording"
                    ? Colors.orange
                    : this.state.recordingState === "recorded"
                    ? Colors.brand
                    : Colors.primary
              }
            ]}
            // underlayColor = "transparent"
            // onPress={tool.onPress}
            onPress={() => this.startStopRecording()}
          >
            <Icon
              name="microphone"
              size={32}
              color={Colors.borderColor}
              style={styles.cardIcon}
            />
            <MonoText style={styles.cardLabel}>
              {this.state.recordingState === "recording"
                ? "جاري التسجيل"
                : this.state.recordingState === "recorded"
                ? "تم تسجيل الصوت"
                : "تسجيل صوتي"}
            </MonoText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  startStopRecording() {
    if (this.state.recordingState === "recording") {
      ArabicRecorderAndPlayerObj.onStopRecord();
      this.setState({ recordingState: "recorded" });
      logEvent(EVENTS.RECORD_VOICE);
    } else {
      /* start recording */
      const fileName = "user-audios-".concat(
        this.state.sentence || (Math.random() * 1000).toString()
      ); // need to find a better solution than random
      ArabicRecorderAndPlayerObj.onStartRecord(fileName);
      this.setState({
        recordingState: "recording",
        soundPath: fileName
      }); 
    }
  }

  onTextChanged(text) {
    this.setState({
      sentence: text
    });
  }

  autoSoundClicked() {
    // Alert.alert('هل أنت متأكد أنك تريد التحويل الي الصوت الآلي سوف يتم حذف التسجيل الصوتي', );
    if (this.state.recordingState === null) {
      this.playAutoSound();
      // may add event here - play sound
      return;
    }
    Alert.alert("تنبيه", "يتم حذف التسجيل الصوتي عند اختيار الصوت الآلي", [
      {
        text: "تأكيد",
        style: "destructive",
        onPress: () => {
          ArabicRecorderAndPlayerObj.onStopRecord();
          this.playAutoSound();
          logEvent(EVENTS.CANCEL_RECORD);
        }
      },
      { text: "الغاء" }
    ]);
  }

  playAutoSound = () => {
    this.setState({ recordingState: null, soundPath: null });
    TextPredictionObj.addSentenceToUserWords(this.state.sentence);
    TextToSpeachObj.speak(this.state.sentence);
  };

  displayAlertMessage() {
    Alert.alert("فشل الحفظ", "لا يمكن حفظ عبارة فارغة", [{ text: "حسناً" }]);
  }

  addNewSentence = () => {
    if (!this.state.sentence) {
      this.displayAlertMessage();
      return;
    }
    if (this.state.recordingState === "recording") {
      this.startStopRecording(); // this.addNewSentence
      // return;
    }
    const recordingPath = this.state.soundPath;
    if (!recordingPath) {
      AutoSoundsSaverObj.storeSoundIfNotExist(this.state.sentence);
    }
    // StorageObj.setItem('StorageObj', 'nermeen');categ
    const result = { value: "null" };
    StorageObj.getItem(this.state.categoryPath.join(), result).then(() => {
      result.value = result.value ? result.value : [];
      StorageObj
        .setItem(this.state.categoryPath.join(), [
          ...result.value,
          {
            label: this.state.sentence,
            imgSrc: this.state.imgSrc,
            soundPath: recordingPath
          }
        ])
        .then(() => {
          this.props.navigation.navigate("CategoriesScreen", {
            categoryPath: this.state.categoryPath
          });
          logEvent(EVENTS.CREATE_NEW_SENTENCE, {
            text: this.state.sentence,
            categoryPath: this.state.categoryPath,
            withImage: Boolean(imgSrc)
          });
        });
    });
  };
}

const styles = StyleSheet.create({
  inputsWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  textInput: {
    flex: 1,
    maxWidth: 500,
    marginHorizontal: 16,
    // width: 350,
    height: 100, // 78,
    backgroundColor: Colors.primary,
    fontSize: 21,
    textAlign: "right",
    padding: 8,
    paddingTop: 12, // 20 didn't work
    marginTop: 11,
    borderRadius: 10 /* **N** */
  },
  card: {
    display: "flex",
    width: 108,
    height: 108,
    backgroundColor: Colors.primary,
    marginVertical: 11,
    marginHorizontal: 5,
    borderRadius: 10
  },
  cardIcon: {
    marginVertical: 24,
    textAlign: "center"
  },
  cardLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    textAlign: "center"
  }
});
