import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import FlashMessage from "react-native-flash-message";

// firebase imports
import { db, auth } from "../FirebaseConfig";
import { sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";

// components
import EmailPwdInputs from "../components/EmailPwdInputs";

// utility functions
import { dangerMessage, infoMessage, getErrorFlashMessage } from '../functions/utility_functions';

// styles
import GlobalStyles from '../styles/styles';


export default function SignUpScreen({ route }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const flashRef = useRef()

    const SignUp = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                getErrorFlashMessage(errorCode, flashRef);
                
            });
    };

    return (
        <View style={[GlobalStyles.container, styles.container]}>

            <FlashMessage position="top" ref={flashRef} />

            <View style={GlobalStyles.formBox}>
            
                <EmailPwdInputs setEmail={setEmail} setPassword={setPassword} />

                <TouchableOpacity style={GlobalStyles.loginButton} onPress={SignUp}>
                    <Text style={GlobalStyles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
    }

});

