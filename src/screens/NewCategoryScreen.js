import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  View,
  AsyncStorage,
  Keyboard,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { MonoText } from "../components/StyledText";
import FormHeader from "../components/FormHeader";
import Colors from "../constants/Colors";
import { ImagePickerHelper } from "../classes/ImagePickerHelper";
import { Storage } from "../classes/Storage";

export default class NewCategoryScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: ["إضافة تصنيف جديد"],
      cardInfo: {
        label: "ارفق صورة",
        imgSrc: require("../../assets/images/categories/chat.png")
      },
      imgSrc: null,
      inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد",
      categoryName: "",
      categoryPath: props.navigation.getParam("categoryPath"),
      // photos: []
      imagePickerInstance: ImagePickerHelper.getInstance(
        () =>
          this.props.navigation.navigate("IconsLibrariesScreen", {
            srcScreen: "NewCategoryScreen"
          }),
        img => this.setState({ imgSrc: img })
      )
    };
    props.navigation.addListener("willFocus", this.load);
  }

  load = () => {
    const newState = {
      imgSrc: this.props.navigation.getParam("imgSrc"),
      imagePickerInstance: ImagePickerHelper.getInstance(
        () =>
          this.props.navigation.navigate("IconsLibrariesScreen", {
            srcScreen: "NewCategoryScreen"
          }),
        img => this.setState({ imgSrc: img })
      )
    };
    if (!this.props.navigation.getParam("imgSrc")) {
      newState.categoryName = "";
    }
    this.setState(newState);
  };

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss}
      >
        <FormHeader
          title={this.state.title}
          onCancelClicked={() =>
            this.props.navigation.navigate("CategoriesScreen", {
              categoryPath: this.state.categoryPath
            })
          }
          onSaveClicked={this.addNewCategory}
        />
        <View style={styles.inputsWrapper}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.onTextChanged(text)}
            placeholder={this.state.inputPlaceholder}
            multiline={true}
            value={this.state.categoryName}
          />
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                this.state.imagePickerInstance.displayImagePickerMenu()
              }
            >
              {this.state.imgSrc ? (
                <Image
                  style={{ width: 81, height: 78 }}
                  source={this.state.imgSrc}
                />
              ) : (
                <View>
                  <Icon
                    name="camera"
                    size={32}
                    color={Colors.borderColor}
                    style={styles.cardIcon}
                  />
                  <MonoText style={styles.cardLabel}>
                    {this.state.cardInfo.label}
                  </MonoText>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  onTextChanged(text) {
    this.setState({
      // title: 'okokok',
      categoryName: text
    });
  }

  addNewCategory = () => {
    if (!this.state.categoryName) {
      this.displayAlertMessage();
      return;
    }
    const storageInstance = Storage.getInstance();
    // storageInstance.setItem('storageInstance', 'nermeen');
    const result = { value: "null" };
    storageInstance.getItem(this.state.categoryPath.join(), result).then(() => {
      result.value = result.value ? result.value : [];
      storageInstance
        .setItem(this.state.categoryPath.join(), [
          ...result.value,
          {
            label: this.state.categoryName,
            imgSrc: this.state.imgSrc,
            type: "category"
          }
        ])
        .then(res => {
          this.props.navigation.navigate("CategoriesScreen", {
            categoryPath: this.state.categoryPath
          });
        });
    });
  };

  displayAlertMessage() {
    Alert.alert("فشل الحفظ", "لا يمكن حفظ تصنيف فارغة", [{ text: "حسناً" }]);
  }

  getItem = async key => {
    value = "initial";
    try {
      value = await AsyncStorage.getItem("test");
      if (value === null) {
        value = "null";
      }
    } catch (error) {
      // Error retrieving data
      this.setState({
        title: "error",
        cardInfo: {
          label: "ارفق صورة",
          imgSrc: require("../../assets/images/categories/chat.png")
        },
        inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد"
      });
    }
    this.setState({
      title: value,
      cardInfo: {
        label: "ارفق صورة",
        imgSrc: require("../../assets/images/categories/chat.png")
      },
      inputPlaceholder: "اكتب ثلاث كلمات بحد أقصى كعنوان للتصنيف الجديد"
    });
    // }
  };
}

const styles = StyleSheet.create({
  inputsWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  textInput: {
    flex: 1,
    maxWidth: 500,
    height: 82, // 78,
    backgroundColor: Colors.primary,
    fontSize: 21,
    //   color: Colors.textSecondary,
    textAlign: "right",
    marginHorizontal: 8,
    padding: 8,
    paddingTop: 12, // 20 didn't work
    marginTop: 11,
    borderRadius: 10 /* **N** */
  },
  card: {
    width: 82,
    height: 82,
    backgroundColor: Colors.primary,
    margin: 11,
    borderRadius: 10 /* **N** */
  },
  cardIcon: {
    marginTop: 17,
    textAlign: "center"
  },
  cardLabel: {
    color: Colors.textSecondary,
    textAlign: "center",
    fontSize: 11,
    marginTop: 8 //  14 didn't work
  }
});
