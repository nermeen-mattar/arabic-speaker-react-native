import React from 'react';
import {Platform, StyleSheet, StatusBar, View, ActivityIndicator} from 'react-native';
import { createDrawerNavigator} from 'react-navigation'

import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/constants/Colors';
import SettingsComponent from './src/components/SettingsComponent'

const SettingsDrawer = createDrawerNavigator({
  AppNavigator: {
    screen: AppNavigator
  },
},
  {
    drawerWidth: 310,
    // drawerPosition: 'right',
    contentComponent: SettingsComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    // navigationOptions: {
    //   header: 'none'
    // }
  });

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

 /* constructor(props) {
    super(props);
    this.state = {isShowingText: true};

    // Toggle the state every second
    setTimeout(() => {
      this.setState(previousState => {
        return { isShowingText: !previousState.isShowingText };
      });
    }, 5000);
    //  Tts.voices().then(voices => {this.x = JSON.stringify(voices)});
    Tts.voices().then(voices => {
      const voiceLength =voices.length;
      for(var i =0; i< voiceLength; i++) {
        if(voices[i].language.toLowerCase().includes('ar')) {
          this.x += JSON.stringify(voices[i]);
        }
        
      }      
    });

  } */
  render() {


   /* Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('ar-SA');
      Tts.setDefaultRate(1.3);
      Tts.setDefaultPitch(1.3);

      Tts.speak('...يولد أي جهاز كهربائي أحادي أو ضمن نظام كهربائي أثناء عمله حقولا كهرومغناطيسية يمكن ان تؤدي الى اضطرابات وخلل في عمل ووظيفة الأجهزة الأخرى المجاورة له والعكس...وسوف أحاول الإجابة عن التساؤلات: ما هو التحمل والتلاؤم الكهرومغناطيسي للأجهزة وما هي الطرق المستخدمة للحد منها...الزراعة الواسعة: وفيها يتم استخدام الغذاء الطبيعي دون استخدام أسمدة او غذاء اضافي. هذا النمط يستخدم على نطاق واسع في حوض المتوسط خاصة في مصر...ولاشك ان استعمال الألمنيوم وسبائكه في صناعة السيارات سوف يوفر الوقود والوزن ويقلل من التأثير الحراري في الكون نتيجة قلة استهلاك الوقود...15%...كيف حالك؟ بشر عن صحتك؟ أنا بخير و الحمد لله ...كم سعر هذه العلبة؟ ليش غالية؟...أمي تقول جيب معك حليب و لبن و 6 تفاح و بريالين خبز...درس الرياضيات اليوم جدا صعب و لم افهم شيء...أنا جوعان أريد الغداء ثم اريد ان أنام قليلا...هل تعرف أين مبنى العيادات الخارجية، أريد تخصص الباطنية و أريد عمل تحاليل شاملة...')
      Speech.speak({
        text: 'React Native Speech isdddd awesome!  I\'m going to use it in my next project.',
        voice: 'en-US'
      });
   }); */
   if (false) { // !this.state.isLoadingComplete && !this.props.skipLoadingScreen
    return (
      // <AppLoading
      //   startAsync={this._loadResourcesAsync}
      //   onError={this._handleLoadingError}
      //   onFinish={this._handleFinishLoading}
      // />
      <ActivityIndicator size="small" color="#00ff00" />
      // https://facebook.github.io/react-native/docs/activityindicator
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <SettingsDrawer/>
        {/* <AppNavigator /> */}
      </View>
    );
  }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in CategoriesScreen.js. Feel free
        // to remove this if you are not using it in your app
        'tajawal': require('./assets/fonts/Tajawal-Regular.ttf'),
        'tajawal-bold': require('./assets/fonts/Tajawal-Bold.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
  header: {
    backgroundColor: '#1c1',
  }
});
