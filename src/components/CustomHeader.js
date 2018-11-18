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
            <Icon style={styles.icon}  name="plus-circle" size={28}  color="white"/> 
            {/* <Image style={styles.icon} source={require( '../../assets/images/icons/plus.png')} />      */}
            </TouchableOpacity>   : null
            }

            {
                this.props.onSecondNewClicked ?  <TouchableOpacity activeOpacity = { .5 }  onPress = {this.props.onSecondNewClicked}>
            <Icon style={styles.icon}  name="plus-square" size={28}  color="white"/> 
            {/* <Image style={styles.icon} source={require( '../../assets/images/icons/plus.png')} />      */}
            </TouchableOpacity>   : null
            }

            {
                this.props.onSelectClicked ? 
                <TouchableOpacity activeOpacity = { .5 }  onPress = {this.props.onSelectClicked}>
                <Icon style={styles.icon}  name="check-circle" size={28}  color="white"/>  
                {/* <Image  source={require( '../../assets/images/icons/checkmark-circle.png')} /> */}
                </TouchableOpacity>: null
            }
         

            </View>
            {
                this.props.onBackClicked ? 
                <TouchableOpacity  style={styles.backWrapper} onPress={ this.props.onBackClicked} > 
                    <MonoText  style={styles.smallText}> للخلف </MonoText> 
                <Icon name="chevron-right" size={28} color="white" />
                </TouchableOpacity> :
                <Icon name="bars" size={28} color="white" onPress={() => this.props.navigation.openDrawer()} />  
            }
            {/* <Image source= {require( '../../assets/images/icons/menu.png')}/> */}
    

            </View>
            <View  />

                 { this.props.title ? 
                 
          <View style={styles.titleSectionsWrapper}>
          {
            this.props.title.map((titleSection, index) => {
              return(
                  <View style={{flexDirection: 'row-reverse'}}>
                  {/* , alignItems: 'center' to fix arrow */}
                      <TouchableOpacity
                      activeOpacity = {   this.props.onTitleSectionClicked ? 0.2 : 1}
                  onPress={
                    //   () =>  this.props.navigation.navigate( {
                    //   routeName: 'CategoriesScreen',
                    //   params: {
                    //       categoryPath: this.props.title.slice(0, index + 1)
                    //   },
                    //   key: 'CategoriesScreen' + index })
                        this.props.onTitleSectionClicked ? ()=> {this.props.onTitleSectionClicked(index)} : null
                      } >
              <MonoText style={styles.title}>
                {titleSection}
                </MonoText>
                </TouchableOpacity>
                {this.props.title[ index + 1 ] ? <Icon  name="angle-left" style = {styles.titleArrow}/> 

                : null}

             </View>
               )})}
            </View>
            
            : null}

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
        // height: 116
    },
    titleSectionsWrapper: {
        flexDirection: 'row-reverse',
         justifyContent: 'flex-start',
        //  marginRight: 13
        marginLeft: 13 // everything is the opposite
    },
    title : {
        height: 47,
        // textAlign: 'right', replaces with row-reverse and flex-start
        color: Colors.primary,
        fontSize: 30
      },
      titleArrow: {
        color: 'white',
        fontSize: 24,
        margin: 6
      },
iconsWrapper: {
    height: 69,
      paddingTop: 31,
      paddingBottom: 12,
        marginHorizontal: 18,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    tools: {
        flexDirection: 'row',  
    },
    icon: {
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
  