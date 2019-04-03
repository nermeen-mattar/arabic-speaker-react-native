import React from "react";
import { Modal, Image, TouchableOpacity, View} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default class IllustrationScreen extends React.Component {
  constructor(props) {
    super();
    this.state =  {
        isVisible: true,
        illustrateImgs: [
          require("../../assets/images/illustrate/1.png"),
          require("../../assets/images/illustrate/2.png"),
          require("../../assets/images/illustrate/3.png"),
          require("../../assets/images/illustrate/4.png"),
          require("../../assets/images/illustrate/5.png"),
          require("../../assets/images/illustrate/6.png"),
          require("../../assets/images/illustrate/7.png"),
          require("../../assets/images/illustrate/8.png"),
          require("../../assets/images/illustrate/9.png"),
          require("../../assets/images/illustrate/10.png"),
          require("../../assets/images/illustrate/11.png"),
          require("../../assets/images/illustrate/12.png"),
          require("../../assets/images/illustrate/13.png"),
          require("../../assets/images/illustrate/14.png"),
        ],
        index: 0
      };

  }
  render() {
    
    // const windowWidth = Dimensions.get('window').width;
    // const windowHeight = Dimensions.get('window').height;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isVisible}
      >
       <View  style={{ backgroundColor: '#5e5e5e'}}>
       <TouchableOpacity
          style={{padding: 5, marginHorizontal: 8 }} 
          // position: "fixed", top: "4%", left: '4%'
          onPress={this.props.onBackClicked}
        >
          <Icon style={{ color: "white" }} name="angle-down" size={40} /> 
          {/* name="times-circle" */}
        </TouchableOpacity>
        
          <Image
          style={{  height: '100%', width: '100%', resizeMode: 'contain'}}
          source={this.state.illustrateImgs[this.state.index]}
        />
        <TouchableOpacity
          style={{ position: "absolute", top: "76%", right: "51%" }}
          onPress={() => {
            this.addToIndex(1);
          }}
        >
          <Icon style={{ color: "white" }} name="arrow-circle-right" size={38} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "absolute", top: "76%", left: "51%"}}
          onPress={() => {
            this.addToIndex(-1);
          }}
        >
          <Icon style={{ color: "white" }} name="arrow-circle-left" size={38} />
        </TouchableOpacity>
       </View>
      </Modal>
    );
  }

  addToIndex(amount) {
      if(this.state.index === this.state.illustrateImgs.length - 1) {
          this.setState({
              index: 0
          });
        this.props.onBackClicked();
    }
    const newAmount = this.state.index + amount;
    this.setState({
      index: newAmount >=0 ? newAmount : 0
    });
  }
}

 