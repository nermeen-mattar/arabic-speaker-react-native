import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  Linking
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { MonoText } from "../components/StyledText";
import Colors from "../constants/Colors";
import CustomHeader from "../components/CustomHeader";
import commonStyles from "../styles/commonStyles";

export default class ContactUsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: ["تواصل معنا"],
      // userMessage: {
      //   type: 'success',
      //   text: ''
      // },
      formFields: {
        name: {
          label: "الإسم",
          type: "text"
        },
        email: {
          label: "البريد الإلكتروني",
          type: "text"
        },
        subject: {
          label: "عنوان الرسالة",
          type: "text"
        },
        rating: {
          label: "تقييم التطبيق",
          type: "stars",
          // elements: this.getStarsElements,
          value: 5
        },
        body: {
          label: "نص السالة",
          type: "text",
          multiline: true,
          style: { height: 121 }
        }
      }
    };

    // this.state.formFields.rating.elements = this.getStarsElements;

  }

  static navigationOptions = {
    header: null
  };


  getStarsElements() {
    return <View style={[{flexDirection: 'row',  justifyContent: 'space-between'}, styles.inputStyle]}>  
    {/* , alignItems: 'center' */}
    <MonoText style={styles.ratingLabel}> تقييم التطبيق </MonoText>
    <View style={{display: 'flex', flexDirection: 'row'}}>     
    {/* onPress = { this.state.formFields.rating.value }   */}
    {        
      [1,2,3,4,5].map(index => {
        return (
         <Icon style={[styles.star, this.state.formFields.rating.value >= index ? styles.starOn : styles.starOff ]} 
          name= {this.state.formFields.rating.value >= index ? "star": "star-o"} size={26} 
          onPress = {() => {
             this.onTextChanged(index, 'rating');
           }}
          />
        )
      }
       )
       }
      </View>
    </View>
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isVisible}
      >
        <CustomHeader
          navigation={this.props.navigation}
          title={this.state.title}
          onBackClicked={() => {
            this.props.onBackClicked();
          }}
        />

        <View style={[styles.container, commonStyles.flexCenter]}>
          <View>
            {/* style={{flexDirection: 'row', justifyContent: 'center'}}>  */}
            {Object.keys(this.state.formFields).map(fieldName => {
              return (
                this.state.formFields[fieldName].type === 'stars' ? // custom
                // this.state.formFields[fieldName].elements()
                this.getStarsElements() : 
                <TextInput
                style={[
                  styles.textInput,
                  styles.inputStyle,
                  this.state.formFields[fieldName].style || {}
                ]}
                onChangeText={text => this.onTextChanged(text, fieldName)}
                placeholder={this.state.formFields[fieldName].label}
                multiline={this.state.formFields[fieldName].multiline}
                value ={this.state.formFields[fieldName].value}
              />
              );
            })}

            <TouchableOpacity
              style={[styles.button, styles.inputStyle]}
              onPress={() => this.sendMessage()}
            >
              <MonoText style={styles.buttonText}>إرسال الرسالة</MonoText>
            </TouchableOpacity>
          </View>

          {/* <MonoText>
      {this.state.userMessage}
        </MonoText>
                    */}
        </View>
      </Modal>
    );
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  sendMessage() {
    // const errorFields = [];
    // this.state.formFields.forEach(field => {
    //   if(!field.value) {
    //     errorFields.push(field.label);
    //   }
    // });
    // errorFields.length
    let requiredError = Object.keys(this.state.formFields).some(
      fieldName => !this.state.formFields[fieldName].value
    );
    if (requiredError) {
      this.displayAlertMessage( "الرجاء تعبئة جميع الخانات");
      return;
    } else if(!this.validateEmail(this.state.formFields.email.value)) {
      this.displayAlertMessage("الرجاء إدخال بريد الإلكتروني صحيح");
    } else {
      body = 'إسم المرسل: '.concat(this.state.formFields.name.value).concat(' \n ');
      body = body.concat('البريد الإلكتروني: ').concat(this.state.formFields.email.value).concat(' \n ');
      body = body.concat('تقييم التطبيق: ').concat(this.state.formFields.rating.value).concat('/5 \n ');
      body = body.concat('نص الرسالة: \n').concat(this.state.formFields.body.value);
      Linking.openURL(
        // AnasCenterAT@Gmail.com
        "mailto:AnasCenterAT@Gmail.com?subject="
          .concat(this.state.formFields.subject.value)
          .concat("&body=")
          .concat(body)
      ).then(res => {
        Alert.alert('تم الارسال بنجاح');
        this.clearAllFields();
      }).catch(err => {
        Alert.alert( 'فشل الإرسال', 'الرجاء المحاولة مرةً أخرى');
      }); 
    }
  }

  clearAllFields() {
    const formFields = this.state.formFields;
    Object.keys(formFields).forEach(fieldName => {
      formFields[fieldName].value = '';
    });
    this.setState({formFields: formFields});
  }

  displayAlertMessage(errMsg) {
    Alert.alert('فشل الإرسال', errMsg);
  }

  onTextChanged(text, fieldName) {
    const formFields = this.state.formFields;
    formFields[fieldName].value = text;
    this.setState({
      formFields: formFields
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
    paddingTop: 10
  },
  textInput: {
    height: 44,
    backgroundColor: Colors.primary,
    fontFamily: "Tajawal",
    fontSize: 17,
    textAlign: "right",
    padding: 6,
    paddingTop: 12 // 20 didn't work
  },
  ratingLabel: {
    color: Colors.grayFontColor,
    fontSize: 17,
  },
  star: {
    marginRight: 6  
  },
  starOn: {
    color: Colors.brand
  },  
  starOff: {
    color: Colors.grayFontColor,
  },  
  button: {
    backgroundColor: Colors.brand,
    padding: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 17
  },
  inputStyle: {
    width: 315,
    minWidth: "60%",
    marginTop: 11,
    borderRadius: 10 /* **N** */
  }
});
