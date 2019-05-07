import { Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";

import { Storage } from "./Storage";
import Genders from "../constants/Genders";
import { TextToSpeach } from "./TextToSpeach";

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
    return gender + "-" + sentence.replace(/ /g, "_");
  }

  getDirectory() {
    return RNFetchBlob.fs.dirs.DocumentDir;
  }

  updateAutoSounds(formattedSentence) {
    this.autoSounds.push(formattedSentence);
    const storageInstance = Storage.getInstance();
    storageInstance.setItem("auto-sounds", this.autoSounds).then(res => {});
  }

  getUrlForResposiveVoiceRequest(text, gender) {
    return "https://code.responsivevoice.org/getvoice.php?t=$text&tl=ar&gender=$gender"
      .replace("$text", encodeURI(text))
      .replace("$gender", gender);
  }

  storeSoundIfNotExist(sentence) {
    const storageInstance = Storage.getInstance();
    const settings = { value: "null" };
    storageInstance.getItem("settingsValues", settings).then(res => {
      const gender =
        settings.value && settings.value.voiceGender === Genders.female
          ? "female"
          : "male";
      const fileName = this.getFileName(gender, sentence);
      if (!this.isSoundExist(fileName)) {
        const callFetchBlob = (formattedSentence) => {
          let filePath = this.getDirectory() + "/" + fileName + ".mpga";
          if (Platform.OS === "ios") {
            filePath = filePath.replace("Documents", "tmp");
          }
          RNFetchBlob.config({
            path: filePath
          })
            .fetch("GET", this.getUrlForResposiveVoiceRequest(formattedSentence, gender))
            .then(res => {
              this.updateAutoSounds(fileName);
            });
        }
        TextToSpeach.getInstance().formatSentenceAndExecuteCallback(sentence, callFetchBlob);
      }
    });
  }
}
