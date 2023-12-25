import { StyleSheet, Image, Text, View, ScrollView, SafeAreaView, Button, Link, Pressable } from "react-native";
import {useState} from 'react';
import {Stack, useRouter} from 'expo-router';
import { COLORS, images, SIZES } from "../constants";
import {ScreenHeaderBtn} from '../components'
import TrainingSubmit from "../components/landing/TrainingSubmit";
import YoutubePlayer from 'react-native-youtube-iframe';
import { CheckBox } from 'react-native-elements';
import { ProgressBar, MD3Colors } from 'react-native-paper';


const Home = () => {
  return (
    <SafeAreaView style = {{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen 
        options={{
          headerStyle: {backgroundColor: COLORS.gray},
          headerShadowVisible: false,
          headerTitle: "Training",
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
          <View>
            <Text> 
            </Text>
          </View>
          <View style={styles.container}>
          <YoutubePlayer
            height={200}
            play={true}
            videoId={'BAWGjNAj_vA'}
          />
          </View>
          <View style={styles.container}>
          <YoutubePlayer
            height={200}
            play={false}
            videoId={'UFvL7wTFzl0'}
          /></View></View>
          <View><Image source={require('./aed.png')} style={styles.image} resizeMode="contain" ></Image></View>

          </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:100,
    borderColor: COLORS.gray,
    borderWidth: 5
  },
  video: {
    width: '100%',
    height: 200,
    
  },
  check: {
    backgroundColor: COLORS.lightWhite
    
  },
  progressText: {
    textAlign: "center",
    padding: 10,
    fontSize: 18,
  },
  progressBar: {
    height: 15,
    width: '95%',
    left: '2.5%',
  },
  image: {
    height: 50,
    width: 50,
    alignSelf: "center"
  }
});

export default Home;