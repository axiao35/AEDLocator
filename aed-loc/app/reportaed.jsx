import React from "react"
import {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput, Alert, TouchableOpacity} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import {useRoute} from '@react-navigation/native';
import {Stack} from 'expo-router';
import {COLORS, images} from "../constants";
import {ScreenHeaderBtn} from '../components'
import { validate } from "react-native-web/dist/cjs/exports/StyleSheet/validate";

const HomeScreen = () => {
  const route = useRoute();
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const AppButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style = {styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

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
              placeholderTextColor={"lightgray"}
              onChange={handleChange}
              value={searchInput} />
        </View>
      </View>
      <View style = {styles.options}>
        {
        searchInput != "" &&
        <AppButton 
          title="Submit" 
          onPress = {()=>Alert.alert('Your Request is submitted')}/>
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBarContainer: {
    flex: 0.5,
    padding: 40,
    justifyContent: 'center',
    alignItems: "flex-start",
    flexDirection: "column"
  },
  searchBar: {
    backgroundColor: "lightgrey",
    padding: 10,
    width: 350,
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
  }
})

export default HomeScreen
