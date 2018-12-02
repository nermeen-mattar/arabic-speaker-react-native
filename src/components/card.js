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
import fonts from '../constants/fonts';

export class Card extends React.Component {
  constructor (props) {
    super();
    this.state = {

        cardInfo: props.cardInfo
    };
  }



  
    render() {
      const isCardSelectable = this.props.selectMode && !this.props.cardInfo.default
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
            <View  style={{flexDirection: 'column', alignItems: 'center'}} > 


          {
            // {width: 77, height: 55 }
            this.props.cardInfo.imgSrc ?   <Image style={styles.cardImg} source={ this.props.cardInfo.imgSrc} /> : null
          }

         {/* <Image style={styles.cardImg} source={this.props.cardInfo.imgSrc} /> */}

          <MonoText fontFamily={fonts.tajawal} style={[styles.cardLabel, {fontSize: this.props.fontSize}, {color: isCardSelected ?  Colors.primary: 'black'}]}>{this.state.cardInfo.label}</MonoText>
  
        </View>

        </View>
      );
    }

  }


  const styles = StyleSheet.create({
    container: {
      ...commonStyles.center,
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
      marginBottom: 14,
      minWidth: 42, 
      minHeight: 42 
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
      left:7, // was right before ar
      top: 7
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