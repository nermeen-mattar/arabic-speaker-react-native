


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

  constructor(props) {
    super();
    this.state = {
                title:["مكتبة الأيقونات"] ,
                iconsLibraries:    [
                  'أيقونات الناس',
                  'أيقونات الحيوانات',
                  'أيقونات المدارس',
                  'أيقونات الملابس',
                  'أيقونات الأماكن'
              ],
                librariesToDisplay:   [
                  'أيقونات الناس',
                  'أيقونات الحيوانات',
                  'أيقونات المدارس',
                  'أيقونات الملابس',
                  'أيقونات الأماكن'
              ],
                enableBack: true,
                categoryPath: props.navigation.getParam('categoryPath'),
                srcScreen: props.navigation.getParam('srcScreen'),

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
         <CustomHeader isSearchable={true}
          filterContent= { searchText => this.filterContent(searchText) }
         navigation = {this.props.navigation} title={this.state.title} onBackClicked= { () => this.props.navigation.goBack()}/>
         {/* <Header centerComponent = {{ text: 'MY nerro', style: { color: '#fff' } }} />  */}
        {/* <ScrollView style={styles.container} > */}
        <SectionList
          sections={[{ data: this.state.librariesToDisplay}]}
          renderItem={({ item, index }) => 
          <TouchableOpacity key={index}
          style={styles.library} onPress= { () => this.props.navigation.navigate('IconsScreen', {
            libraryName: item,
            categoryPath: this.state.categoryPath,
            srcScreen: this.state.srcScreen

          })}
          >
          <MonoText  style={styles.itemLabel}> {item}           </MonoText>        

          <Icon style={styles.itemArrowIcon}  name="chevron-left" /> 

          </TouchableOpacity>}
          // renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section}</Text>}
          // keyExtractor={(library, index) => index}
        />
            <MonoText>{this.state.test}</MonoText>

        {/* </ScrollView> */}
      </View>
    );
  }

  // iconsLibraryClicked(index) {
  //     this.props.navigation.navigate('iconsLibrary', {
  //       iconsLibraryName: this.state.iconsLibraries[index]
  //     });
  // }

  filterContent(searchText) {
    // const librariesToDisplay = Object.assign([], this.state.iconsLibraries);
    this.setState({
      librariesToDisplay: 
      this.state.iconsLibraries.filter(iconsLibrary => iconsLibrary.includes(searchText.trim()))
    })
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


