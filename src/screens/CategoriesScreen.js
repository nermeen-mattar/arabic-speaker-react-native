


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
import { Storage } from '../classes/storage';
import CategoriesSentences from '../constants/CategoriesSentences';
import { PlaySound, StopSound, PlaySoundRepeat, PlaySoundMusicVolume } from 'react-native-play-sound';
import Genders from '../constants/Genders';
import CategoriesArabicToEnglish from '../constants/CategoriesArabicToEnglish';

export default class CategoriesScreen extends React.Component {

  constructor(props) {
    super();
    const categoryPath = props.navigation.getParam('categoryPath') || ['المكتبات'];
    this.state = {
                title: categoryPath.join(), // test> test
                categoryPath: categoryPath,
                categories: [],
                selectedCategories: [],
                selectMode: false,
                test: '',
                defaultCategories: {
                  المكتبات: [
                    { label: 'المفضلة', type: 'category' , imgSrc:  require('../../assets/images/categories/favourites.png')},
                    { label: 'تحياتي' , type: 'category', imgSrc:  require('../../assets/images/categories/chat.png')},
                    { label: 'عام' , type: 'category', imgSrc:  require('../../assets/images/categories/info.png')},
                    { label: 'السفر' , type: 'category', imgSrc:  require('../../assets/images/categories/plane.png')},
                    { label: 'السوق' , type: 'category', imgSrc:  require('../../assets/images/categories/cart.png')},
                    { label: 'العمل' , type: 'category', imgSrc:  require('../../assets/images/categories/tools.png')},
                    { label: 'المستشفى' , type: 'category', imgSrc:  require('../../assets/images/categories/health.png')},
                    { label: 'المطعم' , type: 'category', imgSrc:  require('../../assets/images/categories/cake.png')},
                    { label: 'المدرسة' , type: 'category', imgSrc:  require('../../assets/images/categories/pencil.png')},
                  ],
                  ...CategoriesSentences
                }
              };
              // storageInstance = Storage.getInstance();
              // storageInstance.removeItem(this.state.categoryPath.join());
    this.initCategories();
    // this.initVoiceGender();
    // this.load();
    props.navigation.addListener('willFocus', this.load)
  }
  static navigationOptions = {
    header: null
  };
  
  load = () => {
    this.updateTitle();
    this.cancelSelectMode();
      // if(!this.state.selectMode) {
    this.initCategories(); /* didn't work in constructor because comp doesn't get killed ! solve caching
        /* make it a class prop (part of state) */
      // }
    }

  updateTitle = () => {
    const categoryPath = this.props.navigation.getParam('categoryPath') || this.state.categoryPath || ['المكتبات'];
    this.setState({
      title: categoryPath.join('>')
    })
  }
  // componentDidMount() {
  // }
  render() {
  
    const currentDefaultCategories = this.state.defaultCategories[this.state.categoryPath.join()];
    return (
      <View style={styles.container}>
         <CustomHeader navigation= {this.props.navigation} title={this.state.title} onNewClicked= 
         {this.state.categoryPath.length < 4 ?  () => this.props.navigation.navigate('NewCategoryScreen', {
          categoryPath: this.state.categoryPath
        }): null }
         onSecondNewClicked= 
         {this.state.categoryPath.length > 1 ? () => this.props.navigation.navigate('NewSentenceScreen', {
          categoryPath: this.state.categoryPath
        }): null}
          onSelectClicked= {
            this.state.categories.length > (currentDefaultCategories && currentDefaultCategories.length) ? () =>
             this.setState({selectMode: true}) : null
          }
         />
         {/* <Header centerComponent = {{ text: 'MY nerro', style: { color: '#fff' } }} />  */}
        <ScrollView >

          <View style={styles.cardsContainer}>
          {
            this.state.categories.map((category, index) => {
              return(
            //     <View key ={index}>
                
            //  </View>
          //   <TouchableOpacity   onPress={() => {
          //     this.categoryToggled(index)
          //  }}>
            <TouchableOpacity    onPress={() => {
                  this.categoryClicked(index)
               }}>
      
              <Card key ={category.label} cardInfo = {category} selectMode= {this.state.selectMode}
                selected = {category.selected} // this.state.selectedCategories.includes(category)
             
                  // onCardToggeled= {() =>  this.categoryToggled(index)}
                 
              />
                      </TouchableOpacity>
              );
            })
          }
          </View>

        </ScrollView>
       {
         this.state.selectMode ? 
         <View  style={styles.buttonsWrapper} >
         <TouchableOpacity>
           <MonoText style={styles.button}  onPress={() => {
             this.cancelSelectMode();
               }}>
           الغاء
             </MonoText>
         </TouchableOpacity>
         <MonoText style={styles.verticalDivider}> </MonoText>
         <TouchableOpacity  onPress={() => {
              this.removeSelectedCategories()
            }}>
         <MonoText style={styles.button} >
           حذف
             </MonoText>
         </TouchableOpacity>
         </View> : null
       }
      </View>
    );
  }

