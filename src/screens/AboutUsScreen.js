


import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextToSpeach } from '../classes/TextToSpeach';
import CustomHeader from '../components/CustomHeader';


export default class AboutUsScreen extends React.Component {
    constructor(props) {
        super();
        this.state = {
          title:[ "حول التطبيق"],
          // formFields: {
          //     name: {
          //         label: 'الإسم',
          //         type: 'text'
          //     },
          //     email: {
          //       label: 'البريد الإلكتروني',
          //       type: 'text'

          //   },
          //   subject: {
          //       label: 'عنوان الرسالة',
          //       type: 'text'

          //   },
          //   body: {
          //       label: 'نص السالة',
          //       type: 'text',
          //       multiline: true

          //   }
          // }
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
          multiline: true
        }]
        };
        props.navigation.addListener('willFocus', this.load)
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
      <View>

     <CustomHeader navigation = {this.props.navigation} title={this.state.title} onBackClicked= { () => this.props.navigation.navigate( {routeName: 'Main'})}/>


    <View > 
    {/* style={{flexDirection: 'row', justifyContent: 'center'}}>  */}
    {
            this.state.formFields.map((field, index) => {
              return(
                <TextInput  style={styles.textInput} onChangeText={(text) => this.onTextChanged(text, index)}
                placeholder= {field.label}  multiline = {field.multiline}  />
                // value={field.value}
              )
              
              })}

    </View>
  
     <TouchableOpacity style={styles.card} onPress={ () => this.sendMessage()}  >
          <MonoText style={styles.cardLabel}>إرسال الرسالة</MonoText>
        </TouchableOpacity>
                   
      </View>
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
  inputsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textInput: {
    width: 315,
    height: 41,
    backgroundColor: Colors.primary,
    fontFamily: 'Tajawal',
    fontSize: 17,
    textAlign: 'right',
    padding: 8,
    paddingTop: 12, // 20 didn't work
    marginTop: 11,
    borderRadius: 10 /* **N** */
  },

});