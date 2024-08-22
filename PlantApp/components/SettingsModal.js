import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import db from '../FirebaseConfig';
import { ref, update, onValue } from "firebase/database";

export default function SettingsModal(props) {
    const [systemResponsive, setSystemResponsive] = useState(false);
    let pingSent = false;

    useEffect(() => {
        if (!props.modalOpen) {

            // Reset system responsive state
            
            setSystemResponsive(false);
            const dbRef = ref(db);
            update(dbRef, {
                response_app_ping: false,
            });

            return;

        }

        const dbRef = ref(db);

        // Send ping to Pi
        update(dbRef, {
            response_app_ping: true,
        });

        // Set up listener for response_pi_pong
        const pongListener = ref(db, 'response_pi_pong');
        const unsubscribe = onValue(pongListener, (snapshot) => {
            const response = snapshot.val();
            if (response) {
                setSystemResponsive(true);
            }
        });

        // Clean up listener on unmount or when modal closes
        return () => {
            unsubscribe();
        };

    }, [props.modalOpen]);

    return (
        <Modal visible={props.modalOpen} animationType='slide' transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <TouchableOpacity onPress={() => props.setModalOpen(false)}>
                        <Ionicons name="close" size={40} color="black" />
                    </TouchableOpacity>
                    
                    <Text style={styles.TableRow}>System responsive: {systemResponsive ? 'Yes' : 'No'}</Text>

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