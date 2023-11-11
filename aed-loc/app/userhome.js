import React from "react"
import {View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native'
import {useRoute} from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons'; 
import {Stack} from 'expo-router';
import {COLORS, images} from "../constants";
import {ScreenHeaderBtn} from '../components'
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import { Link} from 'expo-router';
import styles from "../components/landing/landing.style";

const HomeScreen = () => {
  const route = useRoute();
  const username = route.params?.name;
  const email = route.params?.email;

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: '#faebd7', padding: 20, height: 100};
  return (
    <SafeAreaView style = {styles.wrapper}>
      <Stack.Screen 
        options={{
          headerStyle: {backgroundColor: COLORS.gray},
          headerShadowVisible: false,
          headerTitle: "User Home",
          headerTitleAlign: "left",
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%"/>
          ),
        }}
      />
      <View style={styles.userWrapper}>
        <FontAwesome5 name="user-circle" size={150} color="#faebd7"/>
        <Text style = {styles.username}>{username}</Text>
        <Button mode="contained" buttonColor='#FBEBD8' textColor="black">Update User Info</Button>
      </View>
      <View style={styles.container}>
            <Button style={styles.emergencyButton}  mode="contained" buttonColor='red' textColor='white' onPress={() => Linking.openURL("tel:911")}>
                <Text style={styles.emergencyButtonText}>Call 911</Text>
            </Button>
            <Button style={styles.emergencyContactButton} mode="contained" buttonColor='red' textColor='white' onPress={showModal}>
                <Text style={{fontWeight: 400, fontSize: 18}}>Message Emergency Contact</Text>
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
                    <Button style={styles.instructionsButton} mode="contained" buttonColor='#FBEBD8' textColor='black'>
                        <Text>Steps for Basic Life Support</Text>
                    </Button>
                </Pressable>
            </Link>
            <Link href={`/usingaed`} asChild>
                <Pressable >
                    <Button style={styles.instructionsButton} mode="contained" buttonColor='#FBEBD8' textColor='black'>
                        <View>
                            <Text>How to Use an AED</Text>
                        </View>
                    </Button>
                </Pressable>
            </Link>
            <Button style={styles.instructionsButton} mode="contained" buttonColor='#FBEBD8' textColor='black'>
                <View>
                    <Text>Add/Modify AED</Text>
                </View>
            </Button>
            {/* <PaperProvider>
              <Portal>
                <Modal visible={visible} onDismiss={() => hideModal} contentContainerStyle={containerStyle}>
                  <Text>Example Modal.  Click outside this area to dismiss.</Text>
                </Modal>
              </Portal>
              <Button style={styles.instructionsButton} onPress={showModal}>
                <Text>Add/Modify AED</Text>
              </Button>
            </PaperProvider> */}
            {/* <Link href={`/usingaed`} asChild> */}
          {/* <Pressable >
            <Button style= {styles.appButtonContainer}>
                    <View>
                        <Text style={styles.appButtonText}>Watch Training Videos</Text>
                    </View>   
            </Button>
          </Pressable>
        </Link>
        <Link href={`/wrongaed`} asChild>
          <Pressable >
            <Button style= {styles.reportButtonContainer}> 
                    <View>
                        <Text style={styles.appButtonText}>Report wrong AED Location</Text>
                    </View>    
            </Button>
          </Pressable>
        </Link> */}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
