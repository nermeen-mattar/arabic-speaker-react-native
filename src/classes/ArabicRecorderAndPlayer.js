import AudioRecorderAndPlayer from 'react-native-audio-recorder-player';
import { Platform } from 'react-native'
import { requestPermission } from './AndroidPermissionRequester';
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
      if(Platform.OS === 'android') {   
        if(requestPermission('READ_EXTERNAL_STORAGE')) {
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
      } else {
        
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
    }

    onStartRecord = async (fileName) => {
      if(Platform.OS === 'android') {   
        if(requestPermission('RECORD_AUDIO') && requestPermission('WRITE_EXTERNAL_STORAGE')) {
          await ArabicRecorderAndPlayer.instance.startRecorder('sdcard/'.concat(fileName).concat('.mp4'));
          ArabicRecorderAndPlayer.instance.addRecordBackListener((e) => {
            return;
          });
        }
        // requestPermission('RECORD_AUDIO').then((result) => {
        //   await ArabicRecorderAndPlayer.instance.startRecorder('sdcard/'.concat(fileName).concat('.mp4'));
        //   ArabicRecorderAndPlayer.instance.addRecordBackListener((e) => {
        //     return;
        //   });
        // }).catch((err) => {
          
        // });
      } else {
        await ArabicRecorderAndPlayer.instance.startRecorder(fileName.concat('.m4a'));
        ArabicRecorderAndPlayer.instance.addRecordBackListener((e) => {
          return;
        });
      }
      // const path = Platform.select({
      //   ios: fileName.concat('.m4a'),
      //   android: 'sdcard/'.concat(fileName).concat('.mp4'), // should give extra dir name in android. Won't grant permission to the first level of dir.
      // });
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