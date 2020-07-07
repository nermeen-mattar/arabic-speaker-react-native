/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { firebase } from '@react-native-firebase/analytics';

AppRegistry.registerComponent(appName, () => App);

if (!firebase.apps.length) {
    firebase.initializeApp({
        appId: "1:653677212422:android:89cf01c58775f29bed2487",
        apiKey: "AIzaSyBSR9AzqNkeJL4iIwEz_gwP-ME5cDg_b3Y", // Auth / General Use
        applicationId: "1:653677212422:android:4908206d049105e5ed2487", // General Use
        projectId: "tts-arabic", // General Use
        databaseURL: "https://tts-arabic.firebaseio.com/", // Realtime Database
        storageBucket: "tts-arabic.appspot.com", // gs://talaqi-1567710613991.appspot.com
        messagingSenderId: "123456789", // Cloud Messaging
        persistence: true
    });
}