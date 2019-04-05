import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Dimensions
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
          { 
            isCardSelectable ? 
            (isCardSelected ? 
              <Icon style={[styles.selectIcon, styles.topRightIcon]}name="check-circle" size={24} /> : 
              <Icon style={[styles.unselectIcon, styles.topRightIcon]}  name="circle-thin" size={24} /> ) : null
          }
           {/* <Icon  style={styles.unSelectIcon} name="circle-thin" size={30} /> */}

           {/* or check-square-o */}

                          {/*  was justify-content-center and there was no height 100%*/}
            <View  style={{  height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}} > 


          {
            // {width: 77, height: 55 }
            this.props.cardInfo.imgSrc ?   <Image style={[styles.cardImg,
              this.props.cardInfo.default ? {  minWidth: 42, minHeight: 42} : {minWidth: 90, minHeight: 58}
            ]} source={ this.props.cardInfo.imgSrc} /> : null
          }

         {/* <Image style={styles.cardImg} source={this.props.cardInfo.imgSrc} /> */}

         <MonoText fontFamily={fonts.tajawal}  numberOfLines={this.props.cardInfo.imgSrc ? 2 : 5} style={[styles.cardLabel, {color: isCardSelected ?  Colors.primary: 'black'}]}>{this.state.cardInfo.label}</MonoText>
        </View>

        </View>
      );
    }

  }

  const cardSize = Platform.isPad ? Dimensions.get('window').width / 4.5 : Spacings.size;
  const styles = StyleSheet.create({
    container: {
      ...commonStyles.flexCenter,
      alignItems: 'center',
      width: cardSize,
      height: cardSize,
      // backgroundColor: Colors.primary,
      marginHorizontal: cardSize/30, // 4.5
      marginVertical: cardSize/30, // 3.5
      borderRadius: 10 /* **N** */
      // marginBottom: 4,
    },
    cardImg: {
      // marginTop: 24,
      flex:1,
      maxWidth: '100%', // 70
      maxHeight: '100%', // 66
      resizeMode: 'stretch'
    },
    cardLabel: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
      // fontSize: this.props.fontSize
    },
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