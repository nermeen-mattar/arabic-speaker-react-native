import React from "react";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  Modal,
  Linking,
  TouchableOpacity
} from "react-native";

import { MonoText } from "../components/StyledText";
import Colors from "../constants/Colors";
import CustomHeader from "../components/CustomHeader";
import commonStyles from "../styles/commonStyles";

export default class AboutUsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      circlesSection: [
        {
          img: require("../../assets/images/about-us/ear.png"),
          text: "سمعي"
        },
        {
          img: require("../../assets/images/about-us/eye.png"),
          text: "بصري"
        },
        {
          img: require("../../assets/images/about-us/wheelchair.png"),
          text: "حركي"
        },
        {
          img: require("../../assets/images/about-us/couple.png"),
          text: "كبار السن"
        },
        {
          img: require("../../assets/images/about-us/baby.png"),
          text: "أطفال"
        },
        {
          img: require("../../assets/images/about-us/reading.png"),
          text: "تعليمي"
        },
        {
          img: require("../../assets/images/about-us/care.png"),
          text: "E-health"
        },
        {
          img: require("../../assets/images/about-us/communication.png"),
          text: "الخطاب والتواصل"
        }
      ],
      isVisible: true,
      title: ["حول التطبيق"],
      formFields: [
        {
          name: "name",
          label: "الإسم",
          type: "text"
        },
        {
          label: "البريد الإلكتروني",
          type: "text",
          name: "email"
        },
        {
          label: "عنوان الرسالة",
          type: "text",
          name: "subject"
        },
        {
          name: "body",
          label: "نص السالة",
          type: "text",
          multiline: true
        }
      ]
    };
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isVisible}
      >
        <CustomHeader
          title={this.state.title}
          onBackClicked={() => {
            this.props.onBackClicked();
          }}
        />

        <ScrollView style={styles.container}>
          {/* first section */}
          <View style={styles.logoAndName}>
            <View style={[commonStyles.flexCenter, { maxHeight: 115 }]}>
              <Image
                source={require("../../assets/images/about-us/logo.png")}
              />
            </View>
            <MonoText style={[styles.appNameArabic, commonStyles.textCenter]}>
              المتحدث العربي
            </MonoText>

            <MonoText style={[styles.appNameEnglish, commonStyles.textCenter]}>
              Smart Arabic Speaker
            </MonoText>
          </View>

          {/* second section */}
          <View style={[styles.whiteSection, styles.paddingVertical10]}>
            <MonoText
              style={[
                commonStyles.textCenter,
                styles.primaryText,
                styles.paddingVertical10
              ]}
            >
              أحدث تطبيق للتحدث و التواصل باللغة العربية لذوي صعوبات النطق
              للأطفال والبالغين و كبار السن
            </MonoText>
            <MonoText style={[commonStyles.textCenter, styles.primaryText]}>
              The advanced application for communication in Arabic for young and
              adult people with speech difficulties
            </MonoText>

            {/* <MonoText style={ commonStyles.textCenter}>
      لذوي صعوبات النطق وكبار السن
          </MonoText>  */}
            <MonoText
              style={[
                commonStyles.textCenter,
                styles.primaryText,
                styles.paddingVertical10,
                { color: Colors.borderColor }
              ]}
            >
              V1 - 2019
            </MonoText>
          </View>
          <MonoText
            style={[
              commonStyles.textCenter,
              styles.primaryText,
              { padding: 14 }
            ]}
          >
                        فكرة وتنفيذ د. أمل السيف
          </MonoText>

          <View style={[styles.whiteSection, styles.paddingVertical10]}>
            <MonoText
              style={[
                styles.primaryText,
                commonStyles.textCenter,
                { paddingTop: 8 }
              ]}
            >
              شركاء النجاح
            </MonoText>
            <View style={[styles.flexSpaceAround, { flexWrap: "wrap" }]}>
              <Image
                style={{
                  maxHeight: 100,
                  maxWidth: 100,
                  margin: 8,
                  marginBottom: 16
                }}
                source={require("../../assets/images/about-us/CCIS_Logo_2_Big.png")}
              />
              <Image
                style={{
                  maxHeight: 100,
                  maxWidth: 100,
                  margin: 8,
                  marginBottom: 16
                }}
                source={require("../../assets/images/about-us/IT_LOGO.png")}
              />

              <View style={{ margin: 8 }}>
                <View style={styles.whiteCircle}>
                  <Image
                    style={{ height: 40, maxWidth: 100 }}
                    source={require("../../assets/images/about-us/qcri_logo.png")}
                  />
                </View>
                <MonoText
                  style={[
                    commonStyles.textCenter,
                    styles.secondaryText,
                    { maxWidth: 100 }
                  ]}
                >
                                    Arabic Language Technologies
                </MonoText>
              </View>
              <View style={{ margin: 8 }}>
                <View style={styles.whiteCircle}>
                  <Image
                    style={{ maxHeight: 100, maxWidth: 100 }}
                    source={require("../../assets/images/about-us/شعار_مدينة_سلطان.png")}
                  />
                </View>
                <MonoText
                  style={[
                    commonStyles.textCenter,
                    styles.secondaryText,
                    { maxWidth: 100 }
                  ]}
                >
                                    مدينة سلطان للخدمات الإنسانية                </MonoText>
              </View>

              <Image
                style={{
                  maxHeight: 120,
                  maxWidth: 96,
                  margin: 8,
                  marginBottom: 16
                }}
                source={require("../../assets/images/about-us/Nojod.jpg")}
              />

              <View style={{ margin: 8 }}>
                <View style={styles.whiteCircle}>
                  <Image
                    style={{ maxHeight: 80, maxWidth: 100 }}
                    source={require("../../assets/images/about-us/icon_ResponsiveVoice2.png")}
                  />
                </View>
                <MonoText
                  style={[
                    commonStyles.textCenter,
                    styles.secondaryText,
                    { maxWidth: 100, marginTop: 14 }
                  ]}
                >
                                    Responsive Voice                </MonoText>
              </View>
            </View>
            <View style={styles.divider} />
            <MonoText
              style={[
                commonStyles.textCenter,
                styles.paddingVertical10,
                { fontSize: 38 }
              ]}
            >
              رعاية
            </MonoText>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                style={{ height: 120, maxWidth: 130 }}
                source={require("../../assets/images/about-us/logo_anas.png")}
              />
            </View>
            <MonoText style={[styles.primaryText, commonStyles.textCenter]}>
              مركز أنس للتقنيات المساعدة لذوي الاحتياجات الخاصة
            </MonoText>
            <MonoText style={[styles.primaryText, commonStyles.textCenter]}>
            Anas Assistive Technology Center for people with disability 
            Non-profit Organization             
            </MonoText>

          </View>

          <View
            style={[
              commonStyles.flexCenter,
              { alignItems: "center", backgroundColor: "#f7f7f7" }
            ]}
          >
            {this.state.circlesSection.map(circleObj => {
              return (
                <View style={styles.circleAndText}>
                  <View style={styles.whiteCircle}>
                    <Image source={circleObj.img} />
                  </View>
                  <MonoText
                    style={[
                      commonStyles.textCenter,
                      styles.primaryText,
                      { width: 72 }
                    ]}
                  > {circleObj.text}
                   </MonoText>
                </View>
              );
            })}
          </View>

          <View style={[styles.contactDetails]}>
            <View style={[styles.flexSpaceAround, { paddingVertical: 28 }]}>
              <TouchableOpacity
                onPress={() => Linking.openURL("https://twitter.com/AnasCenterAT")}
              >
                <Image
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  source={require("../../assets/images/about-us/twitter.png")}
                />
                <MonoText style={[commonStyles.textCenter, styles.primaryText]}>
                                    @AnasCenterAt                </MonoText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL("mailto:AnasCenterAT@Gmail.com")}
              >
                <Image
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginVertical: 4.5
                  }}
                  source={require("../../assets/images/about-us/mail.png")}
                />
                <MonoText style={[commonStyles.textCenter, styles.primaryText]}>
                                    AnasCenterAT@Gmail.com
                </MonoText>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.divider}/> */}
          </View>
        </ScrollView>
      </Modal>
    );
  }

  sendMessage() {}

  onTextChanged(text, fieldIndex) {
    const formFields = this.state.formFields;
    formFields[fieldIndex].value = text;
    this.setState({
      formFields: formFields
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground
  },
  logoAndName: {
    backgroundColor: Colors.brand
  },
  appNameArabic: {
    color: "white",
    fontSize: 31
    // textAlign: 'center'
  },
  appNameEnglish: {
    color: "white",
    fontSize: 21
    // textAlign: 'center'
  },
  divider: {
    borderBottomColor: "#f2f2f2",
    width: 176,
    borderBottomWidth: 4,
    marginLeft: "auto",
    marginRight: "auto"
  },
  primaryText: {
    fontSize: 16
  },
  secondaryText: {
    fontSize: 12
  },
  whiteSection: {
    backgroundColor: "white",
    paddingHorizontal: 30
  },
  paddingVertical10: {
    paddingVertical: 10
  },
  flexSpaceAround: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  // circlesSection: {
  //   padding
  // },
  contactDetails: {
    backgroundColor: "white"
  },
  whiteCircle: {
    backgroundColor: "white",
    borderRadius: 36,
    // padding: 20
    width: 72,
    height: 72,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  circleAndText: {
    marginHorizontal: 5,
    marginBottom: 22
  }
});
