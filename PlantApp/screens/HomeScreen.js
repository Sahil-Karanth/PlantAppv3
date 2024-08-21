import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import GlobalStyles from '../styles/styles';

// components
import ToggleSwitch from '../components/ToggleSwitch';
import ManualContent from '../components/ManualContent';
import TimedContent from '../components/TimedContent';

export default function HomeScreen(props) {

    const [isManualPage, setIsManualPage] = useState(true);
    const [days, setDays] = useState([]);
    const [toggleDisabled, setToggleDisabled] = useState(false);
    const [toggleState, setToggleState] = useState(false);
    const [isStartManual, setIsStartManual] = useState(false)
    const [isStartTimed, setIsStartTimed] = useState(false)


    useEffect(() => {

        console.log("checking Pi watering status...")
        
        const response = {running: true, mode: "manual"} // replace with fetch request to server
        if (response.running) {
            setIsStartManual(true);
        }


    }, [toggleState])

    const handleStartManual = () => {

        if (isStartTimed) {
            alert("Cannot start manual mode while timed mode is running!");
            return;
        }
        console.log("Start (manual)");
        setToggleDisabled(true);
    }

    const handleStopManual = () => {

        console.log("Stop (manual)");
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

        console.log("Start (timed) with days: ", days_array);
        setToggleDisabled(true);
    }

    const handleStopTimed = () => {
        console.log("Stop (timed)");
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