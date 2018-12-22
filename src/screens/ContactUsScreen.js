


import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextToSpeach } from '../classes/TextToSpeach';
import CustomHeader from '../components/CustomHeader';
import commonStyles from '../styles/commonStyles';


export default class ContactUsScreen extends React.Component {
    constructor(props) {
        super();
        this.state = {
          title:[ "تواصل معنا"],

          formFields: [
            {
              name: 'name',
              label: 'الإسم',
              type: 'text'
          },
          {
            label: 'البريد الإلكتروني',
            type: 'text',
            name: 'email'

        },
        {
          label: 'عنوان الرسالة',
          type: 'text',
          name: 'subject'
        }, {
          name: 'body',
          label: 'نص السالة',
          type: 'text',
          multiline: true,
          style: {height: 121}
        }]
        };
      }


      load = () => {
          this.setState({
          });
       }
      static navigationOptions = {
        header: null
      };
      

      
      render() {
    return (

      <Modal animationType="slide" transparent={false} visible={this.state.isVisible}>

     <CustomHeader navigation = {this.props.navigation} title={this.state.title} onBackClicked= {() => {this.props.onBackClicked()}}/>


    <View style= {[styles.container, commonStyles.flexCenter]} > 
      <View>
            {/* style={{flexDirection: 'row', justifyContent: 'center'}}>  */}
    {
            this.state.formFields.map((field, index) => {
              return(
                <TextInput  style={[styles.textInput, styles.inputStyle, field.style || {}]} onChangeText={(text) => this.onTextChanged(text, index)}
                placeholder= {field.label}  multiline = {field.multiline}  />
                // value={field.value}
              )
              
              })}
  
     <TouchableOpacity style={[styles.button, styles.inputStyle]} onPress={ () => this.sendMessage()}  >
          <MonoText style={styles.buttonText} >إرسال الرسالة</MonoText>
        </TouchableOpacity>
        </View>

    </View>
                   
      </Modal>
    );
  }

  sendMessage() {

  }

  onTextChanged(text, fieldIndex) {
    const formFields = this.state.formFields;
    formFields[fieldIndex].value = text;
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
    height: 41,
    backgroundColor: Colors.primary,
    fontFamily: 'Tajawal',
    fontSize: 17,
    textAlign: 'right',
    padding: 8,
    paddingTop: 12, // 20 didn't work
  },
  button: {
    backgroundColor: Colors.brand,
    padding:10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17
  },
  inputStyle: {
    width: 315,
    minWidth: '60%',
    marginTop: 11,
    borderRadius: 10 /* **N** */
  }

});