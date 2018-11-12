


import React from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { MonoText } from '../components/StyledText';
import CustomHeader from '../components/CustomHeader';
import Colors from '../constants/Colors';
import CustomListStyle, { CustomListItemSyle } from '../styles/CustomListStyle';

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
          centerComponent= {<CustomHeader navigation = {this.props.navigation} title="Home" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />}
          rightComponent={{ icon: 'home', color: '#fff' }}
         /> */}
         <CustomHeader navigation = {this.props.navigation} title={this.state.title} onBackClicked= { () => this.props.navigation.goBack()}/>
         {/* <Header centerComponent = {{ text: 'MY nerro', style: { color: '#fff' } }} />  */}
        {/* <ScrollView style={styles.container} > */}
        <SectionList
          sections={[{ data: this.state.iconsLibraries}]}
          renderItem={({ item, index }) => 
          <TouchableOpacity key={index}
          style={styles.library} onPress= { () => this.props.navigation.navigate('IconsScreen', {
            libraryName: item
          })}
          >
          <Icon style={styles.itemIcon}  name="chevron-left" /> 

          <MonoText  style={styles.itemLabel}> {item}           </MonoText>        
          </TouchableOpacity>}
          // renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section}</Text>}
          // keyExtractor={(library, index) => index}
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
  library: CustomListStyle,
  ...CustomListItemSyle
});


