


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

export default class CategoriesScreen extends React.Component {

  constructor(props) {
    super();
    // storageInstance = Storage.getInstance();
    // storageInstance.removeItem('categories');
    this.state = {
                title: "المكتبات",
                categories: [],
                selectedCategories: [],
                selectMode: false,
                test: '',
                defaultCategories: [
                  { label: 'المفضلة', imgSrc:  require('../../assets/images/categories/favourites.png')},
                  { label: 'تحياتي', imgSrc:  require('../../assets/images/categories/chat.png')},
                  { label: 'عام', imgSrc:  require('../../assets/images/categories/info.png')},
                  { label: 'السفر', imgSrc:  require('../../assets/images/categories/plane.png')},
                  { label: 'السوق', imgSrc:  require('../../assets/images/categories/cart.png')},
                  { label: 'العمل', imgSrc:  require('../../assets/images/categories/tools.png')},
                  { label: 'المستشفى', imgSrc:  require('../../assets/images/categories/health.png')},
                  { label: 'المطعم', imgSrc:  require('../../assets/images/categories/cake.png')},
                  { label: 'المدرسة', imgSrc:  require('../../assets/images/categories/pencil.png')},
                ]
              };
    this.initCategories();
    // this.load();
    props.navigation.addListener('willFocus', this.load)
  }
  static navigationOptions = {
    header: null
  };
  
  load = () => {
    this.cancelSelectMode();
      // if(!this.state.selectMode) {
        this.updateCategories(); /* didn't work in constructor because comp doesn't get killed ! solve caching
        /* make it a class prop (part of state) */
      // }
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
         <CustomHeader title={this.state.title} onNewClicked= {() => this.props.navigation.navigate('NewCategoryScreen')}
          onSelectClicked= {
            this.state.categories.length > this.state.defaultCategories.length ? () =>
             this.setState({selectMode: true}) : null
          }
         />
         {/* <Header centerComponent = {{ text: 'MY nerro', style: { color: '#fff' } }} />  */}
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

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

            <MonoText>{this.state.test}</MonoText>
          {/* <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}


            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/CategoriesScreen.js</MonoText>
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
              this.removeSelectedCategories()
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

  initCategories = ()  => {
    const storageInstance = Storage.getInstance(); // temp 
    const result = {value: 'null'};
    storageInstance.getItem('categories', result).then(res => {
      if(result.value) {
        this.setState({
          categories: result.value
        });
      } else {
        this.setState({
          categories: this.state.defaultCategories
        });
        storageInstance.setItem('categories', this.state.defaultCategories);
      }
    })
  }

  updateCategories = ()  => {
    const storageInstance = Storage.getInstance(); // temp 
    const result = {value: 'null'};
    storageInstance.getItem('categories', result).then(res => {
      if(result.value) {
        this.setState({
          categories: result.value
        });
      } 
    })
  }

  categoryClicked(index) {
    if(this.state.selectMode) {
        this.categorySelectionToggled(index);
    } else {
      this.props.navigation.navigate('SentencesScreen', {
        categoryName: this.state.categories[index].label
      });
    }
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
    storageInstance.setItem('categories', unselectedCategories).then(res => {
        this.setState({
          categories: unselectedCategories,
        });
      // this.updateCategories();

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


