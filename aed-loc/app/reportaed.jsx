
import {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput, Alert, TouchableOpacity, FlatList} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import {useRoute} from '@react-navigation/native';
import {Stack} from 'expo-router';
import {COLORS, images} from "../constants";
import {ScreenHeaderBtn} from '../components'
import React, {Component} from 'react';
import axios from 'axios';

export default class Places extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
      searchResults: [],
      isShowingResults: false,
    };
  }


  markers = [
    { latitude: 33.77509864265381, longitude: -84.3961465816308 },
    { latitude: 33.77717572728114, longitude: -84.39589086650311 },
    { latitude: 33.77260807592805, longitude: -84.39137794195794 },
    { latitude: 33.771169303566744, longitude: -84.3915432378476 },
    { latitude: 33.77377218030047 , longitude: -84.39519539004799 },
    { latitude: 33.77319393752673 , longitude: -84.39419633666199 },
    { latitude: 33.77286790530601 , longitude: -84.3957282185205 },
    { latitude: 33.772295808033356 , longitude: -84.393966924403 },
    { latitude: 33.77171755529511 , longitude: -84.39529159518885 },
    { latitude: 33.77214201779241 , longitude: -84.39588362682498 },
    // Add more coordinates as needed
  ];

  AppButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style = {styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  searchLocation = async (text) => {
    this.setState({searchKeyword: text});
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAAvB5HfA6Ymr9d3ZGcU0C0yPHzhs2O5Vk&input=${this.state.searchKeyword}`,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          searchResults: response.data.predictions,
          isShowingResults: true,
        });
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  render() {
    return (
      <SafeAreaView style = {styles.wrapper}>
        <Stack.Screen 
          options={{
            headerStyle: {backgroundColor: COLORS.gray},
            headerShadowVisible: false,
            headerTitle: "Record New AED",
            headerTitleAlign: "left",
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%"/>
            ),
          }}
        />
        <View style = {styles.searchBarContainer}>
          <Text fontSize={80}>Enter New Location</Text>
          <View style = {styles.searchBar}>
            <EvilIcons name="search" size={24} color="black" />
            <TextInput
              style={{
                borderColor: COLORS.lightgrey,
                fontSize: 20,
                height: 40,
                paddingLeft: 10,
                marginTop: 10,
                
              }}
                type="search"
                placeholder="Please type in your address"
                returnKeyType = "search"
                placeholderTextColor={"lightgray"}
                onChangeText = {(text)=>this.searchLocation(text)}
                value={this.state.searchKeyword} />
              {this.state.isShowingResults && (
                <FlatList
                data={this.state.searchResults}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={styles.resultItem}
                      onPress={() =>
                        this.setState({
                          searchKeyword: item.description,
                          isShowingResults: false,
                        })
                      }>
                      <Text>{item.description}</Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id}
                style={styles.searchResultsContainer}
              />
          )}
          </View>
        </View>
        <View style = {styles.options}>
          {
          <this.AppButton 
            title="Submit" 
            onPress = {()=>Alert.alert('Your Request is submitted')}/>
          }
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBarContainer: {
    flex: 2,
    padding: 40,
    justifyContent: 'center',
    alignItems: "flex-start",
    flexDirection: "column"
  },
  searchBar: {
    backgroundColor: "lightgrey",
    padding: 10,
    width: 380,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row"
  },
  options: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    marginBottom: 80,
    accessibilityRole: "button"
  },
  appButtonContainer: {
    elevation: 8,
    borderRadius: 5,
    width: 350,
    borderRadius:30,
    backgroundColor: "#faebd7",
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  resultItem: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  reportButtonContainer: {
    elevation: 8,
    borderRadius: 5,
    backgroundColor: "red",
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "black",
    alignSelf: "center"
  },
  searchResultsContainer: {
    width: 340,
    height: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
  },
})


