import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import React, { useState, useEffect } from 'react';
import GlobalStyles from '../styles/styles';

// components
import ToggleSwitch from '../components/ToggleSwitch';
import ManualContent from '../components/ManualContent';
import TimedContent from '../components/TimedContent';
import SettingsModal from '../components/SettingsModal';

// firebase imports
// note that db is exported like module.exports = { db, storage };
import { db } from '../FirebaseConfig';
import { get, ref, onValue, set, update, remove } from "firebase/database";

export default function HomeScreen({ navigation, route }) {

    const [isManualPage, setIsManualPage] = useState(true);
    const [days, setDays] = useState([]);
    const [toggleState, setToggleState] = useState(false);
    const [isStartManual, setIsStartManual] = useState(false)
    const [isStartTimed, setIsStartTimed] = useState(false)
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [waitingOnPi, setWaitingOnPi] = useState(false);

    useEffect(() => {

        console.log("HomeScreen mounted");
        // add header options
        const headerOptions = {
    
            headerLeft: () => (
              <TouchableOpacity onPress={() => setSettingsModalOpen(!settingsModalOpen)} >
                <Ionicons name="settings" size={40} color="black" />  
              </TouchableOpacity>
            ),
          
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Latest Image')} >
                <Ionicons name="camera" size={40} color="black" />
              </TouchableOpacity>
            ),
          
            // center header Title
            headerTitleAlign: 'center',
          
        }

        navigation.setOptions(headerOptions);

        // listen to acknowledgements from Pi

        const dbRef = ref(db);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            const isStart = data.pi_signal;
            if (data.mode === "manual") {
                setIsStartManual(isStart);
            } else if (data.mode === "timed") {
                setIsStartTimed(isStart);
            }
            setWaitingOnPi(false);
        });

    }, [toggleState])

    const handleStartManual = () => {

        if (isStartTimed) {
            alert("Cannot start manual mode while timed mode is running!");
            return;
        }
        console.log("Start (manual)");

        // update firebase
        const dbRef = ref(db);

        update(dbRef, {
            mode: "manual",
            app_signal: true,
        });

        setWaitingOnPi(true);

    }

    const handleStopManual = () => {

        console.log("Stop (manual)");

        // update firebase
        const dbRef = ref(db);
        update(dbRef, {
            mode: "manual",
            app_signal: false,
        });

        setWaitingOnPi(true);

    }

    const handleStartTimed = (days_array) => {

        if (isStartManual) {
            alert("Cannot start timed mode while manual mode is running!");
            return;
        }

        if (days_array.length === 0) {
            alert("You didn't select any days");
            return;
        }

        // update firebase
        const dbRef = ref(db);
        update(dbRef, {
            mode: "timed",
            app_signal: true,
            days: days_array
        });

        console.log("Start (timed) with days: ", days_array);
    
        setWaitingOnPi(true);

    }

    const handleStopTimed = () => {
        console.log("Stop (timed)");

        // update firebase
        const dbRef = ref(db);
        update(dbRef, {
            mode: "timed",
            app_signal: false,
            days: []
        });

        setWaitingOnPi(true);

    }

    const handleCancelPiReq = () => {
        const dbRef = ref(db);
        update(dbRef, {
            app_signal: false,
        });
        setWaitingOnPi(false);
    }

    return (
        <View style={GlobalStyles.container}>

            <ToggleSwitch
                isManualPage={isManualPage}
                setIsManualPage={setIsManualPage}
                setDays={setDays}
                setToggleState={setToggleState}
            />
            
            {isManualPage ? (
                <ManualContent
                    handleStart={() => handleStartManual()}
                    handleStop={() => handleStopManual()}
                    isStart={isStartManual}
                    setIsStart={setIsStartManual}
                    timedRunning={isStartTimed}
                />
            ) : (
                <TimedContent
                    handleStart={() => handleStartTimed(days)}
                    handleStop={() => handleStopTimed()}
                    setDays={setDays}
                    isStart={isStartTimed}
                    setIsStart={setIsStartTimed}
                    manualRunning={isStartManual}
                />
            )}

            {waitingOnPi ?
                
                <TouchableOpacity onPress={handleCancelPiReq}><Text>Waiting on Pi. Press here to cancel request</Text></TouchableOpacity> : null}

            <SettingsModal modalOpen={settingsModalOpen} setModalOpen={setSettingsModalOpen} />
        </View>
  );
}