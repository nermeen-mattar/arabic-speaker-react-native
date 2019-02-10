import { Alert } from "react-native";

import bigramData from "../constants/default-words/bigramData";
import trigramData from "../constants/default-words/trigramData";
import quadgram from "../constants/default-words/quadgram";
import { Storage } from "../classes/Storage";

/**
 * @author Nermeen Mattar
 * Nice to have: push user words without checking if this.predict.. (but only checking if it exists in ur words).
 * Reason: giving higher priority for default words which have been chosen by the user.
 * Need to be careful: if this got implemented it is better to filter out the words in default which exist in userWords (better memory and processing)
 */
export class TextPrediction {
  staticWords = [
    "هل",
    "متى",
    "أين",
    "كيف",
    "بكم",
    "افتح",
    "ممكن",
    "طيب",
    "السلام",
    "عطني",
    "أنا",
    "لماذا"
  ];
  userWords = [{}, {}, {}];
  maxNumOfPredictions = 12;
  defaultWords = [bigramData, trigramData, quadgram];
  static instance;
  constructor() {
    const storageInstance = Storage.getInstance();
    // storageInstance.deleteItem('userWords');
    const result = { value: "null" };
    storageInstance.getItem("userWords", result).then(res => {
      if (result.value) {
        this.userWords = result.value;
      }
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new TextPrediction();
    }
    return TextPrediction.instance;
  }

  initIndexedDefaultWords() {
    const indexedDefaultWords = [];
    this.defaultWords.forEach((sentences, index) => {
      indexedDefaultWords.push({});
      sentences.forEach(sentence => {
        const nextWordIndex = sentence.lastIndexOf(" ");
        if (indexedDefaultWords[index][sentence.slice(0, nextWordIndex)]) {
          indexedDefaultWords[index][sentence.slice(0, nextWordIndex)].push(
            sentence.slice(nextWordIndex + 1)
          );
        } else {
          indexedDefaultWords[index][sentence.slice(0, nextWordIndex)] = [
            sentence.slice(nextWordIndex + 1)
          ];
        }
      });
    });
    this.defaultWords = indexedDefaultWords;
  }

  singleWordPredections(enteredWords) {
    const enteredWordsLength = enteredWords.split(" ").length; //  enteredWords.split(/.+ .+/g);
    let predectedWords;
    predectedWords = this.filterIfNotIncludesPart(
      Object.keys(this.userWords[0]) || [],
      enteredWords
    );
    predectedWords = this.filterIfNotIncludesPart(
      this.concatUniqueEntries(
        predectedWords,
        Object.keys(this.defaultWords[0])
      ),
      enteredWords
    );
    return predectedWords;
  }

  getPredectedWords(enteredWords) {
    let predectedWords;
    enteredWords = enteredWords.replace(/\s\s+/g, " ");
    enteredWords = enteredWords.replace(/^أ/g, "ا");
    enteredWords = enteredWords.replace(/\sأ/g, " ا");
    const indexOfLastWord = enteredWords.lastIndexOf(" ");
    enteredWords = enteredWords.trim();
    if (enteredWords === "") {
      return this.staticWords;
    }
    if (indexOfLastWord === -1) {
      return this.singleWordPredections(enteredWords);
    }
    const incompleteWord = enteredWords.slice(indexOfLastWord + 1);
    completeWords = enteredWords.slice(0, indexOfLastWord);
    const completeWordsLength = completeWords.split(" ").length; //  enteredWords.split(/.+ .+/g);
    if (completeWordsLength > this.defaultWords.length) {
      return this.getPredectedWords(
        this.getLastWords(enteredWords, this.defaultWords.length - 1)
      );
    }
    predectedWords = this.filterIfNotIncludesPart(
      this.userWords[completeWordsLength - 1][enteredWords] || [],
      incompleteWord
    );
    predectedWords = this.filterIfNotIncludesPart(
      this.concatUniqueEntries(
        predectedWords,
        this.defaultWords[completeWordsLength - 1][completeWords]
      ),
      incompleteWord
    );
    // }
    /* commented cz I don't think this requirment is correct (replaced with the last line in this fucntion)*/
    // if(combinedResults.length  === 0) {
    //   combinedResults = this.staticWords;
    // }

    if (
      predectedWords.length < this.maxNumOfPredictions &&
      completeWordsLength > 1
    ) {
      const endOfFirstWord = enteredWords.indexOf(" ") + 1;
      let nextPredectedWords = this.getPredectedWords(
        enteredWords.slice(endOfFirstWord, enteredWords.length)
      );
      predectedWords = this.filterIfNotIncludesPart(
        this.concatUniqueEntries(predectedWords, nextPredectedWords),
        incompleteWord
      );
    }

    return this.filterIfNotIncludesPart(
      this.concatUniqueEntries(predectedWords, this.staticWords),
      incompleteWord
    );
  }

  filterIfNotIncludesPart(entries, incompleteWord) {
    return entries.filter(entry =>
      entry.match(new RegExp("^" + incompleteWord), "g")
    );
  }

  concatUniqueEntries(destinationArr, entries) {
    if (entries && entries.length) {
      entries = entries.filter(word => !destinationArr.includes(word));
    } else {
      entries = [];
    }
    return destinationArr.concat(
      entries.slice(0, this.maxNumOfPredictions - destinationArr.length)
    );
  }

  getLastWords(sentence, numberOfWords) {
    var wordsArray = sentence.split(" ");
    return wordsArray
      .slice(wordsArray.length - numberOfWords, wordsArray.length)
      .join(" ");
  }

  addToUserWordsIfNew(enteredWords, gotUpdated) {
    enteredWords = enteredWords.trim();
    enteredWords = enteredWords.replace(/\s\s+/g, " ");
    enteredWords = enteredWords.replace(/^أ/g, "ا");
    enteredWords = enteredWords.replace(/\sأ/g, " ا");
    const indexOfLastWord = enteredWords.lastIndexOf(" ");
    if (indexOfLastWord === -1) {
      if (gotUpdated) {
        this.updateUserWords();
      }
      return;
    }
    const lastWord = enteredWords.slice(indexOfLastWord + 1);
    const wordsWithoutLast = enteredWords.slice(0, indexOfLastWord);
    const numOfWordsWithoutLast = wordsWithoutLast.split(" ").length; //  wordsWithoutLast.split(/.+ .+/g);

    if (this.userWords.length < numOfWordsWithoutLast) {
      // this.addToUserWordsIfNew(this.getLastWords(enteredWords, 4)); // this.defaultWords.length - 1
      for (let wordIndex = 0; wordIndex < numOfWordsWithoutLast; wordIndex++) {
        const to =
          wordIndex + 4 < numOfWordsWithoutLast + 1
            ? wordIndex + 4
            : numOfWordsWithoutLast + 1;
        this.addToUserWordsIfNew(
          enteredWords
            .split(" ")
            .slice(wordIndex, to)
            .join(" ")
        );
      }
    } else {
      if (!this.getPredectedWords(wordsWithoutLast).includes(lastWord)) {
        if (!gotUpdated) {
          this.sendSentenceToBackend(enteredWords); // (wordsWithoutLast.concat(' ').concat(lastWord)
        }
        gotUpdated = true;
        if (this.userWords[numOfWordsWithoutLast - 1][wordsWithoutLast]) {
          this.userWords[numOfWordsWithoutLast - 1][wordsWithoutLast].push(
            lastWord
          );
        } else {
          this.userWords[numOfWordsWithoutLast - 1][wordsWithoutLast] = [
            lastWord
          ];
        }
      }
      this.addToUserWordsIfNew(wordsWithoutLast, gotUpdated);
    }
  }

  updateUserWords() {
    const storageInstance = Storage.getInstance();
    storageInstance.setItem("userWords", this.userWords).then(res => {});
  }

  sendSentenceToBackend(sentence) {
    // const storageInstance = Storage.getInstance(); // temp
    // const settings = { value: "null" };
    // storageInstance.getItem("settingsValues", settings).then(res => {
    //   if (settings.value) {
    //     if (settings.value.helpImproveApp) {
    fetch("http://18.224.240.0:8080/addWord?word=".concat(sentence), {
      method: "GET"
    }).then(response => {
      response.json();
    });
    //     }
    //   }
    // });
  }

  findWords(currentWords) {
    // let found=true;
    const listToSearchIn =
      userWords[currentWords.length] || defaultWords[currentWords.length];
    // do {
    if (listToSearchIn[currentWords.join("|")]) {
      predictions.push(listToSearchIn[currentWords.join("|")]);
    }
    // }
    // while (predictions.length < 4 ); // should be this.maxNumOfPredictions in the case of user values

    if (predictions.length === 0) {
      predictions = staticPredictions;
    }

    return predictions;
  }
}
