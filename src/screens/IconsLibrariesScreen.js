


import React from 'react';
import {
  StyleSheet,
  View,
  SectionList

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { MonoText } from '../components/StyledText';
import CustomHeader from '../components/CustomHeader';
import Colors from '../constants/Colors';

export default class IconsLibrariesScreen extends React.Component {

  constructor() {
    super();
    this.state = {
                title: "مكتبة الأيقونات",
                iconsLibraries:     [
                    'أيقونات الناس',
                    'أيقونات الحيوانات',
                    'أيقونات المدارس'
                ],
                enableBack: true
              };
  }
  static navigationOptions = {
    header: null
  };
  
  render() {

    return (
      <View style={styles.container}>
        {/* <Header
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent= {<CustomHeader title="Home" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />}
          rightComponent={{ icon: 'home', color: '#fff' }}
         /> */}
         <CustomHeader title={this.state.title} onBackClicked= { () => this.props.navigation.goBack()}/>
         {/* <Header centerComponent = {{ text: 'MY nerro', style: { color: '#fff' } }} />  */}
        {/* <ScrollView style={styles.container} > */}
        <SectionList
          sections={[{ data: this.state.iconsLibraries}]}
          renderItem={({ item, index, section }) => 
          <View key={index}
          style={styles.library}
          >
          <Icon style={styles.navigateIcon}  name="chevron-left" /> 

          <MonoText  style={styles.libraryName}> {item}           </MonoText>        
          </View>}
          // renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section}</Text>}
          // keyExtractor={(item, index) => index}
        />
            <MonoText>{this.state.test}</MonoText>

        {/* </ScrollView> */}
      </View>
    );
  }

  iconsLibraryClicked(index) {
      this.props.navigation.navigate('iconsLibrary', {
        iconsLibraryName: this.state.iconsLibraries[index]
      });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
  library: {
    height: 44,
    paddingRight: 16,
    paddingLeft: 16,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 0.25,
    borderColor: Colors.borderColor
  },
  libraryName: {
    fontSize: 17
  },
  navigateIcon: {
    color: Colors.iconsColor,
    fontSize: 15
  }
});


