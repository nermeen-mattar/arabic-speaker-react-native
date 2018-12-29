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
             fetch('http://18.224.240.0:8082/api/process?text='.concat(text), {
                method: 'GET'
            }).then((response) => {
                if(response.status == '200') {
                   text = response._bodyInit;
                }
                TextToSpeach.instance.responsiveVoiceSpeak(text);
                });
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
            let requestPath = 'https://code.responsivevoice.org/getvoice.php?t=$text&tl=ar&gender=$gender';
            const gender = settings.value && settings.value.voiceGender === Genders.female ? 'female' : 'male';
            requestPath = requestPath.replace('$text', encodeURI(text)).replace('$gender', gender);
            
        //     fetch('https://cors-anywhere.herokuapp.com/'.concat(requestPath), 
        //     {
        //         method: 'GET',
        //         headers: {
        //           Accept: 'audio/mpeg',
        //           'Content-Type': 'audio/mpeg'
        //         }
        //       }
        // ).then((response) => {
        //         this.displayAlertMessage(JSON.stringify(Object.keys(response.body.getReader()))) // JSON.stringify(response)

        //         response.json()
        //     })
        //     .then((responseJson) => {
        //         this.displayAlertMessage('2') 
        //         return responseJson;
        //     })
        //     .catch((error) => {
        //         this.displayAlertMessage('error')
        //       console.error(error);
        //     });
            
            ArabicRecorderAndPlayer.getInstance().onStartPlay(requestPath);
        });
    }
    displayAlertMessage(test) {
        Alert.alert(
            test,
            'يجب أن تكون متصل بالانترنت',
            [
            {text: 'حسناً'}
            ]
        )
    }
}