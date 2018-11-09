import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
// import { CheckBox } from 'react-native-elements'

import Spacings from '../constants/Spacings';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <View style={styles.container} >
          {/* <CheckBox
          checked={this.state.checked}
        /> */}
        <Icon name="rocket" size={30} color="#900" />

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
      );
    }
  }
  


  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      display: 'flex',
      // flexDirection: 'column',
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
      marginTop: 24
    },
    cardLabel: {
      marginTop: 14,
      fontWeight: 'bold'
    }
  });
  
  
  

// Card.propTypes = {
//   name: React.PropTypes.string,
//   initialAge: React.PropTypes.number
// };