


import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity

} from 'react-native';

import { MonoText } from '../components/StyledText';
import {Card} from '../components/card';
import CustomHeader from '../components/CustomHeader';
import Colors from '../constants/Colors';
import { Storage } from '../classes/Storage';
import CategoriesSentences from '../constants/CategoriesSentences';
import { PlaySound, StopSound, PlaySoundRepeat, PlaySoundMusicVolume } from 'react-native-play-sound';
import CategoriesArabicToEnglish from '../constants/CategoriesArabicToEnglish';
import Genders from '../constants/Genders';
// import soundfile from'../../assets/sounds/FemaleSounds/general_f_1.mp3'

export default class SentencesScreen extends React.Component {

  constructor(props) {
    super();
    const categoryName = props.navigation.getParam('categoryName');
    this.state = {
        voiceGender: Genders.female,
        title: "العبارات",
        sentences: [],
        //  CategoriesSentences[categoryName] || [],
        selectedSentences: [],
        selectMode: false,
        categoryName: categoryName,
        // categoriesSentences : CategoriesSentences,
        test: '',
        // JSON.stringify(CategoriesSentences[categoryName] ),
        
        defaultSentences: CategoriesSentences[categoryName] || []
    };

    // this.load();
    props.navigation.addListener('willFocus', this.load)
    this.initSentences();
  }
  static navigationOptions = {
    header: null
  };
  
