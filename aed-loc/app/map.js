import { Stack } from 'expo-router';
import { COLORS, SIZES } from "../constants";
import MapView, { Marker, Callout } from 'react-native-maps';
import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Linking, ActivityIndicator } from "react-native";
import { Button, Modal, Portal, PaperProvider } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import axios from "axios";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (text) => {
    setSearchInput(text);
  };

  const [userLat, setUserLat] = useState();
  const [userLong, setUserLong] = useState();
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    const getPermissions = async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      try {
        let currentLocation = await Location.getCurrentPositionAsync({})
        setUserLat(currentLocation.coords.latitude)
        setUserLong(currentLocation.coords.longitude)
        setLoading(false);
      } catch(e) {
        console.error(e)
      }
      
    };
    getPermissions();

  }, []);

  const [aedMarkers, setAedMarkers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://juniordesign-backend-5e050bcd1c1a.herokuapp.com/api/getAEDs?userLatitude=${userLat}&userLongitude=${userLong}`);
        setAedMarkers(response.data);
      } catch (error) {
        console.error("Error fetching AED data:", error);
      }
    };
  
    fetchData();
  }, [userLat, userLong]);

  const [selectedMarker, setSelectedMarker] = useState();

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };
  const [visible3, setVisible3] = React.useState(false);
  const showModal3 = () => setVisible3(true);
  const hideModal3 = () => setVisible3(false);
  const containerStyle = { backgroundColor: COLORS.lightWhite, padding: 20, height: 200, margin: 20 };

  return (
    <PaperProvider>
      <SafeAreaView>
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: COLORS.gray},
            headerTitle: ""
          }}
        />
        <ScrollView>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="red"/>
              <Text style={styles.loadingText}>Determining your current location...</Text>
            </View>
          ) : (
            <View style={styles.container}>
              <View>
                <View style={styles.mapContainer}>
                  <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                      latitude: userLat,
                      longitude: userLong,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                  >
                    <Marker
                        coordinate={{
                          latitude: userLat,
                          longitude: userLong,
                        }}
                        title="Current Location"
                      >
                      <MaterialCommunityIcons name="account-circle" size={30} color="white" />
                    </Marker>
                    {aedMarkers.map((aed) => (
                      <Marker
                        key={aed.serialnumber}
                        coordinate={{ latitude: aed.latitude, longitude: aed.longitude }}
                        onPress={() => handleMarkerPress(aed)}
                      >
                        <MaterialCommunityIcons name="heart-flash" size={30} color="red" />
                        <Callout>
                          {selectedMarker !== undefined && (
                            <View style={{width: 200}}>
                              <Text></Text>
                              <Button mode="contained" buttonColor='red' textColor='white' onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${aed.latitude},${aed.longitude}&travelmode=walking`)}>
                                Get Directions
                              </Button>
                              <Text></Text>
                              <Button mode="contained" buttonColor='red' textColor='white' onPress={showModal3}>
                                Details
                              </Button>
                              <Portal>
                                <Modal visible={visible3} onDismiss={hideModal3} contentContainerStyle={containerStyle}>
                                  <ScrollView>
                                    <Text>Building: {selectedMarker.building}</Text>
                                    <Text></Text>
                                    <Text>Description: {selectedMarker.description}</Text>
                                    <Text></Text>
                                    <Text>Serial Number: {selectedMarker.serialnumber}</Text>
                                    <Text></Text>
                                    <Text>Brand: {selectedMarker.brand}</Text>
                                    <Text></Text>
                                    <Text>Model Number: {selectedMarker.modelnumber}</Text>
                                    <Text></Text>
                                    <Text>Battery Expiration Date: {selectedMarker.batteryexp}</Text>
                                    <Text></Text>
                                    <Text>Pad Expiration Date: {selectedMarker.padexp}</Text>
                                    <Text></Text>
                                    <Text>Pediatric Pad Expiration Date: {selectedMarker.pediatricexp}</Text>
                                    <Text></Text>
                                    <Text>Point of Contact: {selectedMarker.pointofcontact}</Text>
                                  </ScrollView>
                                </Modal>
                              </Portal>
                            </View>
                          )}
                        </Callout>
                      </Marker>
                    ))}
                  </MapView>
                </View>
                <Button style={styles.emergencyButton}  mode="contained" buttonColor='red' textColor='white' onPress={() => Linking.openURL("tel:911")}>
                    <Text style={{fontWeight: 600, fontSize: 18}}>Call 911</Text>
                </Button>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SIZES.medium
  },
  loadingContainer: {
    alignItems: "center"
  },
  loadingText: {
    color: "red",
    fontSize: 18
  },
  mapContainer: {
    padding: 10
  },
  map: {
    height: 600
  },
  options: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: "center",
    accessibilityRole: "button"
  },
  searchBarContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: "flex-start",
    flexDirection: "column"
  },
  searchBar: {
    backgroundColor: "lightgrey",
    padding: 10,
    width: 370,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row"
  },
  appButtonContainer: {
    elevation: 8,
    borderRadius: 3,
    backgroundColor: "white",
    marginVertical: 8,
    paddingHorizontal: 10
  },
  appButtonText: {
    fontSize: 15,
    color: "blue",
    alignSelf: "center"
  }
});

export default Home;
