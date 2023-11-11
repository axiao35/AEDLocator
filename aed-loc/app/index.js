import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import {useState} from 'react';
import {Stack, useRouter} from 'expo-router';
import { COLORS, icons, images, SIZES } from "../constants";
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
          headerTitle: "AED Locator",
          headerTitleAlign: 'center',

        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Landing></Landing>
          </View></ScrollView>
    </SafeAreaView>
  )
}

export default Home;