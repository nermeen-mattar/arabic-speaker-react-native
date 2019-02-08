import bigramData from "../constants/default-words/bigramData";
import trigramData from '../constants/default-words/trigramData';
import quadgram from '../constants/default-words/quadgram';
import { Storage } from '../classes/Storage';



/**
 * @author Nermeen Mattar
 * Nice to have: push user words without checking if this.predict.. (but only checking if it exists in ur words).
 * Reason: giving higher priority for words the user has chosen. 
 * Need to be careful: if this got implemented it is better to filter out the words in default which exist in userWords (better memory and processing)
 */
export class TextPrediction {
  staticWords = ['هل', 'متى',  'أين' ,'كيف' ,'بكم' ,'افتح' ,'ممكن' ,'طيب' ,'السلام' ,'عطني' ,'أنا' ,'لماذا']
  userWords = [{}, {}, {}];
  maxNumOfPredictions = 12;
    defaultWords = [ bigramData, trigramData, quadgram]
    static instance;
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
            this.instance = new TextPrediction();    
        }
        return TextPrediction.instance;
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
        let predectedWords;
        enteredWords = enteredWords.trim();
        enteredWords = enteredWords.replace(/\s\s+/g, ' ');
        enteredWords = enteredWords.replace(/^أ/g, 'ا');
        enteredWords = enteredWords.replace(/\sأ/g, ' ا');
          const enteredWordsLength = enteredWords.split(' ').length; //  enteredWords.split(/.+ .+/g);
          if(enteredWords === '') {
              return this.staticWords;
          } 
          if ( enteredWordsLength > this.defaultWords.length) {
              return this.getPredectedWords(this.getLastWords(enteredWords, this.defaultWords.length - 1));
          } 
          predectedWords = this.userWords[enteredWordsLength - 1][enteredWords] || [];
          predectedWords = this.concatUniqueEntries(predectedWords, this.defaultWords[enteredWordsLength - 1][enteredWords]);
        // }        
        /* commented cz I don't think this requirment is correct (replaced with the last line in this fucntion)*/
        // if(combinedResults.length  === 0) {
        //   combinedResults = this.staticWords;
        // } 

        if (predectedWords.length  < this.maxNumOfPredictions  && enteredWordsLength> 1) {    
            const endOfFirstWord =  enteredWords.indexOf(' ') + 1;
            let nextPredectedWords = this.getPredectedWords(enteredWords.slice( endOfFirstWord, enteredWords.length));
            predectedWords= this.concatUniqueEntries(predectedWords, nextPredectedWords);
          } 

          return this.concatUniqueEntries(predectedWords, this.staticWords);
      }

      concatUniqueEntries(destinationArr, entries) {
        if(entries && entries.length) {
          entries =  entries.filter(word => !destinationArr.includes(word));
        } else {
          entries = [];
        }
        return destinationArr.concat(entries.slice(0, this.maxNumOfPredictions - destinationArr.length));
      }
      
      getLastWords(sentence, numberOfWords) {
        var wordsArray = sentence.split(' ');
        return  wordsArray.slice(wordsArray.length - (numberOfWords), wordsArray.length).join(' ');
      }

      addToUserWordsIfNew(enteredWords, gotUpdated) {
        enteredWords = enteredWords.trim();
        enteredWords = enteredWords.replace(/\s\s+/g, ' ');
        enteredWords = enteredWords.replace(/^أ/g, 'ا');
        enteredWords = enteredWords.replace(/\sأ/g, ' ا');
        const indexOfLastWord = enteredWords.lastIndexOf(' ');
        if(indexOfLastWord === -1) {
          if(gotUpdated) {
              this.updateUserWords();
          }
          return;
      }
      const lastWord = enteredWords.slice(indexOfLastWord + 1);
      enteredWords = enteredWords.slice(0, indexOfLastWord);
        const enteredWordsLength = enteredWords.split(' ').length; //  enteredWords.split(/.+ .+/g);
       
        if(this.userWords.length < enteredWordsLength ) {
          this.getLastWords(enteredWords, this.defaultWords.length - 1)
        } else {
          if( !this.getPredectedWords(enteredWords).includes(lastWord) ) {  
            if(!gotUpdated) {
              this.sendSentenceToBackend(enteredWords);
            } 
            gotUpdated = true;    
            if(this.userWords[enteredWordsLength - 1][enteredWords]) {
              this.userWords[enteredWordsLength - 1][enteredWords].push(lastWord);
            } else {
              this.userWords[enteredWordsLength - 1][enteredWords] = [lastWord];
            }
          }
          this.addToUserWordsIfNew(enteredWords, gotUpdated);
        }
      }

     updateUserWords () {
        const storageInstance = Storage.getInstance();
        storageInstance.setItem('userWords', this.userWords ).then(res => {
        });
     }

     sendSentenceToBackend(sentence) {
      const storageInstance = Storage.getInstance(); // temp 
      const settings = {value: 'null'};
      storageInstance.getItem('settingsValues', settings).then(res => {
        if(settings.value) {
          if(settings.value.helpImproveApp) {
            fetch('http://18.224.240.0:8080/addWord?word='.concat(sentence), 
            { method: 'GET' }).then((response) => {
                response.json()
                this.displayAlertMessage();
           });
          }
        } 
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
        // while (predictions.length < 4 ); // should be this.maxNumOfPredictions in the case of user values

        if (predictions.length === 0) {
            predictions = staticPredictions;
        }

       return predictions;
    }
  }