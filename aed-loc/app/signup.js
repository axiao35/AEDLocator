import { Text, View, Pressable, ScrollView, SafeAreaView, Image, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"
import { useState } from 'react';
import { Stack } from 'expo-router';
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { Link } from 'expo-router';

const Home = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  function isEmailValid(email) {
    // Regular expression for a simple email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(email);
  }

  const handleButtonPress = () => {
    if (!(formData.email && formData.firstname && formData.lastname && formData.password)) {
      setErrorMessage("Please fill out all fields");
    } else if (!isEmailValid(formData.email)) {
      setErrorMessage("Please submit a valid email");
    } else {
      let data = JSON.stringify({
        "email": formData.email,
        "firstname": formData.firstname,
        "lastname": formData.lastname,
        "password": formData.password,
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://juniordesign-backend-5e050bcd1c1a.herokuapp.com/api/createUser',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          if (response.data == "taken") {
            setErrorMessage("Email is already taken");
          } else {
            console.log(JSON.stringify(response.data));
            navigation.navigate("userhome", { data: formData.firstname });
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
          headerTitle: "Sign Up"
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
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            value={formData.email}
          />
          <Text></Text>
          <Text>First Name</Text>
          <TextInput
            style={{
              borderColor: COLORS.gray,
              borderWidth: 0.5,
              height: 40,
              paddingLeft: 0,
              marginTop: 10,
            }}
            onChangeText={(text) => setFormData({ ...formData, firstname: text })}
            value={formData.firstname}
          />
          <Text></Text>
          <Text>Last Name</Text>
          <TextInput
            style={{
              borderColor: COLORS.gray,
              borderWidth: 0.5,
              height: 40,
              paddingLeft: 5,
              marginTop: 10,
            }}
            onChangeText={(text) => setFormData({ ...formData, lastname: text })}
            value={formData.lastname}
          />
          <Text></Text>
          <Text>Password</Text>
          <TextInput
            style={{
              borderColor: COLORS.gray,
              borderWidth: 0.5,
              height: 40,
              paddingLeft: 5,
              marginTop: 10,
            }}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            value={formData.password}
          />
          <Text style={{ color: "red" }}>{errorMessage}</Text>
          <Button
            title="Submit"
            onPress={handleButtonPress}
            color={COLORS.primary}
          />
          <Button onPress={handleButtonPress} mode="contained" buttonColor="#FAC5C5" textColor='black'>
            <Link href={`/login`} asChild>
              <Pressable >
                <View>
                  <Text style={{ color: "black" }}>Submit</Text>
                </View>
              </Pressable>
            </Link>
          </Button>
        </View>
        <View>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          
          <Image source={require('./aed.png')} style={styles.image} resizeMode="contain" ></Image></View>
      </ScrollView>
      
      </SafeAreaView>

)
}

const styles = StyleSheet.create({
image: {
  height: 50,
  width: 50,
  alignSelf: "center"
},
})

export default Home;
