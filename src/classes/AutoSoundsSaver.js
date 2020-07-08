import { Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";

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

  getFilePath(fileName) {
    let filePath = this.getDirectory() + "/" + fileName + ".mpga";
    if (Platform.OS === "ios") {
      filePath = filePath.replace("Documents", "Library/Caches");
      // writes on file:///Users/nmattar/Library/Developer/CoreSimulator/Devices/device_id/data/Containers/Data/Application/app_id/Library/Caches/female-Ssss.mpga	
    }
    return filePath;
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
          return RNFetchBlob.config({
            // fileCache: true,
            path: this.getFilePath(fileName)
          })
            .fetch("GET", this.getUrlForResposiveVoiceRequest(formattedSentence))
            .then(res => {
              this.updateAutoSounds(fileName);
            }).catch(err => {
              // Alert.alert('Error');
            });
        }
        TextToSpeachObj.formatSentenceAndExecuteCallback(sentence, callFetchBlob);
      }
  }
}
export const AutoSoundsSaverObj = new AutoSoundsSaver();