  load = () => {
    this.cancelSelectMode();
      // if(!this.state.selectMode) {
        this.updateSentences(); /* didn't work in constructor because comp doesn't get killed ! solve caching
        /* make it a class prop (part of state) */
      // }
      this.initVoiceGender();
}
  // componentDidMount() {
  // }
  render() {
  
    return (
      <View style={styles.container}>
        {/* <Header
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent= {<CustomHeader title="Home" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />}
          rightComponent={{ icon: 'home', color: '#fff' }}
         /> */}
         <CustomHeader title={this.state.title + '>' +  this.state.categoryName} onNewClicked= {() => this.props.navigation.navigate('NewSentenceScreen', 
         {
           categoryName: this.state.categoryName
           })}
          onSelectClicked= {
            this.state.sentences.length > this.state.defaultSentences.length ? () =>
             this.setState({selectMode: true}) : null
          }
         />
          {/* <MonoText style={styles.getStartedText}>
              {this.state.test}
            </MonoText> */}
         {/* <Header centerComponent = {{ text: 'MY nerro', style: { color: '#fff' } }} />  */}
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.cardsContainer}>
          {
            this.state.sentences.map((sentence, index) => {
              return(
            //     <View key ={index}>
                
            //  </View>
          //   <TouchableOpacity   onPress={() => {
          //     this.sentenceToggled(index)
          //  }}>
          <View>
                      
               <TouchableOpacity    onPress={() => {
                  this.sentenceClicked(index)
               }}>
      
              <Card key ={sentence.label} cardInfo = {sentence} selectMode= {this.state.selectMode}
                selected = {sentence.selected} // this.state.selectedSentences.includes(sentence)                
              />
              </TouchableOpacity>
              </View>
              );
            })
          }
          </View>

            <MonoText>{this.state.test}</MonoText>
          {/* <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}


            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/SentencesScreen.js</MonoText>
            </View>

            <MonoText style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </MonoText>
          </View> */}

          {/* <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <MonoText style={styles.helpLinkText}>Help, it didn’t automatically reload!</MonoText>
            </TouchableOpacity>
          </View> */}
        </ScrollView>

        {/* <View style={styles.tabBarInfoContainer}>
          <MonoText style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</MonoText>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View> */}
       {
         this.state.selectMode ? 
         <View  style={styles.buttonsWrapper} >
         <TouchableOpacity>
           <MonoText onPress={() => {
             this.cancelSelectMode();
               }}>
           الغاء
             </MonoText>
         </TouchableOpacity>
         <TouchableOpacity  onPress={() => {
              this.deleteSelectedSentences()
            }}>
         <MonoText>
           حذف
             </MonoText>
         </TouchableOpacity>
         </View> : null
       }
      </View>
    );
  }

  // initSentences2 = ()  => {
  //   const storageInstance = Storage.getInstance(); // temp 
  //   const result = {value: 'null'};
  //   storageInstance.getItem('sentences', result).then(res => {
  //     if(!result.value || result.value === 'error') {
  //       this.setState({
  //           sentences: this.state.defaultSentences[categoryName] || [],
  //           test: JSON.stringify(this.state.defaultSentences)

  //         });
  //         storageInstance.setItem('sentences', this.state.defaultSentences);
  //       } else {
  //           this.setState({
  //               sentences: result.value[categoryName]|| [],
  //               test: JSON.stringify(result.value)
  //          });
  //     }
  //   });
  // }



  initSentences = ()  => {
    const storageInstance = Storage.getInstance(); // temp 
    const result = {value: 'null'};
    storageInstance.getItem('sentences-'.concat(this.state.categoryName), result).then(res => {
      if(result.value) {
        this.setState({
          sentences: result.value,
        });
      } else {
        this.setState({
          test: this.state.default === undefined ? 'undefined': 'ok',
          sentences: this.state.defaultSentences
        });
        storageInstance.setItem('sentences-'.concat(this.state.categoryName), this.state.defaultSentences);
      }
    })
  }

  initVoiceGender = ()  => {
    const storageInstance = Storage.getInstance();  
    const result = {value: 'null'};
    storageInstance.getItem('settingsValues', result).then(res => {
      if(result.value) {
        this.setState({
          voiceGender: result.value.voiceGender
        });
      } 
    })
  }
  updateSentences = ()  => {
    const storageInstance = Storage.getInstance(); // temp 
    const result = {value: 'null'};
    storageInstance.getItem('sentences-'.concat(this.state.categoryName), result).then(res => {
      if(result.value) {
        this.setState({
          sentences: result.value || [], // result.value[this.state.categoryName] 
          // test: 'update sentences'
        });
      } 
    });
  }


  sentenceClicked(sentenceIndex) {
      let soundPath = this.state.voiceGender === Genders.female ? "FemaleSounds/$categoryName_f_$sentenceIndex":  "MaleSounds/$categoryName_m_$sentenceIndex";
      soundPath = soundPath.replace('$categoryName', CategoriesArabicToEnglish[this.state.categoryName]).replace('$sentenceIndex', sentenceIndex + 1);
      PlaySound(soundPath);
  }

  sentenceToggled(sentenceIndex) {
    const sentences = this.state.sentences;
    sentences[sentenceIndex].selected = !sentences[sentenceIndex].selected;
    this.setState({
      sentences: sentences
    });
    // const selectedSentences = this.state.selectedSentences;
    // const sentences = this.state.sentences;

    // if(sentences[sentenceIndex].selected && !selectedSentences.includes(sentenceIndex) ) {
    //   selectedSentences.push(sentenceIndex)
    // } else if( !sentences[sentenceIndex].selected && selectedSentences.includes(sentenceIndex) ) {
    //   selectedSentences.splice(sentenceIndex, 1);
    // }
    // sentences[sentenceIndex].selected =  !sentences[sentenceIndex].selected;
    // this.setState({ sentences: sentences, selectedSentences: selectedSentences});
    
    
    // this.state.sentences[sentenceIndex].setState({ selected: !this.state.sentences[sentenceIndex].selected});
  }


  cancelSelectMode = () => {
    const sentences = this.state.sentences;
    sentences.map(sentence => sentence.selected = false);
    this.setState({
      selectMode: false,
      sentences: sentences
    });
  }; 

  deleteSelectedSentences = ()  => {
    const storageInstance = Storage.getInstance(); 
    const unselectedSentences = this.state.sentences.filter(sentence => !sentence.selected);
    storageInstance.setItem('sentences-'.concat(this.state.categoryName), unselectedSentences).then(res => {
        this.setState({
          sentences: unselectedSentences,
        });
      // this.updateSentences();

    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
  cardsContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    // display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row'
  }
  // welcomeImage: {
  //   resizeMode: 'contain',
  // },
  // tabBarInfoContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: 'black',
  //       shadowOffset: { height: -3 },
  //       shadowOpacity: 0.1,
  //       shadowRadius: 3,
  //     },
  //     android: {
  //       elevation: 20,
  //     },
  //   }),
  //   alignItems: 'center',
  //   backgroundColor: '#fbfbfb',
  //   paddingVertical: 20,
  // }
});


