import React from "react"
import { View, Text, SafeAreaView, ScrollView, Pressable, Linking, TextInput, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { COLORS, images } from "../constants";
import { ScreenHeaderBtn } from '../components'
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import { Link } from 'expo-router';
import styles from "../components/landing/landing.style";
import axios from "axios";

const HomeScreen = () => {
  const route = useRoute();
  const username = route.params?.name;
  const email = route.params?.email;

  const [ECName, setECName] = React.useState("");
  const [ECNumber, setECNumber] = React.useState("");

  const [oldEmail, setOldEmail] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: COLORS.lightWhite, padding: 20, height: 200, margin: 20 };
  const containerStyle2 = { backgroundColor: COLORS.lightWhite, padding: 20, height: 240, margin: 20 };
  const containerStyle3 = { backgroundColor: COLORS.lightWhite, padding: 20, height: 320, margin: 20 };

  const [visible2, setVisible2] = React.useState(false);
  const showModal2 = () => setVisible2(true);
  const hideModal2 = () => setVisible2(false);

  const [visible3, setVisible3] = React.useState(false);
  const showModal3 = () => setVisible3(true);
  const hideModal3 = () => setVisible3(false);

  const [visible4, setVisible4] = React.useState(false);
  const showModal4 = () => setVisible4(true);
  const hideModal4 = () => setVisible4(false);

  const [visible5, setVisible5] = React.useState(false);
  const showModal5 = () => setVisible5(true);
  const hideModal5 = () => setVisible5(false);

  const [visible6, setVisible6] = React.useState(false);
  const showModal6 = () => setVisible6(true);
  const hideModal6 = () => setVisible6(false);

  const [visible7, setVisible7] = React.useState(false);
  const showModal7 = () => setVisible7(true);
  const hideModal7 = () => setVisible7(false);

  const [visible8, setVisible8] = React.useState(false);
  const showModal8 = () => setVisible8(true);
  const hideModal8 = () => setVisible8(false);

  function numberCheck(inputString) {
    return /^\d+$/.test(inputString) && inputString.length == 10;
  }

  function isEmailValid(email) {
    // Regular expression for a simple email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(email);
  }

  const messageECPressed = () => {
    const data = {
      "email": email
    };

    const config = {
      method: 'post',
      url: 'https://juniordesign-backend-5e050bcd1c1a.herokuapp.com/api/getEmergencyContact',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        const name = response.data.contact_name;
        const number = response.data.contact_number;
        // Linking.openURL(`tel:${number}`);
        if (number == undefined || name == "") {
          Alert.alert(
            'Invalid Emgergency Contact',
            `You have not setup an emergency contact yet.`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              }
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            'Confirm Call',
            `Do you want to call ${name}?`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Call',
                onPress: () => Linking.openURL(`tel:${number}`),
              },
            ],
            { cancelable: false }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addECPressed = () => {
    if (numberCheck(ECNumber) && ECNumber && ECName) {
      console.log(username);
      console.log(email);
      console.log(ECName);
      console.log(ECNumber);
      const data = {
        "email": email,
        "contact_name": ECName,
        "contact_number": ECNumber
      }

      const config = {
        method: 'post',
        url: 'https://juniordesign-backend-5e050bcd1c1a.herokuapp.com/api/createEmergencyContact',
        // url: 'http://10.196.190.86:8080/api/createEmergencyContact',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(response);
          setECName("");
          setECNumber("");
          hideModal4();
          Alert.alert("Emergency Contact Updated!")
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert('Invalid Phone Number')
    }
  };

  const updateEmailPressed = () => {
    if (!isEmailValid(newEmail)) {
      Alert.alert("Invalid New Email");
      return;
    }
    console.log(username);
    console.log(email);
    console.log(newEmail)
    const data = {
      "oldEmail": oldEmail,
      "newEmail": newEmail,
    }

    const config = {
      method: 'post',
      url: 'https://juniordesign-backend-5e050bcd1c1a.herokuapp.com/api/updateUserEmail',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        setOldEmail("");
        setNewEmail("");
        hideModal6();
        Alert.alert(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        Alert.alert(error.response.data);
      });
  };

  const updatePasswordPressed = () => {
    if (confirmPassword != newPassword) {
      Alert.alert("Invalid Confirm New Password");
      return;
    }
    if (newPassword != "") {
      const data = {
        "email": email,
        "oldPassword": oldPassword,
        "newPassword": newPassword,
      }

      const config = {
        method: 'post',
        url: 'https://juniordesign-backend-5e050bcd1c1a.herokuapp.com/api/updateUserPassword',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data == "Passwords match. No changes occured.") {
            Alert.alert(response.data);
            return
          } else {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            hideModal7();
            Alert.alert(response.data)
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          Alert.alert(error.response.data);
        });
    }
  };


  return (
    <PaperProvider>

      <SafeAreaView style={styles.wrapper}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.gray },
            headerShadowVisible: false,
            headerTitle: "User Home",
            headerTitleAlign: "left",
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />
            ),
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userWrapper}>
            <FontAwesome5 name="user-circle" size={150} color="#FAC5C5" />
            <Text></Text>
            <Text style={styles.username}> Welcome {username}!</Text>
          </View>
          <View style={styles.container}>
            <Portal>
              <Modal visible={visible3} onDismiss={hideModal3} contentContainerStyle={containerStyle}>
                <Button style={styles.modalButton} mode="contained" buttonColor='red' textColor='white' onPress={() => Linking.openURL("tel:911")}>
                  <Text style={styles.emergencyButtonText}>Call 911</Text>
                </Button>

                <Button style={styles.modalButton} mode="contained" buttonColor='red' textColor='white' onPress={messageECPressed}>
                  <Text style={{ color: "white" }}>Message Emergency Contact</Text>
                </Button>

                <Button style={styles.modalButton} mode="contained" buttonColor='red' textColor='white' onPress={showModal4}>
                  <Text style={{ color: "white" }}>Set Emergency Contact</Text>
                </Button>
              </Modal>

              <Modal visible={visible4} onDismiss={hideModal4} contentContainerStyle={containerStyle2}>
                <Text>Emergency Contact Name</Text>
                <TextInput
                  style={{
                    borderColor: COLORS.gray,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 0,
                    marginTop: 10,
                  }}
                  onChangeText={(text) => setECName(text)}
                  value={ECName}
                />

                <Text>Emergency Contact Number</Text>
                <TextInput
                  style={{
                    borderColor: COLORS.gray,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 0,
                    marginTop: 10,
                  }}
                  inputMode="numeric"
                  onChangeText={(text) => setECNumber(text)}
                  value={ECNumber}
                />
                <Button style={styles.emergencyContactButton} mode="contained" buttonColor='red' textColor='white' onPress={addECPressed}>
                  <Text style={{ fontWeight: 400, fontSize: 18 }}>Submit Changes</Text>
                </Button>
              </Modal>
            </Portal>

            <Portal>
              <Modal visible={visible8} onDismiss={hideModal8} contentContainerStyle={containerStyle}>
                <Pressable>
                  <Link href={'/report'} asChild>
                    <Button style={styles.modalButton} mode="contained" buttonColor='red' textColor='white'>
                      <Text>Add AED</Text>
                    </Button>
                  </Link>
                </Pressable>
                <Pressable>
                  <Link href={'/modifyaed'} asChild>
                    <Button style={styles.modalButton} mode="contained" buttonColor='red' textColor='white'>
                      <Text>Modify AED</Text>
                    </Button>
                  </Link>
                </Pressable>
              </Modal>
            </Portal>

            <Button style={styles.instructionsButton} mode="contained" buttonColor='red' textColor='white' onPress={showModal3}>
              <Text style={{ fontWeight: 400, fontSize: 18 }}>Emergency Contacts</Text>
            </Button>
            <Link href={'/map'} asChild>
              <Pressable >
                <Button style={styles.locateAED} mode="contained" buttonColor='red'>
                  <View>
                    <Text style={styles.emergencyButtonText}>Locate Nearest AED</Text>
                  </View>
                </Button>
              </Pressable>
            </Link>
            <Link href={`/lifesupport`} asChild>
              <Pressable >
                <Button style={styles.instructionsButton} mode="contained" buttonColor="#FAC5C5" textColor='black'>
                  <Text>Steps for Basic Life Support</Text>
                </Button>
              </Pressable>
            </Link>
            <Link href={`/usingaed`} asChild>
              <Pressable >
                <Button style={styles.instructionsButton} mode="contained" buttonColor="#FAC5C5" textColor='black'>
                  <View>
                    <Text>How to Use an AED</Text>
                  </View>
                </Button>
              </Pressable>
            </Link>
            <Pressable >
              <Button style={styles.instructionsButton} mode="contained" buttonColor="#FAC5C5" textColor='black' onPress={showModal8}>
                <View>
                  <Text>Add/Modify AED</Text>
                </View>
              </Button>
            </Pressable>

            <Portal>
              <Modal visible={visible5} onDismiss={hideModal5} contentContainerStyle={containerStyle}>
                <Button style={styles.modalButton} mode="contained" buttonColor='red' textColor='white' onPress={showModal6}>
                  <Text style={{ color: "white" }}>Update Email</Text>
                </Button>
                <Button style={styles.modalButton} mode="contained" buttonColor='red' textColor='white' onPress={showModal7}>
                  <Text style={{ color: "white" }}>Update Password</Text>
                </Button>
                <Button style={styles.modalButton} mode="contained" buttonColor='red' textColor='white' onPress={showModal4}>
                  <Text style={{ color: "white" }}>Update Emergency Contact</Text>
                </Button>
              </Modal>

              <Modal visible={visible6} onDismiss={hideModal6} contentContainerStyle={containerStyle2}>
                <Text>Old Email</Text>
                <TextInput
                  style={{
                    borderColor: COLORS.gray,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 0,
                    marginTop: 10,
                  }}
                  onChangeText={(text) => setOldEmail(text)}
                  value={oldEmail}
                />

                <Text>New Email</Text>
                <TextInput
                  style={{
                    borderColor: COLORS.gray,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 0,
                    marginTop: 10,
                  }}
                  onChangeText={(text) => setNewEmail(text)}
                  value={newEmail}
                />
                <Button style={styles.emergencyContactButton} mode="contained" buttonColor='red' textColor='white' onPress={updateEmailPressed}>
                  <Text style={{ fontWeight: 400, fontSize: 18 }}>Submit Changes</Text>
                </Button>
              </Modal>


              <Modal visible={visible7} onDismiss={hideModal7} contentContainerStyle={containerStyle3}>
                <Text>Old Password</Text>
                <TextInput
                  style={{
                    borderColor: COLORS.gray,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 0,
                    marginTop: 10,
                  }}
                  onChangeText={(text) => setOldPassword(text)}
                  value={oldPassword}
                />

                <Text>New Password</Text>
                <TextInput
                  style={{
                    borderColor: COLORS.gray,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 0,
                    marginTop: 10,
                  }}
                  onChangeText={(text) => setNewPassword(text)}
                  value={newPassword}
                />
                <Text>Confirm New Password</Text>
                <TextInput
                  style={{
                    borderColor: COLORS.gray,
                    borderWidth: 0.5,
                    height: 40,
                    paddingLeft: 0,
                    marginTop: 10,
                  }}
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmPassword}
                />
                <Button style={styles.emergencyContactButton} mode="contained" buttonColor='red' textColor='white' onPress={updatePasswordPressed}>
                  <Text style={{ fontWeight: 400, fontSize: 18 }}>Submit Changes</Text>
                </Button>
              </Modal>

            </Portal>

            <Button style={styles.instructionsButton} mode="contained" buttonColor="#FAC5C5" textColor='black' onPress={showModal5}>
              <View>
                <Text>Update User Info</Text>
              </View>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  )
}

export default HomeScreen
