/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { firebase } from '@react-native-firebase/analytics';

AppRegistry.registerComponent(appName, () => App);

if (!firebase.apps.length) {
    firebase.initializeApp({
        appId: "1:456791612970:android:30146a82f6f8c315822d53",
        apiKey: "AIzaSyCwlK_SJNxDr_vDOTTn6QThgSazUlzS2PA", // Auth / General Use
        applicationId: "1:456791612970:android:30146a82f6f8c315822d53", // General Use
        projectId: "talaqi-1567710613991", // General Use
        databaseURL: "https://talaqi-1567710613991.firebaseio.com/users/ip3NKfdIfNmrcWecuoTR", // Realtime Database
        storageBucket: "talaqi-1567710613991.appspot.com", // gs://talaqi-1567710613991.appspot.com
        messagingSenderId: "123456789", // Cloud Messaging
        persistence: true
    });
}