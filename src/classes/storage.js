import { AsyncStorage } from "react-native"

export class Storage {

      getItem = async (key, result) => {
        try {
          value = await AsyncStorage.getItem(key);
           result.value = JSON.parse(value);
         
       } catch (error) {
       }
      }

      mergeItem = async (key, value) => {
        try {
          await AsyncStorage.mergeItem(key, JSON.stringify(value));
        } catch (error) {
        }
      }

      
      setItem = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
        }
        // const stringifiedValue = JSON.stringify(value);
        // localStorage.setItem(key, stringifiedValue);
      }

      removeItem = async (key) => {
        try {
          await AsyncStorage.removeItem(key);
        } catch (error) {
        }
      }
}