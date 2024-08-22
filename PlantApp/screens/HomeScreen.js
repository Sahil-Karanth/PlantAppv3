import { StyleSheet, View, Text, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import GlobalStyles from '../styles/styles';

// components
import ToggleSwitch from '../components/ToggleSwitch';
import ManualContent from '../components/ManualContent';
import TimedContent from '../components/TimedContent';

// firebase imports
import db from '../FirebaseConfig';
import { get, ref, onValue, set, update, remove } from "firebase/database";

export default function HomeScreen(props) {

    const [isManualPage, setIsManualPage] = useState(true);
    const [days, setDays] = useState([]);
    const [toggleState, setToggleState] = useState(false);
    const [isStartManual, setIsStartManual] = useState(false)
    const [isStartTimed, setIsStartTimed] = useState(false)


    useEffect(() => {

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


    }

    const handleStopManual = () => {

        console.log("Stop (manual)");

        // update firebase
        const dbRef = ref(db);
        update(dbRef, {
            mode: "manual",
            app_signal: false,
        });

    }

    const handleStartTimed = (days_array) => {

        if (isStartManual) {
            alert("Cannot start timed mode while manual mode is running!");
            return;
        }

        if (days_array.length === 0) {
            alert("You didn't select any days so are just wasting electricity rn");
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

        </View>
  );
}