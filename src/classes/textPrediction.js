import bigramData from "../constants/default-words/bigramData";
import trigramData from '../constants/default-words/trigramData';
import quadgram from '../constants/default-words/quadgram';

export class TextPredection {
    userWords = [];
    defaultWords = [ bigramData, trigramData, quadgram]
    static instance;
    // defaultWords = [
    //     ["من", "في", "و", "ان", "'الله'", "على", "ما", "يا", "لا", "كل", "انا", "لو", "يوم", "الى", "بس", "اللي", "عن", "ولا", "هل", "كم", "مش", "مع", "اللهم"],
    //     ["من هناك"]
    // ];
    // let predictions = [];
    // let staticPredictions = ['test1', 'test2'];

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
    
      getPredectedWords(enteredWords) {
          enteredWords = enteredWords.trim();
          const numberEnteredOfWords = enteredWords.split(' ').length; //  enteredWords.split(/.+ .+/g);
          if(numberEnteredOfWords > this.defaultWords.length) {
              return [];
          }
         return this.defaultWords[numberEnteredOfWords - 1][enteredWords] || [];

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