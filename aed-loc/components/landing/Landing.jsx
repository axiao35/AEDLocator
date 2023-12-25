
import {Link} from 'expo-router';
import {React, useState} from 'react'
import {View, Pressable, Text, Image} from 'react-native';
import {Button, Modal} from "react-native-paper";
import {Linking } from 'react-native';
import styles from './landing.style'

const Landing = () => {
    const [visible, setVisible] = useState(false);
    const emergencyContact = String(7707139907);
    const loggedIn = false;
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 600, fontSize: 40, marginBottom: 50}}>AED Locator</Text>
            
            <Button style={styles.emergencyButton}  mode="contained" buttonColor='red' textColor='white' onPress={() => Linking.openURL("tel:911")}>
                <Text style={{fontWeight: 600, fontSize: 18}}>Call 911</Text>
            </Button>
            { loggedIn &&
            <Button style={styles.emergencyContactButton} mode="contained" buttonColor='red' textColor='white' onPress={showModal}>
                <Text style={{fontWeight: 600, fontSize: 18}}>Message Emergency Contact</Text>
            </Button>
            }
            <Link href={'/map'} asChild>
                <Pressable >
                    <Button style={styles.locateAED} mode="contained" buttonColor='red'>
                        <View>
                            <Text style={{color:"white", fontWeight: 600, fontSize: 18}}>Locate Nearest AED</Text>
                        </View>
                    </Button>
                </Pressable>
            </Link>
            <View><Image source={require('./aed.png')} style={styles.image} resizeMode="contain" ></Image></View>
            <Link href={`/lifesupport`} asChild>
                <Pressable >
                    <Button style={styles.instructionsButton} mode="contained" buttonColor="#FAC5C5" textColor='black'>
                        <Text style={{color:"black"}}>Steps for Basic Life Support</Text>
                    </Button>
                </Pressable>
            </Link>
            <Link href={`/basictraining`} asChild>
                <Pressable >
                    <Button style={styles.instructionsButton} mode="contained" buttonColor="#FAC5C5" textColor='black'>
                        <View>
                            <Text style={{color:"black"}}>How to Use an AED</Text>
                        </View>
                    </Button>
                </Pressable>
            </Link>
            <Link href={`/login`} asChild>
                <Pressable >
                    <Button style={styles.loginButton} mode="contained" buttonColor='#ffffff' textColor='black'>
                        <View>
                            <Text style={{color:"black", fontSize: 18}}>Login</Text>
                        </View>
                    </Button>
                </Pressable>
            </Link>
            <Modal style={styles.modalEmergency} contentContainerStyle={styles.contentContainerModalEmergency} visible={visible} onDismiss={hideModal}>
                <Text style={{color:"black", fontSize: 16, alignSelf: 'center', marginBottom: 10}}>{emergencyContact}</Text>
                <Button style={styles.modalButton} mode="contained" buttonColor='#11a7f8' textColor='white' onPress={() => Linking.openURL("tel:" + emergencyContact)}>
                    <Text>Call</Text>
                </Button>
                <Button style={styles.modalButton} mode="contained" buttonColor='#11a7f8' textColor='white' onPress={() => Linking.openURL("sms:" + emergencyContact)}>
                    <Text>Text</Text>
                </Button>
            </Modal>
        </View>
    );
}

export default Landing;