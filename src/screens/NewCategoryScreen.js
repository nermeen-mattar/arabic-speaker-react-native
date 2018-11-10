


import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  View,
  AsyncStorage
} from 'react-native';

import { MonoText } from '../components/StyledText';
import FormHeader from '../components/FormHeader';
import Colors from '../constants/Colors';
// import { Icon } from 'expo';
import PhotoUpload from 'react-native-photo-upload'
import { Storage } from '../classes/storage';

export default class NewCategoryScreen extends React.Component {
    constructor(props) {
        super();
        this.state = {
          title: "إضافة تصنيف جديد",
          cardInfo: { label: 'ارفق صورة', imgSrc:  require('../../assets/images/categories/chat.png')},
          inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد",
          categoryName: ''
        };
        props.navigation.addListener('willFocus', this.load)
      }

      load = () => {
          this.setState({
            categoryName: ''
          });
       }
      static navigationOptions = {
        header: null
      };
      
      render() {
    return (
      <View>
    <FormHeader title= {this.state.title}  onCancelClicked= {() => this.props.navigation.navigate('CategoriesStack')}
      onSaveClicked = {this.addNewCategory}
    />
         <View  style={styles.inputsWrapper}> 
        <View style={styles.card} >
        {/* <Icon.Ionicons name="md-camera" size={32} style={styles.cardIcon} />   */}
        <PhotoUpload
   onPhotoSelect={avatar => {
     if (avatar) {
       console.log('Image base64 string: ', avatar)
     }
   }}>
          <Image style={styles.cardIcon} source={require( '../../assets/images/icons/camera_icon.png')} />
          </PhotoUpload>
          <MonoText style={styles.cardLabel}>{this.state.cardInfo.label}</MonoText>
        </View>

            <TextInput  style={styles.textInput} onChangeText={(text) => this.onTextChanged(text)}
        placeholder= {this.state.inputPlaceholder}  multiline = {true}  value={this.state.categoryName}/>
        </View>
           
      </View>
    );
  }

  onTextChanged(text) {
    this.setState({
      // title: 'okokok',
      categoryName: text,
    });
  }

  addNewCategory = () => {
    const storageInstance = Storage.getInstance();
    // storageInstance.setItem('storageInstance', 'nermeen');
    const result = {value: 'null'};
    storageInstance.getItem('categories', result).then(() => {
      storageInstance.setItem('categories', [...result.value, {label: this.state.categoryName, 
      imgSrc: '../../assets/images/categories/chat.png', selectable: true}]).then(res => {
        this.props.navigation.navigate('CategoriesStack');
      })
      this.props.navigation.navigate('CategoriesStack');
    })

  //   const newCategory  =  [
  //     { label: 'nerrro', imgSrc:  require('../../assets/images/categories/favourites.png')},
  // ];
  //   storageInstance.setItem('categories', newCategory).then(res => {
  //     this.setState({
  //       title: 'yeees',
  //       cardInfo: { label: 'ارفق صورة', imgSrc:  require('../../assets/images/categories/chat.png')},
  //       inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد"
  //     });
  //     this.props.navigation.navigate('HomeStack');
  //   })


    //   AsyncStorage.getItem('UID123', (err, result) => {
    //     this.setState({
    //       title: 'wow',
    //       cardInfo: { label: 'ارفق صورة', imgSrc:  require('../../assets/images/categories/chat.png')},
    //     inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد"
    //   });
    // });    
  };

  getItem = async (key) => {
    value = 'initial';
    try {
       value = await AsyncStorage.getItem('test');
      if (value === null) {
        value = 'null';
      }
      
    } catch (error) {
      // Error retrieving data
      this.setState({
        title: 'error',
        cardInfo: { label: 'ارفق صورة', imgSrc:  require('../../assets/images/categories/chat.png')},
        inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد"
      });
      
    }
        this.setState({
          title: value,
          cardInfo: { label: 'ارفق صورة', imgSrc:  require('../../assets/images/categories/chat.png')},
         inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد"
      });
  // }
    }
}

const styles = StyleSheet.create({
  inputsWrapper: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    // display: 'flex',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textInput: {
      width: 260,
      height: 78,
      backgroundColor: Colors.primary,
      fontSize: 21,
    //   color: Colors.textSecondary,
      textAlign: 'right',
      padding: 8,
      paddingTop: 12, // 20 didn't work
      marginLeft: 10,
      borderRadius: 10 /* **N** */
  },
  card: {
            // flex: 1,
            display: 'flex',
            // flexDirection: 'column',
            alignItems: 'center',
            width: 81, 
            height: 78,
            backgroundColor: Colors.primary,
            marginHorizontal: 4.5,
            marginVertical: 3.5,
            borderRadius: 10 /* **N** */
            // marginBottom: 4,
  },
  cardIcon: {
    // color: Colors.textSecondary,
    // fontSize: 38,
    marginTop: 17
  } ,
  cardLabel: {
      color: Colors.textSecondary,
      fontSize: 11,
      marginTop: 8 //  14 didn't work 
  }

});


