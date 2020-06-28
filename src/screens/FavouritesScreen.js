import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { MonoText } from "../components/StyledText";
import { Card } from "../components/card";
import CustomHeader from "../components/CustomHeader";
import Colors from "../constants/Colors";
import { StorageObj } from "../classes/Storage";
import { TextToSpeachObj } from "../classes/TextToSpeach";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import DeleteAndCancel from "../components/DeleteAndCancel";
import { logEvent, EVENTS } from "../classes/Events";

export default class FavouritesScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: ["المفضلة"],
      favourites: [],
      selectMode: false
    };
    this.initFavourites();
    props.navigation.addListener("willFocus", this.load);
  }

  load = () => {
    this.cancelSelectMode();
    this.initFavourites();
  };
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader
          navigation={this.props.navigation}
          title={this.state.title}
          onSelectClicked={
            this.state.favourites.length
              ? () => this.setState({ selectMode: true })
              : null
          }
        />

        {this.state.favourites.length ? (
          <ScrollView>
            <View style={styles.cardsContainer}>
          {/* <View>
            {this.state.favourites.map((favourite) => {
            return (<MonoText>{favourite.label}</MonoText>);})}    
          </View> */}
              {this.state.favourites.map((favourite, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.favouriteClicked(index);
                    }}
                  >
                    <Card
                      key={favourite.label}
                      cardInfo={favourite}
                      selectMode={this.state.selectMode}
                      selected={favourite.selected}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        ) : (
          // empty state
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flex: 1
            }}
          >
            <View>
              <Icon
                style={{ textAlign: "center" }}
                name="star"
                size={86}
                color="#D6D6D6"
              />

              <MonoText
                style={{ fontSize: 17, color: "#9B9B9B", textAlign: "center" }}>
                 لا يوجد مفضلات الآن
              </MonoText>
            </View>
          </View>
        )}

        {this.state.selectMode ? (
          <DeleteAndCancel
            onCancelClicked={() => this.cancelSelectMode()}
            onDeleteClicked={() => {
              this.setState({
                showConfirmDialog: true
              });
            }}
          >
            
          </DeleteAndCancel>
        ) : null}
        {this.state.showConfirmDialog ? (
          <ConfirmDeleteDialog
            entityNames={{ single: "عبارة", dual: "عبارتين", plural: "عبارات" }}
            allItems={this.state.favourites}
            onConfirm={() => {
              this.setState({
                showConfirmDialog: false
              });
              this.deleteSelectedFavourites();
            }}
            onCancel={() => {
              this.setState({
                showConfirmDialog: false
              });
            }}
          >
            
          </ConfirmDeleteDialog>
        ) : null}
      </View>
    );
  }

  initFavourites = () => {
    
    const result = { value: "null" };
    StorageObj.getItem("favourites", result).then(res => {
      if (result.value) {
        this.setState({
          favourites: result.value.map(favourite => {
            return { label: favourite };
          })
        });
      }
    });
  };

  favouriteClicked(favouriteIndex) {
    if (this.state.selectMode) {
      this.favouriteSelectionToggled(favouriteIndex);
    } else {
      TextToSpeachObj.speak(
        this.state.favourites[favouriteIndex].label
      );
    }
  }

  favouriteSelectionToggled(favouriteIndex) {
    const favourites = this.state.favourites;
    favourites[favouriteIndex].selected = !favourites[favouriteIndex].selected;
    this.setState({
      favourites: favourites
    });
  }

  cancelSelectMode = () => {
    const favourites = this.state.favourites;
    favourites.map(favourite => (favourite.selected = false));
    this.setState({
      selectMode: false,
      favourites: favourites
    });
  };

  deleteSelectedFavourites = () => {
    const remainingFavouritesObjects = this.state.favourites
      .filter(favourite => !favourite.selected);
    const remainingFavouritesStrings = remainingFavouritesObjects.map(favourite => favourite.label);
      const deletedFavouritesLength = this.state.favourites.length - remainingFavouritesObjects.length;
    StorageObj.setItem("favourites", remainingFavouritesStrings).then(res => {
      // this.initFavourites();
      this.setState({
        favourites: remainingFavouritesObjects
      });
      this.cancelSelectMode();
    });
    logEvent(EVENTS.DELETE_FAVORITES, {length: deletedFavouritesLength});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground
  },
  cardsContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    // display: 'flex',
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});
