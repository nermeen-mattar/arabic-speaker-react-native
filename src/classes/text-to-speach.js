import Tts from 'react-native-tts';

export class TextToSpeach {
    static instance;
    constructor() {
        Tts.getInitStatus().then(() => {
            Tts.setDefaultLanguage('ar-SA');
            Tts.setDefaultRate(1.3);
            Tts.setDefaultPitch(1.3);
        })
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = new TextToSpeach();    
        }
        return this.instance;
    }

     speak(text) {
        Tts.speak(text);         
    }
}