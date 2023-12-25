import { StyleSheet, Image, Text, View, ScrollView, SafeAreaView } from "react-native";
import {Stack, useRouter} from 'expo-router';
import { COLORS, images, SIZES } from "../constants";
import { ScreenHeaderBtn} from '../components'

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
          <Text></Text>
          <Text style={styles.title}>Steps of Basic Life Support</Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text style={styles.header}>Prompt Recognition of Cardiac Arrest</Text>
          <Text></Text>
          <Text style={styles.paragraph}>Signs of cardiac arrest involve sudden collapse, loss of pulse, consciousness, and breath which requires rapid response by any nearby bystanders. Any potential responders should also check the victim for mouth and airway obstructions in accident-related cases.</Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text style={styles.header}>Signs of Life from the Victim</Text>
          <Text></Text>
          <Text style={styles.paragraph}>It is crucial that responders must assess the victim's vital signs and state of consciousness. This includes tapping their shoulders, speaking loudly, and checking their eyelids, pulse, and breathing in order to determine their level of brain activity and responsiveness to external stimuli.</Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text style={styles.header}>Call for Urgent Medical Assistance</Text>
          <Text></Text>
          <Text style={styles.paragraph}>If any concern of a cardiac arrest having occured exists after assessing the situation, call an ambulance for the victim immediately. Regardless of proximity to an AED, emergency response should be contacted, so they can assist as soon as possible.</Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <View><Image source={require('./aed.png')} style={styles.image} resizeMode="contain" ></Image></View>

          </View></ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  header: {
      fontSize: 18,
      color: COLORS.primary,
      marginLeft:10,
      fontWeight: 'bold',
      textAlign: 'center'
  },
  paragraph: {
      fontSize: 15,
      color: COLORS.primary,
      marginLeft:25,
      marginRight:15,
      textAlign: 'center'
  },
  image: {
    height: 50,
    width: 50,
    alignSelf: 'center'
  }
});

export default Home;