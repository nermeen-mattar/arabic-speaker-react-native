import { Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { Alert } from "react-native";

import { StorageObj } from "./Storage";
import { TextToSpeachObj } from "./TextToSpeach";

const RV_KEY = "oH5oldm2";
export class AutoSoundsSaver {
  autoSounds = [];

  constructor() {
    const result = {
      value: "null"
    };
    StorageObj.getItem("auto-sounds", result).then(res => {
      if (result.value) {
        this.autoSounds = result.value;
      }
    });
  }

  isSoundExist(fileName) {
    return this.autoSounds.includes(fileName);
  }

  getFileName(sentence, gender = TextToSpeachObj.getGender()) {
    return gender + "-" + sentence.replace(/ /g, "_");
  }

  getDirectory() {
    return RNFetchBlob.fs.dirs.DocumentDir;
  }

  updateAutoSounds(formattedSentence) {
    this.autoSounds.push(formattedSentence);
    StorageObj.setItem("auto-sounds", this.autoSounds).then(res => {});
  }

  getUrlForResposiveVoiceRequest(text) {
    const gender = TextToSpeachObj.getGender();
    return `https://code.responsivevoice.org/getvoice.php?t=${encodeURI(text)}&tl=ar&gender=${gender}&key=${RV_KEY}`;
  }

  //Storing in local device
  storeSoundIfNotExist(sentence) {
      const fileName = this.getFileName(sentence);
      if (!this.isSoundExist(fileName)) {
        const callFetchBlob = (formattedSentence) => {
          let filePath = this.getDirectory() + "/" + fileName + ".mpga";
          if (Platform.OS === "ios") {
            filePath = filePath.replace("Documents", "tmp");
          }
          return RNFetchBlob.config({
            // fileCache: true,
            path: filePath
          })
            .fetch("GET", this.getUrlForResposiveVoiceRequest(formattedSentence))
            .then(res => {
              this.updateAutoSounds(fileName);
            }).catch(err => {
              Alert.alert('Error');
            }) ;
        }
        TextToSpeachObj.formatSentenceAndExecuteCallback(sentence, callFetchBlob);
      }
  }
}
export const AutoSoundsSaverObj = new AutoSoundsSaver();