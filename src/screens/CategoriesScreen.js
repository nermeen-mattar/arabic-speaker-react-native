import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";

import { Card } from "../components/card";
import CustomHeader from "../components/CustomHeader";
import Colors from "../constants/Colors";
import { StorageObj } from "../classes/Storage";
import CategoriesSentences from "../constants/CategoriesSentences";
import SoundPlayer from 'react-native-sound-player'
import Genders from "../constants/Genders";
import CategoriesArabicToEnglish from "../constants/CategoriesArabicToEnglish";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import DeleteAndCancel from "../components/DeleteAndCancel";
import { TextToSpeachObj } from "../classes/TextToSpeach";
import { ArabicRecorderAndPlayerObj } from "../classes/ArabicRecorderAndPlayer";
import commonStyles from "../styles/commonStyles";
import {EVENTS, logEvent} from "../classes/Events";

export default class CategoriesScreen extends React.Component {
  constructor(props) {
    super();
    const categoryPath = props.navigation.getParam("categoryPath") || [
      "المكتبات"
    ];
    this.state = {
      categoryPath: categoryPath,
      categories: [],
      selectedCategories: [],
      selectMode: false,
      test: "",
      showConfirmDialog: false,
      defaultCategories: {
        المكتبات: [
          {
            label: "عام",
            type: "category",
            imgSrc: require("../../assets/images/categories/general.png"),
            default: true
          },
          {
            label: "التحيات",
            type: "category",
            imgSrc: require("../../assets/images/categories/greetings.png"),
            default: true
          },
          {
            label: "العمل",
            type: "category",
            imgSrc: require("../../assets/images/categories/work.png"),
            default: true
          },
          {
            label: "السوق",
            type: "category",
            imgSrc: require("../../assets/images/categories/market.png"),
            default: true
          },
          {
            label: "السفر",
            type: "category",
            imgSrc: require("../../assets/images/categories/travel.png"),
            default: true
          },
          {
            label: "المدرسة",
            type: "category",
            imgSrc: require("../../assets/images/categories/school.png"),
            default: true
          },
          {
            label: "المطعم",
            type: "category",
            imgSrc: require("../../assets/images/categories/resturant.png"),
            default: true
          },
          {
            label: "المستشفى",
            type: "category",
            imgSrc: require("../../assets/images/categories/hospital.png"),
            default: true
          },
          {
            label: "المسجد",
            type: "category",
            imgSrc: require("../../assets/images/categories/mosque.png"),
            default: true
          }
        ],
        ...CategoriesSentences
      }
    };
    this.initCategories();
    props.navigation.addListener("willFocus", this.load);
  }
  static navigationOptions = {
    header: null
  };

  load = () => {
    this.cancelSelectMode();
    this.initCategories();
  };

