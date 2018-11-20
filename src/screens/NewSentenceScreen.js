


import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { MonoText } from '../components/StyledText';
import FormHeader from '../components/FormHeader';
import Colors from '../constants/Colors';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextToSpeach } from '../classes/text-to-speach';

import PhotoUpload from 'react-native-photo-upload'
import { Storage } from '../classes/storage';
import { TextPredection } from '../classes/textPrediction';

export default class NewSentenceScreen extends React.Component {
    constructor(props) {
        super();
        this.state = {
          title:[ "إضافة عبارة جديدة"],
          cardInfo: { label: 'ارفق صورة'},
          inputPlaceholder: "اكتب عبارة لا تتجاوز ست كلمات",
          sentence: '',
          imgSrc: null, 
          // categoryName: props.navigation.getParam('categoryName'),
          categoryPath: props.navigation.getParam('categoryPath')

        };
        props.navigation.addListener('willFocus', this.load)
      }


      load = () => {
          this.setState({
            sentence: '',
            imgSrc: null
          });
       }
      static navigationOptions = {
        header: null
      };
      

      
      render() {
    return (
      <View>

    <FormHeader title= {this.state.title}  onCancelClicked= {() => this.props.navigation.navigate('CategoriesScreen', 
    {
      categoryPath: this.state.categoryPath
    })}
      onSaveClicked = {this.addNewSentence}
    />

    <View style={{flexDirection: 'row', justifyContent: 'center',}}> 
    <TextInput  style={styles.textInput} onChangeText={(text) => this.onTextChanged(text)}
        placeholder= {this.state.inputPlaceholder}  multiline = {true}  value={this.state.sentence}/>
    </View>
   <View  style={styles.inputsWrapper}> 
      <View style={styles.card} >
        {/* <PhotoUpload
        maxHeight= "100"
        maxWidth = "100"
        onResizedImageUri = {photo => {
          this.setState({imgSrc: photo.uri})
          this.setState({sentence: photo.uri})

        }}
        imagePickerProps = {{label: 'herllo nerro '}}
        onPhotoSelect={photo => {
          this.setState({imgSrc: photo})
        }}
        > */}
          <TouchableOpacity onPress={ () => this.displayImagePickerMenu()} >
          { this.state.imgSrc ?   <Image  style={{width: 108, height: 104}} source={this.state.imgSrc} />
        :  <Icon  name="camera" size={32}  color={Colors.borderColor} style={styles.cardIcon}/>}
            </TouchableOpacity>

          {/* style={[styles.cardIcon, {width: 100, height: 100}]}  */}
          {/* <Image source={ this.state.imgSrc ?  {uri: this.state.imgSrc} : require( '../../assets/images/icons/camera_icon.png')} /> */}
          {/* </PhotoUpload> */}
          <MonoText style={styles.cardLabel}>{this.state.cardInfo.label}</MonoText>
        </View>

     <TouchableOpacity style={styles.card} onPress={ () => this.speak()}  >
           <View>
           <Icon  name="volume-up" size={32}  color={Colors.borderColor} style={styles.cardIcon}/>
             </View>
          <MonoText style={styles.cardLabel}>صرت آلي</MonoText>
        </TouchableOpacity>

    <View style={styles.card} >
                <Icon  name="microphone" size={32}  color={Colors.borderColor} style={styles.cardIcon}/>
          <MonoText style={styles.cardLabel}>تسجيل صوتي</MonoText>
        </View>


        {/* <TouchableOpacity onPress= {() => this.props.navigation.navigate('IconsLibrariesScreen')}> 
          <MonoText> افتح مكتبة الأيقونات</MonoText>
        </TouchableOpacity> */}
        </View>
           
      </View>
    );
  }


  displayImagePickerMenu() {
// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: '', // أختر صورة
  customButtons: [{ name: 'iconsLib', title: 'اختر من مكتبة الأيقونات' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
 
/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
ImagePicker.showImagePicker(options, (response) => {
  // console.log('Response = ', response);
 
  if (response.didCancel) {
    // console.log('User cancelled image picker');
  } else if (response.error) {
    // console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    // console.log('User tapped custom button: ', response.customButton);
    this.props.navigation.navigate('IconsLibrariesScreen');
  } else {
    const source = { uri: response.uri };
 
    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
 
    this.setState({
      imgSrc: source, // source.uri, //  { uri: 'data:image/jpeg;base64,' + response.data }
    });
  }
});
  }

  onTextChanged(text) {
    this.setState({
      // title: 'okokok',
      sentence: text,
    });
  }

  speak() {
    TextPredection.getInstance().addToUserWordsIfNew(this.state.sentence); 
    TextToSpeach.getInstance().speak(this.state.sentence);
  }

  addNewSentence = () => {

    const storageInstance = Storage.getInstance();
    // storageInstance.setItem('storageInstance', 'nermeen');categ
    const result = {value: 'null'};
    storageInstance.getItem(this.state.categoryPath.join(), result).then(() => {
      result.value = result.value ? result.value : [];
      storageInstance.setItem(this.state.categoryPath.join(), [...result.value, 
        {label: this.state.sentence, selectable: true, imgSrc:
         this.state.imgSrc}]).then(res => {
        this.props.navigation.navigate('CategoriesScreen',  {
          categoryPath: this.state.categoryPath
        });
      })

      // this.props.navigation.navigate('SentencesScreen');
    })

  //   const newSentence  =  [
  //     { label: 'nerrro', imgSrc:  require('../../assets/images/sentences/favourites.png')},
  // ];
  //   storageInstance.setItem(this.state.categoryPath.join(), newSentence).then(res => {
  //     this.setState({
  //       title: 'yeees',
  //       cardInfo: { label: 'ارفق صورة', imgSrc:  require('../../assets/images/sentences/chat.png')},
  //       inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد"
  //     });
  //     this.props.navigation.navigate('HomeStack');
  //   })


    //   AsyncStorage.getItem('UID123', (err, result) => {
    //     this.setState({
    //       title: 'wow',
    //       cardInfo: { label: 'ارفق صورة', imgSrc:  require('../../assets/images/sentences/chat.png')},
    //     inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد"
    //   });
    // });    
  };
}

const styles = StyleSheet.create({
  inputsWrapper: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textInput: {
    width: 350,
    height: 78,
    backgroundColor: Colors.primary,
    fontSize: 21,
    textAlign: 'right',
    padding: 8,
    paddingTop: 12, // 20 didn't work
    marginTop: 11,
    borderRadius: 10 /* **N** */
  },
  card: {
    display: 'flex',
    width: 108,
    height: 104,
    backgroundColor: Colors.primary,
    marginVertical: 11,
    marginHorizontal: 5,
    borderRadius: 10
    // marginBottom: 4,
    // position: 'relative'
  },
  cardIcon: {
    marginVertical: 24,
    textAlign: 'center'

  },
  cardLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    // marginTop: 24, 
    // bottom: 0,
    textAlign: 'center'
  }
});