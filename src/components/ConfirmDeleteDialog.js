import Dialog from "react-native-dialog";

import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    Alert
} from "react-native";
import Colors from "../constants/Colors";
import { MonoText } from '../components/StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';

class ConfirmDeleteDialog extends Component {
    constructor (props) {
        super();
        this.state = {
            isVisible: true
        }
        this.prepareMessage(props);
      }

      prepareMessage(props) {
        let isVisible = true;
        let message;
          if(props.allItems) {             
            message = ' هل أنت متأكد أنك تريد حذف ';
              const itemsToBeDeleted = props.allItems.filter(item => item.selected).map(item => item.label);
              switch(itemsToBeDeleted.length) {
                  case 0: 
                  props.onCancel();
                  isVisible = false;
                  this.displayAlertMessage();
                  break;
                  case 1: 
                  message = message.concat(props.entityNames.single).concat(" '").concat(itemsToBeDeleted[0]).concat("'");
                  break;
                  case 2: 
                  message = message.concat(props.entityNames.dual);
                  break;
                  default:
                  message = message.concat(itemsToBeDeleted.length).concat(' ').concat(props.entityNames.plural);
              }
          } else {
            message = props.customizedText || 'هل أنت متأكد أنك تريد الحذف';
          }
        this.state = {
            isVisible: isVisible,
            message: message
        };
      }
      displayAlertMessage() {
        Alert.alert('يجب أن تختار عبارة واحدة على الأقل');
      }
      
    render() {
        return (
            <Dialog.Container visible={this.state.isVisible}> 
              <Dialog.Title  style={styles.title}>
                  <Text> 
                     <Icon name="trash" size={40}  color= { Colors.borderColor} /> 
                  </Text>
              </Dialog.Title>
              <Dialog.Description  style={styles.description} >

            <MonoText style={styles.text}> 
            {/* هل تريد حذف هذه العبارة ؟  */}
            {
                    this.state && this.state.message
            }
            <MonoText style={styles.itemToDelete}> {this.props.itemToDelete} </MonoText>
            </MonoText>
              </Dialog.Description >
              <Dialog.Button  style={{ color:  Colors.errorText}} label="حذف"
                    onPress = {this.props.onConfirm}
              /> 
              <Dialog.Button  style={{ color:  '#A0A0A0'}}  label="الغاء"
               onPress = {this.props.onCancel}
              />
        
            </Dialog.Container>
        );
    }
}
export default ConfirmDeleteDialog;

const styles = StyleSheet.create({
    title: {
        marginTop: 30,
        marginBottom: 12,
        marginLeft:'auto',
        marginRight:'auto',
        paddingVertical: 18,
        paddingHorizontal: 22,
        width: 76,
        height: 76,
        borderColor: '#D8D8D8',
        borderRadius: 38,
        borderWidth: 1
    },
    description: {
        paddingBottom: 28
    },
    text: {
        fontSize: 16,
        marginTop: 12
    },
    itemToDelete: {
        fontSize: 17,
        fontWeight: 'bold'
    }
});
  