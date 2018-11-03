


import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import FormHeader from '../components/FormHeader';
import Colors from '../constants/Colors';
import { Icon } from 'expo';

export default class NewCategoryScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "اضافة تصنيف جديد",
            cardInfo: { label: 'ارفق صورة', imgSrc:  require('../../assets/images/categories/chat.png')},
           inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد"
        };
    }
  static navigationOptions = {
    header: null
  };
 
  render() {
    return (
      <View>
    <FormHeader title= {this.state.title}/>
         <View  style={styles.inputsWrapper}> 
        <View style={styles.card} >
        <Icon.Ionicons
                name="md-camera"
                        size={32}
                       style={styles.cardIcon}
                    //    color="white"
                       />  
            <MonoText style={styles.cardLabel}>{this.state.cardInfo.label}</MonoText>
        </View>

            <TextInput  style={styles.textInput}
        onChangeText={(text) => this.setState({text})}
        placeholder= {this.state.inputPlaceholder}  multiline = {true} />
        </View>
           
      </View>
    );
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
    color: Colors.textSecondary,
    fontSize: 38,
    marginTop: 12 // 17 didn't work
    // marginBottom: 13
  } ,
  cardLabel: {
      color: Colors.textSecondary,
      fontSize: 11,
      marginTop: 8 //  14 didn't work 
  }

});


