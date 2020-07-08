import analytics from '@react-native-firebase/analytics';
import { Alert } from 'react-native';
import { TextToSpeachObj } from "../classes/TextToSpeach";

export const EVENTS = {
    CREATE_NEW_CATEGORY: 'create_new_category',
    CANCEL_NEW_CATEGORY: 'cancel_new_category',
    DELETE_CATEGORIES: 'delete_categories',

    CREATE_NEW_SENTENCE: 'CREATE_NEW_SENTENCE',
    CANCEL_NEW_SENTENCE: 'CANCEL_NEW_SENTENCE',


    RECORD_VOICE: 'record_voice',
    CANCEL_RECORD: 'cancel_record',
    DELETE_SOUNDS: 'delete_sound', // do sth
    ATTACH_IMAGE: 'attach_image', // to be done

    SEARCH_ICONS: 'search_icons',
    SEARCH_LIBRARIES: 'search_libraries',

    PLAY_SOUND: 'play_sound', // for categories and favorites

    SPEAK: 'speak', // only for speaking screen 
    SHARE_SOUND: 'share_sound',
    CANCEL_SHARE_SOUND: 'cancel_share_sound',
    ADD_FAVORITE: 'add_favorite', // add_favorite_sound
    DELETE_FAVORITE: 'delete_favorite',
    DELETE_FAVORITES: 'delete_favorites', // or maybe have one DELETE and pageName in params
    SELECT_PREDICTED_WORD: 'select_predicted_word',
    ALERT: 'alert',

    // settings
    CHANGE_VOICE: 'change_voice',
    SEND_MESSAGE: 'send_message',
    TAKE_TOUR: 'take_tour', // take guided tour
    SKIP_TOUR: 'skip_tour',
    TOUR_NEXT: 'tour_next',
    TOUR_PREVIOUS: 'tour_previous',
    CLICK: 'click', // click link may remove it

    FIRST_LAUNCH: 'first_launch'
};

export const logEvent = (event, options = {}) => {
    debugger;
    if(event) {
        if(typeof options.text === 'string') {
            options.text = options.text.trim();
        }
        analytics().logEvent(event, {...options, id: 3745092, voice: TextToSpeachObj.getGender()});
    } else {
        // Alert.alert('no event');
    }
};

