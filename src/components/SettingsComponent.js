import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    SectionList,
    ScrollView,
    Switch,
    Image,
    Platform,
    Linking
} from "react-native";
import Colors from "../constants/Colors";
import { MonoText } from '../components/StyledText';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomListStyle, { CustomListItemSyle } from "../styles/CustomListStyle";
import { Storage } from '../classes/Storage';
import Genders from "../constants/Genders";
import AboutUsScreen from "../screens/AboutUsScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import IllustrationScreen from "../screens/IllustrationScreen";

class SettingsComponent extends Component {
    constructor (props) {
        super();
        this.state = {
          displayedPage: null, 
            settingsValues: {
              voiceGender: Genders.female,
              useWithSiri: true, 
              helpImproveApp: true, 
            },
            title: 'الإعدادات',  
        };
        this.initSettings();
    }

    render() {
      const items=  [{
        right: {
          imgSrc: require('../../assets/images/settings/volumn.png'),
          label: 'صوت المتحدث'
        },
        left: {
          //   field: {
          type: 'radio',
          options: [Genders.male, Genders.female],
          variableName: 'voiceGender'
          //   }
        }
      },
      // {
      //   platform: 'ios',
      //   right: {
      //     imgSrc: require('../../assets/images/settings/seri.png'),
      //     label: 'إستخدام التطبيق مع سيري'            
      //   },
      //   left: {
      //     type: 'switch',
      //     variableName: 'useWithSiri'
      //   }
      // },
    
    
      // {
      //   right: {
      //     imgSrc: require('../../assets/images/settings/allow-copy.png'),
      //     label: 'مساهمة نسخ معلومات التطبيق'
      //   },
      //   left: {
      //     type: 'switch',
      //     variableName: 'helpImproveApp'
      //   }
      // },         
      {
        
        navigateTo:{
          componentHtml:   <AboutUsScreen onBackClicked={ () => {
            this.setState({
              displayedPage: null, 
            }) 
          }}> </AboutUsScreen>,
          componentName: 'about'
        } ,
        right: {
          imgSrc: require('../../assets/images/settings/about-app.png'),
          label: 'حول التطبيق'
        }
      },
      {
        navigateTo:{
          componentHtml:   <ContactUsScreen onBackClicked={ () => {
            this.setState({
              displayedPage: null, 
            }) 
          }}> </ContactUsScreen>,
          componentName: 'contact'
        } ,
        right: {
          imgSrc: require('../../assets/images/settings/contact-us.png'),
          label: 'تواصل معنا'
        }
      },   // may i say something without taking it the wrong way? with all my respect I dont think its appropiot to send things like this. from my side i'll forget it anything said before and I hope you do the same way.
      // {
      //   platform: 'ios',
      //   right: {
      //     imgSrc: require('../../assets/images/settings/mic.png'),
      //     label: 'شرح تفعيل سيري'
      //   }
      // },
      {
        navigateTo: {
          componentHtml:   <IllustrationScreen onBackClicked={ () => {
            this.setState({
              displayedPage: null, 
            }) 
          }}> </IllustrationScreen>,
          componentName: 'illustration'
        } ,
        right: {
          imgSrc: require('../../assets/images/settings/demo.png'),
          label: 'شرح استخدام التطبيق'
        }
      },
    ]
        return (
        <View  style={styles.container}>
        <View >   
        {/* <View style={styles.drawerHeader} >  */}
            <TouchableOpacity  style={styles.closeDrawerIcon} onPress={ () => {
              this.props.navigation.closeDrawer();
            }}> 
             <Icon name="arrow-right" size={26} color="#9d9d9d"/> 
             </TouchableOpacity>
             <MonoText style={styles.drawerTitle}> {this.state.title}</MonoText>
        {/* </View> */}
        <ScrollView> 
        <SectionList
          sections={[{ data: items}]}
          renderItem={({ item, index }) => {
           return item.platform !== undefined && (item.platform !== Platform.OS) ? null : 
          <TouchableOpacity activeOpacity= {item.onPress ? 0.5 : 1} 
          onPress = {item.navigateTo ? ()=> {this.setState({displayedPage: item.navigateTo.componentName})} : null }
          key={index} style={styles.list}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1}}> 
               <Image source = {item.right.imgSrc} style={styles.itemIcon}/>
               <MonoText style={[ styles.itemLabel, styles.smallFontSize]} > {item.right.label}</MonoText>      
            </View>
            { (item.navigateTo && this.state.displayedPage === item.navigateTo.componentName) ? item.navigateTo.componentHtml : null}
              { 
              item.left  ?
              (item.left.type === 'switch' ? 
              <Switch style={styles.switch} onTintColor = {Colors.brand}
              value={this.state.settingsValues[item.left.variableName]}
              onValueChange= {(value) => { this.updateSettings(item.left.variableName, value);}} /> 
              : <View style={{display: 'flex', flexDirection: 'row'}}>
                {
              item.left.options.map((option, index) => {
                return(
                <TouchableOpacity style={{display: 'flex', flexDirection: 'row', alignItems: 'center',
                  marginLeft: index !== 0 ? 20: 0
              }} onPress= {() => {
                  // this.setState({[item.left.variableName]: option});
                  this.updateSettings(item.left.variableName, option);
                }}>
              <Icon name={this.state.settingsValues[item.left.variableName] === option ? 'dot-circle-o' : 'circle'} 
              size={28}
              style={ //  [{ borderRadius: 14, fontSize: 28, height: 28, width:28 },
              (this.state.settingsValues[item.left.variableName] === option) ? 
              {color: Colors.brand } : //  borderWidth: 1, borderColor: Colors.brand
              { color: 'white'} //  borderWidth: 1, borderColor: Colors.borderColor 
              }/> 
                <MonoText style={styles.smallFontSize}> {option} </MonoText>
                </TouchableOpacity> 
                )
              })
                }
                </View>
              ) :
              <Icon style={styles.itemArrowIcon}  name="chevron-left" />
            }
          <MonoText style={styles.smallFontSize}>{this.state.value} </MonoText>
          </TouchableOpacity>}            
          }
        />
         </ScrollView>
         </View>
         <TouchableOpacity style={styles.logo}   onPress={() => Linking.openURL('http://appsbunches.com')}> 
           <Image style={{width: 166, height: 46}} source = {require('../../assets/images/3na8ed_logo.png')}/>
         </TouchableOpacity>

