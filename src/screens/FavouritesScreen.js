


import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { MonoText } from '../components/StyledText';
import {Card} from '../components/card';
import CustomHeader from '../components/CustomHeader';
import Colors from '../constants/Colors';
import { Storage } from '../classes/Storage';
import { TextToSpeach } from '../classes/TextToSpeach';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
import DeleteAndCancel from '../components/DeleteAndCancel';

export default class FavouritesScreen extends React.Component {

  constructor(props) {
    super();
    this.state = {
      title: ["المفضلة"],
      favourites: [],
      selectMode: false
    };
    this.initFavourites(); 
    props.navigation.addListener('willFocus', this.load)
  }

  load = () => {
    this.cancelSelectMode();
    this.initFavourites(); 
  }
  static navigationOptions = {
    header: null
  };
  
  render() {
    return (
      <View style={styles.container}>
         <CustomHeader navigation = {this.props.navigation} title={this.state.title}
               onSelectClicked= {
                this.state.favourites.length ? () =>
                 this.setState({selectMode: true}) : null
              } 
         />

         {/* <Header centerComponent = {{ text: 'MY nerro', style: { color: '#fff' } }} />  */}
         {
                this.state.favourites.length ?  
                <ScrollView >
                <View style={styles.cardsContainer}>
                {
                  this.state.favourites.map((favourite, index) => {
                    return(
                  <TouchableOpacity    onPress={() => {
                    this.favouriteClicked(index)
                 }}>
                    <Card key ={index} cardInfo = {favourite} selectMode= {this.state.selectMode}
                      selected = {favourite.selected} 
                    />
                    </TouchableOpacity>
                    );
                  })
                }
                </View>
              </ScrollView> : 

                // empty state
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' , flex: 1}}> 
                 <View > 
                 <Icon  style={{textAlign: 'center'}} name="star" size={86} color="#D6D6D6"/> 

                 <MonoText style={{fontSize: 17 , color:"#9B9B9B", textAlign: 'center'}}>  لا يوجد مفضلات الآن</MonoText>
                 </View>
                  </View>

         }
    
       {
         this.state.selectMode ?
          <DeleteAndCancel 
          onCancelClicked = {() => this.cancelSelectMode()}
          onDeleteClicked = {() => {
            this.setState({
              showConfirmDialog: true
            });
          }}> </DeleteAndCancel>  : null
       }
       {
         this.state.showConfirmDialog ? <ConfirmDeleteDialog  
         onConfirm={() => {
          this.setState({
            showConfirmDialog: false
          });
           this.deleteSelectedFavourites();
         }}
         onCancel={() => {
          this.setState({
            showConfirmDialog: false
          });
        }}> </ConfirmDeleteDialog> : null
       }
      </View>
    );
  }

  initFavourites = ()  => {
    const storageInstance = Storage.getInstance();
    const result = {value: 'null'};
    storageInstance.getItem('favourites', result).then(res => {
      if(result.value) {
        this.setState({
          favourites: result.value.map(favourite => {return {label: favourite}})
        });
      }
    })
  }

  favouriteClicked(favouriteIndex) {
    if(this.state.selectMode) {
      this.favouriteSelectionToggled(favouriteIndex);
   } 
    else {
      TextToSpeach.getInstance().speak(this.state.favourites[favouriteIndex].label);
    }
  }

  favouriteSelectionToggled(favouriteIndex) {
    const favourites = this.state.favourites;
    favourites[favouriteIndex].selected = !favourites[favouriteIndex].selected;
    this.setState({
      favourites:  favourites
    });
  }


  cancelSelectMode = () => {
    const favourites = this.state.favourites;
    favourites.map(favourite => favourite.selected = false);
    this.setState({
      selectMode: false,
      favourites: favourites
    });
  }; 

  deleteSelectedFavourites = ()  => {
    const storageInstance = new Storage();
    const unselectedFavourites = this.state.favourites.filter(favourite => !favourite.selected).map(favourite => favourite.label);
    storageInstance.setItem('favourites', unselectedFavourites).then(res => {
        this.setState({
          favourites: unselectedFavourites,
        });
        this.cancelSelectMode();
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


