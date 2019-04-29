import Tts from "react-native-tts";
import { NetInfo, Alert, Platform } from "react-native";
import { ArabicRecorderAndPlayer } from "./ArabicRecorderAndPlayer";
import { Storage } from "./Storage";
import Genders from "../constants/Genders";
import { AutoSoundsSaver } from "../classes/AutoSoundsSaver";
import RNFetchBlob from "rn-fetch-blob";

export class TextToSpeach {
  static instance;
  constructor() {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage("ar-SA");
      Tts.setDefaultRate(0.5);
      Tts.setDefaultPitch(0.7);
    });
  }

  static getInstance() {
    if (!TextToSpeach.instance) {
      TextToSpeach.instance = new TextToSpeach();
    }
    return TextToSpeach.instance;
  }
  fetchWithTimeout(url, options, timeout = 1000) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout)
      )
    ]);
  }

  speak(text) {
    text = text.replace("بكم", "بِكَمْ");
    const storageInstance = Storage.getInstance();
    const settings = { value: "null" };
    storageInstance.getItem("settingsValues", settings).then(res => {
      const gender =
        settings.value && settings.value.voiceGender === Genders.female
          ? "female"
          : "male";
      const autoSoundSaver = AutoSoundsSaver.getInstance();
      const fileName = autoSoundSaver.getFileName(gender, text);
      if (autoSoundSaver.isSoundExist(fileName)) {
        ArabicRecorderAndPlayer.getInstance().onStartPlay(
          autoSoundSaver.getDirectory() + "/" + fileName + ".mpga"
        );
      } else {
        NetInfo.isConnected.fetch().then(isConnected => {
          if (isConnected) {
            this.formatSentenceThenCallResponsiveVoice(text, gender);
          } else {
            if (Platform.OS === "android") {
              this.displayAlertMessage();
            } else {
              Tts.speak(text);
            }
          }
        });
      }
    });
  }

  formatSentenceThenCallResponsiveVoice(text, gender) {
    TextToSpeach.instance
      .fetchWithTimeout(
        "http://18.224.240.0:8082/api/process?text=".concat(text),
        {
          method: "GET"
        }
      )
      .then(response => {
        if (response.status == "200") {
          text = response._bodyInit;
        }
        TextToSpeach.instance.responsiveVoiceSpeak(text, gender);
      })
      .catch(err => {
        TextToSpeach.instance.responsiveVoiceSpeak(text, gender);
      });
  }

  responsiveVoiceSpeak(text, gender) {
    let requestPath =
      "https://code.responsivevoice.org/getvoice.php?t=$text&tl=ar&gender=$gender";
    requestPath = requestPath
      .replace("$text", encodeURI(text))
      .replace("$gender", gender);

    ArabicRecorderAndPlayer.getInstance().onStartPlay(requestPath);
  }
  displayAlertMessage() {
    Alert.alert("يجب أن تكون متصل بالانترنت");
  }
}
