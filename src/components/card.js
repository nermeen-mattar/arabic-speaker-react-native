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

        cardInfo: props.cardInfo
    };
  }



  
    render() {
      const isCardSelectable = this.props.selectMode && this.props.cardInfo.selectable
      const isCardSelected = isCardSelectable && this.props.cardInfo.selected;
      return (
        <View style={[styles.container, commonStyles.shadow, {backgroundColor: isCardSelected ? Colors.brand: Colors.primary} ]} >
          {/* <CheckBox
          checked={this.state.checked}
        /> */}
          {/* <View  style={styles.selectIconWrapper} > */}
          { 
            isCardSelectable ? 
              (isCardSelected ? 
              <Icon style={[styles.selectIcon, styles.topRightIcon]}name="check-circle" size={24} /> : 
              <Icon style={[styles.unselectIcon, styles.topRightIcon]}  name="circle-thin" size={24} /> ) : null
          }
           {/* <Icon  style={styles.unSelectIcon} name="circle-thin" size={30} /> */}

           {/* or check-square-o */}
            {/* </View> */}
            <View> 


          {
           this.props.cardInfo.imgSrc ?   <Image style={[styles.cardImg, {width: 60, height: 60 }]} source={ this.props.cardInfo.imgSrc} /> : null
          }

         {/* <Image style={styles.cardImg} source={this.props.cardInfo.imgSrc} /> */}

          <MonoText style={[styles.cardLabel, {color: isCardSelected ?  Colors.primary: 'black'}]}>{this.state.cardInfo.label}</MonoText>
  
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
      // backgroundColor: Colors.primary,
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
    topRightIcon: {
      position:'absolute',
      right:0,
      top: 0
    },
    selectIcon: {
      // width:16,
      // height: 16,
      color: Colors.primary
    },
    unselectIcon: {
      color:'#D0D0D0'
    }
  });
  
  
  

// Card.propTypes = {
//   name: React.PropTypes.string,
//   initialAge: React.PropTypes.number
// };