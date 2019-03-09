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

import { MonoText } from "../components/StyledText";
import FormHeader from "../components/FormHeader";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextToSpeach } from "../classes/TextToSpeach";

import { Storage } from "../classes/Storage";
import { TextPrediction } from "../classes/TextPrediction";
import { ImagePickerHelper } from "../classes/ImagePickerHelper";
import { ArabicRecorderAndPlayer } from "../classes/ArabicRecorderAndPlayer";

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
          onCancelClicked={() =>
            this.props.navigation.navigate("CategoriesScreen", {
              categoryPath: this.state.categoryPath
            })
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
            {/* <PhotoUpload
        maxHeight= "100"
        maxWidth = "100"
        onResizedImageUri = {photo => {
          this.setState({imgSrc: photo.uri})
          this.setState({sentence: photo.uri})

        }}
        imagePickerProps = {{label: 'herllo nerro '}}
        onPhotoSelect={photo => {
          this.setState({imgSrc: photo})
        }}
        > */}
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
            <MonoText style={styles.cardLabel}>صرت آلي</MonoText>
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
      /* already recording */
      //   SoundRecorder.stop()
      // .then((result) => {
      //   PlaySound('alert');
      //   // this.setState({text: JSON.stringify(result)})
      //   // if(callBack) {
      //   //   callBack();
      //   // }
      // });
      ArabicRecorderAndPlayer.getInstance().onStopRecord();
      this.setState({ recordingState: "recorded" });
    } else {
      /* start recording */
      const fileName = "user-audios-".concat(
        this.state.sentence || (Math.random() * 1000).toString()
      ); // need to find a better solution than random
      ArabicRecorderAndPlayer.getInstance().onStartRecord(fileName);
      this.setState({
        recordingState: "recording",
        soundPath: fileName.concat(".m4a")
      }); //
      // const pathAndFile = SoundRecorder.PATH_CACHE + '/'+ Math.floor((Math.random() * 1000)) + '.mp4';
      // // SoundRecorder.PATH_CACHE + '/' + this.state.sentence || Math.floor((Math.random() * 1000)) + '.mp4';
      // SoundRecorder.start(pathAndFile)
      // .then(()=> {
      // });
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
      return;
    }
    Alert.alert("تنبيه", "يتم حذف التسجيل الصوتي عند اختيار الصوت الآلي", [
      {
        text: "تأكيد",
        style: "destructive",
        onPress: () => {
          ArabicRecorderAndPlayer.getInstance().onStopRecord();
          this.playAutoSound();
        }
      },
      { text: "الغاء" }
    ]);
  }

  playAutoSound = () => {
    this.setState({ recordingState: null, soundPath: null });
    TextPrediction.getInstance().addSentenceToUserWords(this.state.sentence);
    TextToSpeach.getInstance().speak(this.state.sentence);
  };

  addNewSentence = () => {
    if (!this.state.sentence) {
      this.displayAlertMessage();
      return;
    }
    if (this.state.recordingState === "recording") {
      this.startStopRecording(); // this.addNewSentence
      // return;
    }
    const storageInstance = Storage.getInstance();
    // storageInstance.setItem('storageInstance', 'nermeen');categ
    const result = { value: "null" };
    storageInstance.getItem(this.state.categoryPath.join(), result).then(() => {
      result.value = result.value ? result.value : [];
      storageInstance
        .setItem(this.state.categoryPath.join(), [
          ...result.value,
          {
            label: this.state.sentence,
            imgSrc: this.state.imgSrc,
            soundPath: this.state.soundPath
          }
        ])
        .then(() => {
          this.props.navigation.navigate("CategoriesScreen", {
            categoryPath: this.state.categoryPath
          });
        });

      // this.props.navigation.navigate('SentencesScreen');
    });

    //   const newSentence  =  [
    //     { label: 'nerrro', imgSrc:  require('../../assets/images/sentences/favourites.png')},
    // ];
    //   storageInstance.setItem(this.state.categoryPath.join(), newSentence).then(res => {
    //     this.setState({
    //       title: 'yeees',
    //       cardInfo: { label: 'ارفق صورة', imgSrc:  require('../../assets/images/sentences/chat.png')},
    //       inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد"
    //     });
    //     this.props.navigation.navigate('HomeStack');
    //   })

    //   AsyncStorage.getItem('UID123', (err, result) => {
    //     this.setState({
    //       title: 'wow',
    //       cardInfo: { label: 'ارفق صورة', imgSrc:  require('../../assets/images/sentences/chat.png')},
    //     inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد"
    //   });
    // });
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
    width: 350,
    height: 78,
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
    height: 104,
    backgroundColor: Colors.primary,
    marginVertical: 11,
    marginHorizontal: 5,
    borderRadius: 10
    // marginBottom: 4,
    // position: 'relative'
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
