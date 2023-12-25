import {Link} from 'expo-router';
import React from 'react'
import { View, Pressable , Text, SafeAreaView} from 'react-native';
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import axios from "axios";
import {useNavigation} from "@react-navigation/native"




import styles from './login.style'
import { COLORS } from '../../constants';

function Landing(props) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [valid, setValid] = useState(true);

    const { user, setUser } = props;
    const navigation = useNavigation();

    /*
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    **/

    const onSubmit = (e) => {
        e.preventDefault();

        if (formData.username === "" || formData.password === "" ) {
            setValid(false);
        } else {
            axios
                .post("/api/users/login", formData)
                .then((res) => {
                    if (res.data.success === true) {
                        setUser({
                            id: res.data.data._id,
                            username: res.data.data.username,
                        });
                        localStorage.setItem("token", res.data.token);
                        navigation.navigate('/userhome', { data: formData.username });
                    } else {
                        setValid(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setValid(false);
                });
        }
    };



    return (
        <SafeAreaView style = {styles.container}>
            <TextInput
                name="username"
                style={styles.textInput}
                placeholder="Username"
                onChangeText={(text) => setFormData(text)}
                value={formData.username}
            />
            <TextInput 
                name="password"
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setFormData(text)}
                value={formData.password}
            />
            <Link href={`/userhome`} asChild>
                <Pressable >
                    <Button onPress= {onSubmit} mode="contained" buttonColor="#FAC5C5" textColor='black'>
                        <View>
                            <Text style={{color:"black"}}>Login</Text>
                        </View>
                    </Button>
                </Pressable>
            </Link>
        
        
            <View>
                <Text style={{alignSelf:"center"}}>Don't have an account? Create on here:</Text> 
                <Link href={`/signup`} asChild>
                    <Pressable >
                        <Button mode="contained" buttonColor="#FAC5C5" textColor='black'>
                            <View>
                                <Text style={{color:"black"}}>Create an account</Text>
                            </View>
                        </Button>
                    </Pressable>
                </Link>
            </View>
        
        </SafeAreaView>
    );
}


export default Landing;