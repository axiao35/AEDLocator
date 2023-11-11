import React from 'react'
import { View, Linking} from 'react-native';
import { Button } from "react-native-paper";

const Landing = () => {
    return (
        <View>
            <Button mode="contained" buttonColor='red' textColor='white' onPress={() => Linking.openURL("tel:7045129770")}>
                Call Emergency Contact
            </Button>
        </View>
    );
}

export default Landing;