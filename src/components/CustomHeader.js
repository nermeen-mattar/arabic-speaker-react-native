import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
// import { Icon } from 'expo';
import Colors from "../constants/Colors";
import { MonoText } from '../components/StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';

class CustomHeader extends Component {
    constructor (props) {
        super();
      }
    
    render() {
        return (
            <View style={styles.container}> 
            <View style={styles.iconsWrapper}>
            
            <View style={styles.tools}>
            {/* didn't work <Icon.Ionicons name="circle-with-plus" size={28}  style={{ textAlign: 'right' }} color="white" />   */}
          
            {
                this.props.onNewClicked ?  <TouchableOpacity activeOpacity = { .5 }  onPress = {this.props.onNewClicked}>
            <Icon style={styles.addIcon}  name="plus-circle" size={28}  color="white"/> 
            {/* <Image style={styles.addIcon} source={require( '../../assets/images/icons/plus.png')} />      */}
            </TouchableOpacity>   : null
            }

            {
                this.props.onSelectClicked ? 
                <TouchableOpacity activeOpacity = { .5 }  onPress = {this.props.onSelectClicked}>
                <Icon style={styles.addIcon}  name="check-circle" size={28}  color="white"/>  
                {/* <Image  source={require( '../../assets/images/icons/checkmark-circle.png')} /> */}
                </TouchableOpacity>: null
            }
         

            </View>
            {
                this.props.onBackClicked ? 
                <TouchableOpacity  style={styles.backWrapper} onPress={() =>  this.props.navigation.goBack()} > 
                    <MonoText  style={styles.smallText}> للخلف </MonoText> 
                <Icon name="chevron-right" size={28} color="white" />
                </TouchableOpacity> :
                <Icon name="bars" size={28} color="white" onPress={() => this.props.navigation.openDrawer()} />  
            }
            {/* <Image source= {require( '../../assets/images/icons/menu.png')}/> */}
    

            </View>
            <View  />

                 { this.props.title ?  <MonoText  style={styles.title}>{this.props.title}</MonoText> : null}

            {/* style={{ flex: 0.5}} */}
          </View>
            // <Header style={styles.header}
            // rightComponent={
            //     <View>
            //   <Icon.Ionicons
            //     name="md-menu"
            //             size={28}
            //            style={{ marginBottom: -3 }}
            //            color="white"
            //         //    onPress={() => this.props.drawerOpen()}
            //          />            
            //          <UniversalText>{this.props.title}</UniversalText>
            //          </View>
            //          }>
                
                      
            //         {/* <Ionicons name="md-checkmark-circle" size={28} color="green
            //     " onPress={() => this.props.drawerOpen()} /> */}
         
            // </Header>
        );
    }
}
export default CustomHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.brand,
        height: 116
    },
    title : {
        textAlign: 'right',
        color: Colors.primary,
        fontSize: 30,
        marginRight: 13
      },
iconsWrapper: {
      marginTop: 36,
      marginBottom: 12,
      marginRight: 17,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    tools: {
        flexDirection: 'row',  
    },
    addIcon: {
        marginLeft: 18,
        marginRight: 30
    },
    backWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    smallText: {
        fontSize: 17,
        color: 'white'
    }
});
  