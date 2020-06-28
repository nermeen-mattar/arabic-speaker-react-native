import { AsyncStorage } from "react-native";
export class Storage {

  getItem = async (key, result) => {
    try {
      const value = await AsyncStorage.getItem(key);
      result.value = JSON.parse(value);
    } catch (error) {}
  };

  mergeItem = async (key, value) => {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (error) {}
  };

  setItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  };

  removeItem = async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {}
  };
}

export const StorageObj = new Storage(); 