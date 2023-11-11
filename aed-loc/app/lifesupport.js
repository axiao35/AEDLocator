import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import {useState} from 'react';
import {Stack, useRouter} from 'expo-router';
import { COLORS, icons, images, SIZES, FONT } from "../constants";
import {Welcome, ScreenHeaderBtn} from '../components'
import Landing from "../components/landing/Landing";

const Home = () => {
  const router = useRouter();
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
          <Text style={styles.title}>Basic Life Support</Text>
          <Text style={styles.header}>1. Prompt Recognition of Cardiac Arrest</Text>
          <Text style={styles.paragraph}>Recognizing cardiac arrest involves sudden collapse, loss of pulse, consciousness, and breath, enabling rapid response by bystanders. Responders should also check for mouth and airway obstructions in accident-related cases.</Text>
          <Text style={styles.header}>2. Signs of Life from the Victim</Text>
          <Text style={styles.paragraph}>Assessing the victim's vital signs and consciousness is crucial. This includes tapping their shoulders, speaking loudly, and checking their eyelids, pulse, and breathing.</Text>
          <Text style={styles.header}>3. Call for Urgent Medical Assistance</Text>
          <Text style={styles.paragraph}>Even medical professionals would call an ambulance for cardiac arrest patients in public, as they lack necessary equipment like AEDs.</Text>

          </View></ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.xxLarge,
    color: COLORS.primary,
    alignSelf:"center"
  },
  header: {
      fontSize: SIZES.large,
      color: COLORS.primary,
      marginLeft:10,
      alignSelf:"left"
  },
  paragraph: {
      fontSize: SIZES.medium,
      color: COLORS.primary,
      marginLeft:40,
      marginRight:0,
      alignSelf:"left"
  },
});

export default Home;