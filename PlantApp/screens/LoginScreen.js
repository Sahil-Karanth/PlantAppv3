import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import FlashMessage from "react-native-flash-message";

// firebase imports
import { db, auth } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";


// components
import EmailPwdInputs from "../components/EmailPwdInputs";

// utility functions
import { getErrorFlashMessage } from '../functions/utility_functions';

// styles
import GlobalStyles from '../styles/styles';


export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const flashRef = useRef()
    
    const Login = async () => {

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
        
            getErrorFlashMessage(errorCode, flashRef);

        }
    }

    return (
        <View style={[GlobalStyles.container, styles.container]}>

            <FlashMessage position="top" ref={flashRef} />
            
            <View style={GlobalStyles.formBox}>
            

                <EmailPwdInputs setEmail={setEmail} setPassword={setPassword} />


                <TouchableOpacity style={GlobalStyles.loginButton} onPress={Login}>
                    <Text style={GlobalStyles.buttonText}>Login</Text>
                </TouchableOpacity>

            </View>
        
            <TouchableOpacity style={GlobalStyles.signUpButton} onPress={() => navigation.navigate('Sign Up')}>
                <Text style={GlobalStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
    }

});

