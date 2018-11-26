import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
// import { Icon } from 'expo';
import Colors from "../constants/Colors";
import { MonoText } from '../components/StyledText';
// import Icon from 'react-native-vector-icons/FontAwesome';

class FormHeader extends Component {
    constructor (props) {
        super();
    }
    render() {
        return (
        <View style={styles.container}> 
            <View style={styles.actionsWrapper}>   
            <TouchableOpacity activeOpacity = { .5 }  onPress = {this.props.onSaveClicked}>
            <MonoText style={styles.action}>حفظ</MonoText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity = { .5 }  onPress = {this.props.onCancelClicked}>
            <MonoText style={styles.action}>إلغاء</MonoText>      
            </TouchableOpacity>   
            </View>
            <MonoText  style={styles.title}>{this.props.title}</MonoText>
         </View>
        );
    }
}
export default FormHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.brand,
        height: 116
    },
    title : {
        color: Colors.primary,
        fontSize: 30,
        marginLeft: 13
      },
    actionsWrapper: {
      marginTop: 36,
      marginBottom: 12,
    //   marginRight: 17,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    action: {
        color: Colors.primary,
        marginHorizontal: 14,
        fontSize: 17
    }
});
  