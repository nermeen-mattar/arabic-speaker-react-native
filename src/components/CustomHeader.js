import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Header } from 'react-native-elements';
// import { Icon } from 'react-native-elements'
import { Icon } from 'expo';
import Colors from "../constants/Colors";
import UniversalText from './UniversalText';

class CustomHeader extends Component {
    render() {
        return (
            <View
            style={{
            //   flexDirection: 'row',
              height: 116,
              textAlign: 'right',
              backgroundColor: Colors.brand
            //   padding: 20,
            }}>
            <View style={{ flex: 0.3}} />
            <View style={{ flex: 0.5}} />
            <Text  style={{
              textAlign: 'right',
              color: Colors.primary,
            }}>{this.props.title}</Text>
          </View>
            // <Header style={styles.header}
            // rightComponent={
            //     <View>
            //   <Icon.Ionicons
            //     name="md-menu"
            //             size={26}
            //            style={{ marginBottom: -3 }}
            //            color="white"
            //         //    onPress={() => this.props.drawerOpen()}
            //          />            
            //          <UniversalText>{this.props.title}</UniversalText>
            //          </View>
            //          }>
                
                      
            //         {/* <Ionicons name="md-checkmark-circle" size={32} color="green
            //     " onPress={() => this.props.drawerOpen()} /> */}
         
            // </Header>
        );
    }
}
export default CustomHeader;

const styles = StyleSheet.create({
    header: { 
        display: 'none',
        backgroundColor: Colors.appBackground 
    },
    cardsContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
      // display: 'flex',
      backgroundColor: 'blue',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
});
  