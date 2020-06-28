import AudioRecorderAndPlayer from "react-native-audio-recorder-player";
import { Platform } from "react-native";
import { requestPermission } from "./AndroidPermissionRequester";
class ArabicRecorderAndPlayer extends AudioRecorderAndPlayer {
  constructor() {
    super();
    this.setVolume(1.0);
  }

  onStartPlayStoredFile = async fileName => {
    if (Platform.OS === "android") {
      if (requestPermission("READ_EXTERNAL_STORAGE")) {
        this.onStartPlay(
          "sdcard/".concat(fileName).concat(".mp4")
        );
      }
    } else {
      this.onStartPlay(fileName.concat(".m4a"));
    }
  };

  onStartPlay = async filePath => {
    this.onStopPlay();
    await this.startPlayer(filePath);
    this.addPlayBackListener(e => {
      if (e.current_position === e.duration) {
        this.stopPlayer();
      }
      return;
    });
  };

  onStartRecord = async fileName => {
    if (Platform.OS === "android") {
      if (
        requestPermission("RECORD_AUDIO") &&
        requestPermission("WRITE_EXTERNAL_STORAGE")
      ) {
        await this.startRecorder(
          "sdcard/".concat(fileName).concat(".mp4")
        );
        this.addRecordBackListener(e => {
          return;
        });
      }
    } else {
      await this.startRecorder(
        fileName.concat(".m4a")
      );
      this.addRecordBackListener(e => {
        return;
      });
    }
  };

  onStopRecord = async () => {
    await this.stopRecorder();
    this.removeRecordBackListener();
  };

  onStopPlay = async () => {
    this.stopPlayer();
    this.removePlayBackListener();
  };
}

export const  ArabicRecorderAndPlayerObj = new ArabicRecorderAndPlayer();