  render() {
    const currentDefaultCategories =
      this.state.defaultCategories[this.state.categoryPath.join()] || [];
    return (
      <View style={styles.container}>
        <CustomHeader
          navigation={this.props.navigation}
          title={this.state.categoryPath}
          onNewClicked={
            this.state.categoryPath.length < 4
              ? () =>
                  this.props.navigation.navigate("NewCategoryScreen", {
                    categoryPath: this.state.categoryPath
                  })
              : null
          }
          onSecondNewClicked={
            this.state.categoryPath.length > 1
              ? () =>
                  this.props.navigation.navigate("NewSentenceScreen", {
                    categoryPath: this.state.categoryPath
                  })
              : null
          }
          onTitleSectionClicked={
            this.state.categoryPath.length > 1
              ? sectionIndex => this.moveToCategoryLevel(sectionIndex)
              : null
          }
          onBackClicked={
            this.state.categoryPath.length > 1
              ? () => this.moveToCategoryLevel(-2)
              : null
          }

          onSelectClicked={
            this.state.categories.length > currentDefaultCategories.length
              ? () => this.setState({ selectMode: true })
              : null
          }
        />
        <ScrollView>
          <View style={commonStyles.flexCenter}>
            <View style={[styles.cardsContainer, commonStyles.flexCenter]}>
              {this.state.categories.map((category, index) => {
                return category.type === "category" ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.categoryClicked(index);
                    }}
                  >
                    <Card
                      key={category.label}
                      cardInfo={category}
                      selectMode={this.state.selectMode}
                      fontSize={this.state.categoryPath.length > 1 ? 15 : 18} // this.state.categoryPath.length > 1 ? 12 : 15
                      selected={category.selected}
                    />
                  </TouchableOpacity>
                ) : null;
              })}

              {this.state.categories.map((category, index) => {
                return category.type !== "category" ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.sentenceClicked(index);
                    }}
                  >
                    <Card
                      key={category.label}
                      cardInfo={category}
                      selectMode={this.state.selectMode}
                      fontSize={this.state.categoryPath.length > 1 ? 15 : 18} /// was 12: 15
                      selected={category.selected}
                    />
                  </TouchableOpacity>
                ) : null;
              })}
            </View>
          </View>
        </ScrollView>
        {this.state.selectMode ? (
          <DeleteAndCancel
            onCancelClicked={this.cancelSelectMode}
            onDeleteClicked={this.deleteClicked}
          >        
          </DeleteAndCancel>
        ) : null}
        {this.state.showConfirmDialog ? (
          <ConfirmDeleteDialog
            //  confirmMessage ={}
            onConfirm={() => {
              this.setState({
                showConfirmDialog: false
              });
              this.deleteSelectedCategories();
            }}
            onCancel={() => {
              this.setState({
                showConfirmDialog: false
              });
            }}
          >           
          </ConfirmDeleteDialog>
        ) : null}
      </View>
    );
  }

  initCategories = () => {
    const result = { value: "null" };
    StorageObj
      .getItem(this.state.categoryPath.join(), result)
      .then(res => {
        const defaultCategories =
          this.state.defaultCategories[this.state.categoryPath.join()] || [];
        result.value = result.value ? result.value : [];
        this.setState({
          categories: [...defaultCategories, ...result.value]
        });
      });
  };

  deleteClicked = () => {
    const selectedCategories = this.state.categories.filter(
      category => category.selected
    );
    if (selectedCategories.length === 0) {
      Alert.alert("يجب أن تختار عبارة واحدة أو تصنيف واحد على الأقل");
    } else {
      this.setState({
        showConfirmDialog: true
      });
    }
  };

  moveToCategoryLevel = sectionIndex => {
    this.setState({
      categoryPath: this.state.categoryPath.slice(0, sectionIndex + 1)
    });
    setTimeout(() => {
      this.load();
    }, 2);
  };

  categoryClicked = index => {
    if (this.state.selectMode) {
      this.selectionToggeled(index);
    } else {
      //  if(this.state.categories[index].type === 'category')
      this.setState({
        categoryPath: [
          ...this.state.categoryPath,
          this.state.categories[index].label
        ]
      });
      setTimeout(() => {
        this.load();
      }, 2);
    }
  };

  sentenceClicked = sentenceIndex => {
    if (this.state.selectMode) {
      return this.selectionToggeled(sentenceIndex);
    }
    let soundType;
    if (this.state.categories[sentenceIndex].default) {
      this.playExistingSound(sentenceIndex);
      soundType = 'default'; // for event
    } else if (this.state.categories[sentenceIndex].soundPath) {
      ArabicRecorderAndPlayerObj.onStartPlayStoredFile(
        this.state.categories[sentenceIndex].soundPath
      );
      soundType = 'recorded';
    } else {
      TextToSpeachObj.speak(
        this.state.categories[sentenceIndex].label
      );
      soundType = 'responsive voice';
    }
    logEvent(EVENTS.PLAY_SOUND, {
      text: this.state.sentence,
      categoryPath: this.state.categoryPath,
      soundType
    });
  };

  playExistingSoundDeprecated = sentenceIndex => {
    let soundPath = "";
    if (this.state.voiceGender === Genders.female) {
      if (Platform.OS === "ios") {
        soundPath = "FemaleSounds/";
      }
      soundPath += "$categoryPath_f_$sentenceIndex";
    } else {
      if (Platform.OS === "ios") {
        soundPath = "MaleSounds/";
      }
      soundPath += "$categoryPath_m_$sentenceIndex";
    }
    soundPath = soundPath
      .replace(
        "$categoryPath",
        CategoriesArabicToEnglish[this.state.categoryPath.join()]
      )
      .replace("$sentenceIndex", sentenceIndex + 1);
      // PlaySound(soundPath);
  };

  playExistingSound = sentenceIndex => {
      let soundPath =
        CategoriesArabicToEnglish[this.state.categoryPath.join()] +
        "_" +
        sentenceIndex +
        "_" + TextToSpeachObj.getGender().charAt(0);
      // PlaySound(soundPath);
      SoundPlayer.playSoundFile(soundPath, 'mp3')
  };

  // cleanSentence(sentence) {
  //   tashkeelCharCodes = [
  //     "\u064e",
  //     "\u064b",
  //     "\u064c",
  //     "\u064d",
  //     "\u064f",
  //     "\u0650",
  //     "\u0651",
  //     "\u0652"
  //   ];
  //   questionMarkCharCode = "\u061f";
  //   const cleanRegExp = new RegExp(
  //     [questionMarkCharCode + "|" + tashkeelCharCodes.join("|")],
  //     "g"
  //   );
  //   return sentence.label.replace(cleanRegExp, "").replace(/ /g, "_");
  // }

  selectionToggeled = categoryIndex => {
    const categories = this.state.categories;
    categories[categoryIndex].selected = !categories[categoryIndex].selected;
    this.setState({
      categories: categories
    });
  };

  cancelSelectMode = () => {
    const categories = this.state.categories;
    categories.map(category => (category.selected = false));
    this.setState({
      selectMode: false,
      categories: categories
    });
  };

  cancelDeleteCategories = () => {
    this.setState({
      showConfirmDialog: false
    });
  };

  deleteSelectedCategories = () => {
    const remainingCategories = this.state.categories.filter(
      category => !category.selected
    );
    const deletedCategoriesLength = this.state.categories.length - remainingCategories.length;
    StorageObj
      .setItem(this.state.categoryPath.join(), remainingCategories)
      .then(res => {
        this.setState({
          categories: remainingCategories
        });
        this.cancelSelectMode();
      });
      logEvent(EVENTS.DELETE_CATEGORIES, {length: deletedCategoriesLength});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground
  },
  cardsContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    maxWidth: 900,
    flexWrap: "wrap"
  }
});