  initCategories = ()  => {
    const storageInstance = Storage.getInstance(); // temp 
    const result = {value: 'null'};
    storageInstance.getItem(this.state.categoryPath.join(), result).then(res => {
      if(result.value) {
        this.setState({
          categories: result.value,
          test: JSON.stringify(result.value)
        });
      } 
      else { // if(this.state.defaultCategories[this.state.categoryPath.join()]) 
        this.setState({
          categories: this.state.defaultCategories[this.state.categoryPath.join()] || [],
          test: 'default categories'
        });
        storageInstance.setItem(this.state.categoryPath.join(), this.state.categories);
      }
    })
  }



  // updateCategories = ()  => {
  //   const storageInstance = Storage.getInstance(); // temp 
  //   const result = {value: 'null'};
  //   storageInstance.getItem(this.state.categoryPath.join(), result).then(res => {
  //     // if(result.value) {
  //       this.setState({
  //         categories: result.value || []
  //       });
  //     // } 
  //   })
  // }

  
  categoryClicked(index) {
    if(this.state.selectMode) {
        this.categorySelectionToggled(index);
    } else if(this.state.categories[index].type === 'category') {
        this.state.categoryPath.push((this.state.categories[index].label));
        this.load();
      }
      else {
        // this.props.navigation.navigate('SentencesScreen', {
        //   categoryName: this.state.categories[index].label,
        //   categoryPath: this.state.categoryPath
        // });
        this.sentenceClicked(index);
      }
    }
  
    sentenceClicked = (sentenceIndex)  => {
      const storageInstance = Storage.getInstance();  
      const result = {value: 'null'};
      storageInstance.getItem('settingsValues', result).then(res => {
          const voiceGender = result.value ? result.value.voiceGender : Genders.female;
          let soundPath = voiceGender === Genders.female ? "FemaleSounds/$categoryPath_f_$sentenceIndex":  "MaleSounds/$categoryPath_m_$sentenceIndex";
          soundPath = soundPath.replace('$categoryPath', CategoriesArabicToEnglish[this.state.categoryPath.join()]).replace('$sentenceIndex', sentenceIndex + 1);
          PlaySound(soundPath);
      });
    }
  
  categorySelectionToggled(categoryIndex) {
    const categories = this.state.categories;
    categories[categoryIndex].selected = !categories[categoryIndex].selected;
    this.setState({
      categories: categories
    });
    // const selectedCategories = this.state.selectedCategories;
    // const categories = this.state.categories;

    // if(categories[categoryIndex].selected && !selectedCategories.includes(categoryIndex) ) {
    //   selectedCategories.push(categoryIndex)
    // } else if( !categories[categoryIndex].selected && selectedCategories.includes(categoryIndex) ) {
    //   selectedCategories.splice(categoryIndex, 1);
    // }
    // categories[categoryIndex].selected =  !categories[categoryIndex].selected;
    // this.setState({ categories: categories, selectedCategories: selectedCategories});
    
    
    // this.state.categories[categoryIndex].setState({ selected: !this.state.categories[categoryIndex].selected});
  }


  cancelSelectMode = () => {
    const categories = this.state.categories;
    categories.map(category => category.selected = false);
    this.setState({
      selectMode: false,
      categories: categories
    });
  }; 

  removeSelectedCategories = ()  => {
    const storageInstance = new Storage();
    const unselectedCategories = this.state.categories.filter(category => !category.selected);
    storageInstance.setItem(this.state.categoryPath.join(), unselectedCategories).then(res => {
        this.setState({
          categories: unselectedCategories,
        });
        this.cancelSelectMode();
    });
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <MonoText onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </MonoText>
      );

      return (
        <MonoText style={styles.developmentModeText}>
          Nermeen mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </MonoText>
      );
    } else {
      return (
        <MonoText style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </MonoText >
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FDA50F',
    paddingVertical: 20
  }, 
  verticalDivider: {
    width: 1,
    height: 15,
    backgroundColor:'#B17611',

  },
  button: {
    textAlign: 'center',
    color: 'white',
    flex: 1

  },
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


