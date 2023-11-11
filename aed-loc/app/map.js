import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, } from "react-native";
import { Button } from "react-native-paper";
import {useState, useRef} from 'react';
import {Stack, useRouter, Link} from 'expo-router';
import { COLORS, images, SIZES } from "../constants";
import {ScreenHeaderBtn} from '../components'
import EmergencyContact from "../components/landing/EmergencyContact";
import MapView, {Marker} from 'react-native-maps';
import { EvilIcons } from '@expo/vector-icons';;



const Home = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const markers = [
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
const threeMarkersChosen = [
  { latitude: 33.77509864265381, longitude: -84.3961465816308 },
  { latitude: 33.77717572728114, longitude: -84.39589086650311 },
  { latitude: 33.77260807592805, longitude: -84.39137794195794 },
]

const mapRef = useRef(null);
const markersRegion = {
  latitude: 33.7756, 
  longitude: -84.3963, 
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
const goToNearestMarker = () => {
  //Animate the user to new region. Complete this animation in 3 seconds
  mapRef.current.animateToRegion(markersRegion, 1 * 1000);
};

const refocusToThreeMarkers = () => {
  mapRef.current.fitToCoordinates(threeMarkersChosen, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: true });
}

  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen 
        options={{
          headerStyle: {backgroundColor: COLORS.gray},
          headerShadowVisible: false,
          headerTitle: "",
          headerTitleAlign: "left",
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <View style = {styles.searchBarContainer}>
            <View style = {styles.searchBar}>
              <EvilIcons name="search" size={20} color="black" />
              <TextInput
                style={{
                  borderColor: COLORS.black,
                  fontSize: 20,
                  height: 30,
                  paddingLeft: 10,
                  margin: 10,
                  
                }}
                  type="search"
                  placeholder="Enter Location"
                  onChange={handleChange}
                  value={searchInput} />
            </View>
          </View>
          
          <View style = {styles.options}>
                <Button style= {styles.appButtonContainer} onPress={() => goToNearestMarker()}>
                  <View>
                      <Text style={styles.appButtonText}>Go To Nearest Markers</Text>
                  </View>   
                </Button>
                <Button style= {styles.appButtonContainer} onPress={() => refocusToThreeMarkers()} >
                  <View>
                      <Text style={styles.appButtonText}>Zoom in to markers</Text>
                  </View>  
                </Button>
              </View>
          <View>
      
          <View style={styles.container}>
            
            <MapView
              ref = {mapRef}
              style={styles.map}
              initialRegion={{
                latitude: 33.7756, 
                longitude: -84.3963, 
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
            

              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker}
                  clickable={true}
                  // title={`Marker ${index + 1}`}
                  title={"Clough Undergraduate Learning Commons "}
                /> ))}

            </MapView>
          </View>
          
              <EmergencyContact></EmergencyContact>
          </View>
          </View></ScrollView>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    padding:10
  },
  map: {
    width: '100%',
    height: 600,
  },
  options: {
    flex: 1,
    justifyContent: 'sspace-evenly',
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
    heigh: 10,
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
