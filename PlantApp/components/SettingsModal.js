import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../FirebaseConfig';
import { ref, update, onValue } from "firebase/database";

export default function SettingsModal(props) {
    const [systemResponsive, setSystemResponsive] = useState(false);
    const [cpuTemp, setCpuTemp] = useState(null);

    useEffect(() => {
        if (!props.modalOpen) {

            console.log("Settings modal closed");
            // Reset system responsive state
            
            setSystemResponsive(false);
            const dbRef = ref(db);
            update(dbRef, {
                response_app_ping: false,
            });

            // Reset CPU temp state
            setCpuTemp(null);
            const CPURef = ref(db, 'pi_cpu_response');    

            return

        }

        console.log("Settings modal opened");

        const dbRef = ref(db);

        // Send ping to Pi (pi then responds with pong and CPU temp)
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

        // Set up listener for cpu temp
        const cpuTempListener = ref(db, 'pi_cpu_response');
        const cpuTempUnsubscribe = onValue(cpuTempListener, (snapshot) => {
            const cpuTemp = snapshot.val();
            console.log("CPU temp: ", cpuTemp);
            setCpuTemp(cpuTemp);
        });

        // Clean up listener on unmount or when modal closes
        return () => {
            unsubscribe();
            cpuTempUnsubscribe();
        };

    }, [props.modalOpen]);



    useEffect(() => {
        // listen for shutdown_pi_signal
        const shutdownListener = ref(db, 'shutdown_pi_signal');
        const unsubscribe = onValue(shutdownListener, (snapshot) => {
            const shutdownSignal = snapshot.val();
            if (shutdownSignal) {
                console.log("Shutdown signal received");
                setSystemResponsive(false);
            }
        });

        return () => {
            unsubscribe();
        };

    }, []);


    const handleShutdown = () => {
        const dbRef = ref(db);
        update(dbRef, {
            shutdown_app_signal: true,
        });
    }

    const signUserOut = async() => {
        auth.signOut().then(() => {
            console.log("User signed out");
        }).catch((error) => {
            console.log("Error signing out: ", error);
        });
    };


    return (
        <Modal visible={props.modalOpen} animationType='slide' transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <TouchableOpacity onPress={() => props.setModalOpen(false)}>
                        <Ionicons name="close" size={40} color="black" />
                    </TouchableOpacity>
                    
                    <Text style={styles.TableRow}>System responsive: {systemResponsive ? 'Yes' : 'No'}</Text>

                    <Text style={styles.TableRow}>CPU temp: {cpuTemp ? cpuTemp : 'N/A'}</Text>

                    <TouchableOpacity onPress={signUserOut}>
                        <Text style={[styles.TableRow, styles.blue]}>Sign Out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleShutdown}>
                        <Text style={[styles.TableRow, styles.red]}>Shutdown System</Text>
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

    red: {
        backgroundColor: '#ff4747',
        textAlign: 'center',
        color: 'white',
    },

    blue: {
        backgroundColor: '#253CDA',
        textAlign: 'center',
        color: 'white',
    }
});