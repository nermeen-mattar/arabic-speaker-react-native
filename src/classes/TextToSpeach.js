import { Alert, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Tts from "react-native-tts";

import { ArabicRecorderAndPlayerObj } from "./ArabicRecorderAndPlayer";
import { StorageObj } from "./Storage";
import Genders from "../constants/Genders";
import { AutoSoundsSaverObj } from "../classes/AutoSoundsSaver";

let isConnected;
class TextToSpeach {
  settings = {};
  constructor() {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage("ar-SA");
      Tts.setDefaultRate(0.5);
      Tts.setDefaultPitch(0.7);
    });
    this.initSettings(); 
    // NetInfo.addEventListener(state => {
    //   isConnected = state.isConnected;
    //   Alert.alert(isConnected);
    // });
  }

  fetchWithTimeout(url, options, timeout = 1000) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout)
      )
    ]);
  }

  initSettings() {
    const settings = { value: "null" };
    return StorageObj.getItem("settingsValues", settings).then(res => {
      this.settings = settings.value || {};
    });
  }

  setSettings (updatedSettings) {
    StorageObj.setItem('settingsValues', updatedSettings).then(res => {
      this.settings = updatedSettings;
    });
  }

  getGender () {
    return this.settings.voiceGender === Genders.male
    ? "male" : "female";
  }

  speak(text) {
      if(!this.playStoredFile(text)) {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            const responsiveVoiceSpeak = (formattedText) => {
              ArabicRecorderAndPlayerObj.onStartPlay(AutoSoundsSaverObj.getUrlForResposiveVoiceRequest(formattedText));
            }
            this.formatSentenceAndExecuteCallback(text, responsiveVoiceSpeak);
          } 
          else if(!this.playStoredFile(text, this.getGender() === "male" ? "female" : "male")) {
            if (Platform.OS === "android") {
              this.displayAlertMessage();
            } else {
              text = text.replace("بكم", "بِكَمْ");
              Tts.speak(text);
            }
          }
        });
      }
  }

  playStoredFile(text, gender) {
    const fileName = AutoSoundsSaverObj.getFileName(text, gender);
    const isSoundExist = AutoSoundsSaverObj.isSoundExist(fileName);
    if (isSoundExist) {
      ArabicRecorderAndPlayerObj.onStartPlay(
        Platform.select({
          ios: fileName + ".mpga", 
          // reads from file:///Users/nmattar/Library/Developer/CoreSimulator/Devices/device_id/data/Containers/Data/Application/app_id/Library/Caches/female-Ssss.mpga	

          android: AutoSoundsSaverObj.getDirectory() + "/" + fileName + ".mpga"
        })
      );
    } 
    return isSoundExist;
  }

  formatSentenceAndExecuteCallback(text, callback) {
    text = text.replace("بكم", "بِكَمْ");
    this.fetchWithTimeout(
        "http://18.224.240.0:8082/api/process?text=".concat(text),
        {
          method: "GET"
        }
      )
      .then(response => {
        if (response.status == "20") {
           return response.text();
        }
        return text;
      }).then(formattedText => {
          text = formattedText || text;
          callback(text);
        })
    .catch(err => {
      callback(text);
    });
  }

  displayAlertMessage() {
    Alert.alert("يجب أن تكون متصل بالانترنت");
  }
}

export const TextToSpeachObj =  new TextToSpeach();