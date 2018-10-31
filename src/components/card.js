import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export class Card extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Text>nerro Foo 2018</Text>
          <Text>Hyderabad</Text>
        </View>
      );
    }
  }
  


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    }
  });
  
  
  