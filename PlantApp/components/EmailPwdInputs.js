import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

export default function DataList(props) {

    return (
        <View>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
                style={styles.nameInput}
                placeholder="Email"
                onChangeText={(text) => props.setEmail(text)}
            />
            <Text style={styles.labelText}>Password</Text>
            <TextInput
                style={styles.nameInput}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => props.setPassword(text)}
            />
        </View>

    )

}

const styles = StyleSheet.create({

    nameInput: {
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        width: "100%",
        padding: 10,
    },

    labelText: {
        fontSize: 25,
        color: "#000000",
        marginBottom: 10,
    },

})