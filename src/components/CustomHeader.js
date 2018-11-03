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
            <View style={styles.iconsWrapper}>
               <Icon.Ionicons
                name="md-menu"
                        size={32}
                    //    style={{ textAlign: 'right' }}
                       color="white"
                  onPress={() => this.props.drawerOpen()} />  
         
                      
                  {/* <Icon.Ionicons
                name="circle-with-plus"
                        size={32}
                       style={{ textAlign: 'right' }}
                       color="white" />   */}
                       <Text onPress={() => this.props.navigation.navigate('NewCategory')}     
                       style={styles.addIcon}> + </Text>
                                 <Icon.Ionicons
                name="md-checkmark-circle"
                        size={32}
                    //    style={{ textAlign: 'right' }}
                       color="white"/>  
               
            </View>
            <View  />
            {/* style={{ flex: 0.5}} */}
            <Text  style={styles.title}>{this.props.title}</Text>
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
    title : {
        textAlign: 'right',
        color: Colors.primary,
        fontSize: 30,
        marginRight: 13
      },
iconsWrapper: {
      marginTop: 36,
      marginBottom: 24,
      marginRight: 17,
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    addIcon: {
        color: Colors.brand,
        fontSize: 20,
        backgroundColor: Colors.primary,
        width: 24,
        height: 24,
        borderRadius:12,
    }
});
  