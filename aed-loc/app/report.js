import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Stack } from 'expo-router';
import axios from 'axios';
import { COLORS, SIZES } from '../constants';
import { Link } from 'expo-router';

const Places = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [placeID, setPlaceId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isShowingResults, setIsShowingResults] = useState(false);

  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    description: "",
    serialnumber: "",
    brand: "",
    modelnumber: "",
    batteryexp: "",
    padexp: "",
    pediatricexp: "",
    pointofcontact: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const searchLocation = async (text) => {
    setSearchKeyword(text);
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAAvB5HfA6Ymr9d3ZGcU0C0yPHzhs2O5Vk&input=${text}`,
      })
      .then((response) => {
        console.log(response.data.predictions);
        setSearchResults(response.data.predictions);
        setIsShowingResults(true);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };



  const returnLatLong = (text) => {
    const getLatLong = async (text) => {
      axios
        .request({
          method: 'post',
          url: `https://maps.googleapis.com/maps/api/geocode/json?place_id=${text}&key=AIzaSyAAvB5HfA6Ymr9d3ZGcU0C0yPHzhs2O5Vk`,
        })
        .then((response) => {
          const latitude = response.data.results[0].geometry.location.lat;
          const longitude = response.data.results[0].geometry.location.lng;
          setFormData({
            ...formData,
            latitude: String(latitude),
            longitude: String(longitude),
          });
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
    getLatLong(text)
  }

  const handleButtonPress = () => {
    if (!(formData.latitude && formData.longitude && formData.description && formData.pointofcontact)) {
      setErrorMessage("Please fill out all fields");
      console.log(formData);
    } else {
      let data = JSON.stringify({
        "latitude": formData.latitude,
        "longitude": formData.longitude,
        "description": formData.description,
        "serialnumber": formData.serialnumber,
        "brand": formData.brand,
        "modelnumber": formData.modelnumber,
        "batteryexp": formData.batteryexp,
        "padexp": formData.padexp,
        "pediatricexp": formData.pediatricexp,
        "pointofcontact": formData.pointofcontact,
      });
      console.log(data)
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://juniordesign-backend-5e050bcd1c1a.herokuapp.com/api/updateAED',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          navigation.navigate("userhome");
          // need a way to go back to the user home of the same user once done
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.gray },
          headerShadowVisible: false,
          headerTitle: "Add AED"
        }}

      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Text>Please fill out all fields. If you do not know the information please put "N/A".</Text>
          <Text></Text>
          <Text>Location</Text>
          <View style={styles.autocompleteContainer}>
            <TextInput
              placeholder="Search for an address"
              returnKeyType="search"
              style={styles.searchBox}
              placeholderTextColor="#000"
              onChangeText={(text) => searchLocation(text)}
              value={searchKeyword}
            />
            {isShowingResults && (
              <FlatList
                data={searchResults}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.resultItem}
                      onPress={() => {
                        setSearchKeyword(item.description);
                        setIsShowingResults(false);
                        returnLatLong(item.place_id);

                      }}
                    >
                      <Text>{item.description}</Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id}
                style={styles.searchResultsContainer}
              // need to get lat long from this
              />
            )}
          </View>
          <Text></Text>
          <Text>Description</Text>
          <TextInput
            style={styles.textbox}
            backgroundColor='#ffffff'
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            value={formData.description}
          />
          <Text></Text>
          <Text>Serial Number</Text>
          <TextInput
            style={styles.textbox}
            backgroundColor='#ffffff'
            onChangeText={(text) => setFormData({ ...formData, serialnumber: text })}
            value={formData.serialnumber}
          />
          <Text></Text>
          <Text>Brand</Text>
          <TextInput
            style={styles.textbox}
            backgroundColor='#ffffff'
            onChangeText={(text) => setFormData({ ...formData, brand: text })}
            value={formData.brand}
          />
          <Text></Text>
          <Text>Model Number</Text>
          <TextInput
            style={styles.textbox}
            backgroundColor='#ffffff'
            onChangeText={(text) => setFormData({ ...formData, modelnumber: text })}
            value={formData.modelnumber}
          />
          <Text></Text>
          <Text>Battery Expiration Date</Text>
          <TextInput
            style={styles.textbox}
            backgroundColor='#ffffff'
            onChangeText={(text) => setFormData({ ...formData, batteryexp: text })}
            value={formData.batteryexp}
          />
          <Text></Text>
          <Text>Pad Expiration Date</Text>
          <TextInput
            style={styles.textbox}
            backgroundColor='#ffffff'
            onChangeText={(text) => setFormData({ ...formData, padexp: text })}
            value={formData.padexp}
          />
          <Text></Text>
          <Text>Pediatric Pad Expiration Date</Text>
          <TextInput
            style={styles.textbox}
            backgroundColor='#ffffff'
            onChangeText={(text) => setFormData({ ...formData, pediatricexp: text })}
            value={formData.pediatricexp}
          />
          <Text></Text>
          <Text>Point of Contact</Text>
          <TextInput
            style={styles.textbox}
            backgroundColor='#ffffff'
            onChangeText={(text) => setFormData({ ...formData, pointofcontact: text })}
            value={formData.pointofcontact}
          />
          <Text style={{ color: "red" }}>{errorMessage}</Text>
          <Text></Text>
          <Button onPress={handleButtonPress} mode="contained" buttonColor="#FAC5C5" textColor='black'>
            <Link href={`/userhome`} asChild>
              <Pressable >
                <View>
                  <Text style={{ color: "black" }}>Submit</Text>
                </View>
              </Pressable>
            </Link>
          </Button>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    zIndex: 1,
  },
  map: {
    width: '100%',
    height: 600,
  },
  searchResultsContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 50,
  },
  dummmy: {
    flex: 1,
    padding: 10
  },
  resultItem: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  textbox: {
    borderColor: COLORS.gray,
    borderWidth: 0.5,
    height: 40,
    paddingLeft: 5,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  searchBox: {
    width: '100%',
    height: 40,
    borderColor: '#aaa',
    color: '#000',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});

export default Places;