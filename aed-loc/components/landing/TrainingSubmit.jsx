import { Redirect , Link} from 'expo-router';
import React from 'react'
import { SafeAreaView, StyleSheet, View, Pressable , Text} from 'react-native';
import { Button } from "react-native-paper";
import { Linking } from 'react-native';
import { COLORS } from "../../constants";



const Landing = () => {
    return (
        <SafeAreaView>
            <View style = {styles.options}>
                <Button style={styles.appButtonContainer}>
                    <Link href={`/userhome`} asChild>
                        <Pressable >
                            <View>
                                <Text style={{color:"black"}}>Complete Training</Text>
                            </View>
                        </Pressable>
                    </Link>
                </Button>
            </View>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    options: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: "center",
      marginBottom: 0,
      accessibilityRole: "button"
    },
    appButtonContainer: {
      elevation: 8,
      borderRadius: 5,
      backgroundColor: "#FAC5C5",
      height: 10,
      marginVertical: 8,
      paddingHorizontal: 12
    },
})

export default Landing;