import Tts from 'react-native-tts';
import {
    NetInfo,
    Alert,
    Platform
  } from 'react-native';
import { ArabicRecorderAndPlayer } from './ArabicRecorderAndPlayer';
import { Storage } from './Storage';
import Genders from '../constants/Genders';
export class TextToSpeach {
    static instance;
    constructor() {
        Tts.getInitStatus().then(() => {
            Tts.setDefaultLanguage('ar-SA');
            Tts.setDefaultRate(0.5);
            Tts.setDefaultPitch(0.70);
        })
    }

    static getInstance() {
        if(!TextToSpeach.instance) {
            TextToSpeach.instance = new TextToSpeach();    
        }
        return TextToSpeach.instance;
    }

     speak(text) {
         NetInfo.isConnected.fetch().then(isConnected => {
             if(isConnected) { // handle  Platform.OS === 'android'
             TextToSpeach.instance.responsiveVoiceSpeak(text)
            } else {
                if(Platform.OS === 'android') {
                    this.displayAlertMessage();
                } else {
                    Tts.speak(text); 
                }
            }
          });
    }

    responsiveVoiceSpeak(text) {
        const storageInstance =  Storage.getInstance();  
        const settings = {value: 'null'};
        storageInstance.getItem('settingsValues', settings).then(res => {
            const requestPath = 'https://code.responsivevoice.org/getvoice.php?t=$text&tl=ar&gender=$gender';
            const gender = settings.value && settings.value.voiceGender === Genders.female ? 'female' : 'male';
            ArabicRecorderAndPlayer.getInstance().onStartPlay(requestPath.replace('$text', encodeURI(text)).replace('$gender', gender));
        });
    }
    displayAlertMessage() {
        Alert.alert(
            'الاتصال بالانترنت',
            'يجب أن تكون متصل بالانترنت',
            [
            {text: 'حسناً'}
            ]
        )
    }
}