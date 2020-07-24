import analytics from '@react-native-firebase/analytics';
import { TextToSpeachObj } from "../classes/TextToSpeach";

export const EVENTS = {
    CREATE_NEW_CATEGORY: 'create_new_category', // - try it
    CANCEL_NEW_CATEGORY: 'cancel_new_category',
    DELETE_CATEGORIES: 'delete_categories',

    CREATE_NEW_SENTENCE: 'create_new_sentence', // - try it 
    CANCEL_NEW_SENTENCE: 'cancel_new_sentence',


    RECORD_VOICE: 'record_voice',
    CANCEL_RECORD: 'cancel_record',
    DELETE_SOUNDS: 'delete_sound', // do sth - try it 
    ATTACH_IMAGE: 'attach_image', // to be done - try it

    SEARCH_ICONS: 'search_icons', // - try it
    SEARCH_LIBRARIES: 'search_libraries',

    PLAY_SOUND: 'play_sound', // for categories and favorites

    SPEAK: 'speak', // only for speaking screen 
    SHARE_SOUND: 'share_sound',
    CANCEL_SHARE_SOUND: 'cancel_share_sound',
    ADD_FAVORITE: 'add_favorite',
    DELETE_FAVORITE: 'delete_favorite', // - try out
    DELETE_FAVORITES: 'delete_favorites', // or maybe have one DELETE and pageName in params
    SELECT_PREDICTED_WORD: 'select_predicted_word',
    ALERT: 'alert',

    // settings
    CHANGE_VOICE: 'change_voice',
    SEND_MESSAGE: 'send_message', // do sth - try it  
    TAKE_TOUR: 'take_tour', // take guided tour
    SKIP_TOUR: 'skip_tour',
    TOUR_NEXT: 'tour_next',
    TOUR_PREVIOUS: 'tour_previous',
    CLICK: 'click', // click link may remove it

    FIRST_LAUNCH: 'first_launch'
};

export const logEvent = (event, options = {}) => {
    if(event) {
        if(typeof options.text === 'string') {
            options.text = options.text.trim();
        }
        analytics().logEvent(event, {...options, id: 3745092, voice: TextToSpeachObj.getGender()});
    } else {
        // Alert.alert('no event');
    }
};

