import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    SectionList,
    ScrollView,
    Switch,
    Image,
    Platform
} from "react-native";
import Colors from "../constants/Colors";
import { MonoText } from '../components/StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomListStyle, { CustomListItemSyle } from "../styles/CustomListStyle";

class SettingsComponent extends Component {
    constructor (props) {
        super();
        this.state = {
          checked: true,
          voiceGender: 'إمرأة',
            title: 'الإعدادات',
            items: [{
                right: {
                  imgSrc: require('../../assets/images/settings/volumn.png'),
                  label: 'صوت المتحدث'
                },
                left: {
                  //   field: {
                  type: 'radio',
                  options: ['إمرأة',  'رجل'],
                  groupName: 'voiceGender'
                  //   }
                }
              },
              {
                platform: 'ios',
                right: {
                  imgSrc: require('../../assets/images/settings/seri.png'),
                  label: 'إستخدام التطبيق مع سيري'            
                },
                left: {
                  //   field: {
                  type: 'switch'
                  //   }
                }
              },
            
            
              {
                right: {
                  imgSrc: require('../../assets/images/settings/allow-copy.png'),
                  label: 'مساهمة نسخ معلومات التطبيق'
                },
                left: {
                  //   field: {
                  type: 'switch'
                  //   }
                }
              },         
              {
                right: {
                  imgSrc: require('../../assets/images/settings/about-app.png'),
                  label: 'حول التطبيق'
                }
              },
              {
                right: {
                  imgSrc: require('../../assets/images/settings/contact-us.png'),
                  label: 'تواصل معنا'
                }
              },
              {
                platform: 'ios',
                right: {
                  imgSrc: require('../../assets/images/settings/mic.png'),
                  label: 'شرح تفعيل سيري'
                }
              },
              {
                right: {
                  imgSrc: require('../../assets/images/settings/demo.png'),
                  label: 'شرح استخدام التطبيق'
                }
              },
            ]
        };
    }

    getChecked = ()=> {};
    render() {
        return (
        <View  style={styles.container}>
        <View >
        <View style={styles.drawerHeader} > 
            <TouchableOpacity  style={styles.closeDrawerIcon} onPress={ () => {
              this.props.navigation.closeDrawer();
            }}> 
             <Icon name="arrow-right" size={26} color="#9d9d9d"/> 
             </TouchableOpacity>
             <MonoText style={styles.drawerTitle}> {this.state.title}</MonoText>
        </View>

        <ScrollView> 
        <SectionList
          sections={[{ data: this.state.items}]}
          renderItem={({ item, index }) => {
           return item.platform !== undefined && (item.platform !== Platform.OS) ? null : 
          <View key={index} style={styles.list}>
          { 
            item.left  ? 
            (item.left.type === 'switch' ? <Switch style={styles.switch}
            //  thumbColor= {Colors.brand}
             /> : 
            <View style={{display: 'flex', flexDirection: 'row'}}>
               {
            item.left.options.map((option, index) => {
              return(
              <TouchableOpacity style={{display: 'flex', flexDirection: 'row', alignItems: 'center',
                marginLeft: index !== 0 ? 20: 0
            }} onPress= {() => {
                this.setState({[item.left.groupName]: option})
              }}>
              <MonoText style={styles.smallFontSize}> {option} </MonoText>
            <Icon name={this.state[item.left.groupName] === option ? 'dot-circle-o' : 'circle'} 
            size={28}
            style={ //  [{ borderRadius: 14, fontSize: 28, height: 28, width:28 },
            (this.state[item.left.groupName] === option) ? 
            {color: Colors.brand } : //  borderWidth: 1, borderColor: Colors.brand
            { color: 'white'} //  borderWidth: 1, borderColor: Colors.borderColor 
            }/> 
              </TouchableOpacity> 
              )
            })
              }
               </View>
            ) :
            <Icon style={styles.itemArrowIcon}  name="chevron-left" />
          }
          <MonoText style={styles.smallFontSize}>{this.state.value} </MonoText>

        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}> 
        <MonoText style={[ styles.itemLabel, styles.smallFontSize]} > {item.right.label}</MonoText>      
          <Image source = {item.right.imgSrc} style={styles.itemIcon}/>
        </View>
          </View>}

            
          }
        />


         </ScrollView>
         </View>
         <View style={styles.logo}> 
           <Image source = {require('../../assets/images/logo.png')}/>
         </View>

         </View>
        );
    }
}
export default SettingsComponent;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    content: {

    },
    logo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 24,
    },
    drawerHeader: {

    },
    closeDrawerIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#f2f2f2', 
        borderRadius: 16,
        marginTop: 20,
        marginBottom: 14,
        marginLeft: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerTitle : {
        textAlign: 'right',
        fontSize: 30,
        marginRight: 13,
        marginBottom: 18
      },
    list: {
     ...CustomListStyle,
     backgroundColor:  '#F7F7F7',
     borderColor: 'white'
        },
    ...CustomListItemSyle,
    itemIcon: {
      marginLeft: 18
    },
    switch: {
      color: 'red',
      transform:  [{ rotate: '180deg'}]
    },
    smallFontSize: {
      fontSize: 15,
    }
  
});
  