         </View>
        );
    }

  initSettings = ()  => {
    const storageInstance = Storage.getInstance(); // temp 
    const updatedSettings = {value: 'null'};
    storageInstance.getItem('settingsValues', updatedSettings).then(res => {
      if(updatedSettings.value) {
        this.setState({
          settingsValues: updatedSettings.value,
        });
      } else {
        storageInstance.setItem('settingsValues', this.state.settingsValues);
      }
    })
  }
    updateSettings = (propertyToUpdate, newValue) => {
      const updatedSettings = this.state.settingsValues;
      updatedSettings[propertyToUpdate] = newValue
      this.setState({settingsValues: updatedSettings});
        const storageInstance = Storage.getInstance();
          storageInstance.setItem('settingsValues', updatedSettings).then(res => {
          });
      };
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
      marginVertical: 40,
    },
    drawerHeader: {

    },
    closeDrawerIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#f2f2f2', 
        borderRadius: 16,
        marginTop: 34,
        marginBottom: 14,
        marginRight: 18,
        marginLeft: 'auto',
        display: 'flex',  
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerTitle : {
        // textAlign: 'right',
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
      marginRight: 18
    },
    switch: {
      // transform:  [{ rotate: '180deg'}],
      // backgroundColor: Colors.brand,
      borderRadius: 17
    },
    smallFontSize: {
      fontSize: 15,
    }
  
});
  