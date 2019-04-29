import RNFetchBlob from 'rn-fetch-blob';
import { Alert } from "react-native";

import { Storage } from "./Storage";
import Genders from "../constants/Genders"; 

export class AutoSoundsSaver {
  static instance;
  autoSounds = [];

  constructor() {
    const storageInstance = Storage.getInstance();
    const result = {
      value: "null"
    };
    storageInstance.getItem("auto-sounds", result).then(res => {
      if (result.value) {
        this.autoSounds = result.value;
      }
    });
  }

  static getInstance() {
    if (!AutoSoundsSaver.instance) {
      AutoSoundsSaver.instance = new AutoSoundsSaver();
    }
    return AutoSoundsSaver.instance;
  }

  isSoundExist(fileName) {
    return this.autoSounds.includes(fileName);
  }

  getFileName(gender, sentence) {
    return gender + '-' + sentence.replace(' ', '_');
  }

  getDirectory() {
    Alert.alert( RNFetchBlob.fs.dirs.DocumentDir)
    return RNFetchBlob.fs.dirs.DocumentDir;
  }

  updateAutoSounds() {
    this.autoSounds.push(formattedSentence);
    storageInstance.setItem("auto-sounds", this.autoSounds).then(res => res);
  }

   storeSoundIfNotExist(sentence) {
    const storageInstance = Storage.getInstance();
    const settings = { value: "null" };
    storageInstance.getItem("settingsValues", settings).then(res => {
      const gender =
        settings.value && settings.value.voiceGender === Genders.female
          ? "female"
          : "male";
      const formattedSentence = this.getFileName(gender, sentence);
      if(!this.isSoundExist(formattedSentence)) {
        let requestPath =
        "https://code.responsivevoice.org/getvoice.php?t=$text&tl=ar&gender=$gender";
      requestPath = requestPath
        .replace("$text", encodeURI(sentence))
        .replace("$gender", gender);

        RNFetchBlob
            .config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                // fileCache: true,
                // appendExt: 'mpga',
                path: this.getDirectory() + '/' + formattedSentence + '.mpga'
            })
            .fetch('GET', requestPath, {
                //some headers ..
            })
            .then((res) => {
               this.updateAutoSounds();
            })
      }
    });
  }
}
