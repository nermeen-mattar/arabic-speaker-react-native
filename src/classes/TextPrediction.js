import unigramData from "../constants/default-words/unigramData";
import bigramData from "../constants/default-words/bigramData";
import trigramData from "../constants/default-words/trigramData";
import quadgram from "../constants/default-words/quadgram";
import {
  Storage
} from "../classes/Storage";
import {

  Alert
} from "react-native";
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
  debuggingText;
  userWords = [{}, {}, {}];
  maxNumOfPredictions = 12;
  defaultWords = [bigramData, trigramData, quadgram];
  static instance;
  constructor() {
    const storageInstance = Storage.getInstance();
    // storageInstance.deleteItem('userWords');
    const result = {
      value: "null"
    };
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

  getSingleWordPredections(enteredWords) {
    let predectedWords = [];
    this.concatUniqueAndMatchedEntries(
      predectedWords,
      Object.keys(this.userWords[0]),
      enteredWords
    );
    this.concatUniqueAndMatchedEntries(
      predectedWords,
      Object.keys(this.defaultWords[0]),
      enteredWords
    );

    this.concatUniqueAndMatchedEntries(
      predectedWords,
      unigramData,
      enteredWords
    );

    return predectedWords;
  }

  getPredectedWords(enteredWords) {
    let predectedWords = [];
    enteredWords = enteredWords.replace(/\s\s+/g, " ");
    enteredWords = enteredWords.replace(/^أ/g, "ا");
    enteredWords = enteredWords.replace(/\sأ/g, " ا");
    const indexOfLastWord = enteredWords.lastIndexOf(" ");
    const trimmedEnteredWords = enteredWords.trim();
    if (trimmedEnteredWords === "") {
      return this.staticWords;
    }
    if (indexOfLastWord === -1) {
      return this.getSingleWordPredections(trimmedEnteredWords);
    }
    const incompleteWord = trimmedEnteredWords.slice(indexOfLastWord + 1);
    completeWords = trimmedEnteredWords.slice(0, indexOfLastWord);
    const completeWordsLength = completeWords.split(" ").length; //  enteredWords.split(/.+ .+/g);
    if (completeWordsLength > this.defaultWords.length) {
      return this.getPredectedWords(
        this.getLastWords(enteredWords, this.defaultWords.length - 1)
      );
    }
    // 1- User sentences
    this.concatUniqueAndMatchedEntries(
      predectedWords,
      this.userWords[completeWordsLength - 1][trimmedEnteredWords] || [],
      incompleteWord
    );

    // 2- Default sentences
    this.concatUniqueAndMatchedEntries(
      predectedWords,
      this.defaultWords[completeWordsLength - 1][completeWords],
      incompleteWord
    );

    if (
      predectedWords.length < this.maxNumOfPredictions &&
      completeWordsLength > 1
    ) {
      const endOfFirstWord = trimmedEnteredWords.indexOf(" ") + 1;
      let nextPredectedWords = this.getPredectedWords(
        enteredWords.slice(endOfFirstWord, enteredWords.length)
      );
      // 3- Shorter sentences
      this.concatUniqueAndMatchedEntries(
        predectedWords,
        nextPredectedWords,
        incompleteWord
      );
    }
    // 4- Single default words only for incomplete ( what about single user words -> should store it too)
    this.debuggingText = 'incom' + incompleteWord;
    if (incompleteWord) {
      this.concatUniqueAndMatchedEntries(
        predectedWords,
        // unigramData,
        this.getSingleWordPredections(incompleteWord),
        incompleteWord
      );
    }
    // 5- static words only for not incomplete word
    this.concatUniqueAndMatchedEntries(
      predectedWords,
      this.staticWords,
      incompleteWord
    );
    return predectedWords;
  }

  filterIfNotIncludesPart(entries, incompleteWord) {
    if (entries) {
      return entries.filter(entry =>
        entry.match(new RegExp("^" + incompleteWord), "g")
      );
    }
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

  concatUniqueAndMatchedEntries(destinationArr, entries, incompleteWord) {
    if (entries && entries.length) {
      // entries = entries.filter(word => !destinationArr.includes(word));
      const entriesLength = entries.length;
      let isUnique, isMatched;
      for (let entryIndex = 0; entryIndex < entriesLength; entryIndex++) {
        if (this.maxNumOfPredictions <= destinationArr.length) {
          // may add another preventive check
          return;
        }
        isUnique = !destinationArr.includes(entries[entryIndex]);
        isMatched = entries[entryIndex].match(
          new RegExp("^" + incompleteWord),
          "g"
        );
        if (isUnique && isMatched) {
          destinationArr.push(entries[entryIndex]);
        }
      }
    }
  }

  getLastWords(sentence, numberOfWords) {
    const lastChar = sentence[sentence.length - 1];
    let wordsArray = sentence.trim().split(" ");
    const lastWords = wordsArray
      .slice(wordsArray.length - numberOfWords, wordsArray.length)
      .join(" ");
    return lastWords.concat(lastChar === " " ? " " : "");
  }

  addSentenceToUserWords(enteredWords) {
    enteredWords = enteredWords.trim();
    if (!enteredWords) {
      return;
    }
    enteredWords = enteredWords.replace(/\s\s+/g, " ");
    enteredWords = enteredWords.replace(/^أ/g, "ا");
    enteredWords = enteredWords.replace(/\sأ/g, " ا");
    enteredWordsArray = enteredWords.split(" ");
    numOfEnteredWords = enteredWordsArray.length;
    // let hasUpdated = false;
    const endIndex = enteredWordsArray.length < this.userWords.length ? enteredWordsArray.length : this.userWords.length + 1;
    for (let setIndex = 1; setIndex <= endIndex; setIndex++) {
      for (let currWordIndex = 0; currWordIndex < numOfEnteredWords; currWordIndex++) {
        if ((numOfEnteredWords - currWordIndex) < setIndex) {
          break;
        }
        if (this.addWordsIfNew(enteredWordsArray.slice(currWordIndex, currWordIndex + setIndex).join(" "))) {
          // hasUpdated = true;
          this.sendSentenceToBackend(enteredWordsArray.slice(currWordIndex, currWordIndex + setIndex).join(" "));
        }
      }
    }
    // if (hasUpdated) {
    //   this.sendSentenceToBackend(enteredWords); // (wordsWithoutLast.concat(' ').concat(lastWord)
    //   this.updateUserWords();
    // }
  }

  addWordsIfNew(enteredWords) {
    enteredWords = enteredWords.trim();

    const indexOfLastWord = enteredWords.lastIndexOf(" ");
    if (indexOfLastWord === -1) {
      return this.addSingleWordIfNotExist(enteredWords);
    }
    let lastWord = enteredWords.slice(indexOfLastWord + 1);
    let wordsWithoutLast = enteredWords.slice(0, indexOfLastWord);
    const numOfWordsWithoutLast = wordsWithoutLast.split(" ").length; //  wordsWithoutLast.split(/.+ .+/g);
    const userWordsForEnteredWords = this.userWords[numOfWordsWithoutLast - 1][wordsWithoutLast] || [];
    if (
      !userWordsForEnteredWords.includes(lastWord)
      // !this.getPredectedWords(wordsWithoutLast.concat(" ")).includes(lastWord)
    ) {
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
      return true;
    }
    return false;
  }

  addSingleWordIfNotExist(word) {
    if (
      !this.userWords[0][word]
      // !this.getPredectedWords(word.concat(" ")).length === 0 &&
      ) {
      this.userWords[0][word] = [];
      return true;
    }
    return false;
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
      if (
        !this.getPredectedWords(wordsWithoutLast.concat(" ")).includes(lastWord)
      ) {
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
    Alert.alert(sentence);
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
