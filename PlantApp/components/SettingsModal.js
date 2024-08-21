import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsModal(props) {

    let system_status = "Active";
    let water_level = "Normal";

    return (
        <Modal visible={props.modalOpen} animationType='slide' transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modal}>

                    <TouchableOpacity onPress={() => props.setModalOpen(false)}>
                        <Ionicons name="close" size={40} color="black" />
                    </TouchableOpacity>
                    

                    <Text style={styles.TableRow}>Status: {system_status}</Text>
                    <Text style={styles.TableRow}>Water level: {water_level}</Text>

                    <TouchableOpacity>
                        <Text style={styles.button}>Shutdown System</Text>
                    </TouchableOpacity>
                    

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '80%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
    },
    TableRow: {
        flexDirection: "row",
        width: '100%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#caf797',
        marginVertical: 15,
        fontSize: 20,

    },


    button: {
        backgroundColor: '#ff4747',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }

});