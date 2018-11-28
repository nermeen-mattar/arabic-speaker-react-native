import AudioRecorderAndPlayer from 'react-native-audio-recorder-player';
import { Platform } from 'react-native'
export class ArabicRecorderAndPlayer extends AudioRecorderAndPlayer {
    static instance;
    constructor() {
      super();
    }

    static getInstance() {
        if(!ArabicRecorderAndPlayer.instance) {
            ArabicRecorderAndPlayer.instance = new ArabicRecorderAndPlayer();    
        }
        return ArabicRecorderAndPlayer.instance;
    }


    onStartPlay = async (path) => {
      ArabicRecorderAndPlayer.instance.onStopPlay();
      await ArabicRecorderAndPlayer.instance.startPlayer(path); 
      // console.log(msg);
      ArabicRecorderAndPlayer.instance.addPlayBackListener((e) => {
        if (e.current_position === e.duration) {
          ArabicRecorderAndPlayer.instance.stopPlayer();
        }
        return;
      });
    }

    onStartRecord = async (fileName) => {
      const path = Platform.select({
        ios: fileName.concat('.m4a'),
        android: 'sdcard/'.concat(fileName).concat('.mp4'), // should give extra dir name in android. Won't grant permission to the first level of dir.
      });
      await ArabicRecorderAndPlayer.instance.startRecorder(path);
      ArabicRecorderAndPlayer.instance.addRecordBackListener((e) => {
        return;
      });
    }
    
    onStopRecord = async () => {
      const result = await ArabicRecorderAndPlayer.instance.stopRecorder();
      ArabicRecorderAndPlayer.instance.removeRecordBackListener();
    }


    onStopPlay = async () => {
      ArabicRecorderAndPlayer.instance.stopPlayer();
      ArabicRecorderAndPlayer.instance.removePlayBackListener();
    }
}