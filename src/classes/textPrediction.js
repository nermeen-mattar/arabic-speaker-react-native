import bigramData from "../constants/default-words/bigramData";
import trigramData from '../constants/default-words/trigramData';
import quadgram from '../constants/default-words/quadgram';
import { Storage } from '../classes/Storage';
import {
Alert
} from 'react-native';
export class TextPredection {
  staticWords = ['هل', 'في',  'من' ,'مستنقعات' ,'أنا' ,'قستنطينية' ,'أن' ,'إلي' ,'كيف']
  userWords = [{}, {}, {}];
    defaultWords = [ bigramData, trigramData, quadgram]
    static instance;
    // defaultWords = [
    //     ["من", "في", "و", "ان", "'الله'", "على", "ما", "يا", "لا", "كل", "انا", "لو", "يوم", "الى", "بس", "اللي", "عن", "ولا", "هل", "كم", "مش", "مع", "اللهم"],
    //     ["من هناك"]
    // ];
    // let predictions = [];
    // let staticPredictions = ['test1', 'test2'];
    constructor() {
        const storageInstance = Storage.getInstance();
        // storageInstance.deleteItem('userWords');
        const result = {value: 'null'};
        storageInstance.getItem('userWords', result).then(res => {
          if(result.value) {
            this.userWords = result.value;
            //  Alert.alert(
            //   'Alert Title',
            //   JSON.stringify(this.userWords),
      
            //   [
            //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            //     {text: 'OK', onPress: () => console.log('OK Pressed')},
            //   ],
            //   { cancelable: false }
            // )
          } 
      });
        
    }
    
    static getInstance() {
        if(!this.instance) {
            this.instance = new TextPredection();    
        }
        return TextPredection.instance;
    }

    initIndexedDefaultWords() {
        const indexedDefaultWords = [];
        this.defaultWords.forEach((sentences, index) => {
          indexedDefaultWords.push({});
          sentences.forEach(sentence => {
            const nextWordIndex = sentence.lastIndexOf(' ');
            if(indexedDefaultWords[index][sentence.slice(0, nextWordIndex)]) {
              indexedDefaultWords[index][sentence.slice(0, nextWordIndex)].push(sentence.slice(nextWordIndex + 1));
            } else {
              indexedDefaultWords[index][sentence.slice(0, nextWordIndex)] = [sentence.slice(nextWordIndex + 1)];
            }
          });
        });
        this.defaultWords = indexedDefaultWords;
      }
    
      getPredectedWords(enteredWords) { // ماذا تريد أن
        let userPredectedWords, defaultPredectedWords;
        enteredWords = enteredWords.trim();
          const numberEnteredOfWords = enteredWords.split(' ').length; //  enteredWords.split(/.+ .+/g);
          if(numberEnteredOfWords > this.userWords.length) {
              return [];
          }
        //   this.addToUserWordsIfNewWhileTyping(enteredWords, numberEnteredOfWords);
        userPredectedWords = this.userWords[numberEnteredOfWords - 1][enteredWords] || [];
        // if(predectedWords.length < 12) {
        defaultPredectedWords = this.defaultWords[numberEnteredOfWords - 1][enteredWords] || []
        // }
        const combinedResults =  userPredectedWords.concat(defaultPredectedWords.slice(0, 12 - userPredectedWords.length));
         return combinedResults.length ? combinedResults : this.staticWords;
      }

      addToUserWordsIfNew(enteredWords, gotUpdated) {
        enteredWords = enteredWords.trim();
        const numberEnteredOfWords = enteredWords.split(' ').length; //  enteredWords.split(/.+ .+/g);
        if(numberEnteredOfWords === 1 ) {
            if(gotUpdated) {
                this.updateUserWords();
            }
            return;
        }
        if(this.userWords[numberEnteredOfWords - 2]) {
            // return;
        // }
        const indexOfLastWord = enteredWords.lastIndexOf(' ');
        if( !this.getPredectedWords(enteredWords.slice(0, indexOfLastWord)).includes(enteredWords.slice(indexOfLastWord + 1)) ) {  
           gotUpdated = true;    
          if(this.userWords[numberEnteredOfWords - 2][enteredWords.slice(0, indexOfLastWord)]) {
            this.userWords[numberEnteredOfWords - 2][enteredWords.slice(0, indexOfLastWord)].push(enteredWords.slice(indexOfLastWord + 1));
          } else {
            this.userWords[numberEnteredOfWords - 2][enteredWords.slice(0, indexOfLastWord)] = [enteredWords.slice(indexOfLastWord + 1)];
          }
        }
        this.addToUserWordsIfNew(enteredWords.slice(0, indexOfLastWord), gotUpdated);
        }
      }

     updateUserWords () {
        const storageInstance = Storage.getInstance();
        storageInstance.setItem('userWords', this.userWords ).then(res => {
        });
     }

     findWords(currentWords) {

        // let found=true;
        const listToSearchIn = userWords[currentWords.length] || defaultWords[currentWords.length];
        // do {
        if (listToSearchIn[currentWords.join('|')]) {
            predictions.push(listToSearchIn[currentWords.join('|')]);
        }
        // }
        // while (predictions.length < 4 ); // should be 12 in the case of user values

        if (predictions.length === 0) {
            predictions = staticPredictions;
        }

       return predictions;
    }

}

/* 
      addToUserWordsIfNewWhileTyping(enteredWords, numberEnteredOfWords) {
        const indexOfLastWord = enteredWords.lastIndexOf(' ');
        if( numberEnteredOfWords > 1 && 
          !this.getPredectedWords(enteredWords.slice(0, indexOfLastWord)).includes(enteredWords.slice(indexOfLastWord + 1)) ) {      
          if(this.userWords[numberEnteredOfWords - 2][enteredWords.slice(0, indexOfLastWord)]) {
            this.userWords[numberEnteredOfWords - 2][enteredWords.slice(0, indexOfLastWord)].push(enteredWords.slice(indexOfLastWord + 1));
          } else {
            this.userWords[numberEnteredOfWords - 2][enteredWords.slice(0, indexOfLastWord)] = [enteredWords.slice(indexOfLastWord + 1)];
          }
        }
      }
*/


function getPredectedWords(enteredWords) { // ماذا تريد أن
    enteredWords = enteredWords.trim();
      const numberEnteredOfWords = enteredWords.split(' ').length; //  enteredWords.split(/.+ .+/g);
      if(numberEnteredOfWords > this.userWords.length) {
          return [];
      }
      this.addToUserWordsIfNew(enteredWords, numberEnteredOfWords);
     return this.userWords[numberEnteredOfWords - 1][enteredWords] || [];

  }

  function addToUserWordsIfNew(enteredWords, numberEnteredOfWords) {
    const indexOfLastWord = enteredWords.lastIndexOf(' ');
    if( numberEnteredOfWords > 1 && 
      !this.getPredectedWords(enteredWords.slice(0, indexOfLastWord)).includes(enteredWords.slice(indexOfLastWord + 1)) ) {      
      if(this.userWords[numberEnteredOfWords - 2][enteredWords.slice(0, indexOfLastWord)]) {
        this.userWords[numberEnteredOfWords - 2][enteredWords.slice(0, indexOfLastWord)].push(enteredWords.slice(indexOfLastWord + 1));
      } else {
        this.userWords[numberEnteredOfWords - 2][enteredWords.slice(0, indexOfLastWord)] = [enteredWords.slice(indexOfLastWord + 1)];
      }
    }
  }