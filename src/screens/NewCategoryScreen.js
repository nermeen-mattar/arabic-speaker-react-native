


import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  View,
  AsyncStorage,
  Keyboard
  // CameraRoll,
  // ScrollView,
  // Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { MonoText } from '../components/StyledText';
import FormHeader from '../components/FormHeader';
import Colors from '../constants/Colors';
import { ImagePickerHelper } from '../classes/ImagePickerHelper';
import PhotoUpload from 'react-native-photo-upload'
import { Storage } from '../classes/Storage';

export default class NewCategoryScreen extends React.Component {
    constructor(props) {
        super();
        this.state = {
          title: ["إضافة تصنيف جديد"],
          cardInfo: { label: 'ارفق صورة', imgSrc:  require('../../assets/images/categories/chat.png')},
          imgSrc: null,
          inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد",
          categoryName: '',
          categoryPath: props.navigation.getParam('categoryPath'),
          // photos: []
          imagePickerInstance: ImagePickerHelper.getInstance(() => this.props.navigation.navigate('IconsLibrariesScreen', {srcScreen: 'NewCategoryScreen'}), img => this.setState({imgSrc: img }))
        };
        props.navigation.addListener('willFocus', this.load)
        // thi._handleButtonPress()



        // More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
        /**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)

ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source,
    });
  }
}); */
      }


      // _handleButtonPress = () => {
      //   CameraRoll.getPhotos({
      //       first: 20,
      //       assetType: 'Photos',
      //     })
      //     .then(r => {
      //       this.setState({ photos: r.edges });
      //     })
      //     .catch((err) => {
      //        //Error Loading Images
      //     });
      //   };


      load = () => {
          this.setState({
            categoryName: '',
            imgSrc: this.props.navigation.getParam('imgSrc'),
            imagePickerInstance: ImagePickerHelper.getInstance(() => this.props.navigation.navigate('IconsLibrariesScreen',  {srcScreen: 'NewCategoryScreen'}), img => this.setState({imgSrc: img }))

          });
       }
      static navigationOptions = {
        header: null
      };
      

      
      render() {
    return (
      <TouchableOpacity
      activeOpacity = {1}
      style={{flex: 1}}
      onPress={Keyboard.dismiss} 
    >

         {/* <View>
     <Button title="Load Images" onPress={this._handleButtonPress} />
     <ScrollView>
       {this.state.photos.map((p, i) => {
       return (
         <Image
           key={i}
           style={{
             width: 300,
             height: 100,
           }}
           source={{ uri: p.node.image.uri }}
         />
       );
     })}
     </ScrollView>
   </View> */}

    <FormHeader title= {this.state.title}  onCancelClicked= {() => this.props.navigation.navigate('CategoriesScreen',  {
      categoryPath: this.state.categoryPath
    })}
      onSaveClicked = {this.addNewCategory}
    />
         <View  style={styles.inputsWrapper}> 
         <TextInput  style={styles.textInput} onChangeText={(text) => this.onTextChanged(text)}
        placeholder= {this.state.inputPlaceholder}  multiline = {true}  value={this.state.categoryName}/>
         <View style={styles.card} >
        {/*<PhotoUpload
   onPhotoSelect={avatar => {
     if (avatar) {
       console.log('Image base64 string: ', avatar)
     }
   }}>
          <Image style={styles.cardIcon} source={require( '../../assets/images/icons/camera_icon.png')} />
          </PhotoUpload>
          <MonoText style={styles.cardLabel}>{this.state.cardInfo.label}</MonoText>
        </View> */}


       <TouchableOpacity onPress={ () => this.state.imagePickerInstance.displayImagePickerMenu()} >
          { this.state.imgSrc ?   <Image  style={{width: 81, height: 78}} source={this.state.imgSrc} />
        :  <View> 
          
          <Icon  name="camera" size={32}  color={Colors.borderColor} style={styles.cardIcon}/>
                  <MonoText style={styles.cardLabel}>{this.state.cardInfo.label}</MonoText>
        </View>}

            </TouchableOpacity>
        </View>
  
        </View>
      
      </TouchableOpacity>
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
    storageInstance.getItem(this.state.categoryPath.join(), result).then(() => {    
      storageInstance.setItem(this.state.categoryPath.join(), [...result.value, {label: this.state.categoryName, imgSrc: this.state.imgSrc, type: 'category'}]).then(res => {
        this.props.navigation.navigate('CategoriesScreen',  {
          categoryPath: this.state.categoryPath
        });
      });
    });

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
    marginTop: 11,
    borderRadius: 10 /* **N** */
  },
  card: {
    width: 81,
    height: 78,
    backgroundColor: Colors.primary,
    margin: 11,
    borderRadius: 10 /* **N** */
  },
  cardIcon: {
    marginTop: 17,
    textAlign: 'center'
  },
  cardLabel: {
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 11,
    marginTop: 8 //  14 didn't work 
  }

});

