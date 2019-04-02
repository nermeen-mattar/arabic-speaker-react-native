import React from "react";
import { Modal, Image, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default class IllustrationScreen extends React.Component {
  constructor(props) {
    super();
    this.state =  {
        isVisible: true,
        illustrateImgs: [
          require("../../assets/images/illustrate/Home–1.png"),
          require("../../assets/images/illustrate/Home–2.png"),
          require("../../assets/images/illustrate/Home–3.png"),
          require("../../assets/images/illustrate/Home–4.png"),
          require("../../assets/images/illustrate/categories.png"),
          require("../../assets/images/illustrate/categorydetails.png"),
          require("../../assets/images/illustrate/fav.png"),
          require("../../assets/images/illustrate/addnew–cat.png"),
          require("../../assets/images/illustrate/addnew.png"),
          require("../../assets/images/illustrate/addnew–1-.png"),
          require("../../assets/images/illustrate/Library_icons.png"),
          require("../../assets/images/illustrate/Library_icons–1.png"),
          require("../../assets/images/illustrate/settings–1.png"),
          require("../../assets/images/illustrate/settings–2.png")
        ],
        index: 0
      };

  }
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isVisible}
      >
          <Image
          style={{ width: "100%", height: "100%" }}
          source={this.state.illustrateImgs[this.state.index]}
        />
        <TouchableOpacity
          style={{ position: "absolute", top: "92%", right: "51%" }}
          onPress={() => {
            this.addToIndex(1);
          }}
        >
          <Icon style={{ color: "white" }} name="arrow-circle-right" size={38} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "absolute", top: "92%", left: "51%"  }}
          onPress={() => {
            this.addToIndex(-1);
          }}
        >
          <Icon style={{ color: "white" }} name="arrow-circle-left" size={38} />
        </TouchableOpacity>
      </Modal>
    );
  }

  addToIndex(amount) {
      if(this.state.index === this.state.illustrateImgs.length - 1) {
          this.setState({
              index: 0
          })
        this.props.onBackClicked();
    }
    const newAmount = this.state.index + amount;
    this.setState({
      index: newAmount >=0 ? newAmount : 0
    });
  }
}

 