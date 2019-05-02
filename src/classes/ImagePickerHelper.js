import ImagePicker from "react-native-image-picker";

export class ImagePickerHelper {
  static instance;
  static customCallback;
  static defaultCallback;
  static getInstance(customCallback, defaultCallback) {
    this.customCallback = customCallback;
    this.defaultCallback = defaultCallback;
    if (!ImagePickerHelper.instance) {
      ImagePickerHelper.instance = new ImagePickerHelper();
    }
    return ImagePickerHelper.instance;
  }

  displayImagePickerMenu() {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: "", // أختر صورة
      cancelButtonTitle: "إلغاء",
      takePhotoButtonTitle: "الكاميرا",
      chooseFromLibraryButtonTitle: "رفع صورة من الاستديو",
      customButtons: [{ name: "iconsLib", title: "اختر من مكتبة الأيقونات" }],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        ImagePickerHelper.customCallback();
      } else {
        const source = { uri: response.uri };
        ImagePickerHelper.defaultCallback(source);
      }
    });
  }
}
