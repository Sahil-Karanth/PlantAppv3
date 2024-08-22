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
    const [toggleDisabled, setToggleDisabled] = useState(false);
    const [toggleState, setToggleState] = useState(false);
    const [isStartManual, setIsStartManual] = useState(false)
    const [isStartTimed, setIsStartTimed] = useState(false)


    const asyncErrorAlert = async() => {
        return new Promise((resolve) => {
            Alert.alert(
                "Failed to get Pi watering status",
                "Please try again",
                [
                    {
                        text: "OK",
                        onPress: () => resolve('YES'),
                    }
                ],
                { cancelable: false }
            );
        });
    }


    const checkWateringStatus = async() => {
        
        const response = {running: false, mode: "manual", failed: false} // replace with fetch request to server
        
        if (response.failed) {
            await asyncErrorAlert();
            console.log("Failed to get Pi watering status");
            checkWateringStatus();
        }
        
        if (response.running && response.mode === "manual") {
            setIsStartManual(true);
        } else if (response.running && response.mode === "timed") {
            setIsStartTimed(true);
        }
    }


    useEffect(() => {
        // keep requesting until successful
        
        checkWateringStatus();

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
            running: true
        });

        setToggleDisabled(true);

    }

    const handleStopManual = () => {

        console.log("Stop (manual)");

        // update firebase
        const dbRef = ref(db);
        update(dbRef, {
            mode: "manual",
            running: false
        });

        setToggleDisabled(false);
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
            running: true,
            days: days_array
        });

        console.log("Start (timed) with days: ", days_array);
        setToggleDisabled(true);
    }

    const handleStopTimed = () => {
        console.log("Stop (timed)");

        // update firebase
        const dbRef = ref(db);
        update(dbRef, {
            mode: "timed",
            running: false,
            days: []
        });

        setToggleDisabled(false);
    }

    return (
        <View style={GlobalStyles.container}>

            <ToggleSwitch
                isManualPage={isManualPage}
                setIsManualPage={setIsManualPage}
                setDays={setDays}
                disabled={toggleDisabled}
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