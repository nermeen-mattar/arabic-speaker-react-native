import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Header, colors } from 'react-native-elements';
// import { Icon } from 'react-native-elements'
import { Icon } from 'expo';
import Colors from "../constants/Colors";
import { MonoText } from '../components/StyledText';

class CustomHeader extends Component {
    render() {
        return (
            <View
            style={{
            //   flexDirection: 'row',
            //   height: 116,
              backgroundColor: Colors.brand
            }}> 
            <View  style={{
                marginTop: 36,
                marginBottom: 24,
                marginRight: 17
            }}>
               <Icon.Ionicons
                name="md-menu"
                        size={32}
                       style={{ textAlign: 'right' }}
                       color="white"
                  onPress={() => this.props.drawerOpen()} />  
            </View>
            <View style={{ flex: 0.5}} />
            <Text  style={{
              textAlign: 'right',
              color: Colors.primary,
              fontSize: 30,
              marginRight: 13
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
  