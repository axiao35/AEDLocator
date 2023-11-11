import { Text, View, Pressable, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"
import { useState } from 'react';
import { Stack } from 'expo-router';
import { COLORS, icons, images, SIZES } from "../constants";
import { ScreenHeaderBtn } from '../components'
import axios from "axios";
import { Redirect, Link } from 'expo-router';

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  function isEmailValid(email) {
    // Regular expression for a simple email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(email);
  }
  const newAccount = async () => {
    navigation.navigate("signup");
  }
  const handleButtonPress = async () => {
    if (!(username && password)) {
      setErrorMessage("Please fill out all fields")
    } else if (!isEmailValid(username)) {
      setErrorMessage("Please submit a valid email");
    } else {
      const data = {
        email: username,
        password: password
      }

      const config = {
        method: 'post',
        url: 'https://juniordesign-backend-5e050bcd1c1a.herokuapp.com/api/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          const status = response.data;
          if (status == "Password") {
            setErrorMessage("Incorrect Password");
            setPassword("");
            console.log("Password");
          } else if (status == "User") {
            setErrorMessage("Username Not Found");
            console.log("Username");
          } else {
            console.log("Works");
            setErrorMessage("YAY!")
            console.log(status);
            navigation.navigate("userhome", { name: status[0], email: status[1] });
          }
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
          headerTitle: "LOGIN",
          headerTitleAlign: "left",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Text>Email</Text>
          <TextInput
            style={{
              borderColor: COLORS.gray,
              borderWidth: 0.5,
              height: 40,
              paddingLeft: 0,
              marginTop: 10,
            }}
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <Text>Password</Text>
          <TextInput
            style={{
              borderColor: COLORS.gray,
              borderWidth: 0.5,
              height: 40,
              paddingLeft: 5,
              marginTop: 10,
            }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          <Text style={{ color: "red" }}>{errorMessage}</Text>

          <Button onPress={handleButtonPress} mode="contained" buttonColor='beige' textColor='black' style={styles.button}>
            <Link href={`/login`} asChild>
              <Pressable >
                <View>
                  <Text style={{ color: "black" }}>Submit</Text>
                </View>
              </Pressable>
            </Link>
          </Button>

          <Button onPress={newAccount} mode="contained" buttonColor='beige' textColor='black'>
            <Link href={`/signup`} asChild>
              <Pressable >
                <View>
                  <Text style={{ color: "black" }}>Create New Account</Text>
                </View>
              </Pressable>
            </Link>
          </Button>




        </View></ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  button: {
      marginBottom: 20,
  },
})

export default Home;

