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
          type: "custom",
          element:  
          <View> 
                <Icon name="chevron-right" size={30} color={Colors.brand} />
          </View>
        },
        body: {
          label: "نص السالة",
          type: "text",
          multiline: true,
          style: { height: 121 }
        }
      }
    };
  }

  static navigationOptions = {
    header: null
  };

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
                this.state.formFields[fieldName].type === 'custom' ? 
                this.state.formFields[fieldName].element : 
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

  sendMessage() {
    // const errorFields = [];
    // this.state.formFields.forEach(field => {
    //   if(!field.value) {
    //     errorFields.push(field.label);
    //   }
    // });
    // errorFields.length
    const hasError = Object.keys(this.state.formFields).some(
      fieldName => !this.state.formFields[fieldName].value
    );
    if (hasError) {
      this.displayAlertMessage();
      return;
    } else {
      body = 'إسم المرسل: '.concat(this.state.formFields.name.value).concat(' \n ');
      body = body.concat('البريد الإلكتروني: ').concat(this.state.formFields.email.value).concat(' \n ');
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

  displayAlertMessage() {
    Alert.alert('فشل الإرسال', "الرجاء تعبئة جميع الخانات");
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
