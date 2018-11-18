import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Spacings from '../constants/Spacings';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../styles/commonStyles';

export class Card extends React.Component {
  constructor (props) {
    super();
    this.state = {
        // age: props.initialAge,
        // status: 0
        cardInfo: props.cardInfo
    };
  }

  onMakeOlder() {
    this.setState({
        age: this.state.age + 3
    });
}


  
    render() {
      return (
        <View style={[styles.container, commonStyles.shadow]} >
          {/* <CheckBox
          checked={this.state.checked}
        /> */}
          {/* <View  style={styles.selectIconWrapper} > */}
          { 
            this.props.selectMode && this.props.cardInfo.selectable ? <Icon
                style={styles.selectIcon} name={this.props.cardInfo.selected ? "check-circle": "circle-thin"} size={30} /> : null
          }
           {/* <Icon  style={styles.unSelectIcon} name="circle-thin" size={30} /> */}

           {/* or check-square-o */}
            {/* </View> */}
            <View> 


          {
           this.props.cardInfo.imgSrc ?   <Image style={styles.cardImg} source={this.props.cardInfo.imgSrc} /> : null
          }

         {/* <Image style={styles.cardImg} source={this.props.cardInfo.imgSrc} /> */}

          {/* <Text>{this.props.name}</Text> */}
          <MonoText style={styles.cardLabel}>{this.state.cardInfo.label}</MonoText>
          {/* <Button   onPress={() => {
       this.setState({
        age: this.state.age + 5 });
        }}> Click me</Button> */}
            </View>

        </View>
      );
    }

  }


  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: Spacings.cardWidth,
      height: Spacings.cardHeight,
      backgroundColor: Colors.primary,
      marginHorizontal: 4.5,
      marginVertical: 3.5,
      borderRadius: 10 /* **N** */
      // marginBottom: 4,
    },

    cardImg: {
      marginTop: 24,
      marginBottom: 14 
    },
    cardLabel: {
      fontWeight: 'bold',
      textAlign: 'center'
    },
    // selectIconWrapper: {
    //   display: 'flex',
    //   justifyContent: 'flex-end',
    //   textAlign: 'right',
    // },
    selectIcon: {
      // width:16,
      // height: 16,
      position:'absolute',
      top: 0,
      right:0,
      fontSize: 25,
      color: Colors.brand
    }
  });
  
  
  

// Card.propTypes = {
//   name: React.PropTypes.string,
//   initialAge: React.PropTypes.number
// };